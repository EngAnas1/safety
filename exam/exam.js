/* محاكاة اختبار لجنة التأهيل — منطق الصفحة.
   الأمان: كل نص يدخله المستخدم يمرّ عبر esc() قبل العرض، ولا يُرسل أي شيء لأي خادم.
   التخزين المحلي: الأسئلة التي ظهرت (لا تتكرر)، ونتائجك السابقة، والاختبار الجاري عند تحديث الصفحة. */
(() => {
"use strict";
/* الحماية من التأطير (Clickjacking): الصفحة لا تعمل داخل إطار موقع آخر */
if (window.top !== window.self) {
  try { window.top.location.replace(window.location.href); } catch (e) { document.documentElement.textContent = ""; }
  return;
}
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const num = (a, b) => a + rnd(b - a + 1);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  sget(k) { try { const v = sessionStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
  sset(k, v) { try { v == null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const N_THEORY = 40, N_PERMITS = 5, MINUTES = 60, PASS = 90;
const SEEN_KEY = "pac_seen_v3", RUN_KEY = "pac_run_v4", HIST_KEY = "pac_hist_v1", LANG_KEY = "pac_lang";
const MOTION = !matchMedia("(prefers-reduced-motion: reduce)").matches;
if (MOTION) document.documentElement.classList.add("motion");

/* ---------- strings ---------- */
const U = {
  ar: {
    dir: "rtl", other: "English", brand: "اختبار التأهيل", brandS: "المصدر والمستلم · وثائق السلامة",
    nav: { home: "الرئيسية", learn: "الدروس", bank: "بنك الأسئلة", sources: "المصادر", exam: "ابدأ الاختبار" },
    navH: ["التعلّم", "الاختبار"],
    homeT: "لوحة التحضير", homeS: "ادرس، ثم اختبر نفسك كأنك أمام اللجنة. كل إجابة مع صفحتها في المصدر.",
    stats: ["سؤالًا في الاختبار", "درجة النجاح", "دقيقة", "سؤالًا موثّقًا في البنك"],
    chartT: "نتائج محاولاتك", chartE: "لا توجد محاولات بعد. نتائجك تظهر هنا بعد أول اختبار.",
    ringT: "تغطية بنك الأسئلة", ringS: "مما ظهر لك", seen: "ظهر لك", left: "متبقٍ", best: "أفضل نتيجة",
    plan: "تقدّمك في البنك", planS: "{a} من {b} سؤالًا",
    learnT: "الدروس", learnS: "المعلومات التي يُسأل عنها في اللجنة، مختصرة، وكل معلومة مع صفحتها في المصدر.", facts: "معلومة",
    lessonBack: "كل الدروس", nextL: "الدرس التالي", startAfter: "جاهز؟ ابدأ الاختبار",
    bankT: "بنك الأسئلة والمصادر", bankS: "كل سؤال مع إجابته الصحيحة والمصدر الذي يثبتها.",
    srcT: "المصادر", srcS: "الوثائق التي بُني عليها كل سؤال. اضغط أي بند لتفتح صفحته الأصلية والجملة مظللة.",
    examT: "ابدأ الاختبار", examS: "اختر الفئة التي تتقدم لها. المدة 60 دقيقة ودرجة النجاح 90% (البند 6.2.3).",
    name: "اسم المتقدم", namePh: "اختياري — يظهر على النتيجة فقط", role: "الفئة المتقدَّم لها",
    roles: { iss: "مصدر — جهد متوسط", issl: "مصدر — جهد منخفض", rec: "مستلم" },
    roleForm: { iss: "MV PTW أو LOA مع التصاريح الثانوية", issl: "LV PTW أو LOA مع التصاريح الثانوية", rec: "LV PTW أو LOA مع التصاريح الثانوية" },
    seOnly: "لموظفي السعودية للطاقة فقط", seWhy: "مصدر الجهد المتوسط لا يُعمَّد إلا لموظف السعودية للطاقة (البندان 5.4 و5.3).",
    parts: [["40 سؤالًا نظريًا", "من بنك فيه {n} سؤالًا موثّقًا، ولا تتكرر عليك حتى تنتهي منها"], ["5 حالات تصاريح", "اختر الوثيقة أو الوثائق المطلوبة لكل عمل"], ["الجزء العملي", "تعبئة التصريح الرسمي بلغتك، وترتيب البرنامج التشغيلي"]],
    fresh: "لم يظهر لك بعد: {n} سؤالًا", reset: "إعادة ضبط الأسئلة",
    start: "ابدأ الاختبار", resume: "لديك اختبار لم يكتمل", resumeBtn: "أكمل الاختبار", discard: "ابدأ من جديد",
    secs: ["النظري", "التصاريح", "العملي"],
    q: "سؤال", of: "من", prev: "السابق", next: "التالي", flag: "مراجعة لاحقًا", flagged: "معلَّم",
    toPermits: "انتقل لاختيار التصاريح", toPractical: "انتقل للجزء العملي", finish: "تسليم الاختبار",
    pTitle: "اختر وثيقة أو وثائق السلامة المطلوبة لكل عمل", pHint: "قد تكون الإجابة أكثر من وثيقة",
    caseN: "حالة", formTitle: "تعبئة تصريح العمل", brief: "بيانات العمل",
    tapHint: "اكتب في النصف العربي من النموذج (يمين). اضغط أي خانة لتكتب فيها. خانات التأشير: ضغطة ✓، ضغطتان N/A، ثلاث للمسح.",
    legend: [["✓", "ينطبق"], ["N/A", "لا ينطبق"], ["", "لا تُترك فارغة"]],
    zoomIn: "تكبير", zoomOut: "تصغير", filled: "خانة معبأة", save: "حفظ", nextField: "الخانة التالية", clear: "مسح", close: "إغلاق", naBtn: "N/A",
    depT: "اختر الجهة المعنية لوضع دائرة عليها", dep: { op: "تشغيل", mt: "صيانة", cn: "إنشاءات" },
    spTitle: "ترتيب البرنامج التشغيلي (جهد منخفض)", spIso: "خطوات العزل", spRet: "خطوات إعادة الخدمة",
    spHint: "اضغط الخطوات بالترتيب الصحيح. الضغط على خطوة مرقّمة يلغيها مع ما بعدها.", resetSp: "إعادة",
    confirm: "تسليم الاختبار؟ لن تتمكن من تعديل إجاباتك بعده.", unans: "سؤالًا أو حالة بلا إجابة", yes: "تسليم", no: "رجوع",
    timeUp: "انتهى الوقت وسُلِّم الاختبار تلقائيًا.",
    result: "نتيجة الاختبار", pass: "ناجح", fail: "لم يجتز", passNote: "درجة النجاح 90%",
    theory: "النظري", permits: "اختيار التصاريح", practical: "العملي", total: "المجموع", time: "الزمن",
    review: "مراجعة الإجابات", onlyWrong: "الأخطاء فقط", all: "الكل", your: "إجابتك", correct: "الصحيح", none: "بلا إجابة",
    open: "افتح الصفحة الأصلية", page: "صفحة", clause: "البند", again: "اختبار جديد", print: "طباعة", home: "الرئيسية",
    disc: "هذا الاختبار للتهيئة فقط، وليس شرطًا أن يكون بنفس طريقة اختبار اللجنة بالضبط. الهدف مساعدتك على فهم المعلومات واستيعابها والاستعداد.",
    by: "إعداد وتصميم", owner: "م. أنس الزهراني", wa: "واتساب", call: "اتصال", waMsg: "السلام عليكم، وصلتك من اختبار التأهيل.",
    pracNote: "بيانات العمل وأرقام التصاريح الظاهرة هنا للتدريب فقط، ولن تكون موجودة لك بهذا الشكل في الاختبار الفعلي.",
    lock: { red: "قفل أحمر", yellow: "قفل أصفر", blue: "قفل أزرق" },
    search: "ابحث في الأسئلة", allDocs: "كل المصادر", more: "عرض المزيد", count: "{n} سؤالًا", cited: "{n} موضعًا مستشهدًا به",
    mainDoc: "الوثيقة الأساسية", secondary: "تصريح ثانوي", org: { sec: "الشركة", con: "مقاول" },
    vClose: "إغلاق", vNote: "الإطار الأحمر يحدد موضع المعلومة في الوثيقة الأصلية.",
    gateK: ["SE", "ISSUER", "RECEIVER"], gateT: ["اختبار التأهيل", "لوثائق السلامة"], gateS: "اختر لغة الاختبار للمتابعة.", gateF: "للتهيئة فقط · لا تُرسل أي بيانات"
  },
  en: {
    dir: "ltr", other: "العربية", brand: "Authorization Exam", brandS: "Issuer & Receiver · Safety documents",
    nav: { home: "Overview", learn: "Lessons", bank: "Question bank", sources: "Sources", exam: "Start the exam" },
    navH: ["Learn", "Exam"],
    homeT: "Preparation dashboard", homeS: "Study, then test yourself as if you were before the committee. Every answer links to its page in the source.",
    stats: ["exam questions", "pass mark", "minutes", "verified questions in the bank"],
    chartT: "Your attempts", chartE: "No attempts yet. Your scores appear here after your first exam.",
    ringT: "Question bank coverage", ringS: "seen so far", seen: "Seen", left: "Left", best: "Best score",
    plan: "Your bank progress", planS: "{a} of {b} questions",
    learnT: "Lessons", learnS: "What the committee asks about, in short. Every fact links to its page in the source.", facts: "facts",
    lessonBack: "All lessons", nextL: "Next lesson", startAfter: "Ready? Start the exam",
    bankT: "Question bank & sources", bankS: "Every question with its correct answer and the source that proves it.",
    srcT: "Sources", srcS: "The documents every question is built on. Tap any item to open its original page with the sentence highlighted.",
    examT: "Start the exam", examS: "Choose the category you're applying for. 60 minutes, pass mark 90% (clause 6.2.3).",
    name: "Candidate name", namePh: "Optional — shown on the result only", role: "Applying for",
    roles: { iss: "Issuer — Medium Voltage", issl: "Issuer — Low Voltage", rec: "Receiver" },
    roleForm: { iss: "MV PTW or LOA, with secondary permits", issl: "LV PTW or LOA, with secondary permits", rec: "LV PTW or LOA, with secondary permits" },
    seOnly: "Saudi Electricity (SE) employees only", seWhy: "An MV Issuer can only be an SE employee (clauses 5.4 and 5.3).",
    parts: [["40 theory questions", "From a bank of {n} verified questions; they don't repeat until you've seen them all"], ["5 permit cases", "Choose the document(s) each job needs"], ["Practical", "Fill in the official permit in your language, and order the switching program"]],
    fresh: "Not seen yet: {n} questions", reset: "Reset question history",
    start: "Start the exam", resume: "You have an unfinished exam", resumeBtn: "Continue", discard: "Start over",
    secs: ["Theory", "Permits", "Practical"],
    q: "Question", of: "of", prev: "Previous", next: "Next", flag: "Review later", flagged: "Flagged",
    toPermits: "Go to permit selection", toPractical: "Go to the practical part", finish: "Submit the exam",
    pTitle: "Select the safety document(s) required for each job", pHint: "The answer may be more than one document",
    caseN: "Case", formTitle: "Fill in the work permit", brief: "Job data",
    tapHint: "Write in the English half of the form (left). Tap any box to write in it. Tick boxes: one tap ✓, two taps N/A, three to clear.",
    legend: [["✓", "applies"], ["N/A", "doesn't apply"], ["", "never leave blank"]],
    zoomIn: "Zoom in", zoomOut: "Zoom out", filled: "boxes filled", save: "Save", nextField: "Next box", clear: "Clear", close: "Close", naBtn: "N/A",
    depT: "Choose the concerned party to circle", dep: { op: "Operation", mt: "Maintenance", cn: "Construction" },
    spTitle: "Order the switching program (low voltage)", spIso: "Isolation steps", spRet: "Return-to-service steps",
    spHint: "Tap the steps in the correct order. Tapping a numbered step undoes it and the steps after it.", resetSp: "Reset",
    confirm: "Submit the exam? You can't change your answers afterwards.", unans: "unanswered questions or cases", yes: "Submit", no: "Back",
    timeUp: "Time is up — the exam was submitted automatically.",
    result: "Exam result", pass: "PASS", fail: "NOT PASSED", passNote: "Pass mark 90%",
    theory: "Theory", permits: "Permit selection", practical: "Practical", total: "Total", time: "Time",
    review: "Answer review", onlyWrong: "Mistakes only", all: "All", your: "Your answer", correct: "Correct", none: "No answer",
    open: "Open the original page", page: "page", clause: "Clause", again: "New exam", print: "Print", home: "Overview",
    disc: "This exam is for preparation only; the committee exam may not follow exactly the same format. It is here to help you understand and absorb the information and get ready.",
    by: "Prepared and designed by", owner: "Eng. Anas Alzahrani", wa: "WhatsApp", call: "Call", waMsg: "Hello, I found you through the authorization preparation exam.",
    pracNote: "The job data and permit numbers shown here are for practice only; you will not get them like this in the real exam.",
    lock: { red: "Red lock", yellow: "Yellow lock", blue: "Blue lock" },
    search: "Search the questions", allDocs: "All sources", more: "Show more", count: "{n} questions", cited: "{n} cited passages",
    mainDoc: "Main document", secondary: "Secondary permit", org: { sec: "SE", con: "Contractor" },
    vClose: "Close", vNote: "The red frame marks where the information sits in the original document.",
    gateK: ["SE", "ISSUER", "RECEIVER"], gateT: ["Authorization Exam", "for Safety Documents"], gateS: "Choose the exam language to continue.", gateF: "For preparation only · no data is sent anywhere"
  }
};
const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k]);
let L = store.sget(LANG_KEY);
const u = () => U[L || "ar"];
const app = $("#app");
let S = null;

/* ---------- sources: page + highlight, and the viewer ---------- */
const DH_INDEX = (() => { const m = {}; for (const q of [...EXAM_THEORY, ...EXAM_PERMITS]) for (const s of q.src) if (s.d === "DH" && !m[s.loc]) m[s.loc] = s; return m; })();
const QID = Object.fromEntries(EXAM_THEORY.map(q => [q.id, q]));
const FG = (p, y0, y1, ar, en) => ({ d: "FG", p, y: [y0, y1], loc: L === "ar" ? `صفحة ${p}` : `Page ${p}`, x: L === "ar" ? ar : en });
const docName = d => (EXAM_DOCS[d] || {})[L] || d;
const locTxt = s => s.d === "DH" && /^\d/.test(s.loc) ? (L === "ar" ? "البند " : "Clause ") + s.loc : s.loc;
let SRC_REG = [], ignoreHash = false;
const regSrc = s => { SRC_REG.push(s); return SRC_REG.length - 1; };
const chip = s => s && s.p ? `<button type="button" class="chip" data-src="${regSrc(s)}">📄 <bdi>${esc(s.d === "FG" ? (L === "ar" ? "دليل التعبئة" : "Filling guide") : s.d === "DH" ? "DHSEM 01-002" : "CSCC04")}</bdi> · <bdi>${esc(s.d === "CS" ? s.loc.split(" · ").slice(0, 2).join(" · ") : locTxt(s))}</bdi> <span class="pg">· ${esc(u().page)} ${s.p}</span></button>` : "";
function srcHTML(list) {
  if (!list || !list.length) return "";
  return `<div class="srcs">${list.map(s => {
    const lang = /[؀-ۿ]/.test(s.x) ? "ar" : "en";
    return `<figure class="src"><figcaption><b>${esc(docName(s.d))}</b><bdi>${esc(locTxt(s))}</bdi>${chip(s)}</figcaption>
      <blockquote lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">${esc(s.x)}</blockquote></figure>`;
  }).join("")}</div>`;
}
function openViewer(s, push = true) {
  if (!s || !s.p) return;
  closeViewer(false);
  const c = SRC_CROP[s.d] || [0, 0, 1, 1], f = y => Math.max(0, Math.min(100, (y - c[1]) / (c[3] - c[1]) * 100));
  const v = document.createElement("div");
  v.className = "viewer"; v.setAttribute("role", "dialog"); v.setAttribute("aria-modal", "true"); v.setAttribute("aria-label", docName(s.d));
  v.innerHTML = `<div class="vhead"><div class="grow"><b>${esc(docName(s.d))}</b><br><small><bdi>${esc(locTxt(s))}</bdi> · ${esc(u().page)} ${s.p} / ${(EXAM_DOCS[s.d] || {}).pages || ""}</small></div>
    <button type="button" class="pill sm" id="vx">${esc(u().vClose)} ✕</button></div>
    <div class="vbody"><p class="vq">${esc(u().vNote)}${s.x ? `<br><bdi>${esc(s.x)}</bdi>` : ""}</p>
    <div class="vpage"><img src="src/${s.d.toLowerCase()}-${s.p}.webp" alt="${esc(docName(s.d))} — ${esc(u().page)} ${s.p}" width="1000" height="1300"><i class="hl" style="top:${f(s.y[0]).toFixed(2)}%;height:${Math.max(1.6, f(s.y[1]) - f(s.y[0])).toFixed(2)}%"></i></div></div>`;
  document.body.appendChild(v); document.body.style.overflow = "hidden";
  const img = $(".vpage img", v), go = () => { const h = $(".hl", v); h && h.scrollIntoView({ block: "center", behavior: MOTION ? "smooth" : "auto" }); };
  img.complete ? go() : img.addEventListener("load", go, { once: true });
  $("#vx").onclick = () => closeViewer(); $("#vx").focus();
  v.addEventListener("keydown", e => { if (e.key === "Escape") closeViewer(); });
  if (push) try { history.pushState({ v: 1 }, "", `#src/${s.d}/${s.p}/${Math.round(s.y[0] * 1e4)}-${Math.round(s.y[1] * 1e4)}`); } catch (e) {}
}
function closeViewer(back = true) {
  const v = $(".viewer"); if (!v) return;
  v.remove(); document.body.style.overflow = "";
  if (back && /^#src\//.test(location.hash)) try { ignoreHash = true; history.back(); } catch (e) {}
}
document.addEventListener("click", e => { const b = e.target.closest("[data-src]"); if (b) { e.preventDefault(); openViewer(SRC_REG[+b.dataset.src]); } });

/* ---------- question selection without repeats ---------- */
const FIXED = /جميع|كلاهما|لا شيء|All of|All answers|Both|None of/;
const keepOrder = q => q.t === "tf" || q.t === "lock" || q.ar.o.some(o => FIXED.test(o));
const qOpts = q => q.t === "tf" ? TF[L] : q[L].o;
function drawFresh(pool, n, key) {
  let seen = store.get(SEEN_KEY, {}); if (!seen || typeof seen !== "object" || Array.isArray(seen)) seen = {};
  const s = new Set(Array.isArray(seen[key]) ? seen[key] : []);
  const fresh = shuffle(pool.filter(q => !s.has(q.id)));
  let out = fresh.slice(0, n);
  if (fresh.length <= n) { out = out.concat(shuffle(pool.filter(q => s.has(q.id))).slice(0, n - out.length)); seen[key] = out.map(q => q.id); }
  else seen[key] = [...s, ...out.map(q => q.id)];
  store.set(SEEN_KEY, seen);
  return out;
}
const seenCount = () => { const st = store.get(SEEN_KEY, {}), s = new Set(Array.isArray(st && st.theory) ? st.theory : []); return EXAM_THEORY.filter(q => s.has(q.id)).length; };

/* ---------- practical case generator (follows the permit filling guide) ---------- */
const NAMES = [["فهد العتيبي", "Fahad Alotaibi"], ["سعد الغامدي", "Saad Alghamdi"], ["ماجد الحربي", "Majed Alharbi"], ["خالد الشهري", "Khalid Alshehri"], ["عبدالله الزهراني", "Abdullah Alzahrani"], ["محمد القحطاني", "Mohammed Alqahtani"], ["ناصر المالكي", "Nasser Almalki"], ["تركي الجهني", "Turki Aljuhani"], ["عمر باوزير", "Omar Bawazir"], ["ياسر السلمي", "Yasser Alsulami"], ["بندر الدوسري", "Bandar Aldosari"], ["حسن العمري", "Hassan Alamri"]];
const CITY = [["الطائف - الحوية", "Taif - Al Hawiyah"], ["جدة - الصفا", "Jeddah - Al Safa"], ["مكة - العزيزية", "Makkah - Al Aziziyah"], ["الرياض - الملز", "Riyadh - Al Malaz"], ["الدمام - الفيصلية", "Dammam - Al Faisaliyah"], ["المدينة - قباء", "Madinah - Quba"]];
const DEPT = { op: ["التشغيل", "Operation"], mt: ["الصيانة", "Maintenance"], cn: ["الإنشاءات", "Construction"] };
const four = () => String(num(1000, 9899));
const sno = () => String(num(10000, 99899));
function genCase(role) {
  const kind = role === "iss" ? pick(["mv", "mv", "loa"]) : pick(["lv", "lv", "loa"]);
  const ppl = shuffle(NAMES);
  const iss = { n: ppl[0], id: String(num(100000, 999899)), org: kind === "mv" || role === "iss" ? "sec" : pick(["sec", "con"]) };
  const rec = { n: ppl[1], id: String(num(100000, 999899)), org: pick(["sec", "con"]) };
  const cw = { n: ppl[2], id: String(num(100000, 999899)) };
  const dk = kind === "loa" ? "cn" : pick(["op", "mt"]);
  const off = { n: ppl[3], dk };
  const ptw = sno(), wo = String(num(260000000, 269999999)), city = pick(CITY);
  const sp = kind === "loa" ? "" : `WE04${num(100000, 999899)}`;
  let job;
  if (kind === "mv") {
    const a = `RMU-${four()}`, b = `RMU-${four()}`, ss = `S/S-${four()}`, nb = `RMU-${four()}`, fd = `F-${num(1, 24)}`;
    job = pick([
      { ar: `استبدال مفتاح الفرع (T-OFF) التالف في ${a} بمحطة التوزيع ${ss}، ويتطلب رافعة لرفع المفتاح.`, en: `Replace the faulty T-OFF switch in ${a} at substation ${ss}; a crane is needed to lift it.`, st: ss, pts: [`L1 · ${a}`, `L1 · ${b}`], codes: [a, b], dis: nb, cme: true, sec: ["LOP"], fd },
      { ar: `إصلاح وصلة كابل جهد متوسط تالفة بين ${a} و ${b}، والوصلة داخل حفرية يلزم فتحها.`, en: `Repair a damaged MV cable joint between ${a} and ${b}; the joint is in an excavation that must be opened.`, st: a, pts: [`L2 · ${a}`, `L1 · ${b}`], codes: [a, b], dis: nb, cme: true, sec: ["EXC"], fd },
      { ar: `استبدال محول التوزيع في المحطة ${ss} المغذاة من مفتاح الفرع في ${a}، ويُرفع المحول بالرافعة.`, en: `Replace the distribution transformer at ${ss}, fed from the T-OFF in ${a}; the transformer is lifted by crane.`, st: ss, pts: [`T-OFF · ${a}`], codes: [a], dis: nb, cme: true, sec: ["LOP"], fd }
    ]);
    job.disTxt = { ar: `الوحدة المجاورة ${job.dis} تبقى في الخدمة ومشحونة.`, en: `The neighbouring unit ${job.dis} stays in service and energized.` };
  } else if (kind === "lv") {
    const mp = `MP-${four()}`, nmp = `MP-${four()}`, ss = `S/S-${four()}`, cb = `LV-CB${num(1, 8)}`, pmt = `PMT-${four()}`, fu = num(1, 6);
    job = pick([
      { ar: `استبدال كابل خدمة أرضي تالف بين الكبينة ${mp} وعداد المشترك، والعمل يتطلب حفرًا. للمشترك مولد احتياطي.`, en: `Replace a damaged underground service cable between pillar ${mp} and the customer's meter; digging is needed. The customer has a backup generator.`, st: mp, pts: [`Fuse ${fu} · ${mp}`, `Meter CB · customer`], codes: [mp, "CB"], dis: nmp, sec: ["EXC"] },
      { ar: `استبدال قاعدة مصهرات تالفة في الكبينة ${mp} المغذاة من القاطع ${cb} في لوحة الجهد المنخفض بالمحطة ${ss}.`, en: `Replace a damaged fuse base in pillar ${mp}, fed from breaker ${cb} in the LV panel of ${ss}.`, st: ss, pts: [`${cb} · ${ss}`], codes: [cb], dis: nmp, sec: [] },
      { ar: `استبدال موصلات خط هوائي جهد منخفض بين عمودين، مغذى من صندوق خدمة المحول ${pmt} (المصهر رقم ${fu})، والعمل من سلة رافعة.`, en: `Replace LV overhead conductors between two poles, fed from transformer ${pmt} service box (fuse ${fu}); work from a bucket truck.`, st: pmt, pts: [`Fuse ${fu} · ${pmt}`], codes: [pmt], dis: `PMT-${four()}`, sec: ["WAH"] },
      { ar: `استبدال كبينة توزيع جهد منخفض ${mp} بأخرى جديدة ورفعها بالرافعة، والكبينة مغذاة من القاطع ${cb} بالمحطة ${ss}.`, en: `Replace LV pillar ${mp} with a new one lifted by crane; it is fed from breaker ${cb} at ${ss}.`, st: ss, pts: [`${cb} · ${ss}`], codes: [cb], dis: nmp, sec: ["LOP"] }
    ]);
    job.cme = false;
    job.disTxt = { ar: `العنصر المجاور ${job.dis} يبقى في الخدمة ومشحونًا.`, en: `The neighbouring item ${job.dis} stays in service and energized.` };
  } else {
    const nb = role === "iss" ? `RMU-${four()}` : `MP-${four()}`, mvl = role === "iss";
    job = pick([
      { ar: `مشروع جديد: حفر وتمديد كابل ${mvl ? "جهد متوسط" : "جهد منخفض"} جديد غير موصول بالشبكة، بمحاذاة كابلات قائمة مشحونة تتبع ${nb}، ورفع بكرات الكابل بالرافعة.`, en: `New project: dig and lay a new ${mvl ? "MV" : "LV"} cable, not connected to the network, alongside existing live cables of ${nb}; cable drums lifted by crane.`, sec: ["EXC", "LOP"] },
      { ar: `مشروع جديد: زرع أعمدة ${mvl ? "جهد متوسط" : "جهد منخفض"} جديدة غير موصولة بالشبكة، بالحفر ورفع الأعمدة بالرافعة، قرب شبكة قائمة مشحونة تتبع ${nb}.`, en: `New project: plant new ${mvl ? "MV" : "LV"} poles, not connected to the network, by digging and lifting the poles with a crane, near a live network of ${nb}.`, sec: ["EXC", "LOP"] },
      { ar: `غسيل العوازل والخطوط الهوائية المشحونة التابعة لـ ${nb} من سلة رافعة، دون أي عزل.`, en: `Washing the insulators and energized overhead lines of ${nb} from a bucket truck, with no isolation.`, sec: ["WAH"] }
    ]);
    Object.assign(job, { st: nb, pts: [], codes: [], dis: nb, cme: false,
      disTxt: { ar: `لا يوجد عزل لأي معدة. المعدة ${nb} تبقى مشحونة.`, en: `No equipment is isolated. ${nb} stays energized.` } });
  }
  const n = job.pts.length;
  const red = Array.from({ length: n }, () => `R-${four()}`), yel = Array.from({ length: n }, () => `Y-${four()}`), blue = `B-${four()}`;
  const secNo = {}; for (const s of job.sec) secNo[s] = sno();
  const exc = { depth: pick([1.0, 1.2, 1.8, 2.0]), water: false, gov: true };
  return { v: 4, kind, forms: [kind, ...job.sec.map(s => s.toLowerCase())], iss, rec, cw, off, ptw, sp, wo, city, job, red, yel, blue, secNo, exc };
}
const pname = p => p.n[L === "ar" ? 0 : 1];
function briefHTML(c) {
  const x = u(), ar = L === "ar", loa = c.kind === "loa";
  const locks = shuffle([...c.red.map(v => [v, "red"]), ...c.yel.map(v => [v, "yellow"]), [c.blue, "blue"]]);
  const row = (k, v) => `<div class="br"><dt>${esc(k)}</dt><dd>${v}</dd></div>`;
  const B = v => `<b class="ltr">${esc(v)}</b>`;
  return `<dl class="brief">
    ${row(ar ? "العمل" : "Job", esc(c.job[L]))}
    ${row(ar ? "الموقع" : "Location", `${esc(c.city[ar ? 0 : 1])} · ${esc(ar ? "دائرة " + DEPT[c.off.dk][0] : DEPT[c.off.dk][1] + " division")} · ${B(c.job.st)}${c.job.fd ? " · " + (ar ? "المغذي " : "feeder ") + B(c.job.fd) : ""} · ${ar ? "أمر العمل" : "work order"} ${B(c.wo)}`)}
    ${loa ? "" : row(ar ? "نقاط العزل في البرنامج" : "Isolation points (program)", c.job.pts.map(B).join(ar ? " و " : " and "))}
    ${row(ar ? "ملاحظة" : "Note", esc(c.job.disTxt[L]))}
    ${loa ? "" : row(ar ? "مفتاح تأريض رئيسي" : "Main earth switch", c.job.cme ? (ar ? "متوفر في المعدة (يوضع بتوجيه مهندس التحكم)" : "Fitted (applied on the control engineer's instruction)") : (ar ? "لا يوجد" : "None"))}
    ${row(ar ? "البرنامج التشغيلي" : "Switching program", loa ? esc(ar ? "لا يوجد برنامج تشغيلي لهذا العمل" : "There is no switching program for this job") : B(c.sp))}
    ${row(ar ? "أرقام التصاريح" : "Permit numbers", esc(ar ? "كل تصريح رقمه هو الرقم المطبوع في زاويته (S.No)." : "Each permit's number is the one printed in its corner (S.No)."))}
    ${c.job.sec.includes("EXC") ? row(ar ? "بيانات الحفر" : "Excavation data", esc(ar ? `العمق ${c.exc.depth} م، لا توجد مياه، الخدمات الأرضية الموجودة: كابلات كهرباء فقط، والحفر في شارع عام وصدر له تصريح حفر حكومي.` : `Depth ${c.exc.depth} m, no water, existing services: electric cables only; the dig is in a public street and a government excavation permit was issued.`)) : ""}
    ${c.job.sec.includes("WAH") ? row(ar ? "بيانات العمل على المرتفعات" : "Work-at-height data", esc(ar ? "العمل من سلة رافعة (Bucket truck) لها شهادة فحص سارية، ولا تُستخدم سقالات." : "Work from a bucket truck with a valid examination certificate; no scaffolding is used.")) : ""}
    ${row(ar ? "المصدر" : "Issuer", `${esc(pname(c.iss))} — ${B(c.iss.id)} (${esc(x.org[c.iss.org])})`)}
    ${row(ar ? "المستلم" : "Receiver", `${esc(pname(c.rec))} — ${B(c.rec.id)} (${esc(x.org[c.rec.org])})`)}
    ${row(ar ? "عامل مشارك" : "Competent worker", `${esc(pname(c.cw))} — ${B(c.cw.id)}`)}
    ${row(ar ? "مسؤول الجهة المعنية" : "Concerned official", `${esc(pname(c.off))} (${esc(DEPT[c.off.dk][ar ? 0 : 1])})`)}
    ${loa ? "" : row(ar ? "أقفال الفريق" : "Team locks", locks.map(([v, col]) => `<span class="lk ${col}" dir="ltr">${esc(v)}</span>`).join(" "))}
    ${row(ar ? "بعد انتهاء العمل" : "After the work", esc(ar ? "اكتمل العمل وسُحب العاملون وأُزيلت الأدوات. أكمل في كل نموذج أجزاء الإغلاق والجاهزية." : "The work is complete, workers withdrawn and tools removed. Complete the closing and readiness parts of every form."))}
  </dl>`;
}

/* ---------- grading ---------- */
const norm = s => String(s || "").toLowerCase().replace(/[ً-ٰٟ]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[\s\-_.،,·:/]+/g, "");
const has = (v, code) => !!norm(code) && norm(v).includes(norm(code));
const nameOk = (v, p) => { const n = norm(v); return p.n.some(full => { const t = full.split(" "); return n.includes(norm(t[0])) && n.includes(norm(t[t.length - 1])); }); };
const isNA = v => /^(na|n\/?a|لايوجد|لاينطبق)$/.test(norm(v)) || /^n\/?a$/i.test(String(v || "").trim());
const blankOrNA = v => !norm(v) || isNA(v);
const setEq = (a, b) => a.length === b.length && a.every(x => b.some(y => norm(y) === norm(x)));
const TRI = /^(put|cf|cm|dc|ck)/;
const tri = (F, k) => F[k] === true ? "y" : F[k] === "na" ? "na" : "";
const SD = loc => DH_INDEX[loc];
const FGS = {
  sp: () => FG(1, 0.16, 0.26, "يتم كتابة البرنامج التشغيلي: يبدأ WE04", "The switching program is written; it starts WE04"),
  ref: () => FG(4, 0.48, 0.74, "الرقم المرجعي (933): يتم كتابة رقم البرنامج التشغيلي يبدأ WE04", "Reference no (933): write the switching program number starting WE04"),
  sno: () => FG(4, 0.17, 0.46, "الرقم الظاهر في زاوية التصريح هو الرقم المعتمد لتصريح العمل", "The number in the permit's corner is the official permit number"),
  loc: () => FG(1, 0.36, 0.6, "الموقع / مثال: الطائف - الحوية، الدائرة، الوحدة إن وجد، المحطة إن وجد، المغذي إن وجد، أمر العمل", "Location e.g. Taif – Al Hawiyah, department, unit, station, feeder if any, work order"),
  desc: () => FG(1, 0.64, 0.82, "يتم وصف العمل، ويتم كتابة نقاط العزل في حال تواجد العزل / مثال 22553 و 22554", "Describe the work, and write the isolation points if any, e.g. 22553 and 22554"),
  tick: () => FG(2, 0.17, 0.43, "يتم وضع علامة ✓ على كل بند مطابق للعمل، وفي حال عدم توفرها يتم وضع N/A، ويجب عدم تركها دون ملاحظة", "Tick ✓ every item that matches the work; if not available write N/A; never leave it without a mark"),
  dep: () => FG(2, 0.5, 0.8, "يتم وضع إشارة للجهة المعنية، ويتم كتابة أسم المسؤول", "Mark (circle) the concerned party and write the official's name"),
  rec: () => FG(3, 0.14, 0.5, "يتم وضع علامة ✓ على كل بند مطابق للعمل، وفي حال عدم توفرها يتم وضع N/A، ويجب عدم تركها دون ملاحظة", "Tick ✓ every matching item; otherwise N/A; never blank"),
  na: () => FG(5, 0.08, 0.48, "في حال عدم وجود نقاط عزل / أقفال / بطاقات توقيف ... إلخ يجب كتابة N/A وعدم تركها دون ملاحظة", "If there are no isolation points / locks / hold tags etc., write N/A and never leave it blank")
};
function gradeForm(c, F) {
  const v = k => F[k] || "", on = k => F[k] === true, ar = L === "ar";
  const mv = c.kind === "mv", loa = c.kind === "loa", lv = c.kind === "lv";
  const items = [], add = (key, ok, ar_, en_, rule, src) => items.push({ key, ok, label: ar ? ar_ : en_, rule, src: src.filter(Boolean) });
  const iso = v("iso1") + " " + v("iso2");
  if (!mv) add("org", on(c.iss.org === "sec" ? "issSEC" : "issCON") && !on(c.iss.org === "sec" ? "issCON" : "issSEC"), "جهة المصدر (شركة / مقاول)", "Issuer party (SE / contractor)", ar ? `المصدر من ${U.ar.org[c.iss.org]}.` : `The Issuer is ${U.en.org[c.iss.org]}.`, [SD("5.4")]);
  if (lv) add("ref", has(v("ref"), c.sp), "الرقم المرجعي (933) = رقم البرنامج التشغيلي", "Reference no (933) = switching program No.", ar ? `يُكتب رقم البرنامج التشغيلي ${c.sp} (يبدأ WE04).` : `Write the switching program number ${c.sp} (starts WE04).`, [FGS.ref(), SD("7.8.8")]);
  else if (mv) add("sp", has(v("sp"), c.sp), "اسم/رقم البرنامج التشغيلي", "Switching program name/No.", ar ? `يُكتب ${c.sp} (يبدأ WE04) في جزء الإصدار قبل العزل.` : `Write ${c.sp} (starts WE04) in the issue part before isolation.`, [FGS.sp(), SD("7.8.8")]);
  else add("sp", isNA(v("sp")), "رقم البرنامج التشغيلي (إن وجد)", "Switching program No. (if any)", ar ? "لا يوجد برنامج تشغيلي لهذا العمل، فيُكتب N/A ولا تُترك فارغة." : "There is no switching program for this job: write N/A, never leave it blank.", [FGS.na()]);
  add("ptw", has(v("ptw"), c.ptw), "رقم التصريح", "Permit No.", ar ? `الرقم المطبوع في زاوية التصريح: ${c.ptw}.` : `The number printed in the permit's corner: ${c.ptw}.`, [FGS.sno()]);
  add("loc", has(v("loc"), c.city[0].split(" ")[0]) || has(v("loc"), c.city[1].split(" ")[0]) ? (has(v("loc"), c.job.st) && has(v("loc"), c.wo)) : false, "الموقع", "Location",
    (ar ? `المدينة - الحي، الدائرة، المحطة/المعدة، المغذي إن وجد، وأمر العمل: ` : `City – district, department, station/equipment, feeder if any, and work order: `) + `${c.city[ar ? 0 : 1]} · ${c.job.st} · ${c.wo}`, [FGS.loc()]);
  add("desc", norm(v("desc")).length >= 6, "وصف العمل", "Description of work", ar ? "يُكتب وصف واضح للعمل." : "A clear description of the work.", [FGS.desc(), SD("8.1.7")]);
  if (loa) add("iso", isNA(v("iso1")) && !has(iso, c.job.dis), "نقاط العزل", "Isolation points", ar ? "لا يوجد عزل، فيُكتب N/A. ولا تُكتب المعدة المشحونة على أنها نقطة عزل." : "No isolation: write N/A. Never list the live equipment as an isolation point.", [FGS.na(), SD("8.3.3.2.2")]);
  else add("iso", c.job.codes.every(k => has(iso, k)) && !has(iso, c.job.dis), "نقاط العزل بوضوح", "Clearly isolated points", (ar ? "النقاط: " : "Points: ") + c.job.pts.join(" + ") + (ar ? ` — دون ${c.job.dis} لأنها ليست نقطة عزل.` : ` — not ${c.job.dis}, which is not an isolation point.`), [FGS.desc(), SD("7.8.10")]);
  /* «تم وضع»: ✓ لما ينطبق و N/A لما لا ينطبق، ولا تُترك فارغة */
  const putKeys = FORM_MAP[c.kind].f.filter(f => /^put/.test(f[0])).map(f => f[0]);
  const want = k => {
    if (loa) return k === "putTape" ? "any" : "na";
    if (k === "putCME") return c.job.cme ? "y" : "na";
    if (k === "putEarth") return "any";       // يوضع الأرضي الإضافي بعد الإصدار (8.2.8.1): ✓ أو N/A مقبول، والفراغ خطأ
    return "y";
  };
  const okTri = (k, w) => { const t = tri(F, k); return w === "any" ? !!t : t === w; };
  add("put", putKeys.every(k => okTri(k, want(k))), "خانات «تم وضع» (✓ أو N/A)", "'Has been put' boxes (✓ or N/A)",
    loa ? (ar ? "لا عزل: N/A على الأقفال وبطاقات التوقيف والأرضي. الشريط التحذيري لتحديد منطقة العمل. لا تُترك خانة فارغة." : "No isolation: N/A on locks, hold tags and earths. The warning tape marks the work area. No box left blank.")
      : ar ? `✓ على الأقفال وبطاقات التوقيف والأشرطة${lv ? " والبطاقات التحذيرية" : ""}${mv ? (c.job.cme ? " والأرضي الرئيسي (يوضع قبل الإصدار)" : "، وN/A على الأرضي الرئيسي") : ""}. لا تُترك أي خانة فارغة.`
      : `✓ on locks, hold tags, tape${lv ? ", warning signs" : ""}${mv ? (c.job.cme ? " and the circuit main earth (applied before issue)" : "; N/A on the main earth") : ""}. No box left blank.`,
    [FGS.tick(), loa ? FGS.na() : SD("8.2.7.3")]);
  const cells = ks => ks.map(k => v(k).trim()).filter(x => x && !isNA(x));
  if (loa) add("sl", isNA(v("slI1")) && isNA(v("slR1")) && !cells(["slI1", "slI2", "slI3", "slR1", "slR2", "slR3"]).length, "أرقام أقفال السلامة", "Safety lock numbers", ar ? "لا عزل ولا أقفال، فيُكتب N/A في الصفين." : "No isolation, no locks: write N/A in both rows.", [FGS.na()]);
  else {
    add("slI", setEq(cells(["slI1", "slI2", "slI3"]), c.red), "أرقام أقفال المصدر", "Issuer lock numbers", (ar ? "الأقفال الحمراء للمصدر: " : "Red locks are the Issuer's: ") + c.red.join(", "), [QID.lockR && QID.lockR.src[0]]);
    add("slR", setEq(cells(["slR1", "slR2", "slR3"]), c.yel), "أرقام أقفال المستلم", "Receiver lock numbers", (ar ? "الأقفال الصفراء للمستلم: " : "Yellow locks are the Receiver's: ") + c.yel.join(", ") + (ar ? ` — والأزرق ${c.blue} للعامل المشارك لا يُكتب هنا.` : ` — blue ${c.blue} belongs to the competent worker.`), [QID.lockR && QID.lockR.src[0]]);
  }
  add("issP", nameOk(v("issName"), c.iss) && has(v("issId"), c.iss.id), "اسم المصدر ورقمه الوظيفي", "Issuer name and ID", `${pname(c.iss)} — ${c.iss.id}`, []);
  const dep = (FORM_MAP[c.kind].dep || {})[L];
  add("off", nameOk(v("off"), c.off) && (!dep || F.offDep === c.off.dk), dep ? "مسؤول الجهة المعنية: الدائرة على الجهة + الاسم" : "مسؤول الجهة المعنية", dep ? "Concerned official: circle the party + name" : "Concerned official",
    `${pname(c.off)} (${DEPT[c.off.dk][ar ? 0 : 1]})`, [FGS.dep()]);
  add("issSig", on("issSig"), "توقيع المصدر", "Issuer signature", ar ? "لا يكتمل الإصدار دون توقيع المصدر." : "Issue is incomplete without the Issuer's signature.", []);
  add("recOrg", on(c.rec.org === "sec" ? "recSEC" : "recCON") && !on(c.rec.org === "sec" ? "recCON" : "recSEC"), "جهة المستلم (شركة / مقاول)", "Receiver party (SE / contractor)", ar ? `المستلم من ${U.ar.org[c.rec.org]}.` : `The Receiver is ${U.en.org[c.rec.org]}.`, [SD("5.5")]);
  const cfw = loa ? "na" : "y";
  add("cf", ["cf1", "cf2", "cf3"].every(k => tri(F, k) === cfw), "تأكيدات المستلم مع المصدر (✓ أو N/A)", "Receiver confirmations (✓ or N/A)", loa ? (ar ? "لا عزل ولا تأريض ولا أقفال: N/A على الثلاث." : "Nothing isolated, earthed or locked: N/A on all three.") : (ar ? "✓ على الثلاث: نقاط العزل، والتأريض، والأقفال والبطاقات." : "✓ on all three: isolation points, earthing, locks and tags."), [FGS.rec(), SD("7.10.8")]);
  add("sec", ["EXC", "WAH", "LOP"].every(p => on("sec" + p) === c.job.sec.includes(p)), "التصاريح الثانوية المرتبطة", "Associated secondary permits", c.job.sec.length ? c.job.sec.join(" + ") : (ar ? "لا يوجد تصريح ثانوي لهذا العمل." : "No secondary permit for this job."), [SD("8.3.5.1")]);
  const cms = FORM_MAP[c.kind].f.filter(f => /^cm/.test(f[0])).map(f => f[0]);
  add("cm", cms.every(k => tri(F, k) === "y"), "التزامات المستلم (✓)", "The Receiver's commitments (✓)", ar ? "✓ على جميع الالتزامات." : "✓ on all of them.", [FGS.rec()]);
  add("recP", nameOk(v("recName"), c.rec) && has(v("recId"), c.rec.id), "اسم المستلم ورقمه الوظيفي", "Receiver name and ID", `${pname(c.rec)} — ${c.rec.id}` + (ar ? ` (وليس العامل المشارك ${pname(c.cw)})` : ` (not the competent worker ${pname(c.cw)})`), [SD("8.1.3")]);
  add("recSig", on("recSig"), "توقيع المستلم", "Receiver signature", ar ? "توقيع المستلم يعني قبوله الكامل لشروط التصريح." : "The Receiver's signature means full acceptance of the permit's conditions.", [QID.x_sign && QID.x_sign.src[0]]);
  add("close", on("closed") && !on("cancel"), "الإغلاق (وليس الإلغاء)", "Closing (not cancelling)", ar ? "العمل اكتمل، فيُعلَّم الإغلاق لا الإلغاء." : "The work is complete, so tick closing — not cancel.", [SD("13.1")]);
  add("dc", ["dc1", "dc2", "dc3"].every(k => tri(F, k) === "y"), "إقرارات المستلم عند الإغلاق (✓)", "Receiver's closing declarations (✓)", ar ? "سحب العاملين، وإزالة الأدوات، وإغلاق التصاريح الثانوية." : "Workers withdrawn, tools removed, secondary permits closed.", [SD("11")]);
  add("clP", nameOk(v("clName"), c.rec) && has(v("clId"), c.rec.id) && on("clSig"), "اسم ورقم وتوقيع المستلم في الإغلاق", "Receiver name, ID and signature at closing", ar ? "يغلق الوثيقة مستلمها نفسه." : "The document is closed by its own Receiver.", [SD("8.1.5.6")]);
  add("fP", nameOk(v("fName"), c.iss) && has(v("fId"), c.iss.id) && on("fSig") && nameOk(v("fOff"), c.off), "جزء المصدر الأخير", "Issuer's final part", ar ? "يتحقق المصدر من الإغلاق ويبلغ مسؤول الجهة المعنية بجاهزية المعدة ويوقّع." : "The Issuer verifies the closing, informs the concerned official the equipment is ready, and signs.", [SD("11.3")]);
  return items;
}
const CK_WANT = {
  lop: c => Array(13).fill(true),
  wah: c => [true, true, true, true, true, true, false, false, false, false, true, true],
  exc: c => { const d = c.exc.depth >= 1.5; return [true, null, d, true, true, true, true, true, c.exc.gov, true, c.exc.water, d, true]; }
};
const SEC_CL = { exc: "8.3.6", lop: "8.3.7", wah: "8.3.5" };
function gradeSec(c, f, F) {
  const v = k => F[k] || "", on = k => F[k] === true, ar = L === "ar", P = f.toUpperCase();
  const items = [], add = (key, ok, ar_, en_, rule, src) => items.push({ key: f + key, ok, label: `${P} · ${ar ? ar_ : en_}`, rule, src: src.filter(Boolean) });
  const cl = SEC_CL[f];
  add("no", has(v("no"), c.secNo[P]), "رقم التصريح الثانوي", "Secondary permit No.", ar ? `الرقم المطبوع في زاويته: ${c.secNo[P]}.` : `The number printed in its corner: ${c.secNo[P]}.`, [FGS.sno()]);
  add("main", has(v("main"), c.ptw), "رقم الوثيقة الأساسية المرتبطة", "Associated main permit No.", ar ? `رقم الوثيقة الأساسية (المطبوع في زاويتها) ${c.ptw}.` : `The main permit No. (printed in its corner) ${c.ptw}.`, [SD(cl + ".1"), FGS.sno()]);
  const tWant = { mv: "tMV", lv: "tLV", loa: "tLOA" }[c.kind];
  add("type", ["tMV", "tLV", "tLOA", "tSFT"].every(k => on(k) === (k === tWant)), "نوع الوثيقة الأساسية", "Type of the main permit", { mv: "MV PTW", lv: "LV PTW", loa: "LOA" }[c.kind], [SD(cl + ".1")]);
  if (f === "exc") add("sv", on("svElec") && !on("svWater") && !on("svComm") && !on("svSew"), "الخدمات الأرضية الموجودة", "Existing services", ar ? "كابلات كهرباء فقط حسب بيانات الحفر." : "Electric cables only, per the excavation data.", []);
  else add("work", norm(v("work")).length >= 6, "العمل المراد تنفيذه", "Work to be done", ar ? "يُكتب العمل." : "Describe the work.", []);
  add("iss", nameOk(v("issName"), c.iss) && has(v("issId"), c.iss.id) && on("issSig"), "المصدر: الاسم والرقم والتوقيع", "Issuer: name, ID and signature", ar ? `يصدر الوثيقة الثانوية مصدر الوثيقة الأساسية: ${pname(c.iss)}.` : `The secondary permit is issued by the main Issuer: ${pname(c.iss)}.`, [SD(cl + ".2") || QID.c40.src[0]]);
  add("recOrg", on(c.rec.org === "sec" ? "recSEC" : "recCON") && !on(c.rec.org === "sec" ? "recCON" : "recSEC") && nameOk(v("recData"), c.rec), "بيانات المستلم وجهته", "Receiver data and party", ar ? `يستلمها مستلم الوثيقة الأساسية: ${pname(c.rec)}.` : `It is received by the main Receiver: ${pname(c.rec)}.`, []);
  const want = CK_WANT[f](c), ok = want.every((w, i) => { const t = tri(F, "ck" + (i + 1)); return w === null ? !!t : t === (w ? "y" : "na"); });
  const lab = FORM_MAP[f].lab, na = want.map((w, i) => w === false ? lab["ck" + (i + 1)][L] : null).filter(Boolean);
  add("ck", ok, "قائمة المتطلبات (✓ أو N/A)", "Requirements checklist (✓ or N/A)",
    (ar ? "✓ على ما ينطبق، وN/A على ما لا ينطبق، ولا تُترك فارغة. " : "✓ what applies, N/A what doesn't, none blank. ") + (na.length ? (ar ? "لا تنطبق هنا (N/A): " : "Not applicable here (N/A): ") + na.join("؛ ") : (ar ? "كلها تنطبق على هذا العمل." : "All apply to this job.")), [FGS.tick()]);
  add("rec", nameOk(v("recName"), c.rec) && has(v("recId"), c.rec.id) && on("recSig"), "التزام المستلم: الاسم والرقم والتوقيع", "Receiver commitment: name, ID, signature", pname(c.rec), []);
  add("rd", nameOk(v("rdName"), c.rec) && has(v("rdId"), c.rec.id) && on("rdSig"), "جاهزية الموقع (المستلم)", "Work-site readiness (Receiver)", ar ? "يقرّ المستلم بإزالة الأدوات وإخلاء الموقع." : "The Receiver confirms tools removed and site cleared.", []);
  add("cl", nameOk(v("clName"), c.iss) && has(v("clId"), c.iss.id) && on("clSig"), "الإغلاق (المصدر)", "Closing (Issuer)", ar ? "يُغلق التصريح الثانوي مصدره." : "The secondary permit is closed by its Issuer.", []);
  return items;
}

/* ---------- session ---------- */
function newSession(name, role) {
  const locks = EXAM_THEORY.filter(q => q.t === "lock"), pool = EXAM_THEORY.filter(q => q.t !== "lock");
  const theory = shuffle([...drawFresh(pool, N_THEORY - 1, "theory"), pick(locks)]);
  const order = {};
  for (const q of theory) order[q.id] = q.t === "tf" ? [0, 1] : keepOrder(q) ? [...q.ar.o.keys()] : shuffle([...q.ar.o.keys()]);
  return {
    v: 4, lang: L, name, role, theory: theory.map(q => q.id), order, tAns: {}, flags: {},
    permits: drawFresh(EXAM_PERMITS, N_PERMITS, "permits").map(p => p.id), pAns: {},
    c: genCase(role), F: {}, tab: 0,
    sp: { iso: { order: shuffle([...SP_STEPS.iso.ar.keys()]), pick: [] }, ret: { order: shuffle([...SP_STEPS.ret.ar.keys()]), pick: [] } },
    sec: 0, qi: 0, t0: Date.now(), end: Date.now() + MINUTES * 60000, done: false
  };
}
const TH = id => EXAM_THEORY.find(q => q.id === id);
const PM = id => EXAM_PERMITS.find(p => p.id === id);
const save = () => store.sset(RUN_KEY, S && !S.done ? S : null);

/* ---------- small UI helpers ---------- */
let revObs = null;
function reveal() {
  if (!MOTION) return;
  if (revObs) revObs.disconnect();
  revObs = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revObs.unobserve(e.target); } }), { threshold: 0, rootMargin: "0px 0px -40px 0px" }) : null;
  $$(".rev").forEach(el => revObs ? revObs.observe(el) : el.classList.add("in"));
}
const lockSVG = (c, sm) => {
  const col = { red: "#D42A2F", yellow: "#F4C430", blue: "#1F6FD1" }[c];
  return `<svg class="lockimg${sm ? " sm" : ""}" viewBox="0 0 120 150" role="img" aria-label="${esc(u().lock[c])}"><path d="M32 66V44a28 28 0 0 1 56 0v22" fill="none" stroke="#AEB6C2" stroke-width="11" stroke-linecap="round"/><rect x="14" y="62" width="92" height="78" rx="14" fill="${col}"/><rect x="14" y="62" width="92" height="18" rx="9" fill="#fff" opacity=".18"/><circle cx="60" cy="98" r="9" fill="#14181F" opacity=".7"/><rect x="56" y="102" width="8" height="18" rx="3" fill="#14181F" opacity=".7"/></svg>`;
};
const realB = q => /^r\d/.test(q.id) ? `<span class="realb">${L === "ar" ? "ورد في اختبار اللجنة" : "Seen in the committee exam"}</span>` : "";
const ring = (pct, big, sub) => {
  const r = 70, C = 2 * Math.PI * r, off = C * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return `<div class="ring"><svg viewBox="0 0 160 160" aria-hidden="true"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8A6E"/><stop offset="1" stop-color="#E0242B"/></linearGradient></defs>
    <circle class="tr" cx="80" cy="80" r="${r}" fill="none" stroke-width="14"/><circle class="fg" cx="80" cy="80" r="${r}" fill="none" stroke-width="14" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(MOTION ? C : off).toFixed(1)}" data-off="${off.toFixed(1)}"/></svg>
    <div class="c"><b>${esc(big)}</b><small>${esc(sub)}</small></div></div>`;
};
const animRings = () => requestAnimationFrame(() => setTimeout(() => $$(".ring .fg").forEach(c => c.style.strokeDashoffset = c.dataset.off), 60));
const hist = () => { const h = store.get(HIST_KEY, []); return Array.isArray(h) ? h.map(z => ({ t: +(z && z.t) || 0, pct: Math.max(0, Math.min(100, +(z && z.pct) || 0)) })).filter(z => z.t > 0).slice(-20) : []; };

