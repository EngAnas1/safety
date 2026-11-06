/* يعيد زر الرجوع للورشة بنفس لغة الزائر */
(function () {
  var l = new URLSearchParams(location.search).get("lang");
  if (["ar", "en", "ur"].indexOf(l) < 0) l = "ar";
  var a = document.querySelector("a.back");
  if (a) a.href = "../?t=ws&w=fire&lang=" + l;
})();
