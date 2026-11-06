/* Fire lab loader: picks the visitor's language (?lang=ar|en|ur, default ar),
   sets direction and page chrome, then loads that language's build of the lab. */
const L = (l => ["ar", "en", "ur"].includes(l) ? l : "ar")(new URLSearchParams(location.search).get("lang"));
const V = "202611061714";
const UI = {
  ar: { title: "مختبر مكافحة الحريق", sub: "أساسيات مكافحة الحريق · تعلّم بالتجربة", back: "رجوع للورشة ←", hint: "اسحب لتدوير المشهد" },
  en: { title: "Fire Fighting Lab", sub: "Fire fighting basics · learn by doing", back: "← Back to workshop", hint: "Drag to rotate the scene" },
  ur: { title: "آگ بجھانے کی لیب", sub: "آگ بجھانے کی بنیادی باتیں · تجربے سے سیکھیں", back: "ورکشاپ پر واپس ←", hint: "منظر گھمانے کے لیے کھینچیں" }
}[L];
const h = document.documentElement;
h.lang = L; h.dir = L === "en" ? "ltr" : "rtl";
document.title = UI.title;
const $ = s => document.querySelector(s);
$(".brand h1").textContent = UI.title;
$(".brand span").textContent = UI.sub;
const back = $("a.back"); back.textContent = UI.back; back.href = "../?t=ws&w=fire&lang=" + L;
$("#hint").textContent = UI.hint;
if (L === "ur") {
  const f = document.createElement("link"); f.rel = "stylesheet";
  f.href = "https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap";
  document.head.appendChild(f);
}
import(`./fire-${L}.js?v=${V}`);