/* ---------- routing ---------- */
const VIEWS = ["home", "learn", "bank", "sources", "exam"];
let route = { v: "home", a: "" };
function parseHash() {
  const h = decodeURIComponent(location.hash.slice(1));
  const [v, a] = h.split("/");
  return VIEWS.includes(v) ? { v, a: a || "" } : { v: "home", a: "" };
}
function go(v, a = "") { const h = "#" + v + (a ? "/" + a : ""); if (location.hash !== h) location.hash = h; else render(); }
window.addEventListener("hashchange", () => {
  const h = location.hash;
  if (/^#src\//.test(h)) {
    /* deep link from outside: accept only a known document, an integer page in range, and numeric bounds */
    const [, d, p, yy] = h.slice(1).split("/"), pg = Number(p), [a, b] = String(yy || "").split("-").map(Number);
    const ok = ["DH", "CS", "FG"].includes(d) && Number.isInteger(pg) && pg >= 1 && pg <= EXAM_DOCS[d].pages && [a, b].every(v => Number.isFinite(v) && v >= 0 && v <= 1e4) && a < b;
    if (ok) openViewer({ d, p: pg, y: [a / 1e4, b / 1e4], loc: "", x: "" }, false);
    return;
  }
  if (ignoreHash) { ignoreHash = false; return; }
  const nr = parseHash();
  if ($(".viewer")) { closeViewer(false); if (nr.v === route.v && nr.a === route.a) return; }
  route = nr; render(); scrollTo(0, 0);
});

