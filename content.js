/* =====================================================================
   ⚙️  ملف الإعدادات والمحتوى — كل التعديلات هنا فقط
   ===================================================================== */

const CONFIG = {
  // اسمك كما يظهر في الموقع
  ownerName: { ar: "م. أنس الزهراني", en: "Eng. Anas Alzahrani", ur: "انجینئر انس الزہرانی" },
  // سطر تحت اسمك في قسم "إعداد وتصميم" — عدّله كما تحب
  ownerLine: { ar: "السلامة قرار تتخذه قبل كل مهمة، لأن أهلك ينتظرونك.", en: "Safety is a decision you make before every task, because your family is waiting for you.", ur: "حفاظت ایک فیصلہ ہے جو آپ ہر کام سے پہلے کرتے ہیں، کیونکہ آپ کے گھر والے آپ کا انتظار کر رہے ہیں۔" },
  // الشريط العلوي (نفس الموجود في المقطع) — اتركه فارغًا "" لإخفائه
  siteTag: { ar: "", en: "", ur: "" },

  // روابط المقاطع لكل موضوع ولكل لغة: ملف داخل مجلد videos أو رابط يوتيوب
  videos: {
    lsr:  { ar: "videos/lsr-ar.mp4",  en: "videos/lsr-en.mp4",  ur: "videos/lsr-ur.mp4" },
    risk: { ar: "videos/risk-ar.mp4", en: "videos/risk-en.mp4", ur: "videos/risk-en.mp4" }
  },
  // إذا كان المقطع بلغة غير لغة الصفحة: اكتب لغته هنا لتظهر ملاحظة تحت المقطع
  // (تقييم المخاطر ما له مقطع أوردو، فصفحة الأوردو تعرض المقطع الإنجليزي)
  videoLang: { risk: { ur: "en" } },
  // صورة الغلاف قبل التشغيل (اختياري)
  posters: {
    lsr:  { ar: "videos/lsr-ar.jpg",  en: "videos/lsr-en.jpg",  ur: "videos/lsr-ur.jpg" },
    risk: { ar: "videos/risk-ar.jpg", en: "videos/risk-en.jpg", ur: "videos/risk-en.jpg" }
  }
};

