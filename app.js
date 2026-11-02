"use strict";
/* Motion is on unless the visitor asked their device for reduced motion */
const MOTION = !matchMedia("(prefers-reduced-motion: reduce)").matches;
if(MOTION) document.documentElement.classList.add("motion");
const params = new URLSearchParams(location.search);
/* ?t= picks the section (each section has its own QR code). No ?t= or an unknown one
   (old links such as ?t=ppe) opens the first section, Life Saving Rules. */
const topic = TOPICS.find(t => t.id === params.get("t")) || TOPICS[0];
if(params.has("t") && !TOPICS.some(t => t.id === params.get("t"))){ params.delete("t"); history.replaceState(null, "", location.pathname + (params.toString() ? "?" + params : "")); }
let lang = null;

const store = {
  get(k){ try{ return localStorage.getItem(k) }catch(e){ return null } },
  set(k,v){ try{ v === null ? localStorage.removeItem(k) : localStorage.setItem(k,v) }catch(e){} }
};
/* Escape every value placed into HTML */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
/* Only these languages are accepted from the URL or the picker */
const LANGS = ["ar", "en", "ur"];
const isLang = l => typeof l === "string" && LANGS.includes(l);
const link = id => id === TOPICS[0].id ? `./?lang=${lang}` : `?t=${id}&lang=${lang}`;
const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k]);
const art = t => `img/t-${t.id}.webp`;

/* Quiz progress: best score per topic; a perfect score earns the badge */
const QN = t => Math.min(QUIZ_SIZE, (QUIZ[t.id] || []).length);
/* Stored values are read defensively: anything unexpected falls back to a safe default */
const bestScore = t => { const n = parseInt(store.get("best:" + t.id), 10); return Number.isInteger(n) ? Math.min(Math.max(n, 0), QN(t)) : 0; };
const readIdx = (key, max) => { try{ const a = JSON.parse(store.get(key) || "[]"); return Array.isArray(a) ? a.filter(i => Number.isInteger(i) && i >= 0 && i < max) : []; }catch(e){ return []; } };
const refLabel = r => typeof r === "string" ? r : r[lang];