/* ---------- shell ---------- */
function setLang(l) {
  L = l; store.sset(LANG_KEY, l);
  document.documentElement.lang = l; document.documentElement.dir = U[l].dir;
  document.title = l === "ar" ? "اختبار التأهيل | المصدر والمستلم" : "Authorization Exam | Issuer & Receiver";
}
/* tab-bar icons: outline when idle, filled when active (dark strokes punch details into the filled shape) */
const SVG = d => `<svg class="tic" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const K = "#101115";
const TAB_IC = {
  home: [SVG('<path d="M3.5 10.6 12 3.6l8.5 7V19a1.6 1.6 0 0 1-1.6 1.6h-4.2v-5.8h-5.4v5.8H5.1A1.6 1.6 0 0 1 3.5 19z"/>'),
         SVG('<path fill="currentColor" d="M3.5 10.6 12 3.6l8.5 7V19a1.6 1.6 0 0 1-1.6 1.6h-4.2v-5.8h-5.4v5.8H5.1A1.6 1.6 0 0 1 3.5 19z"/>')],
  learn: [SVG('<path d="M11.2 6.2C9.5 5 7.2 4.6 4 4.6v13.2c3 0 5.3.4 7.2 1.5z"/><path d="M12.8 6.2C14.5 5 16.8 4.6 20 4.6v13.2c-3 0-5.3.4-7.2 1.5z"/>'),
          SVG('<path fill="currentColor" d="M11.2 6.2C9.5 5 7.2 4.6 4 4.6v13.2c3 0 5.3.4 7.2 1.5z"/><path fill="currentColor" d="M12.8 6.2C14.5 5 16.8 4.6 20 4.6v13.2c-3 0-5.3.4-7.2 1.5z"/>')],
  bank: [SVG('<path d="M6.6 3.2h10.8a2.6 2.6 0 0 1 2.6 2.6v7.9a2.6 2.6 0 0 1-2.6 2.6H11l-4.9 4v-4h-.1A2.6 2.6 0 0 1 3.4 13.7V5.8a2.6 2.6 0 0 1 2.6-2.6z"/><path d="M10 7.9a2.1 2.1 0 1 1 3 1.9c-.6.3-1 .8-1 1.4v.3"/><circle cx="12" cy="13.6" r=".4" fill="currentColor"/>'),
         SVG(`<path fill="currentColor" d="M6.6 3.2h10.8a2.6 2.6 0 0 1 2.6 2.6v7.9a2.6 2.6 0 0 1-2.6 2.6H11l-4.9 4v-4h-.1A2.6 2.6 0 0 1 3.4 13.7V5.8a2.6 2.6 0 0 1 2.6-2.6z"/><path stroke="${K}" stroke-width="2" d="M10 7.9a2.1 2.1 0 1 1 3 1.9c-.6.3-1 .8-1 1.4v.3"/><circle cx="12" cy="13.6" r=".9" fill="${K}" stroke="none"/>`)],
  sources: [SVG('<path d="M13.8 3H7.6A2.6 2.6 0 0 0 5 5.6v12.8A2.6 2.6 0 0 0 7.6 21h8.8a2.6 2.6 0 0 0 2.6-2.6V8.2z"/><path d="M13.8 3v5.2H19"/><path d="M8.6 12.6h6.8M8.6 16.2h4.6"/>'),
            SVG(`<path fill="currentColor" d="M13.8 3H7.6A2.6 2.6 0 0 0 5 5.6v12.8A2.6 2.6 0 0 0 7.6 21h8.8a2.6 2.6 0 0 0 2.6-2.6V8.2z"/><path stroke="${K}" stroke-width="1.7" d="M13.8 3.4v4.8H18.6"/><path stroke="${K}" stroke-width="2" d="M8.6 12.6h6.8M8.6 16.2h4.6"/>`)],
  exam: [SVG('<circle cx="12" cy="13.6" r="7.4"/><path d="M9.8 2.6h4.4M12 2.6v3.6M12 13.6v-3.4M18.3 6.9l1.4-1.4"/>'),
         SVG(`<circle cx="12" cy="13.6" r="7.6" fill="currentColor"/><path d="M9.8 2.6h4.4M12 2.6v3.4M18.3 6.9l1.4-1.4"/><path stroke="${K}" stroke-width="2.2" d="M12 13.6v-3.6"/><circle cx="12" cy="13.6" r="1.1" fill="${K}" stroke="none"/>`)]
};
const TAB_NAME = { ar: { home: "الرئيسية", learn: "الدروس", bank: "الأسئلة", sources: "المصادر", exam: "الاختبار" }, en: { home: "Home", learn: "Lessons", bank: "Questions", sources: "Sources", exam: "Exam" } };
const NAVI = { home: "◧", learn: "📘", bank: "☰", sources: "📄", exam: "▶" };
function shell(inner, opts = {}) {
  const x = u(), cur = opts.nav || route.v, seen = seenCount(), tot = EXAM_THEORY.length;
  const nav = k => `<a class="nav ${cur === k ? "on" : ""}" href="#${k}" ${cur === k ? 'aria-current="page"' : ""}><span class="ic" aria-hidden="true">${NAVI[k]}</span>${esc(x.nav[k])}${k === "learn" ? `<span class="bd">${LEARN.length}</span>` : k === "bank" ? `<span class="bd">${tot}</span>` : ""}</a>`;
  const exam = S && !S.done;
  return `<div class="shell"><aside class="side" aria-label="${esc(x.brand)}">
      <div class="brand"><span class="logo" aria-hidden="true">⛑️</span><span>${esc(x.brand)}<small>${esc(x.brandS)}</small></span></div>
      ${exam ? `<div class="navh">${esc(x.navH[1])}</div>${x.secs.map((s, i) => `<button type="button" class="nav ${S.sec === i ? "on" : ""}" data-sec="${i}"><span class="ic">${i + 1}</span>${esc(s)}</button>`).join("")}`
        : `<div class="navh">${esc(x.navH[0])}</div>${["home", "learn", "bank", "sources"].map(nav).join("")}<div class="navh">${esc(x.navH[1])}</div>${nav("exam")}`}
      <div class="sgrow"></div>
      <div class="plan"><b>${esc(x.plan)}</b><small>${esc(fmt(x.planS, { a: seen, b: tot }))}</small><div class="pbar"><i data-w="${(seen / tot * 100).toFixed(1)}"></i></div></div>
      <div class="who"><span class="av" aria-hidden="true">👷</span><span><b>${esc(S && S.name || (L === "ar" ? "متقدم" : "Candidate"))}</b><small>${esc(S ? x.roles[S.role] : x.brandS)}</small></span>${exam ? "" : `<button type="button" class="lsw" id="lsw" lang="${L === "ar" ? "en" : "ar"}">${esc(x.other)}</button>`}</div>
      ${credit(x, "sm")}
    </aside>
    <main class="main" id="main">${inner}</main>
    ${exam ? "" : `<nav class="tabbar" id="tabbar" aria-label="${esc(x.brand)}">${VIEWS.map(k => `<button type="button" class="${cur === k ? "on" : ""}" data-go="${k}" ${cur === k ? 'aria-current="page"' : ""}>${TAB_IC[k][cur === k ? 1 : 0]}<span class="tl">${esc(TAB_NAME[L][k])}</span></button>`).join("")}</nav>`}
  </div>`;
}
function bindShell() {
  const l = $("#lsw"); if (l) l.onclick = () => { setLang(L === "ar" ? "en" : "ar"); SRC_REG = []; render(); };
  $$("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
  $$(".side [data-sec]").forEach(b => b.onclick = () => { S.sec = +b.dataset.sec; save(); render(); scrollTo(0, 0); });
  requestAnimationFrame(() => $$(".pbar i").forEach(i => i.style.width = i.dataset.w + "%"));
  reveal(); animRings();
}
const OWNER_TEL = "966543194250", OWNER_SHOW = "054 319 4250";
const WA_I = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>`;
const TEL_I = `<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>`;
const credit = (x = u(), cls = "") => `<div class="credit ${cls}"><span class="cby">${esc(x.by)}</span><b>${esc(x.owner)}</b>
  <a class="cnum" href="tel:+${OWNER_TEL}" dir="ltr">${OWNER_SHOW}</a>
  <span class="cbtns"><a class="cb wa" href="https://wa.me/${OWNER_TEL}?text=${encodeURIComponent(x.waMsg)}" target="_blank" rel="noopener noreferrer">${WA_I}${esc(x.wa)}</a><a class="cb call" href="tel:+${OWNER_TEL}">${TEL_I}${esc(x.call)}</a></span></div>`;