/* نصوص الواجهة */
const UI = {
  ar: {
    dir: "rtl", wsKick: "ورشة", wsOpen: "ابدأ الورشة", wsAll: "كل الورش", wsVideo: "مقطع", wsQs: "{n} أسئلة", sources: "المصادر", sourcesSub: "اضغط على أي مصدر لفتح صفحته الرسمية", openSource: "فتح المصدر", checkTitle: "قبل الدخول", videoNote: "المقطع باللغة {lang}", langName: { ar: "العربية", en: "الإنجليزية" }, quizTitle: "اختبر نفسك", quizSub: "5 أسئلة عن {title}. هل تقدر تجيب 5 من 5؟", startQuiz: "ابدأ الاختبار", qOf: "سؤال {n} من {t}", correct: "إجابة صحيحة!", wrong: "إجابة خاطئة", nextQ: "التالي", seeResult: "النتيجة", yourScore: "نتيجتك", retry: "أعد المحاولة", perfect: "5 من 5! ممتاز، أتقنت {title}", almost: "قريب! حاول توصل 5 من 5", best: "أفضل نتيجة", refs: "المرجعية", heroTitle: "ارجع لأهلك سالم", heroSub: "كل يوم، وفي كل مهمة. ستة مواضيع قصيرة بلغتك تحميك وتحمي فريقك.", start: "ابدأ بالقواعد العشر", tip: "نصيحة اليوم", badges: "شاراتك", progress: "أكملت {n} من {t}", allDone: "أنت بطل سلامة 🏆", mission: "المهمة", tapHint: "اضغط على كل بند بعد ما تفهمه", locked: "علّم كل البنود لتفتح الشارة", claim: "استلم الشارة", unlocked: "حصلت على الشارة!", next: "المهمة التالية", missions: "مهماتك", watch: "شاهد", lead: "الموضوع الرئيسي", tenRules: "القواعد العشر", related: "مواضيع أخرى", read: "اقرأ", minutes: "دقائق", section: "السلامة", site: "توعية السلامة", by: "إعداد وتصميم", rule: "القاعدة", pick: "اختر لغتك",
    topics: "مواضيع السلامة", keyPoints: "أهم النقاط", doTitle: "افعل", dontTitle: "لا تفعل",
    noVideo: "المقطع يُضاف قريبًا", pledge: "فهمت وألتزم", pledged: "ملتزم",
    pledgedNote: "شكرًا لك. سلامتك تهمنا.", home: "كل المواضيع", lang: "اللغة",
    done: "تمت مشاهدته", stop: "لكلٍّ منّا صلاحية إيقاف أي عمل غير آمن."
  },
  en: {
    dir: "ltr", wsKick: "Workshop", wsOpen: "Start the workshop", wsAll: "All workshops", wsVideo: "Video", wsQs: "{n} questions", sources: "Sources", sourcesSub: "Tap any source to open its official page", openSource: "Open source", checkTitle: "Before entry", videoNote: "This video is in {lang}", langName: { ar: "Arabic", en: "English" }, quizTitle: "Test yourself", quizSub: "5 questions on {title}. Can you score 5 out of 5?", startQuiz: "Start the quiz", qOf: "Question {n} of {t}", correct: "Correct!", wrong: "Not quite", nextQ: "Next", seeResult: "See result", yourScore: "Your score", retry: "Try again", perfect: "5 out of 5! You've mastered {title}", almost: "Close! Try for 5 out of 5", best: "Best score", refs: "Based on", heroTitle: "Go home safe.", heroSub: "Every day, every job. Six short topics in your language that protect you and your crew.", start: "Start with the 10 rules", tip: "Tip of the day", badges: "Your badges", progress: "{n} of {t} complete", allDone: "You're a safety hero 🏆", mission: "Mission", tapHint: "Tap each item once you understand it", locked: "Check every item to unlock the badge", claim: "Claim your badge", unlocked: "Badge unlocked!", next: "Next mission", missions: "Your missions", watch: "Watch", lead: "Top story", tenRules: "The ten rules", related: "More topics", read: "Read", minutes: "min", section: "Safety", site: "Safety Awareness", by: "Prepared & designed by", rule: "Rule", pick: "Choose your language",
    topics: "Safety topics", keyPoints: "Key points", doTitle: "Do", dontTitle: "Don't",
    noVideo: "Video coming soon", pledge: "I understand and commit", pledged: "Committed",
    pledgedNote: "Thank you. Your safety matters.", home: "All topics", lang: "Language",
    done: "Watched", stop: "Each of us has the authority to stop any unsafe work."
  },
  ur: {
    dir: "rtl", wsKick: "ورکشاپ", wsOpen: "ورکشاپ شروع کریں", wsAll: "تمام ورکشاپس", wsVideo: "ویڈیو", wsQs: "{n} سوال", sources: "حوالہ جات", sourcesSub: "کسی بھی حوالے پر ٹیپ کریں تاکہ اس کا سرکاری صفحہ کھلے", openSource: "حوالہ کھولیں", checkTitle: "داخلے سے پہلے", videoNote: "یہ ویڈیو {lang} میں ہے", langName: { ar: "عربی", en: "انگریزی" }, quizTitle: "خود کو آزمائیں", quizSub: "{title} پر 5 سوال۔ کیا آپ 5 میں سے 5 لے سکتے ہیں؟", startQuiz: "ٹیسٹ شروع کریں", qOf: "سوال {n} از {t}", correct: "درست جواب!", wrong: "غلط جواب", nextQ: "اگلا", seeResult: "نتیجہ", yourScore: "آپ کا اسکور", retry: "دوبارہ کوشش کریں", perfect: "5 میں سے 5! شاباش، آپ نے {title} سیکھ لیا", almost: "قریب! 5 میں سے 5 کی کوشش کریں", best: "بہترین اسکور", refs: "حوالہ", heroTitle: "محفوظ گھر واپس جائیں", heroSub: "ہر دن، ہر کام میں۔ آپ کی زبان میں چھ مختصر موضوعات جو آپ اور آپ کی ٹیم کی حفاظت کرتے ہیں۔", start: "دس قوانین سے شروع کریں", tip: "آج کی ٹِپ", badges: "آپ کے بیج", progress: "{t} میں سے {n} مکمل", allDone: "آپ حفاظت کے ہیرو ہیں 🏆", mission: "مشن", tapHint: "ہر نکتہ سمجھنے کے بعد اس پر ٹیپ کریں", locked: "بیج کھولنے کے لیے تمام نکات پر نشان لگائیں", claim: "اپنا بیج لیں", unlocked: "بیج مل گیا!", next: "اگلا مشن", missions: "آپ کے مشن", watch: "دیکھیں", lead: "اہم موضوع", tenRules: "دس قوانین", related: "مزید موضوعات", read: "پڑھیں", minutes: "منٹ", section: "حفاظت", site: "حفاظتی آگاہی", by: "تیاری و ڈیزائن", rule: "اصول", pick: "اپنی زبان منتخب کریں",
    topics: "حفاظتی موضوعات", keyPoints: "اہم نکات", doTitle: "کریں", dontTitle: "نہ کریں",
    noVideo: "ویڈیو جلد شامل کی جائے گی", pledge: "میں سمجھ گیا اور عمل کروں گا", pledged: "عہد کر لیا",
    pledgedNote: "شکریہ۔ آپ کی حفاظت اہم ہے۔", home: "تمام موضوعات", lang: "زبان",
    done: "دیکھ لیا", stop: "ہم میں سے ہر ایک کو کسی بھی غیر محفوظ کام کو روکنے کا اختیار ہے۔"
  }
};

