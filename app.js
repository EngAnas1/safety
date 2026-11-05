"use strict";
/* Motion is on unless the visitor asked their device for reduced motion */
const MOTION = !matchMedia("(prefers-reduced-motion: reduce)").matches;
if(MOTION) document.documentElement.classList.add("motion");
const params = new URLSearchParams(location.search);
/* ?t= picks the section (each section has its own QR code). No ?t= or an unknown one
   (old links such as ?t=ppe) opens the first section, Life Saving Rules. */
const topic = TOPICS.find(t => t.id === params.get("t")) || TOPICS[0];
if(params.has("t") && !TOPICS.some(t => t.id === params.get("t"))){ params.delete("t"); history.replaceState(null, "", location.pathname + (params.toString() ? "?" + params : "")); }
/* Workshops: ?t=ws lists them, ?t=ws&w=<id> opens one */
const workshop = topic.id === "ws" ? (WORKSHOPS.find(w => w.id === params.get("w")) || null) : null;
if(params.has("w") && !workshop){ params.delete("w"); history.replaceState(null, "", location.pathname + (params.toString() ? "?" + params : "")); }
/* The unit whose video and quiz this page shows: a section, or one workshop */
const unit = workshop ? { id: workshop.id, icon: "img/t-ws.webp?v=202611041544", ar: workshop.ar, en: workshop.en, ur: workshop.ur } : topic;
const hasQuiz = !!(QUIZ[unit.id] && QUIZ[unit.id].length);
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
const link = (id, w) => id === TOPICS[0].id ? `./?lang=${lang}` : `?t=${id}${w ? `&w=${encodeURIComponent(w)}` : ""}&lang=${lang}`;
const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k]);
const art = t => t.icon || `img/t-${t.id}.webp?v=202611041544`;
/* Only https links from the content files become clickable sources */
const safeUrl = u => /^https:\/\/[^\s"'<>]+$/.test(u || "") ? u : "#";

/* Quiz progress: best score per topic; a perfect score earns the badge */
const QN = t => Math.min(QUIZ_SIZE, (QUIZ[t.id] || []).length);
/* Stored values are read defensively: anything unexpected falls back to a safe default */
const bestScore = t => { const n = parseInt(store.get("best:" + t.id), 10); return Number.isInteger(n) ? Math.min(Math.max(n, 0), QN(t)) : 0; };
const readIdx = (key, max) => { try{ const a = JSON.parse(store.get(key) || "[]"); return Array.isArray(a) ? a.filter(i => Number.isInteger(i) && i >= 0 && i < max) : []; }catch(e){ return []; } };

function ytId(url){
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}
/* Sections listed here play without the watermark (all other protection stays) */
const NO_WATERMARK = ["lsr"];
function player(src, poster, u){
  src = (src || "").trim(); poster = poster || "";
  if(!src) return `<div class="empty"><span class="emoji">🎬</span><span>${u.noVideo}</span></div>`;
  const y = ytId(src);
  if(y) return `<iframe src="https://www.youtube-nocookie.com/embed/${y}?rel=0&playsinline=1" title="video" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  /* Every video gets the same protection: no download/PiP/cast buttons, no right-click or drag,
     a moving watermark, and fullscreen on the whole player so the watermark stays visible */
  return `<video src="${esc(src)}" ${poster ? `poster="${esc(poster)}"` : ""} controls playsinline preload="metadata"
      controlslist="nodownload nofullscreen noremoteplayback noplaybackrate" disablepictureinpicture disableremoteplayback draggable="false"></video>
    ${NO_WATERMARK.includes(unit.id) ? "" : `<div class="wm" aria-hidden="true"><span>${esc(CONFIG.ownerName[lang])} <bdi dir="ltr">${esc(CONFIG.ownerPhone || "")}</bdi></span></div>`}
    <button class="fsb" type="button" aria-label="fullscreen">⛶</button>`;
}

/* Wire the protection on every player after each render */
function protectVideos(){
  document.querySelectorAll(".player").forEach(pl => {
    ["contextmenu", "dragstart"].forEach(ev => pl.addEventListener(ev, e => e.preventDefault()));
    const fs = pl.querySelector(".fsb"), v = pl.querySelector("video");
    if(!fs || !v) return;
    if(!pl.requestFullscreen && !pl.webkitRequestFullscreen){ fs.hidden = true; return; }
    fs.addEventListener("click", () => {
      const doc = document;
      if(doc.fullscreenElement || doc.webkitFullscreenElement){ (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc); return; }
      (pl.requestFullscreen || pl.webkitRequestFullscreen).call(pl);
    });
    v.addEventListener("dblclick", e => { e.preventDefault(); fs.click(); });
  });
}

/* ---------- Shared pieces ---------- */
const tabsHTML = () => TOPICS.length > 1 ? `<nav class="tabs" style="--n:${TOPICS.length}">${TOPICS.map(t => `<a href="${link(t.id)}" class="${t === topic ? "on" : ""}"><img src="${art(t)}" alt="">${esc(t[lang].title)}</a>`).join("")}</nav>` : "";
const titleWords = t => t.split(" ").map((w, i) => `<span class="w" style="animation-delay:${.15 + i*.12}s">${esc(w)}</span>`).join(" ");
const meterHTML = u => `<div class="meter"><span class="ml">${u.best}</span><div class="bar"><i id="meterBar"></i></div><b id="meterTxt"></b></div>`;
const frameHTML = (src, poster, u) => `<div class="frame" id="watch"><div class="player">${player(src, poster, u)}</div><i class="c c1"></i><i class="c c2"></i><i class="c c3"></i><i class="c c4"></i></div>`;
const creatorHTML = u => `
    <section class="sec">
      <div class="creator">
        <div class="cart"><img src="img/me.webp" alt="${esc(CONFIG.ownerName[lang])}" loading="lazy"></div>
        <div class="txt">
          <small>${u.by}</small>
          <h3 class="display">${esc(CONFIG.ownerName[lang])}</h3>
          <p>${esc(CONFIG.ownerLine?.[lang])}</p>
        </div>
      </div>
    </section>`;
const heroHTML = (u, title, sub, extra) => `
  <section class="hero">
    <div class="in">
      <img class="mimg" src="img/hero-m.webp" alt="${esc(CONFIG.ownerName[lang])}">
      <div class="copy" dir="${u.dir}">
        ${tabsHTML()}
        ${CONFIG.siteTag?.[lang] ? `<span class="tag">${esc(CONFIG.siteTag[lang])}</span>` : ""}
        <h1 class="display">${titleWords(title)}</h1>
        <p>${esc(sub)}</p>
        ${extra || ""}
      </div>
    </div>
  </section>
  <div class="stripe thin"></div>`;

/* Clickable sources: each opens its official page in a new tab */
const sourcesHTML = (list, u) => list && list.length ? `
    <section class="wsources" id="sources">
      <h2>📚 ${u.sources}</h2>
      <p>${u.sourcesSub}</p>
      <ol>${list.map(src => { const t = src[lang]; return `<li><a class="src" href="${esc(safeUrl(src.url))}" target="_blank" rel="noopener noreferrer external">
        <b>${esc(t.n)}</b><small>${esc(t.by)}</small><span>${esc(t.d)}</span><i>${u.openSource} ↗</i></a></li>`; }).join("")}</ol>
    </section>` : "";

/* Written content built from blocks (see sections.js) */
const icHTML = ic => String(ic).startsWith("ic:") ? `<span class="wic"><img src="img/ic/${esc(ic.slice(3))}.webp" alt=""></span>` : `<span class="wic emoji">${esc(ic)}</span>`;
function blocksHTML(blocks, u){
  return (blocks || []).map(b => {
    switch(b.type){
      case "lead": return `<div class="wlead">${b.p.map(p => `<p>${esc(p)}</p>`).join("")}</div>`;
      case "tiles": return `<section class="wsec"><h2>${esc(b.h)}</h2><div class="wtiles ${b.cols || ""}">${b.items.map(([ic, h, d]) => `<div class="wtile">${icHTML(ic)}<b>${esc(h)}</b><small>${esc(d)}</small></div>`).join("")}</div></section>`;
      case "chain": return `<section class="wsec"><h2>${esc(b.h)}</h2><ol class="wchain">${b.items.map(([ic, h, d]) => `<li>${icHTML(ic)}<div><b>${esc(h)}</b><small>${esc(d)}</small></div></li>`).join("")}</ol>${b.end ? `<p class="wend">${esc(b.end)}</p>` : ""}</section>`;
      case "checks": return `<section class="wsec wcheck"><h2>${esc(b.h)}</h2><ul>${b.items.map((x, i) => `<li><span class="wok">${i + 1}</span>${esc(x)}</li>`).join("")}</ul></section>`;
      case "scale": return `<section class="wsec"><h2>${esc(b.h)}</h2><ol class="wscale">${b.items.map(([n, h, d]) => `<li><span class="sn s${n}">${n}</span><b>${esc(h)}</b>${d ? `<small>${esc(d)}</small>` : ""}</li>`).join("")}</ol></section>`;
      case "levels": return `<section class="wsec"><h2>${esc(b.h)}</h2><div class="wlevels">${b.items.map(([k, h, d]) => `<div class="lv ${esc(k)}"><b>${esc(h)}</b><span>${esc(d)}</span></div>`).join("")}</div></section>`;
      case "rules": return `<section class="wsec"><h2>${esc(b.h)}</h2><ol class="wrules">${(topic.rules || []).map((r, i) => `<li><header><span class="rn">${i + 1}</span><span class="emoji">${r.emoji}</span><b>${esc(r[lang].t)}</b></header><ul>${r[lang].items.map(([ok, x]) => `<li class="${ok === true ? "yes" : ok === false ? "no" : "info"}">${esc(x)}</li>`).join("")}</ul></li>`).join("")}</ol></section>`;
      case "figure": return `<section class="wsec">${b.h ? `<h2>${esc(b.h)}</h2>` : ""}<figure class="wfig"><img src="${esc(b.src)}" alt="" loading="lazy"><figcaption>${esc(b.cap)}</figcaption></figure></section>`;
      case "zones": return `<section class="wsec"><h2>${esc(b.h)}</h2><ol class="wzones">${b.items.map(([h, d], i) => `<li><span class="zn">${i + 1}</span><div><b>${esc(h)}</b><small>${esc(d)}</small></div></li>`).join("")}</ol></section>`;
      case "compare": return `<section class="wsec"><h2>${esc(b.h)}</h2><div class="wcompare">${b.items.map(([src, cap, k]) => `<figure class="${k === "ok" ? "ok" : "bad"}"><img src="${esc(src)}" alt="" loading="lazy"><figcaption>${k === "ok" ? "✓" : "✕"} ${esc(cap)}</figcaption></figure>`).join("")}</div></section>`;
      case "close": return `<p class="wclose display">${esc(b.t)}</p>`;
      default: return "";
    }
  }).join("");
}

/* ---------- Workshops ---------- */
function renderWorkshopList(u){
  const c = topic[lang];
  document.title = c.title;
  return heroHTML(u, c.title, c.intro) + `
  <div class="wrap">
    <div class="wgrid">${WORKSHOPS.map(w => { const t = w[lang], n = Math.min(QUIZ_SIZE, (QUIZ[w.id] || []).length), b = bestScore({id: w.id});
      return `<a class="wcard" href="${link("ws", w.id)}">
        <div class="wimg"><img src="${esc(w.poster[lang])}" alt="" loading="lazy"><span class="wplay">▶</span></div>
        <div class="wbody">
          <span class="kick">${u.wsKick}</span>
          <h3>${esc(t.title)}</h3>
          <p>${esc(t.sub)}</p>
          <div class="wmeta"><span>🎬 ${u.wsVideo}</span><span>🎯 ${fmt(u.wsQs, {n: (QUIZ[w.id] || []).length})}</span>${n ? `<span>${u.best}: ${b}/${n}</span>` : ""}</div>
          <span class="btn">${u.wsOpen}</span>
        </div>
      </a>`; }).join("")}
    </div>
    ${sourcesHTML(WORKSHOPS.flatMap(w => w.sources).filter((x, i, a) => a.findIndex(y => y.url === x.url) === i), u)}
    ${creatorHTML(u)}
  </div>`;
}

function renderWorkshop(u){
  const w = workshop, c = w[lang];
  document.title = c.title;
  const card = ([ic, h, d]) => `<div class="wtile"><span class="wic"><img src="img/ic/${esc(ic)}.webp" alt=""></span><b>${esc(h)}</b><small>${esc(d)}</small></div>`;
  return heroHTML(u, c.title, c.sub, `
        <div class="cta">
          <a class="btn" href="#watch">▶ ${u.watch}</a>
          <a class="chip" href="#quiz">🎯 ${u.quizTitle}</a>
        </div>
        ${meterHTML(u)}`) + `
  <div class="wrap">
    <a class="back" href="${link("ws")}">${u.dir === "rtl" ? "→" : "←"} ${u.wsAll}</a>
    <div class="stage">
      <div class="watchcol">
        <p class="wwatch">🎬 ${esc(c.watch)}</p>
        ${frameHTML(w.video[lang], w.poster[lang], u)}
        ${w.videoLang && w.videoLang !== lang ? `<p class="vnote">🔊 ${esc(fmt(u.videoNote, {lang: u.langName[w.videoLang]}))}</p>` : ""}
      </div>
      <section class="quiz" id="quiz" aria-live="polite"></section>
    </div>

    ${c.blocks ? `<article class="wart">${blocksHTML(c.blocks, u)}</article>` : `
    <article class="wart">
      <div class="wlead">${c.lead.map(p => `<p>${esc(p)}</p>`).join("")}</div>

      <section class="wsec">
        <h2>${esc(c.defTitle)}</h2>
        <p class="wdef">${esc(c.def)}</p>
        <div class="wtiles four">${c.types.map(card).join("")}</div>
      </section>

      <section class="wsec">
        <h2>${esc(c.riskTitle)}</h2>
        <div class="wtiles six">${c.risks.map(card).join("")}</div>
      </section>

      <section class="wsec">
        <h2>${esc(c.chainTitle)}</h2>
        <ol class="wchain">${c.chain.map(([ic, h, d], i) => `<li><span class="wic"><img src="img/ic/${esc(ic)}.webp" alt=""></span><div><b>${esc(h)}</b><small>${esc(d)}</small></div></li>`).join("")}</ol>
        <p class="wend">${esc(c.chainEnd)}</p>
      </section>

      <section class="wsec wcheck">
        <h2>${esc(c.checkTitle)}</h2>
        <ul>${c.checks.map(x => `<li><span class="wok"><img src="img/ic/check.webp" alt=""></span>${esc(x)}</li>`).join("")}</ul>
      </section>

      <p class="wclose display">${esc(c.close)}</p>
    </article>`}

    ${sourcesHTML(w.sources, u)}
    ${creatorHTML(u)}
  </div>
  <footer>${esc(CONFIG.siteTag?.[lang] || "")}</footer>`;
}

/* ---------- Topic ---------- */
function renderTopic(u){
  if(topic.id === "ws") return workshop ? renderWorkshop(u) : renderWorkshopList(u);
  const c = topic[lang];
  document.title = c.title;
  const words = c.title.split(" ").map((w, i) => `<span class="w" style="animation-delay:${.15 + i*.12}s">${esc(w)}</span>`).join(" ");
  return `
  <section class="hero">
    <div class="in">
      <img class="mimg" src="img/hero-m.webp" alt="${esc(CONFIG.ownerName[lang])}">
      <div class="copy" dir="${u.dir}">
        ${tabsHTML()}
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
    ${frameHTML(CONFIG.videos[topic.id]?.[lang], CONFIG.posters?.[topic.id]?.[lang], u)}
    ${(() => { const vl = CONFIG.videoLang?.[topic.id]?.[lang]; return vl && vl !== lang ? `<p class="vnote">🔊 ${esc(fmt(u.videoNote, {lang: u.langName[vl]}))}</p>` : ""; })()}
    </div>

    <section class="quiz" id="quiz" aria-live="polite"></section>
    </div>

    <div class="stop"><span class="oct emoji">✋</span><span>${u.stop}</span></div>
    <article class="wart">${blocksHTML(SECTION_TEXT[topic.id]?.[lang], u)}</article>
    ${sourcesHTML(SECTION_SOURCES[topic.id], u)}

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
  const n = bestScore(unit), total = QN(unit), bar = document.getElementById("meterBar");
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
      <img class="qicon" src="${art(unit)}" alt="">
      <div><h2>${u.quizTitle}</h2><p>${fmt(u.quizSub, {title: unit[lang].title})}</p></div>
    </div>
    <button class="btn qgo" id="qstart">🎯 ${u.startQuiz}</button>`;
  document.getElementById("qstart").onclick = quizStart;
}

/* Draw QUIZ_SIZE questions the worker hasn't seen yet; when the bank runs out,
   start a new cycle but never repeat the previous attempt's questions */
function drawQuestions(){
  const bank = QUIZ[unit.id].map((_, i) => i), key = "seen:" + unit.id, n = QN(unit);
  let seen = readIdx(key, bank.length);
  const last = readIdx("last:" + unit.id, bank.length);
  let fresh = shuffle(bank.filter(i => !seen.includes(i)));
  let pick = fresh.slice(0, n);
  if(pick.length < n){
    const fill = shuffle(bank.filter(i => !pick.includes(i) && !last.includes(i)));
    pick = pick.concat(fill.slice(0, n - pick.length));
    seen = [];
  }
  store.set(key, JSON.stringify(seen.concat(pick)));
  store.set("last:" + unit.id, JSON.stringify(pick));
  return shuffle(pick);
}

function quizStart(){
  Q = { order: drawQuestions(), i: 0, score: 0, res: [] };
  quizQuestion();
}

function quizQuestion(){
  const u = UI[lang], box = document.getElementById("quiz");
  const item = QUIZ[unit.id][Q.order[Q.i]], t = item[lang], total = QN(unit);
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
  const item = QUIZ[unit.id][Q.order[Q.i]], right = Q.opts[j].k === item.a;
  Q.res = Q.res || []; Q.res[Q.i] = right;
  if(right) Q.score++;
  box.querySelectorAll(".opt").forEach((b, k) => {
    b.disabled = true;
    if(Q.opts[k].k === item.a){ b.classList.add("right"); b.querySelector(".key").textContent = "✓"; }
    else if(k === j){ b.classList.add("wrong"); b.querySelector(".key").textContent = "✕"; }
  });
  if(navigator.vibrate) navigator.vibrate(right ? 30 : [60, 40, 60]);
  if(right && !reduced()) sparkle(box.querySelectorAll(".opt")[j]);
  const last = Q.i === QN(unit) - 1;
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
  const u = UI[lang], box = document.getElementById("quiz"), total = QN(unit), sc = Q.score, perfect = sc === total;
  if(sc > bestScore(unit)) store.set("best:" + unit.id, String(sc));
  updateMeter();
  const R = 52, C = 2 * Math.PI * R;
  box.className = "quiz result" + (perfect ? " won" : "");
  box.innerHTML = `
    ${perfect
      ? `<div class="trophy emoji">🏆</div>`
      : `<svg class="ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="${R}" class="bg"/><circle cx="60" cy="60" r="${R}" class="fg" style="stroke-dasharray:${C};stroke-dashoffset:${C}" id="ringFg"/><text x="60" y="68" text-anchor="middle">${sc}/${total}</text></svg>`}
    <h3>${perfect ? fmt(u.perfect, {title: unit[lang].title}) : u.almost}</h3>
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
  if(hasQuiz && document.getElementById("quiz")){ updateMeter(); quizIntro(); }
  setupMotion();
  protectVideos();
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
  const t = workshop || topic;
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
  document.querySelectorAll(".frame, .quiz, .stop, .refs, .creator, .wcard, .wsec, .wlead, .wsources, .wclose").forEach(el => {
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