const foot = () => `<footer class="foot"><p class="disc">${esc(u().disc)}</p>${credit()}</footer>`;
const topbar = (t, s, right = "") => `<header class="top rise"><div><h1>${esc(t)}</h1>${s ? `<p>${esc(s)}</p>` : ""}</div><span class="tsp"></span>${right}</header>`;

/* ---------- screens ---------- */
function render() {
  SRC_REG = [];
  if (!L) return renderGate();
  if (S && S.done) return renderResult();
  if (S) return renderExam();
  ({ home: renderHome, learn: renderLearn, bank: renderBank, sources: renderSources, exam: renderEntry }[route.v] || renderHome)();
}

function renderGate() {
  const A = U.ar, E = U.en;
  document.documentElement.dir = "rtl";
  app.innerHTML = `<section class="gate"><div class="gbox">
    <span class="kick rise">${A.gateK.map(k => `<span>${k}</span>`).join("<i>·</i>")}</span>
    <h1 class="rise" style="--d:1"><span class="t">${esc(A.gateT[0])}</span><span class="t" dir="ltr" lang="en" style="font-size:.62em;color:#C9CDD4">${esc(E.gateT[0])}<span class="caret"></span></span></h1>
    <p class="sub rise" style="--d:2">${esc(A.gateS)} · <span lang="en">${esc(E.gateS)}</span></p>
    <div class="langs rise" style="--d:3"><button type="button" class="lang" data-l="ar" lang="ar"><b>العربية</b><small>ابدأ باللغة العربية</small></button><button type="button" class="lang" data-l="en" lang="en"><b>English</b><small>Continue in English</small></button></div>
    <div class="four rise" style="--d:4" role="note">${LEARN_4.map(([c, d, t]) => `<p lang="${c}" dir="${d}"><b>${c}</b><span>${esc(t)}</span></p>`).join("")}</div>
    <p class="gdisc rise" style="--d:5">${esc(A.disc)}<br><span lang="en" dir="ltr">${esc(E.disc)}</span></p>
    <div class="rise" style="--d:6">${credit(A, "cg")}</div>
    <p class="gfoot rise" style="--d:6">${esc(A.gateF)} · <span lang="en">${esc(E.gateF)}</span></p>
  </div></section>`;
  $$(".lang").forEach(b => b.onclick = () => { setLang(b.dataset.l); route = parseHash(); render(); scrollTo(0, 0); });
}