/* المواضيع */
const TOPICS = [
  {
    id: "lsr", emoji: "🛑", stop: true,
    ar: { title: "قواعد الحفاظ على الحياة", intro: "القواعد العشر تحمي حياتك. لا استثناء ولا اختصار." },
    en: { title: "Life Saving Rules", intro: "Ten rules that protect your life. No exceptions, no shortcuts." },
    ur: { title: "زندگی بچانے والے قوانین", intro: "دس قوانین جو آپ کی زندگی کی حفاظت کرتے ہیں۔ کوئی رعایت نہیں، کوئی شارٹ کٹ نہیں۔" },
    // ✓ = true   ✕ = false   بدون علامة = null
    rules: [
      { emoji: "🔒",
        ar: { t: "عزل الطاقة", items: [[null,"اعزل الطاقة قبل بدء العمل"],[null,"كهربائية • ميكانيكية • هيدروليكية"],[true,"اعزل • اقفل • علّق البطاقة • افحص"]] },
        en: { t: "Energy Isolation", items: [[null,"Isolate energy before work"],[null,"Electrical • Mechanical • Hydraulic"],[true,"Isolate • Lock • Tag • Test"]] },
        ur: { t: "توانائی کی آئسولیشن", items: [[null,"کام سے پہلے توانائی الگ کریں"],[null,"بجلی • مکینیکل • ہائیڈرولک"],[true,"الگ کریں • تالا لگائیں • ٹیگ لگائیں • ٹیسٹ کریں"]] } },
      { emoji: "📝",
        ar: { t: "تصريح العمل", items: [[true,"التصريح الصحيح قبل أن تبدأ"],[null,"الطاقة • الحفر • العمل الساخن • المرتفعات"]] },
        en: { t: "Work Permit", items: [[true,"Right permit before you start"],[null,"Energy • Excavation • Hot work • Height"]] },
        ur: { t: "ورک پرمٹ", items: [[true,"کام شروع کرنے سے پہلے درست پرمٹ"],[null,"توانائی • کھدائی • ہاٹ ورک • اونچائی"]] } },
      { emoji: "⛑️",
        ar: { t: "معدات الوقاية الشخصية", items: [[null,"خط دفاعك الأخير"],[null,"الخوذة • حذاء السلامة • النظارة • الملابس المناسبة"],[true,"ارتدها طوال وقت العمل"],[true,"افحصها قبل كل استخدام"]] },
        en: { t: "Personal Protective Equipment", items: [[null,"Your last line of defense"],[null,"Helmet • Safety shoes • Glasses • Clothing"],[true,"Wear it for the whole job"],[true,"Inspect it before every use"]] },
        ur: { t: "ذاتی حفاظتی سامان", items: [[null,"آپ کی آخری دفاعی لائن"],[null,"ہیلمٹ • حفاظتی جوتے • چشمہ • مناسب لباس"],[true,"پورے کام کے دوران پہنیں"],[true,"ہر استعمال سے پہلے چیک کریں"]] } },
      { emoji: "🧗",
        ar: { t: "العمل على المرتفعات", items: [[null,"1.8 متر فأكثر: حماية من السقوط"],[true,"نظام منع سقوط مثبّت"],[true,"مربوط طوال الوقت"],[true,"حبل مزدوج عند صعود الأبراج"]] },
        en: { t: "Working at Height", items: [[null,"1.8 m or higher: fall protection"],[true,"Fall protection system installed"],[true,"Tied off at all times"],[true,"Double lanyard on towers"]] },
        ur: { t: "اونچائی پر کام", items: [[null,"1.8 میٹر یا زیادہ: گرنے سے حفاظت"],[true,"گرنے سے بچاؤ کا نظام نصب ہو"],[true,"ہر وقت بندھے رہیں"],[true,"ٹاور پر ڈبل لینیارڈ"]] } },
      { emoji: "🛡️",
        ar: { t: "تجاوز وسائل تحكم السلامة", items: [[false,"لا تعطّل الإيقاف الطارئ"],[false,"ولا كشف الغاز والحريق"],[false,"لا تتخطَّ الحواجز"]] },
        en: { t: "Bypassing Safety Controls", items: [[false,"Never disable emergency shutdown"],[false,"Or gas and fire detection"],[false,"Never cross barriers"]] },
        ur: { t: "حفاظتی کنٹرولز کو بائی پاس کرنا", items: [[false,"ایمرجنسی شٹ ڈاؤن کبھی بند نہ کریں"],[false,"نہ گیس اور آگ کا ڈیٹیکشن"],[false,"رکاوٹیں کبھی پار نہ کریں"]] } },
      { emoji: "🔥",
        ar: { t: "العمل الساخن", items: [[false,"لا لحام ولا قطع بدون تصريح"],[true,"تصريح ساري الصلاحية"],[true,"أزل المواد القابلة للاشتعال"]] },
        en: { t: "Hot Work", items: [[false,"No welding or cutting without permit"],[true,"Valid work permit"],[true,"Remove flammable materials"]] },
        ur: { t: "ہاٹ ورک", items: [[false,"پرمٹ کے بغیر ویلڈنگ یا کٹنگ نہیں"],[true,"درست ورک پرمٹ"],[true,"آتش گیر مواد ہٹا دیں"]] } },
      { emoji: "🕳️",
        ar: { t: "دخول الأماكن المحصورة", items: [[true,"تصريح دخول"],[true,"عزل مصادر الطاقة"],[true,"اختبار الهواء"],[true,"مراقب عند المدخل طوال الوقت"]] },
        en: { t: "Confined Space Entry", items: [[true,"Entry permit"],[true,"Energy isolated"],[true,"Air tested"],[true,"Attendant at the entrance"]] },
        ur: { t: "تنگ جگہ میں داخلہ", items: [[true,"داخلے کا پرمٹ"],[true,"توانائی الگ کی گئی ہو"],[true,"ہوا کا ٹیسٹ"],[true,"داخلی راستے پر نگران موجود ہو"]] } },
      { emoji: "⚙️",
        ar: { t: "العمل في منطقة الخطر", items: [[null,"كن يقظًا ومنتبهًا"],[null,"الخطر: متحرك • متطاير • ساقط"],[false,"لا تقف بين متحرك وثابت"]] },
        en: { t: "Line of Fire", items: [[null,"Stay alert"],[null,"Danger: Moving • Flying • Falling"],[false,"Never stand between moving and fixed"]] },
        ur: { t: "خطرے کی لائن", items: [[null,"چوکس رہیں"],[null,"خطرہ: حرکت کرتی • اڑتی • گرتی چیزیں"],[false,"حرکت کرتی اور ساکن چیز کے درمیان کبھی نہ کھڑے ہوں"]] } },
      { emoji: "🏗️",
        ar: { t: "عمليات الرفع", items: [[true,"خطة رفع معتمدة"],[true,"مشغّل مؤهل"],[true,"معدات مفحوصة"],[true,"مسافة آمنة من خطوط الكهرباء"],[false,"لا تتجاوز حد الحمولة"]] },
        en: { t: "Lifting Operations", items: [[true,"Approved lift plan"],[true,"Qualified operator"],[true,"Inspected equipment"],[true,"Safe distance from power lines"],[false,"Never exceed the load limit"]] },
        ur: { t: "لفٹنگ آپریشنز", items: [[true,"منظور شدہ لفٹ پلان"],[true,"اہل آپریٹر"],[true,"چیک شدہ آلات"],[true,"بجلی کی لائنوں سے محفوظ فاصلہ"],[false,"وزن کی حد سے کبھی تجاوز نہ کریں"]] } },
      { emoji: "🚙",
        ar: { t: "قيادة المركبات أو المعدات", items: [[true,"رخصة قيادة سارية"],[true,"مرتاح ومنتبه"]] },
        en: { t: "Driving Vehicles & Equipment", items: [[true,"Valid driving license"],[true,"Rested and alert"]] },
        ur: { t: "گاڑیاں اور آلات چلانا", items: [[true,"درست ڈرائیونگ لائسنس"],[true,"آرام کیا ہوا اور چوکس"]] } }
    ]
  },

  {
    id: "risk", emoji: "📋",
    ar: { title: "تقييم المخاطر", intro: "دقائق قليلة في الموقع تكشف الخطر قبل أن يقع. هذا تقييم إضافي فوق التقييم الأساسي المعتمد للمهمة." },
    en: { title: "Risk Assessment", intro: "A few minutes on site reveal the hazard before it strikes. This is an extra check on top of the job's approved base assessment." },
    ur: { title: "رسک اسیسمنٹ", intro: "سائٹ پر چند منٹ خطرہ ہونے سے پہلے دکھا دیتے ہیں۔ یہ کام کی منظور شدہ بنیادی اسیسمنٹ کے اوپر ایک اضافی جانچ ہے۔" }
  },

  {
    id: "ws", emoji: "🛠️",
    ar: { title: "الورش", intro: "ورش توعوية قصيرة: مقطع، ومحتوى، ومصادر رسمية، واختبار في آخر كل ورشة." },
    en: { title: "Workshops", intro: "Short awareness workshops: a video, the content, official sources, and a quiz at the end of each." },
    ur: { title: "ورکشاپس", intro: "مختصر آگاہی ورکشاپس: ویڈیو، مواد، سرکاری حوالے، اور ہر ورکشاپ کے آخر میں ٹیسٹ۔" }
  }
];
