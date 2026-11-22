/* محاكاة اختبار لجنة التأهيل — منطق الصفحة. كل النصوص المُدخلة من المستخدم تُهرَّب. */
(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const N_THEORY = 30, N_PERMITS = 5, MINUTES = 45, PASS = 90;

const U = {
  ar: {
    dir: "rtl", other: "English", brand: "محاكاة اختبار لجنة التأهيل الدائمة",
    kicker: "تصاريح العمل · المصدر والمستلم", title: "اختبار التأهيل لوثائق السلامة",
    lead: "محاكاة لاختبار اللجنة: جزء نظري، واختيار التصاريح، وجزء عملي لكتابة تصريح العمل وترتيب البرنامج التشغيلي. في النهاية تحصل على درجتك ومراجعة كاملة لأخطائك مع رقم البند من المصدر.",
    note: "تنبيه: اختبار اللجنة الفعلي يُقدَّم باللغتين العربية والإنجليزية فقط.",
    name: "اسم المتقدم (اختياري)", namePh: "يظهر على ورقة النتيجة فقط، ولا يُحفظ ولا يُرسل",
    role: "الفئة المتقدَّم لها", roles: { iss: "مصدر (Issuer) — جهد متوسط", issl: "مصدر (Issuer) — جهد منخفض", rec: "مستلم (Receiver)" },
    rules: ["30 سؤالًا نظريًا تُختار عشوائيًا من بنك الأسئلة", "5 حالات لاختيار التصريح المناسب (قد تكون الإجابة أكثر من تصريح)", "جزء عملي: تعبئة تصريح عمل حسب حالة، وترتيب خطوات البرنامج التشغيلي", "المدة 45 دقيقة، ودرجة النجاح 90% (اشتراط لجنة التأهيل · الإجراء 6.2.3)"],
    start: "ابدأ الاختبار", secs: ["النظري", "التصاريح", "العملي"],
    q: "سؤال", of: "من", prev: "السابق", next: "التالي", flag: "مراجعة لاحقًا", flagged: "مُعلَّم للمراجعة",
    toPermits: "انتقل لاختيار التصاريح", toPractical: "انتقل للجزء العملي", finish: "تسليم الاختبار",
    pTitle: "اختر وثيقة / وثائق السلامة المطلوبة لكل عمل", pHint: "اختر كل ما ينطبق",
    caseN: "الحالة", formTitle: "تعبئة تصريح العمل", brief: "بيانات الحالة", one: "اختر واحدًا", many: "اختر كل ما ينطبق",
    spTitle: "ترتيب البرنامج التشغيلي (جهد منخفض)", spIso: "خطوات العزل", spRet: "خطوات إعادة الخدمة",
    spHint: "اضغط الخطوات بالترتيب الصحيح. اضغط خطوة مرقّمة لإلغاء ما بعدها.", reset: "إعادة",
    confirm: "هل تريد تسليم الاختبار؟ لن تتمكن من تعديل إجاباتك بعد التسليم.", unans: "سؤالًا بلا إجابة", yes: "تسليم", no: "رجوع",
    timeUp: "انتهى الوقت وتم تسليم الاختبار تلقائيًا.",
    result: "ورقة النتيجة", pass: "ناجح", fail: "لم يجتز", passNote: "درجة النجاح 90%",
    theory: "النظري", permits: "اختيار التصاريح", practical: "العملي", total: "المجموع", time: "الزمن المستغرق",
    review: "مراجعة الإجابات", onlyWrong: "الأخطاء فقط", all: "الكل", your: "إجابتك", correct: "الصحيح", none: "بلا إجابة", ref: "المرجع",
    again: "اختبار جديد", home: "منصة التوعية", print: "طباعة النتيجة",
    disc: "محاكاة تدريبية للتهيئة فقط، ولا تغني عن اختبار اللجنة الرسمي. الإجابات مُتحقق منها من إجراء وثائق سلامة التوزيع DHSEM 01-002 وكتب قواعد السلامة والنماذج الرسمية.",
    lock: { red: "قفل أحمر", yellow: "قفل أصفر", blue: "قفل أزرق" }, stepWord: "خطوة", sheet: "ورقة الإجابة"
  },
  en: {
    dir: "ltr", other: "العربية", brand: "Permanent Authorization Committee — Mock Exam",
    kicker: "Work permits · Issuer & Receiver", title: "Safety Documents Authorization Exam",
    lead: "A simulation of the committee exam: a theory part, permit selection, and a practical part where you fill a work permit and order a switching program. At the end you get your score and a full review of your mistakes with the source clause.",
    note: "Note: the actual committee exam is offered in Arabic and English only.",
    name: "Candidate name (optional)", namePh: "Shown on the result sheet only — never stored or sent",
    role: "Applying for", roles: { iss: "Issuer — Medium Voltage", issl: "Issuer — Low Voltage", rec: "Receiver" },
    rules: ["30 theory questions drawn at random from the question bank", "5 cases to select the right permit (the answer may be more than one)", "Practical: fill a work permit for a case, and order the switching program steps", "45 minutes; pass mark 90% (committee requirement · procedure 6.2.3)"],
    start: "Start the exam", secs: ["Theory", "Permits", "Practical"],
    q: "Question", of: "of", prev: "Previous", next: "Next", flag: "Review later", flagged: "Flagged",
    toPermits: "Go to permit selection", toPractical: "Go to the practical part", finish: "Submit the exam",
    pTitle: "Select the safety document(s) required for each job", pHint: "Select all that apply",
    caseN: "Case", formTitle: "Fill the work permit", brief: "Case details", one: "Choose one", many: "Select all that apply",
    spTitle: "Order the switching program (low voltage)", spIso: "Isolation steps", spRet: "Return-to-service steps",
    spHint: "Tap the steps in the correct order. Tap a numbered step to undo it and the steps after it.", reset: "Reset",
    confirm: "Submit the exam? You cannot change your answers after submitting.", unans: "unanswered", yes: "Submit", no: "Back",
    timeUp: "Time is up — the exam was submitted automatically.",
    result: "Result sheet", pass: "PASS", fail: "NOT PASSED", passNote: "Pass mark 90%",
    theory: "Theory", permits: "Permit selection", practical: "Practical", total: "Total", time: "Time taken",
    review: "Answer review", onlyWrong: "Mistakes only", all: "All", your: "Your answer", correct: "Correct", none: "No answer", ref: "Reference",
    again: "New exam", home: "Awareness platform", print: "Print result",
    disc: "A training simulation for preparation only; it does not replace the official committee exam. Answers are verified against the Distribution Safety Documents procedure DHSEM 01-002, the safety rules books and the official forms.",
    lock: { red: "Red lock", yellow: "Yellow lock", blue: "Blue lock" }, stepWord: "Step", sheet: "Answer sheet"
  }
};

let L = "ar";
try { const p = new URLSearchParams(location.search).get("lang"); if (p === "en" || p === "ar") L = p; } catch (e) {}
const u = () => U[L];

/* ---------- state ---------- */
let S = null; // exam session
const app = $("#app");

function newSession(name, role) {
  const locks = EXAM_THEORY.filter(q => q.t === "lock");
  const rest = shuffle(EXAM_THEORY.filter(q => q.t !== "lock")).slice(0, N_THEORY - 1);
  const lock = locks[Math.floor(Math.random() * locks.length)];
  const theory = shuffle([...rest, lock]);
  return {
    name, role, theory, tAns: {}, flags: {},
    permits: shuffle(EXAM_PERMITS).slice(0, N_PERMITS), pAns: {},
    scen: role === "iss" ? SCENARIOS.mv : SCENARIOS.lv, fAns: {},
    sp: { iso: { order: shuffle([...SP_STEPS.iso.ar.keys()]), pick: [] }, ret: { order: shuffle([...SP_STEPS.ret.ar.keys()]), pick: [] } },
    sec: 0, qi: 0, t0: Date.now(), end: Date.now() + MINUTES * 60000, done: false
  };
}

/* ---------- common chrome ---------- */
function setLang(l) {
  L = l; document.documentElement.lang = l; document.documentElement.dir = u().dir;
  document.title = (l === "ar" ? "محاكاة اختبار التأهيل | المصدر والمستلم" : "Authorization Exam Simulation | Issuer & Receiver");
  render();
}
function head(showTimer) {
  return `<header class="bar"><div class="bwrap">
    <div class="brand"><span class="seal" aria-hidden="true">PAC</span><span>${esc(u().brand)}</span></div>
    ${showTimer ? `<div class="timer" id="timer" role="timer" aria-live="off">--:--</div>` :
      `<button class="lbtn" id="lbtn" type="button">${esc(u().other)}</button>`}
  </div></header>`;
}
const lockSVG = c => {
  const col = { red: "#D7263D", yellow: "#F2C230", blue: "#1F6FD1" }[c];
  return `<svg class="lockimg" viewBox="0 0 120 150" role="img" aria-label="${esc(u().lock[c])}">
    <path d="M32 66V44a28 28 0 0 1 56 0v22" fill="none" stroke="#B9C1CC" stroke-width="11" stroke-linecap="round"/>
    <path d="M32 66V44a28 28 0 0 1 56 0v22" fill="none" stroke="#E9EDF2" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    <rect x="14" y="62" width="92" height="78" rx="14" fill="${col}"/>
    <rect x="14" y="62" width="92" height="20" rx="10" fill="#fff" opacity=".16"/>
    <circle cx="60" cy="98" r="9" fill="#1B1F27" opacity=".75"/><rect x="56" y="102" width="8" height="18" rx="3" fill="#1B1F27" opacity=".75"/>
  </svg>`;
};

/* ---------- screens ---------- */
function render() {
  if (!S) return renderIntro();
  if (S.done) return renderResult();
  renderExam();
}

function renderIntro() {
  const x = u();
  app.innerHTML = head(false) + `<main class="intro">
    <section class="cover">
      <p class="kick">${esc(x.kicker)}</p>
      <h1>${esc(x.title)}</h1>
      <p class="lead">${esc(x.lead)}</p>
      <p class="note"><span aria-hidden="true">ⓘ</span> ${esc(x.note)}</p>
      <ol class="rules">${x.rules.map(r => `<li>${esc(r)}</li>`).join("")}</ol>
    </section>
    <form class="card cand" id="cand" novalidate>
      <h2>${esc(x.sheet)}</h2>
      <label class="fld"><span>${esc(x.name)}</span><input id="nm" maxlength="60" autocomplete="off" placeholder="${esc(x.namePh)}"></label>
      <fieldset class="fld"><legend>${esc(x.role)}</legend>
        ${Object.entries(x.roles).map(([k, v], i) => `<label class="radio"><input type="radio" name="role" value="${k}" ${i === 0 ? "checked" : ""}><span>${esc(v)}</span></label>`).join("")}
      </fieldset>
      <button class="btn primary big" type="submit">${esc(x.start)}</button>
    </form>
    <p class="disc">${esc(x.disc)}</p>
  </main>`;
  $("#lbtn").onclick = () => setLang(L === "ar" ? "en" : "ar");
  $("#cand").onsubmit = e => {
    e.preventDefault();
    const name = ($("#nm").value || "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, 60);
    const role = (new FormData(e.target).get("role") || "iss");
    S = newSession(name, ["iss", "issl", "rec"].includes(role) ? role : "iss");
    startTimer(); render(); window.scrollTo(0, 0);
  };
}

/* ---------- exam ---------- */
let tick = null;
function startTimer() {
  clearInterval(tick);
  const upd = () => {
    if (!S || S.done) return clearInterval(tick);
    const left = Math.max(0, S.end - Date.now());
    const el = $("#timer");
    if (el) {
      const m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60;
      el.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      el.classList.toggle("low", left < 5 * 60000);
    }
    if (left <= 0) { submit(true); }
  };
  upd(); tick = setInterval(upd, 250);
}

function steps() {
  return `<nav class="steps" aria-label="sections">${u().secs.map((s, i) =>
    `<button type="button" class="st ${S.sec === i ? "on" : ""} ${S.sec > i ? "past" : ""}" data-sec="${i}"><b>${i + 1}</b>${esc(s)}</button>`).join("")}</nav>`;
}

function renderExam() {
  app.innerHTML = head(true) + `<main class="exam">${steps()}<div id="sec"></div></main>`;
  app.querySelectorAll(".st").forEach(b => b.onclick = () => { S.sec = +b.dataset.sec; renderExam(); window.scrollTo(0, 0); });
  if (S.sec === 0) secTheory(); else if (S.sec === 1) secPermits(); else secPractical();
  startTimer();
}

const letters = { ar: ["أ", "ب", "ج", "د", "هـ"], en: ["A", "B", "C", "D", "E"] };
function qOpts(q) { return q.t === "tf" ? TF[L] : q[L].o; }

function secTheory() {
  const x = u(), q = S.theory[S.qi], n = S.theory.length, sel = S.tAns[q.id];
  const opts = qOpts(q);
  $("#sec").innerHTML = `<div class="qwrap">
    <div class="card qcard">
      <div class="qhead"><span class="qn">${esc(x.q)} ${S.qi + 1} <i>${esc(x.of)} ${n}</i></span>
        <button type="button" class="flagb ${S.flags[q.id] ? "on" : ""}" id="flag" aria-pressed="${!!S.flags[q.id]}">⚑ ${esc(S.flags[q.id] ? x.flagged : x.flag)}</button></div>
      <p class="qt">${esc(q[L].q)}</p>
      ${q.t === "lock" ? `<div class="lockbox">${lockSVG(q.color)}</div>` : ""}
      <div class="opts" role="radiogroup">${opts.map((o, i) => `<label class="opt ${sel === i ? "on" : ""}"><input type="radio" name="tq" value="${i}" ${sel === i ? "checked" : ""}><span class="ol">${q.t === "tf" ? (i ? "✕" : "✓") : letters[L][i]}</span><span class="ot">${esc(o)}</span></label>`).join("")}</div>
      <div class="qnav">
        <button type="button" class="btn" id="prev" ${S.qi === 0 ? "disabled" : ""}>${esc(x.prev)}</button>
        ${S.qi < n - 1 ? `<button type="button" class="btn primary" id="next">${esc(x.next)}</button>` : `<button type="button" class="btn primary" id="go">${esc(x.toPermits)}</button>`}
      </div>
    </div>
    <aside class="card pal" aria-label="${esc(x.sheet)}"><h3>${esc(x.sheet)}</h3><div class="grid">${S.theory.map((t, i) =>
      `<button type="button" class="cell ${i === S.qi ? "cur" : ""} ${S.tAns[t.id] !== undefined ? "ans" : ""} ${S.flags[t.id] ? "flg" : ""}" data-i="${i}" aria-label="${esc(x.q)} ${i + 1}">${i + 1}</button>`).join("")}</div></aside>
  </div>`;
  $("#sec").querySelectorAll("input[name=tq]").forEach(r => r.onchange = () => { S.tAns[q.id] = +r.value; secTheory(); });
  $("#flag").onclick = () => { S.flags[q.id] = !S.flags[q.id]; secTheory(); };
  $("#prev").onclick = () => { S.qi--; secTheory(); };
  const nx = $("#next"); if (nx) nx.onclick = () => { S.qi++; secTheory(); };
  const go = $("#go"); if (go) go.onclick = () => { S.sec = 1; renderExam(); window.scrollTo(0, 0); };
  $("#sec").querySelectorAll(".cell").forEach(c => c.onclick = () => { S.qi = +c.dataset.i; secTheory(); });
}

function secPermits() {
  const x = u();
  $("#sec").innerHTML = `<div class="card"><h2 class="sh">${esc(x.pTitle)}</h2><p class="hint">${esc(x.pHint)}</p>
    ${S.permits.map((p, k) => `<div class="pcase"><p class="pq"><b>${esc(x.caseN)} ${k + 1}</b> ${esc(p[L])}</p>
      <div class="chips">${PERMITS.map(pm => `<label class="chip ${(S.pAns[p.id] || []).includes(pm) ? "on" : ""}"><input type="checkbox" data-p="${p.id}" value="${pm}" ${(S.pAns[p.id] || []).includes(pm) ? "checked" : ""}><span dir="ltr">${pm}</span></label>`).join("")}</div></div>`).join("")}
    <div class="qnav end"><button type="button" class="btn primary" id="go">${esc(x.toPractical)}</button></div></div>`;
  $("#sec").querySelectorAll("input[data-p]").forEach(c => c.onchange = () => {
    const id = c.dataset.p, set = new Set(S.pAns[id] || []);
    c.checked ? set.add(c.value) : set.delete(c.value);
    S.pAns[id] = PERMITS.filter(p => set.has(p));
    c.closest(".chip").classList.toggle("on", c.checked);
  });
  $("#go").onclick = () => { S.sec = 2; renderExam(); window.scrollTo(0, 0); };
}

function secPractical() {
  const x = u(), sc = S.scen;
  const fields = sc.fields.map(f => {
    const multi = f.kind === "many", sel = S.fAns[f.k];
    return `<div class="ff"><div class="fl"><span>${esc(f[L].l)}</span><em>${esc(multi ? x.many : x.one)}</em></div>
      <div class="opts compact">${f[L].o.map((o, i) => {
        const on = multi ? (sel || []).includes(i) : sel === i;
        return `<label class="opt ${on ? "on" : ""}"><input type="${multi ? "checkbox" : "radio"}" name="f_${f.k}" data-k="${f.k}" value="${i}" ${on ? "checked" : ""}><span class="ol">${multi ? "☐" : letters[L][i]}</span><span class="ot">${esc(o)}</span></label>`;
      }).join("")}</div></div>`;
  }).join("");
  $("#sec").innerHTML = `<div class="card form">
      <div class="formhead"><h2 class="sh">${esc(x.formTitle)}</h2></div>
      <div class="brief"><b>${esc(x.brief)}</b><p>${esc(sc.brief[L])}</p></div>
      ${fields}
    </div>
    <div class="card"><h2 class="sh">${esc(x.spTitle)}</h2><p class="hint">${esc(x.spHint)}</p>
      ${["iso", "ret"].map(k => spBlock(k)).join("")}
      <div class="qnav end"><button type="button" class="btn primary big" id="fin">${esc(x.finish)}</button></div>
    </div>`;
  $("#sec").querySelectorAll("input[data-k]").forEach(inp => inp.onchange = () => {
    const f = sc.fields.find(z => z.k === inp.dataset.k), v = +inp.value;
    if (f.kind === "many") {
      const set = new Set(S.fAns[f.k] || []); inp.checked ? set.add(v) : set.delete(v);
      S.fAns[f.k] = [...set].sort((a, b) => a - b);
    } else S.fAns[f.k] = v;
    const box = inp.closest(".opts");
    box.querySelectorAll(".opt").forEach(o => o.classList.toggle("on", o.querySelector("input").checked));
  });
  bindSP();
  $("#fin").onclick = askSubmit;
}

function spBlock(k) {
  const x = u(), st = S.sp[k], txt = SP_STEPS[k][L];
  return `<div class="spb" data-sp="${k}"><div class="sphead"><h3>${esc(k === "iso" ? x.spIso : x.spRet)}</h3>
    <button type="button" class="btn sm" data-reset="${k}">${esc(x.reset)}</button></div>
    <ul class="splist">${st.order.map(i => {
      const pos = st.pick.indexOf(i);
      return `<li><button type="button" class="sp ${pos >= 0 ? "on" : ""}" data-k="${k}" data-i="${i}"><span class="spn">${pos >= 0 ? pos + 1 : ""}</span><span>${esc(txt[i])}</span></button></li>`;
    }).join("")}</ul></div>`;
}
function bindSP() {
  $("#sec").querySelectorAll("button.sp").forEach(b => b.onclick = () => {
    const st = S.sp[b.dataset.k], i = +b.dataset.i, pos = st.pick.indexOf(i);
    if (pos >= 0) st.pick = st.pick.slice(0, pos); else st.pick.push(i);
    redrawSP(b.dataset.k);
  });
  $("#sec").querySelectorAll("[data-reset]").forEach(b => b.onclick = () => { S.sp[b.dataset.reset].pick = []; redrawSP(b.dataset.reset); });
}
function redrawSP(k) {
  const box = $(`.spb[data-sp="${k}"]`), y = window.scrollY;
  box.outerHTML = spBlock(k); bindSP(); window.scrollTo(0, y);
}

/* ---------- submit / scoring ---------- */
function unanswered() {
  let n = S.theory.filter(q => S.tAns[q.id] === undefined).length;
  n += S.permits.filter(p => !(S.pAns[p.id] || []).length).length;
  n += S.scen.fields.filter(f => S.fAns[f.k] === undefined || (Array.isArray(S.fAns[f.k]) && !S.fAns[f.k].length)).length;
  return n;
}
function askSubmit() {
  const x = u(), n = unanswered(), d = document.createElement("div");
  d.className = "modal"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true");
  d.innerHTML = `<div class="mbox"><p>${esc(x.confirm)}</p>${n ? `<p class="warn">${n} ${esc(x.unans)}</p>` : ""}
    <div class="qnav"><button type="button" class="btn" id="mno">${esc(x.no)}</button><button type="button" class="btn primary" id="myes">${esc(x.yes)}</button></div></div>`;
  document.body.appendChild(d); $("#myes").focus();
  $("#mno").onclick = () => d.remove();
  $("#myes").onclick = () => { d.remove(); submit(false); };
}
const sameSet = (a, b) => a.length === b.length && [...a].sort().join("|") === [...b].sort().join("|");

function score() {
  const th = S.theory.map(q => ({ q, ok: S.tAns[q.id] === q.a }));
  const pm = S.permits.map(p => ({ p, ok: sameSet(S.pAns[p.id] || [], p.a) }));
  const ff = S.scen.fields.map(f => {
    const v = S.fAns[f.k];
    return { f, ok: f.kind === "many" ? sameSet(v || [], f.a) : v === f.a };
  });
  const spOk = k => S.sp[k].pick.reduce((s, v, i) => s + (v === i ? 1 : 0), 0);
  const spTot = SP_STEPS.iso.ar.length + SP_STEPS.ret.ar.length;
  const thE = th.filter(z => z.ok).length, pmE = pm.filter(z => z.ok).length;
  const prE = ff.filter(z => z.ok).length + spOk("iso") + spOk("ret"), prT = ff.length + spTot;
  const earned = thE + pmE + prE, total = th.length + pm.length + prT;
  return { th, pm, ff, spOk, thE, thT: th.length, pmE, pmT: pm.length, prE, prT, earned, total, pct: Math.round(earned / total * 1000) / 10 };
}
function submit(auto) {
  if (!S || S.done) return;
  S.done = true; S.auto = auto; S.t1 = Math.min(Date.now(), S.end); S.res = score(); clearInterval(tick);
  const m = $(".modal"); if (m) m.remove();
  render(); window.scrollTo(0, 0);
}

/* ---------- result ---------- */
let onlyWrong = true;
function renderResult() {
  const x = u(), r = S.res, pass = r.pct >= PASS;
  const mins = Math.max(0, Math.round((S.t1 - S.t0) / 1000));
  const bar = (lbl, e, t) => `<div class="sb"><div class="sbl"><span>${esc(lbl)}</span><b dir="ltr">${e} / ${t}</b></div><div class="sbt"><i style="width:${t ? (e / t * 100).toFixed(1) : 0}%"></i></div></div>`;
  const ansTxt = (opts, v) => v === undefined || (Array.isArray(v) && !v.length) ? `<i>${esc(x.none)}</i>` : esc(Array.isArray(v) ? v.map(i => opts[i]).join("، ") : opts[v]);
  const item = (ok, q, yours, right, ref, extra = "") => (onlyWrong && ok) ? "" : `<li class="rv ${ok ? "ok" : "bad"}">
      <span class="rk" aria-hidden="true">${ok ? "✓" : "✕"}</span><div><p class="rq">${esc(q)}</p>${extra}
      ${ok ? "" : `<p class="ry"><b>${esc(x.your)}:</b> ${yours}</p>`}<p class="rc"><b>${esc(x.correct)}:</b> ${right}</p>
      <p class="rr"><b>${esc(x.ref)}:</b> <span dir="ltr">${esc(ref)}</span></p></div></li>`;
  const thList = r.th.map(({ q, ok }) => { const o = qOpts(q); return item(ok, q[L].q, ansTxt(o, S.tAns[q.id]), esc(o[q.a]), q.ref, q.t === "lock" ? `<div class="lockbox sm">${lockSVG(q.color)}</div>` : ""); }).join("");
  const pmList = r.pm.map(({ p, ok }) => item(ok, p[L], (S.pAns[p.id] || []).length ? `<span dir="ltr">${esc(S.pAns[p.id].join(" + "))}</span>` : `<i>${esc(x.none)}</i>`, `<span dir="ltr">${esc(p.a.join(" + "))}</span>`, p.ref)).join("");
  const ffList = r.ff.map(({ f, ok }) => item(ok, f[L].l, ansTxt(f[L].o, S.fAns[f.k]), esc(Array.isArray(f.a) ? f.a.map(i => f[L].o[i]).join("، ") : f[L].o[f.a]), f.ref)).join("");
  const spList = ["iso", "ret"].map(k => {
    const ok = r.spOk(k) === SP_STEPS[k].ar.length, t = SP_STEPS[k][L];
    return item(ok, `${k === "iso" ? x.spIso : x.spRet} (${r.spOk(k)}/${t.length})`,
      S.sp[k].pick.length ? `<ol class="mini">${S.sp[k].pick.map(i => `<li>${esc(t[i])}</li>`).join("")}</ol>` : `<i>${esc(x.none)}</i>`,
      `<ol class="mini">${t.map(s => `<li>${esc(s)}</li>`).join("")}</ol>`, "DHSEM 01-002 · Appendix 12/13 (LV Switching Program)");
  }).join("");
  const date = new Date(S.t1).toLocaleString(L === "ar" ? "ar-SA-u-nu-latn" : "en-GB", { dateStyle: "medium", timeStyle: "short" });
  app.innerHTML = head(false) + `<main class="res">
    <section class="card sheet">
      <div class="shead"><div><p class="kick">${esc(x.result)}</p><h1>${esc(x.title)}</h1>
        <p class="meta">${S.name ? `<b>${esc(S.name)}</b> · ` : ""}${esc(x.roles[S.role])} · <span dir="ltr">${esc(date)}</span></p></div>
        <div class="stamp ${pass ? "pass" : "fail"}"><span>${esc(pass ? x.pass : x.fail)}</span></div></div>
      ${S.auto ? `<p class="warn">${esc(x.timeUp)}</p>` : ""}
      <div class="big"><b dir="ltr">${r.pct}%</b><span>${esc(x.passNote)}</span></div>
      ${bar(x.theory, r.thE, r.thT)}${bar(x.permits, r.pmE, r.pmT)}${bar(x.practical, r.prE, r.prT)}
      <p class="meta">${esc(x.total)}: <b dir="ltr">${r.earned} / ${r.total}</b> · ${esc(x.time)}: <b dir="ltr">${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, "0")}</b></p>
      <div class="qnav"><button type="button" class="btn primary" id="again">${esc(x.again)}</button><button type="button" class="btn" id="prt">${esc(x.print)}</button><a class="btn" href="../?lang=${L}">${esc(x.home)}</a></div>
    </section>
    <section class="card"><div class="sphead"><h2 class="sh">${esc(x.review)}</h2>
      <div class="seg"><button type="button" class="${onlyWrong ? "on" : ""}" id="ow">${esc(x.onlyWrong)}</button><button type="button" class="${onlyWrong ? "" : "on"}" id="al">${esc(x.all)}</button></div></div>
      <h3 class="rh">${esc(x.theory)}</h3><ul class="rvl">${thList || "<li class='rv ok'>✓</li>"}</ul>
      <h3 class="rh">${esc(x.permits)}</h3><ul class="rvl">${pmList || "<li class='rv ok'>✓</li>"}</ul>
      <h3 class="rh">${esc(x.practical)}</h3><ul class="rvl">${ffList + spList || "<li class='rv ok'>✓</li>"}</ul>
    </section>
    <p class="disc">${esc(x.disc)}</p></main>`;
  $("#again").onclick = () => { S = null; render(); window.scrollTo(0, 0); };
  $("#prt").onclick = () => window.print();
  $("#ow").onclick = () => { onlyWrong = true; renderResult(); };
  $("#al").onclick = () => { onlyWrong = false; renderResult(); };
}

window.addEventListener("beforeunload", e => { if (S && !S.done) { e.preventDefault(); e.returnValue = ""; } });
setLang(L);
})();