function renderHome() {
  const x = u(), H = hist(), seen = seenCount(), tot = EXAM_THEORY.length, best = H.length ? Math.max(...H.map(h => h.pct)) : null;
  const bars = H.length ? H.slice(-10) : Array.from({ length: 8 }, () => null);
  const chart = `<div class="chart">${bars.map((h, i) => `<div class="b ${h ? (i === bars.length - 1 ? "last" : "") : "empty"}" style="--i:${i}"><em>${h ? h.pct + "%" : ""}</em><i style="--h:${h ? Math.max(6, h.pct) : 18 + (i * 7) % 40}%"></i><span>${h ? new Date(h.t).getDate() + "/" + (new Date(h.t).getMonth() + 1) : ""}</span></div>`).join("")}</div>`;
  const stat = (n, t, cls, ic, d) => `<div class="card stat rise" style="--d:${d}"><div class="row"><span class="sq ${cls}" aria-hidden="true">${ic}</span>${esc(t)}</div><b class="ltr">${esc(n)}</b></div>`;
  const x2 = LEARN.reduce((a, l) => a + l.facts.length + (l.must || []).length, 0);
  app.innerHTML = shell(topbar(x.homeT, x.homeS, `<a class="pill red" href="#exam">${esc(x.start)} ▶</a>`) + `
    <div class="grid stats">${stat("40", x.stats[0], "r", "✎", 1)}${stat("90%", x.stats[1], "v", "★", 2)}${stat("60", x.stats[2], "a", "⏱", 3)}${stat(String(tot), x.stats[3], "g", "✓", 4)}</div>
    <div class="grid two" style="margin-top:14px">
      <section class="card rev"><h2>${esc(x.chartT)}${best != null ? `<span class="tg">${esc(x.best)} ${best}%</span>` : ""}</h2>${chart}${H.length ? "" : `<p class="hint">${esc(x.chartE)}</p>`}</section>
      <section class="card rev" style="--d:1"><h2>${esc(x.ringT)}</h2><div class="ringwrap">${ring(seen / tot * 100, Math.round(seen / tot * 100) + "%", x.ringS)}</div>
        <div class="mini3"><span><b>${seen}</b>${esc(x.seen)}</span><span><b>${tot - seen}</b>${esc(x.left)}</span><span><b>${H.length}</b>${L === "ar" ? "محاولة" : "attempts"}</span></div></section>
    </div>
    <div class="grid two" style="margin-top:14px">
      <section class="card rev"><h2>📘 ${esc(x.learnT)}<span class="tg">${x2} ${esc(x.facts)}</span></h2><p class="hint">${esc(x.learnS)}</p>
        <div class="grid lgrid" style="margin-top:12px">${LEARN.slice(0, 4).map((l, i) => `<a class="card lcard" href="#learn/${l.id}" style="padding:14px"><span class="n" aria-hidden="true">${l.ic}</span><b>${esc(l[L].t)}</b><span class="ct">${l.facts.length + (l.must || []).length} ${esc(x.facts)}</span></a>`).join("")}</div>
        <p style="margin-top:12px"><a class="pill sm" href="#learn">${esc(x.nav.learn)} ←</a></p></section>
      <section class="card rev" style="--d:1"><h2>⚠️ ${L === "ar" ? "قبل أن تبدأ" : "Before you start"}</h2>
        ${LEARN[0].must.map(m => `<div class="must">${esc(m[L])}<br>${chip(QID[m.q].src[0])}</div>`).join("")}
        <div class="note4">${LEARN_4.map(([c, d, t]) => `<p lang="${c}" dir="${d}"><b>${c}</b><span>${esc(t)}</span></p>`).join("")}</div></section>
    </div>
    ${foot()}`);
  bindShell();
}

