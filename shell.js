/* Navigation shell in the exam's style: side menu on computers, Instagram-style tab bar on phones.
   Builds links only from fixed paths (no user input reaches the markup). Re-renders when the page language changes. */
(() => {
  "use strict";
  if (window.top !== window.self) return;
  const base = (document.currentScript && document.currentScript.dataset.base) || "";
  const here = document.currentScript && document.currentScript.dataset.here || "";
  const SVG = d => `<svg class="xs-ic" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const K = "#101115";
  const IC = {
    lsr: [SVG('<path d="M8.3 2.8h7.4l5.3 5.3v7.4l-5.3 5.3H8.3L3 15.5V8.1z"/><path d="M12 7.6v5.2M12 16.2v.2"/>'),
          SVG(`<path fill="currentColor" d="M8.3 2.8h7.4l5.3 5.3v7.4l-5.3 5.3H8.3L3 15.5V8.1z"/><path stroke="${K}" stroke-width="2.2" d="M12 7.6v5.2M12 16.2v.2"/>`)],
    risk: [SVG('<rect x="5" y="4" width="14" height="17" rx="2.6"/><path d="M9 4V2.8h6V4"/><path d="m8.5 12 2 2 4-4.2M8.5 17.4h7"/>'),
           SVG(`<rect x="5" y="4" width="14" height="17" rx="2.6" fill="currentColor"/><path d="M9 4V2.8h6V4"/><path stroke="${K}" stroke-width="2" d="m8.5 12 2 2 4-4.2M8.5 17.4h7"/>`)],
    ws: [SVG('<path d="M14.6 6.2a4.2 4.2 0 0 0 5.2 5.2l-8.6 8.6a2.4 2.4 0 0 1-3.4-3.4l8.6-8.6"/><path d="m14.6 6.2 2.6-2.6a4.2 4.2 0 0 0-5.2 5.2"/>'),
         SVG('<path fill="currentColor" d="M14.6 6.2a4.2 4.2 0 0 0 5.2 5.2l-8.6 8.6a2.4 2.4 0 0 1-3.4-3.4l8.6-8.6"/><path d="m14.6 6.2 2.6-2.6a4.2 4.2 0 0 0-5.2 5.2"/>')],
    exam: [SVG('<circle cx="12" cy="13.6" r="7.4"/><path d="M9.8 2.6h4.4M12 2.6v3.6M12 13.6v-3.4M18.3 6.9l1.4-1.4"/>'),
           SVG(`<circle cx="12" cy="13.6" r="7.6" fill="currentColor"/><path d="M9.8 2.6h4.4M12 2.6v3.4M18.3 6.9l1.4-1.4"/><path stroke="${K}" stroke-width="2.2" d="M12 13.6v-3.6"/><circle cx="12" cy="13.6" r="1.1" fill="${K}" stroke="none"/>`)],
    lab: [SVG('<path d="M9.5 3h5M10.2 3v6.3L4.8 18.4A1.8 1.8 0 0 0 6.4 21h11.2a1.8 1.8 0 0 0 1.6-2.6l-5.4-9.1V3"/><path d="M7.4 14.6h9.2"/>'),
          SVG(`<path fill="currentColor" d="M10.2 3v6.3L4.8 18.4A1.8 1.8 0 0 0 6.4 21h11.2a1.8 1.8 0 0 0 1.6-2.6l-5.4-9.1V3z"/><path d="M9.5 3h5"/><path stroke="${K}" stroke-width="1.8" d="M7.6 14.6h8.8"/>`)]
  };
  const T = {
    ar: { lsr: "قواعد الحفاظ على الحياة", ws: "الورش", exam: "الاختبار", lab: "المختبر", h1: "التوعية", h2: "التطبيق", site: "منصة التوعية بالسلامة", sub: "م. أنس الزهراني", by: "إعداد وتصميم", wa: "واتساب", call: "اتصال" },
    en: { lsr: "Life Saving Rules", ws: "Workshops", exam: "Exam", lab: "Lab", h1: "Awareness", h2: "Practice", site: "Safety awareness", sub: "Eng. Anas Alzahrani", by: "Prepared and designed by", wa: "WhatsApp", call: "Call" },
    ur: { lsr: "زندگی بچانے والے قوانین", ws: "ورکشاپس", exam: "امتحان", lab: "لیب", h1: "آگاہی", h2: "مشق", site: "حفاظتی آگاہی", sub: "انجینئر انس الزہرانی", by: "تیاری اور ڈیزائن", wa: "واٹس ایپ", call: "کال" }
  };
  const ITEMS = ["lsr", "ws", "exam", "lab"];
  const PIC = { lsr: "img/t-lsr.webp", ws: "img/t-ws.webp", exam: "img/t-exam.webp", lab: "img/ic/fire.webp" };
  const topicTitle = (id, l) => { try { const t = TOPICS.find(x => x.id === id); return t && t[l] && t[l].title; } catch (e) { return null; } };
  const href = (k, l) => {
    const q = "lang=" + encodeURIComponent(l);
    if (k === "lsr") return base + "./?" + q;
    if (k === "ws") return base + "./?t=ws&" + q;
    if (k === "exam") return base + "exam/";
    return base + "lab/fire.html?" + q;
  };
  const current = () => {
    if (here) return here;
    const t = new URLSearchParams(location.search).get("t");
    return t === "risk" || t === "ws" ? "ws" : "lsr";
  };
  const tel = (typeof CONFIG !== "undefined" && CONFIG.ownerIntl ? String(CONFIG.ownerIntl) : "966543194250").replace(/\D/g, "");
  const show = typeof CONFIG !== "undefined" && CONFIG.ownerPhone ? String(CONFIG.ownerPhone) : "054 319 4250";
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  let side = null, tab = null, lastLang = null;
  function build() {
    const l = ["ar", "en", "ur"].includes(document.documentElement.lang) ? document.documentElement.lang : "ar";
    if (l === lastLang && side) return; lastLang = l;
    const t = T[l], cur = current();
    const name = k => (k === "lsr" || k === "ws") && topicTitle(k, l) || t[k];
    const link = (k, cls) => `<a class="${cls}${k === cur ? " on" : ""}" href="${esc(href(k, l))}"${k === cur ? ' aria-current="page"' : ""}><img class="xs-pic" src="${esc(base + PIC[k])}" alt="" width="40" height="40"><span class="tl">${esc(name(k))}</span></a>`;
    if (!side) { side = document.createElement("aside"); side.className = "xs-side"; document.body.appendChild(side); }
    if (!tab) { tab = document.createElement("nav"); tab.className = "xs-tab"; document.body.appendChild(tab); }
    side.setAttribute("aria-label", t.site); tab.setAttribute("aria-label", t.site);
    side.innerHTML = `<a class="xs-brand" href="${esc(href("lsr", l))}"><span class="m" aria-hidden="true">⛑️</span><span>${esc(t.site)}<small>${esc(t.sub)}</small></span></a>
      <div class="xs-h">${esc(t.h1)}</div>${["lsr", "ws"].map(k => link(k, "xs-nav")).join("")}
      <div class="xs-h">${esc(t.h2)}</div>${["exam", "lab"].map(k => link(k, "xs-nav")).join("")}
      <div class="xs-grow"></div>`;
    tab.innerHTML = ITEMS.map(k => link(k, "")).join("");
    document.documentElement.classList.add("xs"); if (here === "lab") document.documentElement.classList.add("xs-lab");
  }
  new MutationObserver(build).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();

  /* compact while scrolling down, full size when scrolling up (like Instagram) */
  let lastY = 0, ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      if (tab) { if (y > lastY + 6 && y > 80) tab.classList.add("mini"); else if (y < lastY - 6 || y < 40) tab.classList.remove("mini"); }
      lastY = y; ticking = false;
    });
  }, { passive: true });
})();