function ytId(url){
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}
function player(t, u){
  const src = (CONFIG.videos[t.id]?.[lang] || "").trim();
  const poster = CONFIG.posters?.[t.id]?.[lang] || "";
  if(!src) return `<div class="empty"><span class="emoji">🎬</span><span>${u.noVideo}</span></div>`;
  const y = ytId(src);
  if(y) return `<iframe src="https://www.youtube-nocookie.com/embed/${y}?rel=0&playsinline=1" title="video" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  return `<video src="${esc(src)}" ${poster ? `poster="${esc(poster)}"` : ""} controls playsinline preload="metadata"></video>`;
}

/* ---------- Topic ---------- */
function renderTopic(u){
  const c = topic[lang];
  document.title = c.title;
  const refs = (REFS[topic.id] || []).map(r => `<span>${esc(refLabel(r))}</span>`).join("");
  const words = c.title.split(" ").map((w, i) => `<span class="w" style="animation-delay:${.15 + i*.12}s">${esc(w)}</span>`).join(" ");
  return `
  <section class="hero">
    <div class="in">
      <img class="mimg" src="img/hero-m.webp" alt="${esc(CONFIG.ownerName[lang])}">
      <div class="copy" dir="${u.dir}">
        ${TOPICS.length > 1 ? `<nav class="tabs">${TOPICS.map(t => `<a href="${link(t.id)}" class="${t === topic ? "on" : ""}"><img src="${art(t)}" alt="">${esc(t[lang].title)}</a>`).join("")}</nav>` : ""}
        ${CONFIG.siteTag?.[lang] ? `<span class="tag">${esc(CONFIG.siteTag[lang])}</span>` : ""}
        <h1 class="display">${words}</h1>
        <p>${esc(c.intro)}</p>
        <div class="cta">
          <a class="btn" href="#watch">▶ ${u.watch}</a>
          <a class="chip" href="#quiz">🎯 ${u.quizTitle}</a>
        </div>
        <div class="meter"><span class="ml">${u.best}</span><div class="bar"><i id="meterBar"></i></div><b id="meterTxt"></b></div>
      </div>
    </div>
  </section>
  <div class="stripe thin"></div>
  <div class="wrap">
    <div class="stage">
    <div class="watchcol">
    <div class="frame" id="watch"><div class="player">${player(topic, u)}</div><i class="c c1"></i><i class="c c2"></i><i class="c c3"></i><i class="c c4"></i></div>
    ${(() => { const vl = CONFIG.videoLang?.[topic.id]?.[lang]; return vl && vl !== lang ? `<p class="vnote">🔊 ${esc(fmt(u.videoNote, {lang: u.langName[vl]}))}</p>` : ""; })()}
    </div>

    <section class="quiz" id="quiz" aria-live="polite"></section>
    </div>

    <div class="stop"><span class="oct emoji">✋</span><span>${u.stop}</span></div>
    ${refs ? `<div class="refs"><small>${u.refs}</small>${refs}</div>` : ""}

    <section class="sec">
      <div class="creator">
        <div class="cart"><img src="img/me.webp" alt="${esc(CONFIG.ownerName[lang])}" loading="lazy"></div>
        <div class="txt">
          <small>${u.by}</small>
          <h3 class="display">${esc(CONFIG.ownerName[lang])}</h3>
          <p>${esc(CONFIG.ownerLine?.[lang])}</p>
        </div>
      </div>
    </section>
  </div>
  <footer>${esc(CONFIG.siteTag?.[lang] || "")}</footer>`;
}

function updateMeter(){
  const n = bestScore(topic), total = QN(topic), bar = document.getElementById("meterBar");
  /* start from the current width so the change animates */
  requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.width = (n/total*100) + "%"; }));
  document.getElementById("meterTxt").textContent = `${n}/${total}`;
}

/* ---------- Quiz ---------- */
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let Q = null;   // {order, i, score, picked}

function shuffle(a){ a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function quizIntro(){
  const u = UI[lang], box = document.getElementById("quiz");
  box.className = "quiz";
  box.innerHTML = `
    <div class="qhead">
      <img class="qicon" src="${art(topic)}" alt="">
      <div><h2>${u.quizTitle}</h2><p>${fmt(u.quizSub, {title: topic[lang].title})}</p></div>
    </div>
    <button class="btn qgo" id="qstart">🎯 ${u.startQuiz}</button>`;
  document.getElementById("qstart").onclick = quizStart;
}

/* Draw QUIZ_SIZE questions the worker hasn't seen yet; when the bank runs out,
   start a new cycle but never repeat the previous attempt's questions */
function drawQuestions(){
  const bank = QUIZ[topic.id].map((_, i) => i), key = "seen:" + topic.id, n = QN(topic);
  let seen = readIdx(key, bank.length);
  const last = readIdx("last:" + topic.id, bank.length);
  let fresh = shuffle(bank.filter(i => !seen.includes(i)));
  let pick = fresh.slice(0, n);
  if(pick.length < n){
    const fill = shuffle(bank.filter(i => !pick.includes(i) && !last.includes(i)));
    pick = pick.concat(fill.slice(0, n - pick.length));
    seen = [];
  }
  store.set(key, JSON.stringify(seen.concat(pick)));
  store.set("last:" + topic.id, JSON.stringify(pick));
  return shuffle(pick);
}

function quizStart(){
  Q = { order: drawQuestions(), i: 0, score: 0, res: [] };
  quizQuestion();
}

function quizQuestion(){
  const u = UI[lang], box = document.getElementById("quiz");
  const item = QUIZ[topic.id][Q.order[Q.i]], t = item[lang], total = QN(topic);
  Q.opts = shuffle(t.o.map((x, k) => ({x, k})));
  box.className = "quiz playing";
  box.innerHTML = `
    <div class="qtop">
      <span>${fmt(u.qOf, {n: Q.i + 1, t: total})}</span>
      <div class="dots">${Array.from({length: total}, (_, k) => `<i class="${k < Q.i ? (Q.res?.[k] ? "ok" : "bad") : k === Q.i ? "now" : ""}"></i>`).join("")}</div>
    </div>
    <h3 class="qq">${esc(t.q)}</h3>
    <div class="opts">${Q.opts.map((o, j) => `<button class="opt" data-j="${j}"><span class="key">${(lang === "en" ? "ABC" : "أبج")[j]}</span><span>${esc(o.x)}</span></button>`).join("")}</div>
    <div class="fb" id="fb"></div>`;
  box.querySelectorAll(".opt").forEach(b => b.onclick = () => quizAnswer(+b.dataset.j));
  box.scrollIntoView({block: "nearest", behavior: reduced() ? "auto" : "smooth"});
}

function quizAnswer(j){
  const u = UI[lang], box = document.getElementById("quiz");
  const item = QUIZ[topic.id][Q.order[Q.i]], right = Q.opts[j].k === item.a;
  Q.res = Q.res || []; Q.res[Q.i] = right;
  if(right) Q.score++;
  box.querySelectorAll(".opt").forEach((b, k) => {
    b.disabled = true;
    if(Q.opts[k].k === item.a){ b.classList.add("right"); b.querySelector(".key").textContent = "✓"; }
    else if(k === j){ b.classList.add("wrong"); b.querySelector(".key").textContent = "✕"; }
  });
  if(navigator.vibrate) navigator.vibrate(right ? 30 : [60, 40, 60]);
  if(right && !reduced()) sparkle(box.querySelectorAll(".opt")[j]);
  const last = Q.i === QN(topic) - 1;
  document.getElementById("fb").innerHTML = `
    <div class="fbin ${right ? "ok" : "bad"}">
      <b>${right ? "✅ " + u.correct : "❌ " + u.wrong}</b>
      <p>${esc(item[lang].e)}</p>
    </div>
    <button class="btn" id="qnext">${last ? u.seeResult : u.nextQ}</button>`;
  document.getElementById("qnext").onclick = () => { if(last) quizResult(); else { Q.i++; quizQuestion(); } };
  document.getElementById("qnext").focus({preventScroll: true});
}

function quizResult(){
  const u = UI[lang], box = document.getElementById("quiz"), total = QN(topic), sc = Q.score, perfect = sc === total;
  if(sc > bestScore(topic)) store.set("best:" + topic.id, String(sc));
  updateMeter();
  const R = 52, C = 2 * Math.PI * R;
  box.className = "quiz result" + (perfect ? " won" : "");
  box.innerHTML = `
    ${perfect
      ? `<div class="trophy emoji">🏆</div>`
      : `<svg class="ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="${R}" class="bg"/><circle cx="60" cy="60" r="${R}" class="fg" style="stroke-dasharray:${C};stroke-dashoffset:${C}" id="ringFg"/><text x="60" y="68" text-anchor="middle">${sc}/${total}</text></svg>`}
    <h3>${perfect ? fmt(u.perfect, {title: topic[lang].title}) : u.almost}</h3>
    <p class="sc">${u.yourScore}: <b>${sc}/${total}</b></p>
    <button class="btn" id="qretry">🔁 ${u.retry}</button>`;
  document.getElementById("qretry").onclick = quizStart;
  box.scrollIntoView({block: "center", behavior: reduced() ? "auto" : "smooth"});
  if(!perfect) requestAnimationFrame(() => setTimeout(() => { const f = document.getElementById("ringFg"); if(f) f.style.strokeDashoffset = C * (1 - sc/total); }, 60));
  /* the score counts up */
  const txt = box.querySelector(".ring text");
  if(txt && MOTION){ let n = 0; txt.textContent = `0/${total}`; const step = () => { if(n < sc){ n++; txt.textContent = `${n}/${total}`; setTimeout(step, 1000 / Math.max(sc, 1)); } }; setTimeout(step, 120); }
  if(perfect){
    if(navigator.vibrate) navigator.vibrate([50, 40, 50, 40, 120]);
    if(!reduced()) confetti(200);
  }
}

/* Small burst of stars on a right answer */
function sparkle(el){
  const r = el.getBoundingClientRect();
  for(let i = 0; i < 10; i++){
    const s = document.createElement("i");
    s.className = "spark"; s.textContent = ["✦","★","✚"][i % 3];
    const a = Math.random() * Math.PI * 2, d = 40 + Math.random()*50;
    s.style.left = (r.left + r.width/2) + "px"; s.style.top = (r.top + r.height/2) + "px";
    s.style.setProperty("--x", Math.cos(a)*d + "px"); s.style.setProperty("--y", Math.sin(a)*d + "px");
    document.body.appendChild(s); setTimeout(() => s.remove(), 700);
  }
}

/* Confetti for a perfect score */
function confetti(n){
  const cv = document.createElement("canvas"); cv.className = "confetti";
  document.body.appendChild(cv);
  const ctx = cv.getContext("2d"), W = cv.width = innerWidth, H = cv.height = innerHeight;
  const colors = ["#D7FF3C", "#05CEB3", "#FF9A4D", "#EAF2FF", "#1A7FE8", "#FF4D57"];
  const ps = Array.from({length: n}, () => ({ x: W/2 + (Math.random()-.5)*80, y: H*.45, vx: (Math.random()-.5)*14, vy: -Math.random()*16 - 6,
    w: 6 + Math.random()*6, h: 8 + Math.random()*8, r: Math.random()*6, vr: (Math.random()-.5)*.3, c: colors[Math.floor(Math.random()*colors.length)] }));
  let t = 0;
  (function tick(){
    ctx.clearRect(0, 0, W, H);
    ps.forEach(p => { p.vy += .35; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h); ctx.restore(); });
    if(++t < 180) requestAnimationFrame(tick); else cv.remove();
  })();
}

/* ---------- Shell ---------- */
function render(){
  const u = UI[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = u.dir;
  document.body.className = lang;
  
  document.getElementById("siteName").textContent = u.site;
  document.getElementById("homeLink").href = "./?lang=" + lang;
  document.getElementById("langLbl").textContent = u.lang;
  document.getElementById("app").innerHTML = renderTopic(u);
  updateMeter(); quizIntro(); setupMotion();
}

function setLang(l){
  if(!isLang(l)) l = "ar";
  lang = l;
  store.set("lang", l);
  document.getElementById("picker").hidden = true;
  const url = new URL(location.href); url.searchParams.set("lang", l);
  history.replaceState(null, "", url);
  render();
  scrollTo(0, 0);
}

function showPicker(){
  const t = topic || {ar:{title:UI.ar.heroTitle}, en:{title:UI.en.heroTitle}, ur:{title:UI.ur.heroTitle}};
  document.getElementById("pAr").textContent = t.ar.title;
  document.getElementById("pEn").textContent = t.en.title;
  document.getElementById("pUr").textContent = t.ur.title;
  document.getElementById("picker").hidden = false;
}

document.querySelectorAll("#picker [data-lang]").forEach(b => b.onclick = () => setLang(b.dataset.lang));
document.getElementById("langBtn").onclick = showPicker;

/* ---------- Motion: reveal sections on scroll, gentle hero parallax ---------- */
let revealObs = null;
function setupMotion(){
  if(!MOTION) return;
  if(revealObs) revealObs.disconnect();
  revealObs = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); revealObs.unobserve(e.target); } });
  }, {threshold: .15, rootMargin: "0px 0px -6% 0px"}) : null;
  document.querySelectorAll(".frame, .quiz, .stop, .refs, .creator").forEach(el => {
    el.classList.add("rv");
    if(revealObs) revealObs.observe(el); else el.classList.add("in");
  });
}
if(MOTION){
  let ticking = false;
  addEventListener("scroll", () => {
    if(ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const img = document.querySelector(".hero .mimg");
      if(img && scrollY < innerHeight * 1.2) img.style.setProperty("--py", (scrollY * .28).toFixed(1));
      ticking = false;
    });
  }, {passive: true});
}

/* Start: a QR scan opens with no ?lang=, so the visitor always picks a language first.
   After that, ?lang= in the URL keeps the choice on reload and in-page links. */
const start = params.get("lang");
if(isLang(start)) setLang(start); else { lang = "ar"; render(); showPicker(); }