function renderLearn() {
  const x = u(), l = LEARN.find(z => z.id === route.a);
  if (!l) {
    app.innerHTML = shell(topbar(x.learnT, x.learnS) + `<div class="grid lgrid">${LEARN.map((z, i) => `<a class="card lcard rev" style="--d:${i % 4}" href="#learn/${z.id}"><span class="n" aria-hidden="true">${z.ic}</span><b>${i + 1}. ${esc(z[L].t)}</b><small>${esc(z[L].d)}</small><span class="ct">${z.facts.length + (z.must || []).length} ${esc(x.facts)}</span></a>`).join("")}</div>${foot()}`);
    return bindShell();
  }
  const i = LEARN.indexOf(l), nx = LEARN[i + 1];
  const srcOf = f => f.q ? ((QID[f.q] || {}).src || [])[0] : f.fg ? FG(f.fg[0], f.fg[1], f.fg[2], f.ar, f.en) : null;
  app.innerHTML = shell(topbar(`${l.ic} ${l[L].t}`, l[L].d, `<a class="pill sm" href="#learn">${esc(x.lessonBack)}</a>`) + `
    <section class="card rev">
      ${(l.must || []).map(m => `<div class="must">${esc(m[L])}<br>${chip(srcOf(m))}</div>`).join("")}
      <ol class="facts">${l.facts.map(f => `<li class="fact"><div><p>${esc(f[L])}</p>${chip(srcOf(f))}</div></li>`).join("")}</ol>
    </section>
    <div class="qnav">${nx ? `<a class="pill" href="#learn/${nx.id}">${esc(x.nextL)}: ${esc(nx[L].t)}</a>` : `<span></span>`}<a class="pill red" href="#exam">${esc(x.startAfter)} ▶</a></div>${foot()}`, { nav: "learn" });
  bindShell();
}

let sq = "", sdoc = "", slimit = 25;
function renderBank() {
  const x = u();
  app.innerHTML = shell(topbar(x.bankT, x.bankS) + `
    <div class="filters"><input class="inp" id="sq" type="search" placeholder="${esc(x.search)}" value="${esc(sq)}" dir="auto">
      <select class="inp" id="sdoc" style="flex:0 1 260px"><option value="">${esc(x.allDocs)}</option>${["DH", "CS"].map(k => `<option value="${k}" ${sdoc === k ? "selected" : ""}>${esc(docName(k))}</option>`).join("")}</select></div>
    <p class="hint" id="scount"></p><ol class="slist" id="slist"></ol>
    <div class="qnav end"><button type="button" class="pill" id="smore">${esc(x.more)}</button></div>${foot()}`);
  bindShell();
  $("#sq").oninput = e => { sq = e.target.value; slimit = 25; fillBank(); };
  $("#sdoc").onchange = e => { sdoc = e.target.value; slimit = 25; fillBank(); };
  $("#smore").onclick = () => { slimit += 25; fillBank(); };
  fillBank();
}
function fillBank() {
  const x = u(), nq = norm(sq);
  const all = [...EXAM_THEORY.map(q => ({ q, k: "t" })), ...EXAM_PERMITS.map(p => ({ q: p, k: "p" }))];
  const list = all.filter(({ q, k }) => {
    if (sdoc && !q.src.some(s => s.d === sdoc)) return false;
    if (!nq) return true;
    const txt = k === "t" ? q.ar.q + q.en.q + (q.ar.o || []).join() + (q.en.o || []).join() : q.ar + q.en + q.a.join();
    return norm(txt).includes(nq) || q.src.some(s => norm(s.x).includes(nq));
  });
  $("#scount").textContent = fmt(x.count, { n: list.length });
  $("#slist").innerHTML = list.slice(0, slimit).map(({ q, k }) => {
    /* every choice is shown; the correct one(s) are marked green with ✓, the others stay visible but faded */
    const mark = ok => `<span class="bk" aria-hidden="true">${ok ? "✓" : ""}</span>`;
    const opts = k === "t"
      ? `<ul class="bopts">${qOpts(q).map((o, i) => { const ok = i === q.a; return `<li class="bopt ${ok ? "ok" : ""}">${mark(ok)}<span class="bl">${q.t === "tf" ? "" : esc(letters[L][i]) + "."}</span><span>${esc(o)}</span>${ok ? `<span class="sr">${esc(x.correct)}</span>` : ""}</li>`; }).join("")}</ul>`
      : `<ul class="bopts bchips" dir="ltr">${PERMITS.map(pm => { const ok = q.a.includes(pm); return `<li class="bopt ${ok ? "ok" : ""}">${mark(ok)}<span>${esc(pm)}</span>${ok ? `<span class="sr">${esc(x.correct)}</span>` : ""}</li>`; }).join("")}</ul>`;
    return `<li class="card sitem"><p class="rq">${esc(k === "t" ? q[L].q : q[L])}</p>${realB(q)}${q.t === "lock" ? `<div class="lockbox">${lockSVG(q.color, 1)}</div>` : ""}
      ${opts}${srcHTML(q.src)}</li>`;
  }).join("");
  $("#smore").hidden = list.length <= slimit;
}

function renderSources() {
  const x = u(), groups = {};
  for (const q of [...EXAM_THEORY, ...EXAM_PERMITS]) for (const s of q.src) {
    const k = s.d + "|" + s.loc + "|" + s.p;
    (groups[s.d] = groups[s.d] || {})[k] = groups[s.d][k] || { s, n: 0 }; groups[s.d][k].n++;
  }
  const fgList = [...new Map(LEARN.flatMap(l => l.facts).filter(f => f.fg).map(f => [f.fg.join(), f])).values()];
  const sortKey = s => s.d === "DH" ? s.loc.split(".").map(n => String(n).padStart(3, "0")).join(".") : String(s.p).padStart(4, "0");
  const block = (d, rows) => `<section class="card rev" style="margin-bottom:14px"><h2>📄 ${esc(docName(d))}<span class="tg">${esc(fmt(x.cited, { n: rows.length }))}</span></h2>
    <div class="dlist">${rows.map(({ s, n }) => `<button type="button" class="drow" data-src="${regSrc(s)}"><b><bdi>${esc(locTxt(s))}</bdi></b><span dir="auto">${esc(s.x.slice(0, 150))}${s.x.length > 150 ? "…" : ""}</span><em>${esc(x.page)} ${s.p}${n > 1 ? ` · ×${n}` : ""}</em></button>`).join("")}</div></section>`;
  app.innerHTML = shell(topbar(x.srcT, x.srcS) +
    ["DH", "CS"].map(d => block(d, Object.values(groups[d] || {}).sort((a, b) => sortKey(a.s) < sortKey(b.s) ? -1 : 1))).join("") +
    block("FG", fgList.map(f => ({ s: FG(f.fg[0], f.fg[1], f.fg[2], f.ar, f.en), n: 1 }))) + foot());
  bindShell();
}

