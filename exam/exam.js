/* محاكاة اختبار لجنة التأهيل الدائمة — منطق الصفحة.
   الأمان: كل نص يدخله المستخدم يمرّ عبر esc() قبل العرض، ولا يُرسل أي شيء لأي خادم.
   التخزين المحلي: لتذكّر الأسئلة التي ظهرت سابقًا (لا تتكرر) ولحفظ الاختبار الجاري عند تحديث الصفحة. */
(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  sget(k) { try { const v = sessionStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
  sset(k, v) { try { v == null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

const N_THEORY = 30, N_PERMITS = 5, MINUTES = 60, PASS = 90;
const SEEN_KEY = "pac_seen_v2", RUN_KEY = "pac_run_v2";

const U = {
  ar: {
    dir: "rtl", other: "English", brand: "محاكاة اختبار لجنة التأهيل",
    title: "اختبار التأهيل لوثائق السلامة",
    lead: "نظري، واختيار التصاريح، وتعبئة تصريح العمل الأصلي بنفسك، ثم درجة نهائية ومراجعة لكل خطأ مع نص المصدر.",
    note: "اختبار اللجنة الفعلي يُقدَّم باللغتين العربية والإنجليزية فقط.",
    permitHead: "تصريح دخول الاختبار", serial: "رقم", name: "اسم المتقدم", namePh: "اختياري — يظهر على النتيجة فقط",
    role: "الفئة المتقدَّم لها", roles: { iss: "مصدر — جهد متوسط", issl: "مصدر — جهد منخفض", rec: "مستلم" },
    roleForm: { iss: "يعبّئ تصريح MV PTW", issl: "يعبّئ تصريح LV PTW", rec: "يعبّئ تصريح LV PTW" },
    parts: [["30 سؤالًا نظريًا", "تُسحب من بنك فيه {n} سؤالًا، ولا تتكرر عليك حتى تنتهي منها"], ["5 حالات تصاريح", "اختر الوثيقة أو الوثائق المطلوبة لكل عمل"], ["الجزء العملي", "تعبئة تصريح العمل الرسمي من بيانات حالة، وترتيب البرنامج التشغيلي"]],
    rules: "المدة 60 دقيقة · درجة النجاح 90% (البند 6.2.3)",
    fresh: "لم يظهر لك بعد: {n} سؤالًا", reset: "إعادة ضبط الأسئلة",
    start: "ابدأ الاختبار", study: "تصفّح بنك الأسئلة والمصادر", resume: "لديك اختبار لم يكتمل", resumeBtn: "أكمل الاختبار", discard: "ابدأ من جديد",
    secs: ["النظري", "التصاريح", "العملي"],
    q: "سؤال", of: "من", prev: "السابق", next: "التالي", flag: "مراجعة لاحقًا", flagged: "معلَّم للمراجعة",
    toPermits: "انتقل لاختيار التصاريح", toPractical: "انتقل للجزء العملي", finish: "تسليم الاختبار",
    pTitle: "اختر وثيقة أو وثائق السلامة المطلوبة لكل عمل", pHint: "قد تكون الإجابة أكثر من وثيقة",
    caseN: "حالة", formTitle: "تعبئة تصريح العمل", brief: "أمر العمل", tapHint: "اضغط على أي خانة في النموذج لتكتب فيها أو تعلّمها. استخدم التكبير على الجوال.",
    zoomIn: "تكبير", zoomOut: "تصغير", filled: "خانات معبأة", edit: "تعبئة الخانة", save: "حفظ", nextField: "الخانة التالية", clear: "مسح", close: "إغلاق",
    sign: "توقيع", signed: "موقَّع",
    spTitle: "ترتيب البرنامج التشغيلي (جهد منخفض)", spIso: "خطوات العزل", spRet: "خطوات إعادة الخدمة",
    spHint: "اضغط الخطوات بالترتيب الصحيح. الضغط على خطوة مرقّمة يلغيها مع ما بعدها.", resetSp: "إعادة",
    confirm: "تسليم الاختبار؟ لن تتمكن من تعديل إجاباتك بعده.", unans: "خانة أو سؤالًا بلا إجابة", yes: "تسليم", no: "رجوع",
    timeUp: "انتهى الوقت وسُلِّم الاختبار تلقائيًا.",
    result: "نتيجة الاختبار", pass: "ناجح", fail: "لم يجتز", passNote: "درجة النجاح 90%",
    theory: "النظري", permits: "اختيار التصاريح", practical: "العملي", total: "المجموع", time: "الزمن",
    review: "مراجعة الإجابات", onlyWrong: "الأخطاء فقط", all: "الكل", your: "إجابتك", correct: "الصحيح", none: "بلا إجابة",
    src: "من المصدر", srcOrig: "النص الأصلي", again: "اختبار جديد", home: "منصة التوعية", print: "طباعة",
    disc: "محاكاة تدريبية للتهيئة فقط، ولا تغني عن اختبار اللجنة الرسمي.",
    lock: { red: "قفل أحمر", yellow: "قفل أصفر", blue: "قفل أزرق" },
    studyTitle: "بنك الأسئلة والمصادر", studyLead: "كل سؤال مع إجابته الصحيحة ونص المصدر الذي يثبتها. ابحث بكلمة أو اختر المصدر.",
    search: "ابحث في الأسئلة", allDocs: "كل المصادر", more: "عرض المزيد", back: "رجوع", count: "{n} سؤالًا",
    practicalItems: "بنود التصريح", formRule: "القاعدة",
    org: { sec: "الشركة", con: "مقاول" }
  },
  en: {
    dir: "ltr", other: "العربية", brand: "Authorization Committee Mock Exam",
    title: "Safety Documents Authorization Exam",
    lead: "Theory, permit selection, and filling in the official work permit yourself, then a final score and a review of every mistake with the source text.",
    note: "The actual committee exam is offered in Arabic and English only.",
    permitHead: "Exam entry permit", serial: "No.", name: "Candidate name", namePh: "Optional — shown on the result only",
    role: "Applying for", roles: { iss: "Issuer — Medium Voltage", issl: "Issuer — Low Voltage", rec: "Receiver" },
    roleForm: { iss: "Fills an MV PTW", issl: "Fills an LV PTW", rec: "Fills an LV PTW" },
    parts: [["30 theory questions", "Drawn from a bank of {n}; they don't repeat until you've seen them all"], ["5 permit cases", "Choose the document(s) each job needs"], ["Practical", "Fill in the official work permit from a case, and order the switching program"]],
    rules: "60 minutes · pass mark 90% (clause 6.2.3)",
    fresh: "Not seen yet: {n} questions", reset: "Reset question history",
    start: "Start the exam", study: "Browse the question bank & sources", resume: "You have an unfinished exam", resumeBtn: "Continue", discard: "Start over",
    secs: ["Theory", "Permits", "Practical"],
    q: "Question", of: "of", prev: "Previous", next: "Next", flag: "Review later", flagged: "Flagged",
    toPermits: "Go to permit selection", toPractical: "Go to the practical part", finish: "Submit the exam",
    pTitle: "Select the safety document(s) required for each job", pHint: "The answer may be more than one document",
    caseN: "Case", formTitle: "Fill in the work permit", brief: "Work order", tapHint: "Tap any box on the form to write in it or tick it. Use zoom on a phone.",
    zoomIn: "Zoom in", zoomOut: "Zoom out", filled: "boxes filled", edit: "Fill the box", save: "Save", nextField: "Next box", clear: "Clear", close: "Close",
    sign: "Sign", signed: "Signed",
    spTitle: "Order the switching program (low voltage)", spIso: "Isolation steps", spRet: "Return-to-service steps",
    spHint: "Tap the steps in the correct order. Tapping a numbered step undoes it and the steps after it.", resetSp: "Reset",
    confirm: "Submit the exam? You can't change your answers afterwards.", unans: "unanswered boxes or questions", yes: "Submit", no: "Back",
    timeUp: "Time is up — the exam was submitted automatically.",
    result: "Exam result", pass: "PASS", fail: "NOT PASSED", passNote: "Pass mark 90%",
    theory: "Theory", permits: "Permit selection", practical: "Practical", total: "Total", time: "Time",
    review: "Answer review", onlyWrong: "Mistakes only", all: "All", your: "Your answer", correct: "Correct", none: "No answer",
    src: "From the source", srcOrig: "Original text", again: "New exam", home: "Awareness platform", print: "Print",
    disc: "A training simulation for preparation only; it does not replace the official committee exam.",
    lock: { red: "Red lock", yellow: "Yellow lock", blue: "Blue lock" },
    studyTitle: "Question bank & sources", studyLead: "Every question with its correct answer and the source text that proves it. Search a word or pick a source.",
    search: "Search the questions", allDocs: "All sources", more: "Show more", back: "Back", count: "{n} questions",
    practicalItems: "Permit items", formRule: "Rule",
    org: { sec: "SEC", con: "Contractor" }
  }
};
const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k]);

let L = "ar";
try { const p = new URLSearchParams(location.search).get("lang"); if (p === "en" || p === "ar") L = p; } catch (e) {}
const u = () => U[L];
const app = $("#app");
let S = null, view = "intro";

/* ---------- options shuffle (keeps "all of the above" style lists fixed) ---------- */
const FIXED = /جميع|كلاهما|لا شيء|All of|All answers|Both|None of/;
const keepOrder = q => q.t === "tf" || q.t === "lock" || q.ar.o.some(o => FIXED.test(o));
const qOpts = q => q.t === "tf" ? TF[L] : q[L].o;

/* ---------- question selection without repeats ---------- */
function drawFresh(pool, n, key) {
  const seen = store.get(SEEN_KEY, {}), s = new Set(seen[key] || []);
  const fresh = shuffle(pool.filter(q => !s.has(q.id)));
  let out = fresh.slice(0, n);
  if (fresh.length <= n) {                     // cycle finished: refill from seen ones and start a new cycle
    out = out.concat(shuffle(pool.filter(q => s.has(q.id))).slice(0, n - out.length));
    seen[key] = out.map(q => q.id);
  } else seen[key] = [...s, ...out.map(q => q.id)];
  store.set(SEEN_KEY, seen);
  return out;
}
const freshCount = () => { const s = new Set((store.get(SEEN_KEY, {}).theory) || []); return EXAM_THEORY.filter(q => !s.has(q.id)).length; };

/* ---------- practical case generator ---------- */
const NAMES = [["فهد العتيبي", "Fahad Alotaibi"], ["سعد الغامدي", "Saad Alghamdi"], ["ماجد الحربي", "Majed Alharbi"], ["خالد الشهري", "Khalid Alshehri"], ["عبدالله الزهراني", "Abdullah Alzahrani"], ["محمد القحطاني", "Mohammed Alqahtani"], ["ناصر المالكي", "Nasser Almalki"], ["تركي الجهني", "Turki Aljuhani"], ["عمر باوزير", "Omar Bawazir"], ["ياسر السلمي", "Yasser Alsulami"], ["بندر الدوسري", "Bandar Aldosari"], ["حسن العمري", "Hassan Alamri"]];
const AREAS = [["الروضة", "Al-Rawdah"], ["الصفا", "Al-Safa"], ["المروة", "Al-Marwah"], ["النعيم", "Al-Naeem"], ["الزهراء", "Al-Zahra"], ["السلامة", "Al-Salamah"], ["البوادي", "Al-Bawadi"], ["الفيصلية", "Al-Faisaliyah"], ["الربوة", "Al-Rabwah"], ["النسيم", "Al-Naseem"]];
const num = (a, b) => a + rnd(b - a + 1);
const four = () => String(num(1000, 9899));
function genCase(role) {
  const mv = role === "iss";
  const ppl = shuffle(NAMES), area = pick(AREAS);
  const iss = { n: ppl[0], id: String(num(100000, 999899)), org: mv ? "sec" : pick(["sec", "con"]) };
  const rec = { n: ppl[1], id: String(num(100000, 999899)), org: pick(["sec", "con"]) };
  const cw = { n: ppl[2], id: String(num(100000, 999899)) };
  const off = { n: ppl[3], dept: pick([["الصيانة", "Maintenance"], ["الإنشاءات", "Construction"], ["التشغيل", "Operation"]]) };
  const ptw = String(num(100000, 999899)), sp = `SP-${mv ? "MV" : "LV"}-2026-${four()}`, ref = `933-${num(1000000, 9899999)}`;
  const days = mv ? pick([3, 7, 10, 12]) : pick([2, 4, 5, 9]);
  let job;
  if (mv) {
    const a = `RMU-${four()}`, b = `RMU-${four()}`, ss = `S/S-${four()}`, nb = `RMU-${four()}`;
    job = pick([
      { ar: `استبدال مفتاح الفرع (T-OFF) التالف في ${a} بمحطة التوزيع ${ss}، ويتطلب رافعة لرفع المفتاح.`, en: `Replace the faulty T-OFF switch in ${a} at substation ${ss}; a crane is needed to lift it.`,
        loc: ss, pts: [`L1 · ${a}`, `L1 · ${b}`], codes: [a, b], dis: nb, cme: true, sec: ["LOP"] },
      { ar: `إصلاح وصلة كابل جهد متوسط تالفة بين ${a} و ${b}، والوصلة داخل حفرية يلزم فتحها.`, en: `Repair a damaged MV cable joint between ${a} and ${b}; the joint is in an excavation that must be opened.`,
        loc: `${a} – ${b}`, pts: [`L2 · ${a}`, `L1 · ${b}`], codes: [a, b], dis: nb, cme: true, sec: ["EXC"] },
      { ar: `استبدال محول التوزيع في المحطة ${ss} المغذاة من مفتاح الفرع في ${a}، ويُرفع المحول بالرافعة.`, en: `Replace the distribution transformer at ${ss}, fed from the T-OFF in ${a}; the transformer is lifted by crane.`,
        loc: ss, pts: [`T-OFF · ${a}`], codes: [a], dis: nb, cme: true, sec: ["LOP"] }
    ]);
    job.disTxt = { ar: `ملاحظة: الوحدة المجاورة ${job.dis} تبقى في الخدمة ومشحونة.`, en: `Note: the neighbouring unit ${job.dis} stays in service and energized.` };
  } else {
    const mp = `MP-${four()}`, nmp = `MP-${four()}`, ss = `S/S-${four()}`, cb = `LV-CB${num(1, 8)}`, pmt = `PMT-${four()}`, fu = num(1, 6);
    job = pick([
      { ar: `استبدال كابل خدمة أرضي تالف بين الكبينة ${mp} وعداد المشترك، والعمل يتطلب حفرًا. للمشترك مولد احتياطي.`, en: `Replace a damaged underground service cable between pillar ${mp} and the customer's meter; digging is needed. The customer has a backup generator.`,
        loc: mp, pts: [`Fuse ${fu} · ${mp}`, `Meter CB · customer`], codes: [mp, "CB"], dis: nmp, sec: ["EXC"] },
      { ar: `استبدال قاعدة مصهرات تالفة في الكبينة ${mp} المغذاة من القاطع ${cb} في لوحة الجهد المنخفض بالمحطة ${ss}.`, en: `Replace a damaged fuse base in pillar ${mp}, fed from breaker ${cb} in the LV panel of ${ss}.`,
        loc: `${mp} / ${ss}`, pts: [`${cb} · ${ss}`], codes: [cb], dis: nmp, sec: [] },
      { ar: `استبدال موصلات خط هوائي جهد منخفض بين عمودين، مغذى من صندوق خدمة المحول ${pmt} (المصهر رقم ${fu})، والعمل من سلة رافعة.`, en: `Replace LV overhead conductors between two poles, fed from transformer ${pmt} service box (fuse ${fu}); work from a bucket truck.`,
        loc: pmt, pts: [`Fuse ${fu} · ${pmt}`], codes: [pmt], dis: `PMT-${four()}`, sec: ["WAH"] },
      { ar: `استبدال كبينة توزيع جهد منخفض ${mp} بأخرى جديدة ورفعها بالرافعة، والكبينة مغذاة من القاطع ${cb} بالمحطة ${ss}.`, en: `Replace LV pillar ${mp} with a new one lifted by crane; it is fed from breaker ${cb} at ${ss}.`,
        loc: `${mp} / ${ss}`, pts: [`${cb} · ${ss}`], codes: [cb], dis: nmp, sec: ["LOP"] }
    ]);
    job.cme = false;
    job.disTxt = { ar: `ملاحظة: الكبينة المجاورة ${job.dis} تبقى في الخدمة ومشحونة.`, en: `Note: the neighbouring item ${job.dis} stays in service and energized.` };
  }
  const n = job.pts.length;
  const red = Array.from({ length: n }, () => `R-${four()}`), yel = Array.from({ length: n }, () => `Y-${four()}`), blue = `B-${four()}`;
  return { form: mv ? "mv" : "lv", iss, rec, cw, off, ptw, sp, ref, days, job, red, yel, blue };
}
const pname = p => p.n[L === "ar" ? 0 : 1];

function briefHTML(c) {
  const x = u(), ar = L === "ar";
  const locks = shuffle([...c.red.map(v => [v, "red"]), ...c.yel.map(v => [v, "yellow"]), [c.blue, "blue"]]);
  const row = (k, v) => `<div class="br"><dt>${esc(k)}</dt><dd>${v}</dd></div>`;
  return `<dl class="brief">
    ${row(ar ? "العمل" : "Job", esc(c.job[L]))}
    ${row(ar ? "نقاط العزل في البرنامج" : "Isolation points (program)", c.job.pts.map(p => `<b dir="ltr">${esc(p)}</b>`).join(ar ? " و " : " and "))}
    ${row("", esc(c.job.disTxt[L]))}
    ${row(ar ? "مفتاح تأريض رئيسي" : "Main earth switch", c.job.cme ? (ar ? "متوفر في المعدة (يوضع بتوجيه مهندس التحكم)" : "Fitted (applied on the control engineer's instruction)") : (ar ? "لا يوجد" : "None"))}
    ${row(ar ? "رقم البرنامج التشغيلي" : "Switching program", `<b dir="ltr">${esc(c.sp)}</b>`)}
    ${c.form === "lv" ? row(ar ? "رقم البلاغ (933)" : "Call ref. (933)", `<b dir="ltr">${esc(c.ref)}</b>`) : ""}
    ${row(ar ? "رقم التصريح" : "Permit No.", `<b dir="ltr">${esc(c.ptw)}</b>`)}
    ${row(ar ? "المصدر" : "Issuer", `${esc(pname(c.iss))} — <span dir="ltr">${esc(c.iss.id)}</span> (${esc(x.org[c.iss.org])})`)}
    ${row(ar ? "المستلم" : "Receiver", `${esc(pname(c.rec))} — <span dir="ltr">${esc(c.rec.id)}</span> (${esc(x.org[c.rec.org])})`)}
    ${row(ar ? "عامل مشارك" : "Competent worker", `${esc(pname(c.cw))} — <span dir="ltr">${esc(c.cw.id)}</span>`)}
    ${row(ar ? "مسؤول الجهة المعنية" : "Concerned official", `${esc(pname(c.off))} (${esc(c.off.dept[ar ? 0 : 1])})`)}
    ${row(ar ? "أقفال الفريق" : "Team locks", locks.map(([v, col]) => `<span class="lk ${col}" dir="ltr">${esc(v)}</span>`).join(" "))}
    ${row(ar ? "المدة المتوقعة" : "Expected duration", esc(ar ? `${c.days} أيام` : `${c.days} days`))}
    ${row(ar ? "بعد انتهاء العمل" : "After the work", esc(ar ? "اكتمل العمل بنجاح، وسُحب العاملون، وأُزيلت الأدوات والأرضي المتنقل. أكمل جزء الإغلاق وجزء إعادة التشغيل في النموذج." : "The work was completed, workers withdrawn, tools and portable earths removed. Complete the closing and energization parts of the form."))}
  </dl>`;
}

/* ---------- grading of the filled permit ---------- */
const norm = s => String(s || "").toLowerCase().replace(/[ً-ٰٟ]/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[\s\-_.،,·:/]+/g, "");
const has = (v, code) => norm(v).includes(norm(code));
const nameOk = (v, p) => { const n = norm(v); return p.n.some(full => { const t = full.split(" "); return n.includes(norm(t[0])) && n.includes(norm(t[t.length - 1])); }); };
const setEq = (a, b) => a.length === b.length && a.every(x => b.some(y => norm(y) === norm(x)));
function gradeForm(c, F) {
  const v = k => F[k] || "", on = k => F[k] === true;
  const mv = c.form === "mv", ar = L === "ar";
  const items = [];
  const add = (key, ok, ar_, en_, rule, src) => items.push({ key, ok, label: ar ? ar_ : en_, rule, src });
  const iso = v("iso1") + " " + v("iso2");
  if (!mv) add("org", on(c.iss.org === "sec" ? "issSEC" : "issCON") && !on(c.iss.org === "sec" ? "issCON" : "issSEC"), "جهة المصدر (شركة / مقاول)", "Issuer party (SEC / contractor)", ar ? `المصدر من ${U.ar.org[c.iss.org]}.` : `The Issuer is ${U.en.org[c.iss.org]}.`, [["DH", "5.4"]]);
  if (mv) add("sp", has(v("sp"), c.sp), "رقم البرنامج التشغيلي", "Switching program No.", ar ? `يُكتب ${c.sp} في جزء الإصدار قبل العزل.` : `Write ${c.sp} in the issue part before isolation.`, [["DH", "7.8.8"]]);
  else add("ref", has(v("ref"), c.ref), "الرقم المرجعي (933)", "Reference no (933)", ar ? `رقم البلاغ ${c.ref}.` : `Call reference ${c.ref}.`, []);
  add("ptw", has(v("ptw"), c.ptw), "رقم التصريح", "PTW No.", c.ptw, []);
  add("loc", c.job.codes.some(k => has(v("loc"), k)) || has(v("loc"), c.job.loc.split(" ")[0]), "الموقع / المحطة", "Location / substation", c.job.loc, []);
  add("desc", norm(v("desc")).length >= 6, "وصف العمل", "Description of work", ar ? "يُكتب وصف واضح للعمل." : "A clear description of the work.", [["DH", "8.1.7"]]);
  add("iso", c.job.codes.every(k => has(iso, k)) && !has(iso, c.job.dis), "نقاط العزل بوضوح", "Clearly isolated points", (ar ? "النقاط: " : "Points: ") + c.job.pts.join(" + ") + (ar ? ` — دون ${c.job.dis} لأنها ليست نقطة عزل.` : ` — not ${c.job.dis}, which is not an isolation point.`), [["DH", "7.8.10"]]);
  const putKeys = mv ? ["putLock", "putHold", "putTape", "putCME", "putEarth"] : ["putSigns", "putHold", "putTape", "putLock", "putEarth"];
  const putWant = { putLock: true, putHold: true, putTape: true, putSigns: true, putCME: !!c.job.cme, putEarth: false };
  add("put", putKeys.every(k => on(k) === putWant[k]), "خانات «تم وضع» عند الإصدار", "'Has been put' at issue",
    ar ? `تُعلَّم الأقفال وبطاقات التوقيف والأشرطة${mv ? "" : " والبطاقات التحذيرية"}${c.job.cme ? " والأرضي الرئيسي (يوضع قبل الإصدار)" : ""}. الأرضي الإضافي المتنقل لا يُعلَّم لأنه يوضع بعد إصدار الوثيقة.`
       : `Tick locks, hold tags, tape${mv ? "" : ", warning signs"}${c.job.cme ? " and the circuit main earth (applied before issue)" : ""}. Not the additional portable earth: it goes on after the document is issued.`, [["DH", "8.2.7.3"], ["DH", "8.1.13"]]);
  const filled = ks => ks.map(k => v(k).trim()).filter(Boolean);
  add("slI", setEq(filled(["slI1", "slI2", "slI3"]), c.red), "أرقام أقفال المصدر", "Issuer lock numbers", (ar ? "الأقفال الحمراء للمصدر: " : "Red locks are the Issuer's: ") + c.red.join(", "), [["CS", "lock"]]);
  add("slR", setEq(filled(["slR1", "slR2", "slR3"]), c.yel), "أرقام أقفال المستلم", "Receiver lock numbers", (ar ? "الأقفال الصفراء للمستلم: " : "Yellow locks are the Receiver's: ") + c.yel.join(", ") + (ar ? ` — والأزرق ${c.blue} للعامل المشارك لا يُكتب هنا.` : ` — blue ${c.blue} belongs to the competent worker.`), [["CS", "lock"]]);
  add("issP", nameOk(v("issName"), c.iss) && has(v("issId"), c.iss.id), "اسم المصدر ورقمه الوظيفي", "Issuer name and ID", `${pname(c.iss)} — ${c.iss.id}`, []);
  add("off", nameOk(v("off"), c.off), "مسؤول الجهة المعنية", "Concerned official", pname(c.off), []);
  add("issSig", on("issSig"), "توقيع المصدر", "Issuer signature", ar ? "لا يكتمل الإصدار دون توقيع المصدر." : "Issue is incomplete without the Issuer's signature.", []);
  add("recOrg", on(c.rec.org === "sec" ? "recSEC" : "recCON") && !on(c.rec.org === "sec" ? "recCON" : "recSEC"), "جهة المستلم (شركة / مقاول)", "Receiver party (SEC / contractor)", ar ? `المستلم من ${U.ar.org[c.rec.org]}.` : `The Receiver is ${U.en.org[c.rec.org]}.`, []);
  add("cf", on("cf1") && on("cf2") && on("cf3"), "تأكيدات المستلم مع المصدر", "Receiver confirmations", ar ? "تُعلَّم الثلاث: نقاط العزل، والتأريض، والأقفال والبطاقات." : "Tick all three: isolation points, earthing, locks and tags.", [["DH", "7.10.8"]]);
  const secW = c.job.sec;
  add("sec", ["EXC", "WAH", "LOP"].every(p => on("sec" + p) === secW.includes(p)), "التصاريح الثانوية المرتبطة", "Associated secondary permits", secW.length ? secW.join(" + ") : (ar ? "لا يوجد تصريح ثانوي لهذا العمل." : "No secondary permit for this job."), [["DH", "8.3.5.1"]]);
  add("cm", ["cm1", "cm2", "cm3", "cm4", "cm5"].every(on), "التزامات المستلم الخمسة", "The Receiver's five commitments", ar ? "تُعلَّم جميعها." : "Tick all of them.", []);
  add("recP", nameOk(v("recName"), c.rec) && has(v("recId"), c.rec.id), "اسم المستلم ورقمه الوظيفي", "Receiver name and ID", `${pname(c.rec)} — ${c.rec.id}` + (ar ? ` (وليس العامل المشارك ${pname(c.cw)})` : ` (not the competent worker ${pname(c.cw)})`), [["DH", "8.1.3"]]);
  add("recSig", on("recSig"), "توقيع المستلم", "Receiver signature", ar ? "توقيع المستلم يعني قبوله الكامل لشروط التصريح." : "The Receiver's signature means full acceptance of the permit's conditions.", [["CS", "sign"]]);
  add("close", on("closed") && !on("cancel"), "الإغلاق (وليس الإلغاء)", "Closing (not cancelling)", ar ? "العمل اكتمل، فيُعلَّم الإغلاق مع جاهزية المعدة، لا الإلغاء." : "The work is complete, so tick closing with equipment ready — not cancel.", [["DH", "13.1"]]);
  add("dc", on("dc1") && on("dc2") && on("dc3"), "إقرارات المستلم عند الإغلاق", "Receiver's closing declarations", ar ? "سحب العاملين، وإزالة الأدوات والتأريض الإضافي، وإغلاق التصاريح الثانوية." : "Workers withdrawn, tools and additional earthing removed, secondary permits closed.", [["DH", "11"]]);
  add("clP", nameOk(v("clName"), c.rec) && has(v("clId"), c.rec.id) && on("clSig"), "اسم ورقم وتوقيع المستلم في الإغلاق", "Receiver name, ID and signature at closing", ar ? "يغلق الوثيقة مستلمها نفسه." : "The document is closed by its own Receiver.", [["DH", "8.1.5.6"]]);
  add("fP", nameOk(v("fName"), c.iss) && has(v("fId"), c.iss.id) && on("fSig") && nameOk(v("fOff"), c.off), "جزء المصدر للإعادة للتشغيل", "Issuer's energization part", ar ? "يتحقق المصدر من الإغلاق ويبلغ مسؤول الجهة المعنية بجاهزية المعدة ويوقّع." : "The Issuer verifies the closing, informs the concerned official the equipment is ready, and signs.", [["DH", "11.3"]]);
  return items;
}
const FORM_SRC = {
  lock: { d: "CS", loc: "Lesson 9 · Table 9.2", x: "Issuer (SEC Employee) — Red · Receiver (SEC / Contractor) — Yellow · Competent Worker (SEC / Contractor) — Blue." },
  sign: { d: "CS", loc: "Lesson 6 · Receiving", x: "The receiver's signature on the work permit implies his complete acceptance of the conditions that are mentioned in the PTWs and that all safety precautions have and will be taken." }
};
const DH_INDEX = (() => { const m = {}; for (const q of [...EXAM_THEORY, ...EXAM_PERMITS]) for (const s of q.src) if (s.d === "DH" && !m[s.loc]) m[s.loc] = s; return m; })();
const resolveSrc = list => list.map(([d, k]) => d === "DH" ? DH_INDEX[k] : FORM_SRC[k]).filter(Boolean);

/* ---------- session ---------- */
function newSession(name, role) {
  const locks = EXAM_THEORY.filter(q => q.t === "lock");
  const pool = EXAM_THEORY.filter(q => q.t !== "lock");
  const theory = shuffle([...drawFresh(pool, N_THEORY - 1, "theory"), pick(locks)]);
  const order = {};
  for (const q of theory) order[q.id] = q.t === "tf" ? [0, 1] : keepOrder(q) ? [...q.ar.o.keys()] : shuffle([...q.ar.o.keys()]);
  return {
    v: 2, name, role, theory: theory.map(q => q.id), order, tAns: {}, flags: {},
    permits: drawFresh(EXAM_PERMITS, N_PERMITS, "permits").map(p => p.id), pAns: {},
    c: genCase(role), F: {},
    sp: { iso: { order: shuffle([...SP_STEPS.iso.ar.keys()]), pick: [] }, ret: { order: shuffle([...SP_STEPS.ret.ar.keys()]), pick: [] } },
    sec: 0, qi: 0, t0: Date.now(), end: Date.now() + MINUTES * 60000, done: false
  };
}
const TH = id => EXAM_THEORY.find(q => q.id === id);
const PM = id => EXAM_PERMITS.find(p => p.id === id);
const save = () => store.sset(RUN_KEY, S && !S.done ? S : null);

/* ---------- chrome ---------- */
function setLang(l) {
  L = l; document.documentElement.lang = l; document.documentElement.dir = u().dir;
  document.title = l === "ar" ? "محاكاة اختبار التأهيل | المصدر والمستلم" : "Authorization Exam Simulation | Issuer & Receiver";
  try { const p = new URL(location.href); p.searchParams.set("lang", l); history.replaceState(null, "", p); } catch (e) {}
  render();
}
function head(timer) {
  return `<header class="bar"><div class="bwrap">
    <a class="brand" href="./?lang=${L}"><span class="mark" aria-hidden="true"><i></i><i></i><i></i></span><span>${esc(u().brand)}</span></a>
    ${timer ? `<div class="timer" id="timer" role="timer">--:--</div>` : `<button class="lbtn" id="lbtn" type="button" lang="${L === "ar" ? "en" : "ar"}">${esc(u().other)}</button>`}
  </div>${timer ? `<div class="tbar"><i id="tfill"></i></div>` : ""}</header>`;
}
function bindLang() { const b = $("#lbtn"); if (b) b.onclick = () => setLang(L === "ar" ? "en" : "ar"); }
const lockSVG = (c, sm) => {
  const col = { red: "#D42A2F", yellow: "#F4C430", blue: "#1F6FD1" }[c];
  return `<svg class="lockimg${sm ? " sm" : ""}" viewBox="0 0 120 150" role="img" aria-label="${esc(u().lock[c])}">
    <path d="M32 66V44a28 28 0 0 1 56 0v22" fill="none" stroke="#AEB6C2" stroke-width="11" stroke-linecap="round"/>
    <rect x="14" y="62" width="92" height="78" rx="14" fill="${col}"/>
    <rect x="14" y="62" width="92" height="18" rx="9" fill="#fff" opacity=".18"/>
    <circle cx="60" cy="98" r="9" fill="#14181F" opacity=".7"/><rect x="56" y="102" width="8" height="18" rx="3" fill="#14181F" opacity=".7"/></svg>`;
};
function srcHTML(list) {
  if (!list || !list.length) return "";
  return `<div class="srcs">${list.map(s => {
    const d = EXAM_DOCS[s.d] || {}, lang = d.lang === "en" ? "en" : d.lang === "ar" ? "ar" : (/[؀-ۿ]/.test(s.x) ? "ar" : "en");
    return `<figure class="src"><figcaption><b>${esc(d[L] || s.d)}</b>${s.loc ? `<span dir="ltr">${esc(L === "ar" && s.d === "DH" ? "البند " + s.loc : s.loc)}</span>` : ""}</figcaption>
      <blockquote lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">${esc(s.x)}</blockquote></figure>`;
  }).join("")}</div>`;
}

/* ---------- screens ---------- */
function render() {
  if (view === "study") return renderStudy();
  if (!S) return renderIntro();
  if (S.done) return renderResult();
  renderExam();
}

function renderIntro() {
  const x = u(), run = store.sget(RUN_KEY), serial = String(num(100000, 999999));
  const valid = run && run.v === 2 && !run.done && run.end > Date.now();
  app.innerHTML = head(false) + `<main class="intro">
    <section class="cover">
      <h1>${esc(x.title)}</h1>
      <p class="lead">${esc(x.lead)}</p>
      <p class="note">${esc(x.note)}</p>
      <ol class="parts">${x.parts.map(([h, p]) => `<li><b>${esc(h)}</b><span>${esc(fmt(p, { n: EXAM_THEORY.length }))}</span></li>`).join("")}</ol>
      <p class="rules">${esc(x.rules)}</p>
    </section>
    <form class="entry" id="cand" novalidate>
      <div class="eh"><span>${esc(x.permitHead)}</span><span dir="ltr">${esc(x.serial)} ${serial}</span></div>
      ${valid ? `<div class="resume"><p>${esc(x.resume)}</p><div class="row"><button class="btn primary" type="button" id="res">${esc(x.resumeBtn)}</button><button class="btn" type="button" id="dis">${esc(x.discard)}</button></div></div>` : ""}
      <label class="fld"><span>${esc(x.name)}</span><input id="nm" maxlength="60" autocomplete="off" placeholder="${esc(x.namePh)}"></label>
      <fieldset class="fld"><legend>${esc(x.role)}</legend>
        ${Object.entries(x.roles).map(([k, v], i) => `<label class="radio ${k === "rec" ? "y" : "r"}"><input type="radio" name="role" value="${k}" ${i === 0 ? "checked" : ""}><span><b>${esc(v)}</b><small>${esc(x.roleForm[k])}</small></span></label>`).join("")}
      </fieldset>
      <button class="btn primary big" type="submit">${esc(x.start)}</button>
      <div class="ef"><span>${esc(fmt(x.fresh, { n: freshCount() }))}</span><button type="button" class="link" id="rst">${esc(x.reset)}</button></div>
    </form>
    <button class="studyb" type="button" id="study"><span>${esc(x.study)}</span><small>${esc(fmt(x.count, { n: EXAM_THEORY.length + EXAM_PERMITS.length }))}</small></button>
    <p class="disc">${esc(x.disc)}</p>
  </main>`;
  bindLang();
  $("#study").onclick = () => { view = "study"; render(); scrollTo(0, 0); };
  $("#rst").onclick = () => { store.set(SEEN_KEY, {}); renderIntro(); };
  if (valid) {
    $("#res").onclick = () => { S = run; startTimer(); render(); scrollTo(0, 0); };
    $("#dis").onclick = () => { store.sset(RUN_KEY, null); renderIntro(); };
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
    if (el) {
      const m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60;
      el.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      el.classList.toggle("low", left < 5 * 60000);
    }
    if (f) f.style.width = (100 - left / (MINUTES * 600)).toFixed(2) + "%";
    if (left <= 0) submit(true);
  };
  upd(); tick = setInterval(upd, 500);
}
function steps() {
  return `<nav class="steps">${u().secs.map((s, i) => `<button type="button" class="st ${S.sec === i ? "on" : ""}" data-sec="${i}" ${S.sec === i ? 'aria-current="step"' : ""}><b>${i + 1}</b><span>${esc(s)}</span></button>`).join("")}</nav>`;
}
function renderExam() {
  app.innerHTML = head(true) + `<main class="exam">${steps()}<div id="sec"></div></main>`;
  $$(".st").forEach(b => b.onclick = () => { S.sec = +b.dataset.sec; save(); renderExam(); scrollTo(0, 0); });
  if (S.sec === 0) secTheory(); else if (S.sec === 1) secPermits(); else secPractical();
  startTimer();
}
const letters = { ar: ["أ", "ب", "ج", "د", "هـ"], en: ["A", "B", "C", "D", "E"] };

function secTheory() {
  const x = u(), q = TH(S.theory[S.qi]), n = S.theory.length, sel = S.tAns[q.id], opts = qOpts(q);
  const ord = q.t === "tf" ? [0, 1] : S.order[q.id] || [...opts.keys()];
  $("#sec").innerHTML = `<div class="qwrap">
    <article class="card qcard">
      <div class="qhead"><span class="qn">${esc(x.q)} ${S.qi + 1} <i>${esc(x.of)} ${n}</i></span>
        <button type="button" class="flagb ${S.flags[q.id] ? "on" : ""}" id="flag" aria-pressed="${!!S.flags[q.id]}">${esc(S.flags[q.id] ? x.flagged : x.flag)}</button></div>
      <p class="qt">${esc(q[L].q)}</p>
      ${q.t === "lock" ? `<div class="lockbox">${lockSVG(q.color)}</div>` : ""}
      <div class="opts" role="radiogroup">${ord.map((oi, i) => `<label class="opt ${sel === oi ? "on" : ""}"><input type="radio" name="tq" value="${oi}" ${sel === oi ? "checked" : ""}><span class="ol">${q.t === "tf" ? (oi ? "✕" : "✓") : letters[L][i]}</span><span class="ot">${esc(opts[oi])}</span></label>`).join("")}</div>
      <div class="qnav">
        <button type="button" class="btn" id="prev" ${S.qi === 0 ? "disabled" : ""}>${esc(x.prev)}</button>
        ${S.qi < n - 1 ? `<button type="button" class="btn primary" id="next">${esc(x.next)}</button>` : `<button type="button" class="btn primary" id="go">${esc(x.toPermits)}</button>`}
      </div>
    </article>
    <aside class="card pal"><div class="grid">${S.theory.map((id, i) =>
      `<button type="button" class="cell ${i === S.qi ? "cur" : ""} ${S.tAns[id] !== undefined ? "ans" : ""} ${S.flags[id] ? "flg" : ""}" data-i="${i}" aria-label="${esc(x.q)} ${i + 1}">${i + 1}</button>`).join("")}</div></aside>
  </div>`;
  $$("input[name=tq]").forEach(r => r.onchange = () => { S.tAns[q.id] = +r.value; save(); secTheory(); });
  $("#flag").onclick = () => { S.flags[q.id] = !S.flags[q.id]; save(); secTheory(); };
  $("#prev").onclick = () => { S.qi--; save(); secTheory(); };
  const nx = $("#next"); if (nx) nx.onclick = () => { S.qi++; save(); secTheory(); };
  const go = $("#go"); if (go) go.onclick = () => { S.sec = 1; save(); renderExam(); scrollTo(0, 0); };
  $$(".cell").forEach(c => c.onclick = () => { S.qi = +c.dataset.i; save(); secTheory(); });
}

function secPermits() {
  const x = u();
  $("#sec").innerHTML = `<div class="card"><h2 class="sh">${esc(x.pTitle)}</h2><p class="hint">${esc(x.pHint)}</p>
    ${S.permits.map((id, k) => { const p = PM(id), a = S.pAns[id] || []; return `<div class="pcase"><p class="pq"><b>${esc(x.caseN)} ${k + 1}</b>${esc(p[L])}</p>
      <div class="chips">${PERMITS.map(pm => `<label class="chip ${a.includes(pm) ? "on" : ""}"><input type="checkbox" data-p="${id}" value="${pm}" ${a.includes(pm) ? "checked" : ""}><span dir="ltr">${pm}</span></label>`).join("")}</div></div>`; }).join("")}
    <div class="qnav end"><button type="button" class="btn primary" id="go">${esc(x.toPractical)}</button></div></div>`;
  $$("input[data-p]").forEach(c => c.onchange = () => {
    const id = c.dataset.p, set = new Set(S.pAns[id] || []);
    c.checked ? set.add(c.value) : set.delete(c.value);
    S.pAns[id] = PERMITS.filter(p => set.has(p)); save();
    c.closest(".chip").classList.toggle("on", c.checked);
  });
  $("#go").onclick = () => { S.sec = 2; save(); renderExam(); scrollTo(0, 0); };
}

/* ---------- the permit form ---------- */
const PT_W = 595.32, PT_H = 841.92;
const PAIRS = { issSEC: "issCON", issCON: "issSEC", recSEC: "recCON", recCON: "recSEC", closed: "cancel", cancel: "closed" };
let zoom = 1;
function sigName(k) { const c = S.c; return ["recSig", "clSig"].includes(k) ? pname(c.rec) : pname(c.iss); }
function fieldHTML([k, t, x, y, w, h]) {
  const F = S.F, st = `left:${(x / PT_W * 100).toFixed(3)}%;top:${(y / PT_H * 100).toFixed(3)}%;width:${(w / PT_W * 100).toFixed(3)}%;height:${(h / PT_H * 100).toFixed(3)}%`;
  const lab = esc(FORM_LABEL[k][L]);
  if (t === "c") return `<button type="button" class="fx fc ${F[k] ? "on" : ""}" data-k="${k}" style="${st}" role="checkbox" aria-checked="${!!F[k]}" aria-label="${lab}"></button>`;
  if (t === "s") return `<button type="button" class="fx fs ${F[k] ? "on" : ""}" data-k="${k}" style="${st}" aria-label="${lab}">${F[k] ? `<span lang="${L}">${esc(sigName(k))}</span>` : ""}</button>`;
  const v = F[k] || "";
  return `<button type="button" class="fx ft ${v ? "on" : ""}" data-k="${k}" style="${st}" aria-label="${lab}${v ? ": " + esc(v) : ""}"><span dir="auto">${esc(v)}</span></button>`;
}
function secPractical() {
  const x = u(), c = S.c, fm = FORM_MAP[c.form];
  const total = fm.f.length, done = fm.f.filter(f => S.F[f[0]]).length;
  $("#sec").innerHTML = `<div class="prac">
    <section class="card">
      <div class="formhead"><h2 class="sh">${esc(x.formTitle)}</h2><span class="ftag ${c.form}" dir="ltr">${c.form === "mv" ? "MV" : "LV"} PTW</span></div>
      <details class="bd" open><summary>${esc(x.brief)}</summary>${briefHTML(c)}</details>
    </section>
    <section class="card formcard">
      <div class="ftools"><p class="hint">${esc(x.tapHint)}</p>
        <div class="zm"><span class="cnt" id="cnt">${done} / ${total} ${esc(x.filled)}</span>
        <button type="button" class="btn sm" id="zo" aria-label="${esc(x.zoomOut)}">−</button><button type="button" class="btn sm" id="zi" aria-label="${esc(x.zoomIn)}">+</button></div></div>
      <div class="pscroll" id="pscroll"><div class="pf" id="pf" style="width:${zoom * 100}%" dir="ltr">
        <img src="${fm.img}" alt="${c.form === "mv" ? "MV" : "LV"} PERMIT TO WORK" width="1240" height="1754" draggable="false">
        ${fm.f.map(fieldHTML).join("")}
      </div></div>
    </section>
    <section class="card"><h2 class="sh">${esc(x.spTitle)}</h2><p class="hint">${esc(x.spHint)}</p>
      ${["iso", "ret"].map(spBlock).join("")}
      <div class="qnav end"><button type="button" class="btn primary big" id="fin">${esc(x.finish)}</button></div>
    </section></div>`;
  $("#zi").onclick = () => setZoom(Math.min(3, zoom + .5));
  $("#zo").onclick = () => setZoom(Math.max(1, zoom - .5));
  $("#pf").onclick = e => { const b = e.target.closest(".fx"); if (b) tapField(b.dataset.k); };
  bindSP();
  $("#fin").onclick = askSubmit;
}
function setZoom(z) { zoom = z; const pf = $("#pf"); if (pf) pf.style.width = z * 100 + "%"; }
function refreshField(k) {
  const f = FORM_MAP[S.c.form].f.find(f => f[0] === k), el = $(`.fx[data-k="${k}"]`);
  if (el) el.outerHTML = fieldHTML(f);
  const fm = FORM_MAP[S.c.form], cnt = $("#cnt");
  if (cnt) cnt.textContent = `${fm.f.filter(f => S.F[f[0]]).length} / ${fm.f.length} ${u().filled}`;
}
function tapField(k) {
  const f = FORM_MAP[S.c.form].f.find(f => f[0] === k); if (!f) return;
  if (f[1] === "c") {
    S.F[k] = !S.F[k];
    if (S.F[k] && PAIRS[k] && S.F[PAIRS[k]]) { S.F[PAIRS[k]] = false; refreshField(PAIRS[k]); }
    save(); refreshField(k); return;
  }
  if (f[1] === "s") { S.F[k] = !S.F[k]; save(); refreshField(k); return; }
  openSheet(k);
}
function openSheet(k) {
  const x = u(), texts = FORM_MAP[S.c.form].f.filter(f => f[1] === "t").map(f => f[0]);
  const i = texts.indexOf(k), nextK = texts[i + 1];
  closeSheet();
  const d = document.createElement("div");
  d.className = "sheet"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-labelledby", "shl");
  d.innerHTML = `<div class="sbox"><label id="shl" for="shi">${esc(FORM_LABEL[k][L])}</label>
    <input id="shi" maxlength="80" autocomplete="off" dir="auto" value="${esc(S.F[k] || "")}">
    <div class="row"><button type="button" class="btn" id="shc">${esc(x.clear)}</button><span class="grow"></span>
    <button type="button" class="btn" id="shx">${esc(x.close)}</button>${nextK ? `<button type="button" class="btn primary" id="shn">${esc(x.nextField)}</button>` : `<button type="button" class="btn primary" id="shs">${esc(x.save)}</button>`}</div></div>`;
  document.body.appendChild(d);
  const inp = $("#shi"); inp.focus(); inp.select();
  const commit = () => { const v = inp.value.replace(/[\u0000-\u001f]/g, "").trim().slice(0, 80); if (v) S.F[k] = v; else delete S.F[k]; save(); refreshField(k); };
  $("#shc").onclick = () => { inp.value = ""; inp.focus(); };
  $("#shx").onclick = () => { commit(); closeSheet(); };
  const n = $("#shn"); if (n) n.onclick = () => { commit(); openSheet(nextK); scrollToField(nextK); };
  const s = $("#shs"); if (s) s.onclick = () => { commit(); closeSheet(); };
  inp.onkeydown = e => { if (e.key === "Enter") { e.preventDefault(); (n || s).click(); } if (e.key === "Escape") { commit(); closeSheet(); } };
  d.onclick = e => { if (e.target === d) { commit(); closeSheet(); } };
  scrollToField(k);
}
function scrollToField(k) {
  const el = $(`.fx[data-k="${k}"]`), sc = $("#pscroll"); if (!el || !sc) return;
  el.classList.add("cur"); setTimeout(() => el.classList.remove("cur"), 1400);
  const r = el.getBoundingClientRect(), vh = innerHeight;
  if (r.top < 70 || r.bottom > vh * .55) scrollBy({ top: r.top - vh * .25, behavior: "smooth" });
  if (zoom > 1) sc.scrollLeft += (r.left - sc.getBoundingClientRect().left) - sc.clientWidth / 3;
}
function closeSheet() { const s = $(".sheet"); if (s) s.remove(); }

function spBlock(k) {
  const x = u(), st = S.sp[k], txt = SP_STEPS[k][L];
  return `<div class="spb" data-sp="${k}"><div class="sphead"><h3>${esc(k === "iso" ? x.spIso : x.spRet)}</h3>
    <button type="button" class="btn sm" data-reset="${k}">${esc(x.resetSp)}</button></div>
    <ul class="splist">${st.order.map(i => { const pos = st.pick.indexOf(i);
      return `<li><button type="button" class="sp ${pos >= 0 ? "on" : ""}" data-k="${k}" data-i="${i}"><span class="spn">${pos >= 0 ? pos + 1 : ""}</span><span>${esc(txt[i])}</span></button></li>`; }).join("")}</ul></div>`;
}
function bindSP() {
  $$("button.sp").forEach(b => b.onclick = () => {
    const st = S.sp[b.dataset.k], i = +b.dataset.i, pos = st.pick.indexOf(i);
    if (pos >= 0) st.pick = st.pick.slice(0, pos); else st.pick.push(i);
    save(); redrawSP(b.dataset.k);
  });
  $$("[data-reset]").forEach(b => b.onclick = () => { S.sp[b.dataset.reset].pick = []; save(); redrawSP(b.dataset.reset); });
}
function redrawSP(k) { const y = scrollY; $(`.spb[data-sp="${k}"]`).outerHTML = spBlock(k); bindSP(); scrollTo(0, y); }

/* ---------- submit / scoring ---------- */
function unanswered() {
  let n = S.theory.filter(id => S.tAns[id] === undefined).length;
  n += S.permits.filter(id => !(S.pAns[id] || []).length).length;
  return n;
}
function askSubmit() {
  const x = u(), n = unanswered(), d = document.createElement("div");
  d.className = "modal"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true");
  d.innerHTML = `<div class="mbox"><p>${esc(x.confirm)}</p>${n ? `<p class="warn">${n} ${esc(x.unans)}</p>` : ""}
    <div class="row"><button type="button" class="btn" id="mno">${esc(x.no)}</button><button type="button" class="btn primary" id="myes">${esc(x.yes)}</button></div></div>`;
  document.body.appendChild(d); $("#myes").focus();
  $("#mno").onclick = () => d.remove();
  $("#myes").onclick = () => { d.remove(); submit(false); };
}
const sameSet = (a, b) => a.length === b.length && [...a].sort().join("|") === [...b].sort().join("|");
function score() {
  const th = S.theory.map(id => { const q = TH(id); return { q, ok: S.tAns[id] === q.a }; });
  const pm = S.permits.map(id => { const p = PM(id); return { p, ok: sameSet(S.pAns[id] || [], p.a) }; });
  const ff = gradeForm(S.c, S.F);
  const spOk = k => S.sp[k].pick.reduce((s, v, i) => s + (v === i ? 1 : 0), 0);
  const spTot = SP_STEPS.iso.ar.length + SP_STEPS.ret.ar.length;
  const thE = th.filter(z => z.ok).length, pmE = pm.filter(z => z.ok).length;
  const prE = ff.filter(z => z.ok).length + spOk("iso") + spOk("ret"), prT = ff.length + spTot;
  const earned = thE + pmE + prE, total = th.length + pm.length + prT;
  return { th, pm, ff, spOk, thE, thT: th.length, pmE, pmT: pm.length, prE, prT, earned, total, pct: Math.round(earned / total * 1000) / 10 };
}
function submit(auto) {
  if (!S || S.done) return;
  closeSheet();
  S.done = true; S.auto = auto; S.t1 = Math.min(Date.now(), S.end); S.res = score(); clearInterval(tick);
  store.sset(RUN_KEY, null);
  const m = $(".modal"); if (m) m.remove();
  render(); scrollTo(0, 0);
}

/* ---------- result ---------- */
let onlyWrong = true;
function renderResult() {
  const x = u(); S.res = score(); const r = S.res, pass = r.pct >= PASS;
  const secs = Math.max(0, Math.round((S.t1 - S.t0) / 1000));
  const bar = (lbl, e, t) => `<div class="sb"><div class="sbl"><span>${esc(lbl)}</span><b dir="ltr">${e} / ${t}</b></div><div class="sbt"><i style="width:${t ? (e / t * 100).toFixed(1) : 0}%"></i></div></div>`;
  const ansTxt = (opts, v) => v === undefined || (Array.isArray(v) && !v.length) ? `<i>${esc(x.none)}</i>` : esc(Array.isArray(v) ? v.map(i => opts[i]).join("، ") : opts[v]);
  const item = (ok, q, yours, right, src, extra = "") => (onlyWrong && ok) ? "" : `<li class="rv ${ok ? "ok" : "bad"}">
      <span class="rk" aria-hidden="true">${ok ? "✓" : "✕"}</span><div class="rb"><p class="rq">${esc(q)}</p>${extra}
      ${ok || yours == null ? "" : `<p class="ry"><b>${esc(x.your)}:</b> ${yours}</p>`}<p class="rc"><b>${esc(x.correct)}:</b> ${right}</p>
      ${srcHTML(src)}</div></li>`;
  const thList = r.th.map(({ q, ok }) => { const o = qOpts(q); return item(ok, q[L].q, ansTxt(o, S.tAns[q.id]), esc(o[q.a]), q.src, q.t === "lock" ? `<div class="lockbox sm">${lockSVG(q.color, 1)}</div>` : ""); }).join("");
  const pmList = r.pm.map(({ p, ok }) => item(ok, p[L], (S.pAns[p.id] || []).length ? `<span dir="ltr">${esc(S.pAns[p.id].join(" + "))}</span>` : `<i>${esc(x.none)}</i>`, `<span dir="ltr">${esc(p.a.join(" + "))}</span>`, p.src)).join("");
  const ffList = r.ff.map(z => item(z.ok, z.label, null, esc(z.rule), resolveSrc(z.src))).join("");
  const spList = ["iso", "ret"].map(k => {
    const ok = r.spOk(k) === SP_STEPS[k].ar.length, t = SP_STEPS[k][L];
    return item(ok, `${k === "iso" ? x.spIso : x.spRet} (${r.spOk(k)}/${t.length})`,
      S.sp[k].pick.length ? `<ol class="mini">${S.sp[k].pick.map(i => `<li>${esc(t[i])}</li>`).join("")}</ol>` : `<i>${esc(x.none)}</i>`,
      `<ol class="mini">${t.map(s => `<li>${esc(s)}</li>`).join("")}</ol>`, [{ d: "DH", loc: L === "ar" ? "الملحق 12" : "Appendix 13", x: L === "ar" ? "البرنامج التشغيلي لأعمال المقاول على الجهد المنخفض (النموذج الرسمي) — ترتيب خطوات العزل ثم خطوات إعادة الخدمة كما هي في النموذج." : "LV switching program for contractor work (official form) — isolation steps, then return-to-service steps, in the form's order." }]);
  }).join("");
  const date = new Date(S.t1).toLocaleString(L === "ar" ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB", { dateStyle: "medium", timeStyle: "short" });
  const empty = `<li class="rv ok"><span class="rk">✓</span><div class="rb"><p class="rq">${esc(L === "ar" ? "لا أخطاء في هذا الجزء" : "No mistakes in this part")}</p></div></li>`;
  app.innerHTML = head(false) + `<main class="res">
    <section class="card sheetc ${pass ? "pass" : "fail"}">
      <div class="shead"><div><h1>${esc(x.result)}</h1>
        <p class="meta">${S.name ? `<b>${esc(S.name)}</b> — ` : ""}${esc(x.roles[S.role])}<br><span dir="ltr">${esc(date)}</span></p></div>
        <div class="stamp"><span>${esc(pass ? x.pass : x.fail)}</span></div></div>
      ${S.auto ? `<p class="warn">${esc(x.timeUp)}</p>` : ""}
      <div class="big"><b dir="ltr">${r.pct}%</b><span>${esc(x.passNote)}</span></div>
      ${bar(x.theory, r.thE, r.thT)}${bar(x.permits, r.pmE, r.pmT)}${bar(x.practical, r.prE, r.prT)}
      <p class="meta">${esc(x.total)}: <b dir="ltr">${r.earned} / ${r.total}</b> — ${esc(x.time)}: <b dir="ltr">${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}</b></p>
      <div class="row acts"><button type="button" class="btn primary" id="again">${esc(x.again)}</button><button type="button" class="btn" id="prt">${esc(x.print)}</button><a class="btn" href="../?lang=${L}">${esc(x.home)}</a></div>
    </section>
    <section class="card"><div class="sphead"><h2 class="sh">${esc(x.review)}</h2>
      <div class="seg" role="group"><button type="button" class="${onlyWrong ? "on" : ""}" id="ow" aria-pressed="${onlyWrong}">${esc(x.onlyWrong)}</button><button type="button" class="${onlyWrong ? "" : "on"}" id="al" aria-pressed="${!onlyWrong}">${esc(x.all)}</button></div></div>
      <h3 class="rh">${esc(x.theory)}</h3><ul class="rvl">${thList || empty}</ul>
      <h3 class="rh">${esc(x.permits)}</h3><ul class="rvl">${pmList || empty}</ul>
      <h3 class="rh">${esc(x.practical)} — ${S.c.form === "mv" ? "MV" : "LV"} PTW</h3><ul class="rvl">${ffList + spList || empty}</ul>
    </section>
    <p class="disc">${esc(x.disc)}</p></main>`;
  bindLang();
  $("#again").onclick = () => { S = null; render(); scrollTo(0, 0); };
  $("#prt").onclick = () => print();
  $("#ow").onclick = () => { onlyWrong = true; renderResult(); };
  $("#al").onclick = () => { onlyWrong = false; renderResult(); };
}

/* ---------- study mode ---------- */
let sq = "", sdoc = "", slimit = 25;
function renderStudy() {
  const x = u();
  app.innerHTML = head(false) + `<main class="study">
    <div class="sthead"><button type="button" class="btn sm" id="sback">${esc(x.back)}</button><h1>${esc(x.studyTitle)}</h1></div>
    <p class="lead">${esc(x.studyLead)}</p>
    <div class="filters"><input id="sq" type="search" placeholder="${esc(x.search)}" value="${esc(sq)}" dir="auto">
      <select id="sdoc"><option value="">${esc(x.allDocs)}</option>${Object.entries(EXAM_DOCS).map(([k, d]) => `<option value="${k}" ${sdoc === k ? "selected" : ""}>${esc(d[L])}</option>`).join("")}</select></div>
    <p class="hint" id="scount"></p><ol class="slist" id="slist"></ol>
    <div class="qnav end"><button type="button" class="btn" id="smore">${esc(x.more)}</button></div></main>`;
  bindLang();
  $("#sback").onclick = () => { view = "intro"; render(); scrollTo(0, 0); };
  $("#sq").oninput = e => { sq = e.target.value; slimit = 25; fillStudy(); };
  $("#sdoc").onchange = e => { sdoc = e.target.value; slimit = 25; fillStudy(); };
  $("#smore").onclick = () => { slimit += 25; fillStudy(); };
  fillStudy();
}
function fillStudy() {
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
    const ans = k === "t" ? esc(qOpts(q)[q.a]) : `<span dir="ltr">${esc(q.a.join(" + "))}</span>`;
    return `<li class="sitem"><p class="rq">${esc(k === "t" ? q[L].q : q[L])}</p>${q.t === "lock" ? `<div class="lockbox sm">${lockSVG(q.color, 1)}</div>` : ""}
      <p class="rc"><b>${esc(x.correct)}:</b> ${ans}</p>${srcHTML(q.src)}</li>`;
  }).join("");
  $("#smore").hidden = list.length <= slimit;
}

window.addEventListener("beforeunload", () => save());
setLang(L);
})();