function renderEntry() {
  const x = u(), run = store.sget(RUN_KEY);
  const valid = okRun(run);
  app.innerHTML = shell(topbar(x.examT, x.examS) + `
    <div class="grid two">
      <form class="card rev" id="cand" novalidate>
        ${valid ? `<div class="must" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="grow">${esc(x.resume)}</span><button class="pill red sm" type="button" id="res">${esc(x.resumeBtn)}</button><button class="pill sm" type="button" id="dis">${esc(x.discard)}</button></div>` : ""}
        <label class="fld"><span>${esc(x.name)}</span><input class="inp" id="nm" maxlength="60" autocomplete="off" placeholder="${esc(x.namePh)}"></label>
        <fieldset class="fld" style="border:0"><legend style="font-weight:800;font-size:.86rem;margin-bottom:6px">${esc(x.role)}</legend><div class="roles">
          ${Object.entries(x.roles).map(([k, v], i) => `<label class="role ${k === "iss" ? "se" : ""}"><input type="radio" name="role" value="${k}" ${i === 0 ? "checked" : ""}><span><b>${esc(v)}</b><small>${esc(x.roleForm[k])}</small>${k === "iss" ? `<span class="seb">⚡ ${esc(x.seOnly)}</span><small style="margin-top:4px">${esc(x.seWhy)}</small>${chip(QID.d84 && QID.d84.src[0])}` : ""}</span></label>`).join("")}
        </div></fieldset>
        <button class="pill red" type="submit" style="width:100%;justify-content:center;padding:13px;font-size:1.05rem">${esc(x.start)} ▶</button>
        <div class="row" style="margin-top:10px;justify-content:space-between"><span class="hint">${esc(fmt(x.fresh, { n: EXAM_THEORY.length - seenCount() }))}</span><button type="button" class="pill sm" id="rst">${esc(x.reset)}</button></div>
      </form>
      <section class="card rev" style="--d:1"><h2>${L === "ar" ? "كيف يسير الاختبار" : "How the exam runs"}</h2>
        <ol class="facts">${x.parts.map(([h, p]) => `<li class="fact"><div><p><b>${esc(h)}</b></p><p class="hint">${esc(fmt(p, { n: EXAM_THEORY.length }))}</p></div></li>`).join("")}</ol>
        <div class="note4" style="margin-top:12px">${LEARN_4.map(([c, d, t]) => `<p lang="${c}" dir="${d}"><b>${c}</b><span>${esc(t)}</span></p>`).join("")}</div>
        <div class="must" style="margin-top:12px">${esc(x.pracNote)}</div></section>
    </div>${foot()}`, { nav: "exam" });
  bindShell();
  const markRole = () => $$(".role").forEach(l => l.classList.toggle("on", $("input", l).checked));
  $$(".role input").forEach(i => i.onchange = markRole); markRole();
  $("#rst").onclick = () => { store.set(SEEN_KEY, {}); renderEntry(); };
  if (valid) {
    $("#res").onclick = () => { S = run; if (S.lang && S.lang !== L) setLang(S.lang); startTimer(); render(); scrollTo(0, 0); };
    $("#dis").onclick = () => { store.sset(RUN_KEY, null); renderEntry(); };
  }
  $("#cand").onsubmit = e => {
    e.preventDefault();
    const name = ($("#nm").value || "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 60);
    const role = new FormData(e.target).get("role");
    S = newSession(name, ["iss", "issl", "rec"].includes(role) ? role : "iss");
    save(); startTimer(); render(); scrollTo(0, 0);
  };
}

/* ---------- exam ---------- */
let tick = null;
function startTimer() {
  clearInterval(tick);
  const upd = () => {
    if (!S || S.done) return clearInterval(tick);
    const left = Math.max(0, S.end - Date.now()), el = $("#timer"), f = $("#tfill");
    if (el) { el.textContent = `${String(Math.floor(left / 60000)).padStart(2, "0")}:${String(Math.floor(left / 1000) % 60).padStart(2, "0")}`; el.classList.toggle("low", left < 5 * 60000); }
    if (f) f.style.width = (100 - left / (MINUTES * 600)).toFixed(2) + "%";
    if (left <= 0) submit(true);
  };
  upd(); tick = setInterval(upd, 500);
}
function renderExam() {
  const x = u();
  app.innerHTML = shell(`<header class="top"><div><h1>${esc(x.secs[S.sec])}</h1><p>${esc(x.roles[S.role])}</p></div><span class="tsp"></span><div class="timer" id="timer" role="timer">--:--</div></header>
    <div class="tbar"><i id="tfill"></i></div>
    <nav class="steps">${x.secs.map((s, i) => `<button type="button" class="st ${S.sec === i ? "on" : ""}" data-sec="${i}" ${S.sec === i ? 'aria-current="step"' : ""}><b>${i + 1}</b>${esc(s)}</button>`).join("")}</nav><div id="sec"></div>`);
  bindShell();
  $$(".steps [data-sec]").forEach(b => b.onclick = () => { S.sec = +b.dataset.sec; save(); renderExam(); scrollTo(0, 0); });
  if (S.sec === 0) secTheory(); else if (S.sec === 1) secPermits(); else secPractical();
  startTimer();
}
const letters = { ar: ["أ", "ب", "ج", "د", "هـ"], en: ["A", "B", "C", "D", "E"] };
function secTheory() {
  const x = u(), q = TH(S.theory[S.qi]), n = S.theory.length, sel = S.tAns[q.id], opts = qOpts(q);
  const ord = q.t === "tf" ? [0, 1] : S.order[q.id] || [...opts.keys()];
  $("#sec").innerHTML = `<div class="qwrap">
    <article class="card rise">
      <div class="qhead"><span class="qn">${esc(x.q)} ${S.qi + 1} <i>${esc(x.of)} ${n}</i></span>
        <button type="button" class="flagb ${S.flags[q.id] ? "on" : ""}" id="flag" aria-pressed="${!!S.flags[q.id]}">⚑ ${esc(S.flags[q.id] ? x.flagged : x.flag)}</button></div>
      <p class="qt">${esc(q[L].q)}</p>
      ${q.t === "lock" ? `<div class="lockbox">${lockSVG(q.color)}</div>` : ""}
      <div class="opts" role="radiogroup">${ord.map((oi, i) => `<label class="opt ${sel === oi ? "on" : ""}"><input type="radio" name="tq" value="${oi}" ${sel === oi ? "checked" : ""}><span class="ol">${q.t === "tf" ? (oi ? "✕" : "✓") : letters[L][i]}</span><span>${esc(opts[oi])}</span></label>`).join("")}</div>
      <div class="qnav"><button type="button" class="pill" id="prev" ${S.qi === 0 ? "disabled" : ""}>${esc(x.prev)}</button>
        ${S.qi < n - 1 ? `<button type="button" class="pill red" id="next">${esc(x.next)}</button>` : `<button type="button" class="pill red" id="go">${esc(x.toPermits)}</button>`}</div>
    </article>
    <aside class="card pal"><div class="grid8">${S.theory.map((id, i) => `<button type="button" class="cell ${i === S.qi ? "cur" : ""} ${S.tAns[id] !== undefined ? "ans" : ""} ${S.flags[id] ? "flg" : ""}" data-i="${i}" aria-label="${esc(x.q)} ${i + 1}">${i + 1}</button>`).join("")}</div></aside>
  </div>`;
  $$("input[name=tq]").forEach(r => r.onchange = () => { S.tAns[q.id] = +r.value; save(); secTheory(); });
  $("#flag").onclick = () => { S.flags[q.id] = !S.flags[q.id]; save(); secTheory(); };
  $("#prev").onclick = () => { S.qi--; save(); secTheory(); };
  const nx = $("#next"); if (nx) nx.onclick = () => { S.qi++; save(); secTheory(); };
  const g = $("#go"); if (g) g.onclick = () => { S.sec = 1; save(); renderExam(); scrollTo(0, 0); };
  $$(".cell").forEach(c => c.onclick = () => { S.qi = +c.dataset.i; save(); secTheory(); });
}
function secPermits() {
  const x = u();
  $("#sec").innerHTML = `<div class="card rise"><h2>${esc(x.pTitle)}</h2><p class="hint">${esc(x.pHint)}</p>
    ${S.permits.map((id, k) => { const p = PM(id), a = S.pAns[id] || []; return `<div class="pcase"><p class="pq"><b>${esc(x.caseN)} ${k + 1}</b>${esc(p[L])}</p>
      <div class="chips">${PERMITS.map(pm => `<label class="pchip ${a.includes(pm) ? "on" : ""}"><input type="checkbox" data-p="${id}" value="${pm}" ${a.includes(pm) ? "checked" : ""}>${pm}</label>`).join("")}</div></div>`; }).join("")}
    <div class="qnav end"><button type="button" class="pill red" id="go">${esc(x.toPractical)}</button></div></div>`;
  $$("input[data-p]").forEach(c => c.onchange = () => {
    const id = c.dataset.p, set = new Set(S.pAns[id] || []);
    c.checked ? set.add(c.value) : set.delete(c.value);
    S.pAns[id] = PERMITS.filter(p => set.has(p)); save();
    c.closest(".pchip").classList.toggle("on", c.checked);
  });
  $("#go").onclick = () => { S.sec = 2; save(); renderExam(); scrollTo(0, 0); };
}

/* ---------- the permit forms: Arabic half (right) for Arabic, English half (left) for English ---------- */
const PT_W = 595.32, PT_H = 841.92;
const PAIRS = { issSEC: "issCON", issCON: "issSEC", recSEC: "recCON", recCON: "recSEC", closed: "cancel", cancel: "closed" };
let zoom = (window.innerWidth || 1000) < 700 ? 2 : 1;   // phones open the form at 2x on the half they fill
const curF = () => S.c.forms[S.tab || 0];
const FV = f => (S.F[f] = S.F[f] || {});
const FMAP = f => (L === "ar" && FORM_MAP[f].fa) ? FORM_MAP[f].fa : FORM_MAP[f].f;
const labOf = (f, k) => ((FORM_MAP[f].lab || {})[k] || FORM_LABEL[k] || { ar: k, en: k })[L];
const pct = (a, b) => (a / b * 100).toFixed(3) + "%";
function sigName(f, k) { const main = f === S.c.kind, rec = ["recSig", "rdSig"].includes(k) || (k === "clSig" && main); return pname(rec ? S.c.rec : S.c.iss); }
function fieldHTML(f, [k, t, x, y, w, h]) {
  const F = FV(f), st = `left:${pct(x, PT_W)};top:${pct(y, PT_H)};width:${pct(w, PT_W)};height:${pct(h, PT_H)}`, lab = esc(labOf(f, k));
  if (t === "c") {
    const tr = TRI.test(k), val = F[k];
    const state = val === true ? "on" : val === "na" ? "na" : "";
    /* large tap area: the whole label line next to the box (precomputed per form half) */
    const hr = (FORM_MAP[f][L === "ar" && FORM_MAP[f].fa ? "ha" : "he"] || {})[k];
    const hit = hr ? `<i class="hit" aria-hidden="true" style="left:${((hr[0] - x) / w * 100).toFixed(1)}%;top:${((hr[1] - y) / h * 100).toFixed(1)}%;width:${(hr[2] / w * 100).toFixed(1)}%;height:${(hr[3] / h * 100).toFixed(1)}%"></i>` : "";
    return `<button type="button" class="fx fc ${state}" data-k="${k}" style="${st}" role="checkbox" aria-checked="${val === true ? "true" : val === "na" ? "mixed" : "false"}" aria-label="${lab}${tr ? " (✓ / N/A)" : ""}">${hit}${val === true ? "✓" : val === "na" ? "<b>N/A</b>" : ""}</button>`;
  }
  if (t === "s") return `<button type="button" class="fx fs ${F[k] ? "on" : ""}" data-k="${k}" style="${st}" aria-label="${lab}">${F[k] ? `<span lang="${L}">${esc(sigName(f, k))}</span>` : ""}</button>`;
  const v = F[k] || "";
  return `<button type="button" class="fx ft ${v ? "on" : ""}" data-k="${k}" style="${st}" aria-label="${lab}${v ? ": " + esc(v) : ""}"><span dir="auto">${esc(v)}</span></button>`;
}
function extrasHTML(f) {
  const fm = FORM_MAP[f], out = [];
  const no = f === S.c.kind ? S.c.ptw : S.c.secNo[f.toUpperCase()];
  if (fm.sno && no) { const [x, y, w, h] = fm.sno; out.push(`<span class="sno" style="left:${pct(x - 2, PT_W)};top:${pct(y - 1, PT_H)};width:${pct(w + 6, PT_W)};height:${pct(h + 2, PT_H)}">${esc(no.padStart(8, "0"))}</span>`); }
  const dep = (fm.dep || {})[L];
  if (dep) for (const [k, [x, y, w]] of Object.entries(dep)) out.push(`<button type="button" class="dep ${FV(f).offDep === k ? "on" : ""}" data-dep="${k}" style="left:${pct(x - 3, PT_W)};top:${pct(y - 2.5, PT_H)};width:${pct(w + 6, PT_W)};height:${pct(14, PT_H)}" aria-label="${esc(u().dep[k])}" aria-pressed="${FV(f).offDep === k}"></button>`);
  return out.join("");
}
const cntTxt = f => { const m = FMAP(f); return `${m.filter(x => FV(f)[x[0]]).length} / ${m.length} ${u().filled}`; };
function formPane() {
  const f = curF(), fm = FORM_MAP[f], x = u(), t = S.tab || 0;
  return `<div class="ftabs" role="tablist">${S.c.forms.map((g, i) => `<button type="button" role="tab" class="ftab ${i === t ? "on" : ""}" aria-selected="${i === t}" data-t="${i}"><b dir="ltr">${FORM_MAP[g].name}</b><small>${esc(i ? x.secondary : x.mainDoc)}</small></button>`).join("")}</div>
    <div class="ftools"><p class="hint">${esc(x.tapHint)}</p>
      <div class="zm"><span class="cnt" id="cnt">${cntTxt(f)}</span><button type="button" class="pill sm" id="zo" aria-label="${esc(x.zoomOut)}">−</button><button type="button" class="pill sm" id="zi" aria-label="${esc(x.zoomIn)}">+</button></div></div>
    <div class="legend">${x.legend.map(([a, b]) => `<span>${a ? `<i>${a}</i>` : "⛔"}${esc(b)}</span>`).join("")}</div>
    <div class="pscroll" id="pscroll"><div class="pf ${L === "ar" ? "ar" : ""}" id="pf" data-z="${zoom}" style="width:${zoom * 100}%" dir="ltr">
      <img src="${fm.img}" alt="${fm.name}" width="1240" height="1753" draggable="false">
      ${FMAP(f).map(r => fieldHTML(f, r)).join("")}${extrasHTML(f)}
    </div></div>`;
}
function bindForm() {
  $("#zi").onclick = () => setZoom(Math.min(3, zoom + .5));
  $("#zo").onclick = () => setZoom(Math.max(1, zoom - .5));
  $("#pf").onclick = e => {
    const d = e.target.closest(".dep"); if (d) { const F = FV(curF()); F.offDep = F.offDep === d.dataset.dep ? undefined : d.dataset.dep; save(); $$(".dep").forEach(z => { z.classList.toggle("on", F.offDep === z.dataset.dep); z.setAttribute("aria-pressed", F.offDep === z.dataset.dep); }); return; }
    const b = e.target.closest(".fx"); if (b) tapField(b.dataset.k);
  };
  if (L === "ar" && zoom > 1) { const sc = $("#pscroll"); sc.scrollLeft = sc.scrollWidth; }
  $$(".ftab").forEach(b => b.onclick = () => { commitSheet(); closeSheet(); S.tab = +b.dataset.t; save(); $("#fpane").innerHTML = formPane(); bindForm(); });
}
function secPractical() {
  const x = u(), c = S.c;
  $("#sec").innerHTML = `<div class="grid" style="gap:14px">
    <section class="card rise"><h2>${esc(x.formTitle)}<span class="tg" dir="ltr">${c.forms.map(f => FORM_MAP[f].name).join(" + ")}</span></h2>
      <div class="must">${esc(x.pracNote)}</div><details open><summary style="cursor:pointer;font-weight:800">${esc(x.brief)}</summary>${briefHTML(c)}</details></section>
    <section class="card rise" id="fpane">${formPane()}</section>
    <section class="card rise"><h2>${esc(x.spTitle)}</h2><p class="hint">${esc(x.spHint)}</p>${["iso", "ret"].map(spBlock).join("")}
      <div class="qnav end"><button type="button" class="pill red" id="fin">${esc(x.finish)}</button></div></section></div>`;
  bindForm(); bindSP();
  $("#fin").onclick = askSubmit;
}
function setZoom(z) { zoom = z; const pf = $("#pf"); if (pf) { pf.style.width = z * 100 + "%"; pf.dataset.z = z; if (L === "ar") { const sc = $("#pscroll"); sc.scrollLeft = sc.scrollWidth; } } }
function refreshField(k) {
  const f = curF(), r = FMAP(f).find(r => r[0] === k), el = $(`.fx[data-k="${k}"]`);
  if (el && r) el.outerHTML = fieldHTML(f, r);
  const cnt = $("#cnt"); if (cnt) cnt.textContent = cntTxt(f);
}
function tapField(k) {
  const f = curF(), F = FV(f), r = FMAP(f).find(r => r[0] === k); if (!r) return;
  if (r[1] === "c") {
    if (TRI.test(k)) F[k] = F[k] === true ? "na" : F[k] === "na" ? undefined : true;
    else { F[k] = !F[k]; if (F[k] && PAIRS[k] && F[PAIRS[k]]) { F[PAIRS[k]] = false; refreshField(PAIRS[k]); } }
    if (F[k] === undefined || F[k] === false) delete F[k];
    save(); refreshField(k); return;
  }
  if (r[1] === "s") { F[k] = !F[k]; if (!F[k]) delete F[k]; save(); refreshField(k); return; }
  openSheet(k);
}
/* text-field sheet: created once and reused, so the phone keyboard stays open from one field to the next.
   It is pinned to the *visible* area (visualViewport), so on iPhone it always sits right above the keyboard. */
let sheetK = null;
function fitSheet() {
  const d = $(".sheet"), vv = window.visualViewport; if (!d) return;
  if (vv) { d.style.top = vv.offsetTop + "px"; d.style.height = vv.height + "px"; d.style.bottom = "auto"; }
}
function openSheet(k) {
  const x = u(), f = curF(), F = FV(f), texts = FMAP(f).filter(r => r[1] === "t").map(r => r[0]);
  const nextK = texts[texts.indexOf(k) + 1];
  let d = $(".sheet");
  if (!d) {
    d = document.createElement("div");
    d.className = "sheet"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-labelledby", "shl");
    d.innerHTML = `<div class="sbox"><label id="shl" for="shi"></label>
      <input class="inp" id="shi" maxlength="80" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="next" dir="${L === "ar" ? "rtl" : "ltr"}" lang="${L}">
      <div class="row"><button type="button" class="pill sm" id="shc">${esc(x.clear)}</button><button type="button" class="pill sm" id="shna">N/A</button><span class="grow"></span>
      <button type="button" class="pill sm" id="shx">${esc(x.close)}</button><button type="button" class="pill red sm" id="shn"></button></div></div>`;
    document.body.appendChild(d);
    const vv = window.visualViewport;
    if (vv) { vv.addEventListener("resize", fitSheet); vv.addEventListener("scroll", fitSheet); }
    const inp = $("#shi");
    // buttons must not steal focus from the input, or the keyboard would close between fields
    $$(".sheet button").forEach(b => b.addEventListener("pointerdown", e => e.preventDefault()));
    $("#shc").onclick = () => { inp.value = ""; inp.focus(); };
    $("#shna").onclick = () => { inp.value = "N/A"; inp.focus(); };
    $("#shx").onclick = () => { commitSheet(); closeSheet(); };
    $("#shn").onclick = () => { const nk = $("#shn").dataset.next; commitSheet(); if (nk) openSheet(nk); else closeSheet(); };
    inp.onkeydown = e => { if (e.key === "Enter") { e.preventDefault(); $("#shn").click(); } if (e.key === "Escape") { commitSheet(); closeSheet(); } };
    d.onclick = e => { if (e.target === d) { commitSheet(); closeSheet(); } };
  }
  sheetK = k;
  $("#shl").textContent = labOf(f, k);
  const inp = $("#shi"), nb = $("#shn");
  inp.value = F[k] || "";
  nb.textContent = nextK ? x.nextField : x.save; nb.dataset.next = nextK || "";
  inp.setAttribute("enterkeyhint", nextK ? "next" : "done");
  inp.focus({ preventScroll: true });           // synchronous, inside the tap: iPhone opens the keyboard right away
  try { inp.setSelectionRange(inp.value.length, inp.value.length); } catch (e) {}
  fitSheet();
  setTimeout(() => { fitSheet(); scrollToField(k); }, 260);
}
function commitSheet() {
  if (!sheetK) return;
  const f = curF(), F = FV(f), inp = $("#shi"); if (!inp) return;
  const v = inp.value.replace(/[\u0000-\u001f]/g, "").trim().slice(0, 80);
  if (v) F[sheetK] = v; else delete F[sheetK];
  save(); refreshField(sheetK);
}
function scrollToField(k) {
  const el = $(`.fx[data-k="${k}"]`), sc = $("#pscroll"); if (!el || !sc) return;
  el.classList.add("cur"); setTimeout(() => el.classList.remove("cur"), 1400);
  const r = el.getBoundingClientRect(), sr = sc.getBoundingClientRect();
  if (r.top < sr.top || r.bottom > sr.top + sr.height * .55) sc.scrollTop += r.top - sr.top - sr.height * .25;
  const vh = window.visualViewport ? visualViewport.height : innerHeight, sh = ($(".sbox") || { offsetHeight: 0 }).offsetHeight;
  if (r.top < 60 || r.bottom > vh - sh - 12) scrollBy({ top: r.top - Math.max(70, (vh - sh) * .35), behavior: "auto" });
  if (zoom > 1) sc.scrollLeft += (r.left - sr.left) - sc.clientWidth / 3;
}
function closeSheet() {
  const s = $(".sheet"); if (!s) return;
  const vv = window.visualViewport; if (vv) { vv.removeEventListener("resize", fitSheet); vv.removeEventListener("scroll", fitSheet); }
  const i = $("#shi"); if (i) i.blur();
  s.remove(); sheetK = null;
}
function spBlock(k) {
  const x = u(), st = S.sp[k], txt = SP_STEPS[k][L];
  return `<div class="spb" data-sp="${k}"><div class="sphead"><h3>${esc(k === "iso" ? x.spIso : x.spRet)}</h3><button type="button" class="pill sm" data-reset="${k}">${esc(x.resetSp)}</button></div>
    <ul class="splist">${st.order.map(i => { const pos = st.pick.indexOf(i); return `<li><button type="button" class="sp ${pos >= 0 ? "on" : ""}" data-k="${k}" data-i="${i}"><span class="spn">${pos >= 0 ? pos + 1 : ""}</span><span>${esc(txt[i])}</span></button></li>`; }).join("")}</ul></div>`;
}
function bindSP() {
  $$("button.sp").forEach(b => b.onclick = () => { const st = S.sp[b.dataset.k], i = +b.dataset.i, pos = st.pick.indexOf(i); if (pos >= 0) st.pick = st.pick.slice(0, pos); else st.pick.push(i); save(); redrawSP(b.dataset.k); });
  $$("[data-reset]").forEach(b => b.onclick = () => { S.sp[b.dataset.reset].pick = []; save(); redrawSP(b.dataset.reset); });
}
function redrawSP(k) { const y = scrollY; $(`.spb[data-sp="${k}"]`).outerHTML = spBlock(k); bindSP(); scrollTo(0, y); }

/* ---------- submit / scoring ---------- */
const unanswered = () => S.theory.filter(id => S.tAns[id] === undefined).length + S.permits.filter(id => !(S.pAns[id] || []).length).length;
function askSubmit() {
  const x = u(), n = unanswered(), d = document.createElement("div");
  d.className = "modal"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true");
  d.innerHTML = `<div class="mbox"><p>${esc(x.confirm)}</p>${n ? `<p class="warn">${n} ${esc(x.unans)}</p>` : ""}
    <div class="row" style="justify-content:flex-end"><button type="button" class="pill" id="mno">${esc(x.no)}</button><button type="button" class="pill red" id="myes">${esc(x.yes)}</button></div></div>`;
  document.body.appendChild(d); $("#myes").focus();
  $("#mno").onclick = () => d.remove();
  $("#myes").onclick = () => { d.remove(); submit(false); };
}
const sameSet = (a, b) => a.length === b.length && [...a].sort().join("|") === [...b].sort().join("|");
const SP_SRC = () => [QID.r15 && QID.r15.src[0]].filter(Boolean);
function score() {
  const th = S.theory.map(id => { const q = TH(id); return { q, ok: !!q && S.tAns[id] === q.a }; }).filter(z => z.q);
  const pm = S.permits.map(id => { const p = PM(id); return { p, ok: !!p && sameSet(S.pAns[id] || [], p.a) }; }).filter(z => z.p);
  const ff = [...gradeForm(S.c, FV(S.c.kind)), ...S.c.forms.slice(1).flatMap(f => gradeSec(S.c, f, FV(f)))];
  const spOk = k => S.sp[k].pick.reduce((s, v, i) => s + (v === i ? 1 : 0), 0);
  const spTot = SP_STEPS.iso.ar.length + SP_STEPS.ret.ar.length;
  const thE = th.filter(z => z.ok).length, pmE = pm.filter(z => z.ok).length;
  const prE = ff.filter(z => z.ok).length + spOk("iso") + spOk("ret"), prT = ff.length + spTot;
  const earned = thE + pmE + prE, total = th.length + pm.length + prT;
  return { th, pm, ff, spOk, thE, thT: th.length, pmE, pmT: pm.length, prE, prT, earned, total, pct: Math.round(earned / total * 1000) / 10 };
}
function submit(auto) {
  if (!S || S.done) return;
  commitSheet(); closeSheet();
  S.done = true; S.auto = auto; S.t1 = Math.min(Date.now(), S.end); clearInterval(tick);
  const r = score(); const H = hist(); H.push({ t: S.t1, pct: r.pct, role: S.role }); store.set(HIST_KEY, H.slice(-20));
  store.sset(RUN_KEY, null);
  const m = $(".modal"); if (m) m.remove();
  render(); scrollTo(0, 0);
}

/* ---------- result ---------- */
let onlyWrong = true;
function renderResult() {
  const x = u(), r = score(), pass = r.pct >= PASS, secs = Math.max(0, Math.round((S.t1 - S.t0) / 1000));
  const bar = (lbl, e, t) => `<div class="sb"><div class="sbl"><span>${esc(lbl)}</span><b dir="ltr">${e} / ${t}</b></div><div class="sbt"><i style="width:${t ? (e / t * 100).toFixed(1) : 0}%"></i></div></div>`;
  const ansTxt = (opts, v) => v === undefined || (Array.isArray(v) && !v.length) ? `<i>${esc(x.none)}</i>` : esc(Array.isArray(v) ? v.map(i => opts[i]).join("، ") : opts[v]);
  const item = (ok, q, yours, right, src, extra = "") => (onlyWrong && ok) ? "" : `<li class="rv ${ok ? "ok" : "bad"}"><span class="rk" aria-hidden="true">${ok ? "✓" : "✕"}</span><div><p class="rq">${esc(q)}</p>${extra}
      ${ok || yours == null ? "" : `<p class="ry"><b>${esc(x.your)}:</b> ${yours}</p>`}<p class="rc"><b>${esc(x.correct)}:</b> ${right}</p>${srcHTML(src)}</div></li>`;
  const thList = r.th.map(({ q, ok }) => { const o = qOpts(q); return item(ok, q[L].q, ansTxt(o, S.tAns[q.id]), esc(o[q.a]), q.src, realB(q) + (q.t === "lock" ? `<div class="lockbox">${lockSVG(q.color, 1)}</div>` : "")); }).join("");
  const pmList = r.pm.map(({ p, ok }) => item(ok, p[L], (S.pAns[p.id] || []).length ? `<span dir="ltr">${esc(S.pAns[p.id].join(" + "))}</span>` : `<i>${esc(x.none)}</i>`, `<span dir="ltr">${esc(p.a.join(" + "))}</span>`, p.src)).join("");
  const ffList = r.ff.map(z => item(z.ok, z.label, null, esc(z.rule), z.src)).join("");
  const spList = ["iso", "ret"].map(k => {
    const ok = r.spOk(k) === SP_STEPS[k].ar.length, t = SP_STEPS[k][L];
    return item(ok, `${k === "iso" ? x.spIso : x.spRet} (${r.spOk(k)}/${t.length})`, S.sp[k].pick.length ? `<ol class="mini">${S.sp[k].pick.map(i => `<li>${esc(t[i])}</li>`).join("")}</ol>` : `<i>${esc(x.none)}</i>`, `<ol class="mini">${t.map(s => `<li>${esc(s)}</li>`).join("")}</ol>`, SP_SRC());
  }).join("");
  const dt = new Date(S.t1), p2 = n => String(n).padStart(2, "0"), date = `${p2(dt.getDate())}/${p2(dt.getMonth() + 1)}/${dt.getFullYear()} — ${p2(dt.getHours())}:${p2(dt.getMinutes())}`;
  const empty = `<li class="rv ok"><span class="rk">✓</span><div><p class="rq">${esc(L === "ar" ? "لا أخطاء في هذا الجزء" : "No mistakes in this part")}</p></div></li>`;
  app.innerHTML = shell(topbar(x.result, `${S.name ? S.name + " — " : ""}${x.roles[S.role]} · ${date}`, `<span class="acts"><button type="button" class="pill red" id="again">${esc(x.again)}</button> <button type="button" class="pill" id="prt">${esc(x.print)}</button></span>`) + `
    <div class="grid two res">
      <section class="card rise ${pass ? "pass" : "fail"}"><div class="big">${ring(r.pct, r.pct + "%", x.passNote)}<div><div class="stamp">${esc(pass ? x.pass : x.fail)}</div>
        <p class="hint" style="margin-top:14px">${esc(x.total)}: <b dir="ltr">${r.earned} / ${r.total}</b> · ${esc(x.time)}: <b dir="ltr">${Math.floor(secs / 60)}:${p2(secs % 60)}</b></p></div></div>
        ${S.auto ? `<p class="warn">${esc(x.timeUp)}</p>` : ""}</section>
      <section class="card rise" style="--d:1">${bar(x.theory, r.thE, r.thT)}${bar(x.permits, r.pmE, r.pmT)}${bar(x.practical, r.prE, r.prT)}</section>
    </div>
    <section class="card rev" style="margin-top:14px"><div class="sphead"><h3>${esc(x.review)}</h3>
      <div class="seg" role="group"><button type="button" class="${onlyWrong ? "on" : ""}" id="ow" aria-pressed="${onlyWrong}">${esc(x.onlyWrong)}</button><button type="button" class="${onlyWrong ? "" : "on"}" id="al" aria-pressed="${!onlyWrong}">${esc(x.all)}</button></div></div>
      <h3 class="rh">${esc(x.theory)}</h3><ul class="rvl">${thList || empty}</ul>
      <h3 class="rh">${esc(x.permits)}</h3><ul class="rvl">${pmList || empty}</ul>
      <h3 class="rh">${esc(x.practical)} — <span dir="ltr">${S.c.forms.map(f => FORM_MAP[f].name).join(" + ")}</span></h3><ul class="rvl">${ffList + spList || empty}</ul>
    </section>${foot()}`, { nav: "exam" });
  bindShell();
  $("#again").onclick = () => { S = null; go("exam"); render(); scrollTo(0, 0); };
  $("#prt").onclick = () => print();
  $("#ow").onclick = () => { onlyWrong = true; renderResult(); };
  $("#al").onclick = () => { onlyWrong = false; renderResult(); };
}

/* mobile tab bar: compact while scrolling down, full size when scrolling up or near the top */
let lastY = 0, tbTick = false;
addEventListener("scroll", () => {
  if (tbTick) return; tbTick = true;
  requestAnimationFrame(() => {
    const t = $("#tabbar"), y = scrollY;
    if (t) { if (y > lastY + 6 && y > 80) t.classList.add("mini"); else if (y < lastY - 6 || y < 40) t.classList.remove("mini"); }
    lastY = y; tbTick = false;
  });
}, { passive: true });

/* ---------- boot ---------- */
window.addEventListener("beforeunload", () => save());
const okRun = r => { try { return !!(r && r.v === 4 && !r.done && r.end > Date.now() && Array.isArray(r.theory) && r.theory.every(TH) && Array.isArray(r.permits) && r.permits.every(PM) && r.c && FORM_MAP[r.c.kind] && Array.isArray(r.c.forms) && r.c.forms.every(f => FORM_MAP[f]) && ["iss", "issl", "rec"].includes(r.role) && r.F && typeof r.F === "object" && typeof r.name === "string"); } catch (e) { return false; } };
const run = store.sget(RUN_KEY);
if (!okRun(run)) store.sset(RUN_KEY, null);
if (L !== "ar" && L !== "en") L = null;
if (L) setLang(L);
route = parseHash();
if (okRun(run) && L) { S = run; if (S.lang && S.lang !== L) setLang(S.lang); startTimer(); }
render();
if (/^#src\//.test(location.hash) && L) dispatchEvent(new HashChangeEvent("hashchange"));
})();
