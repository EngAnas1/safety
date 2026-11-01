/* =====================================================================
   ⚙️  ملف الإعدادات والمحتوى — كل التعديلات هنا فقط
   ===================================================================== */

const CONFIG = {
  // اسمك كما يظهر في الموقع
  ownerName: { ar: "م. أنس الزهراني", en: "Eng. Anas Alzahrani", ur: "انجینئر انس الزہرانی" },
  // سطر تحت اسمك في قسم "إعداد وتصميم" — عدّله كما تحب
  ownerLine: { ar: "رسالتي: كل عامل يرجع لبيته سالم.", en: "My mission: every worker goes home safe.", ur: "میرا مشن: ہر کارکن محفوظ گھر واپس جائے۔" },
  // الشريط العلوي (نفس الموجود في المقطع) — اتركه فارغًا "" لإخفائه
  siteTag: { ar: "السعودية للطاقة – الطائف", en: "Saudi Energy – Taif", ur: "سعودی انرجی – طائف" },

  // روابط المقاطع لكل موضوع ولكل لغة: ملف داخل مجلد videos أو رابط يوتيوب
  videos: {
    risk:      { ar: "", en: "", ur: "" },
    lsr:       { ar: "videos/lsr-ar.mp4", en: "videos/lsr-en.mp4", ur: "videos/lsr-ur.mp4" },
    ppe:       { ar: "", en: "", ur: "" },
    loto:      { ar: "", en: "", ur: "" },
    height:    { ar: "", en: "", ur: "" },
    emergency: { ar: "", en: "", ur: "" }
  },
  // صورة الغلاف قبل التشغيل (اختياري)
  posters: {
    lsr: { ar: "videos/lsr-ar.jpg", en: "videos/lsr-en.jpg", ur: "videos/lsr-ur.jpg" }
  }
};

/* نصوص الواجهة */
const UI = {
  ar: {
    dir: "rtl", quizTitle: "اختبر نفسك", quizSub: "جاوب على 5 أسئلة. 5 من 5 تفتح لك الشارة.", startQuiz: "ابدأ الاختبار", qOf: "سؤال {n} من {t}", correct: "إجابة صحيحة!", wrong: "إجابة خاطئة", nextQ: "التالي", seeResult: "النتيجة", yourScore: "نتيجتك", retry: "أعد المحاولة", perfect: "5 من 5! الشارة صارت لك", almost: "قريب! تحتاج 5 من 5 لتحصل على الشارة", best: "أفضل نتيجة", refs: "المرجعية", heroTitle: "ارجع لأهلك سالم", heroSub: "كل يوم، وفي كل مهمة. ستة مواضيع قصيرة بلغتك تحميك وتحمي فريقك.", start: "ابدأ بالقواعد العشر", tip: "نصيحة اليوم", badges: "شاراتك", progress: "أكملت {n} من {t}", allDone: "أنت بطل سلامة 🏆", mission: "المهمة", tapHint: "اضغط على كل بند بعد ما تفهمه", locked: "علّم كل البنود لتفتح الشارة", claim: "استلم الشارة", unlocked: "حصلت على الشارة!", next: "المهمة التالية", missions: "مهماتك", watch: "شاهد", lead: "الموضوع الرئيسي", tenRules: "القواعد العشر", related: "مواضيع أخرى", read: "اقرأ", minutes: "دقائق", section: "السلامة", site: "توعية السلامة", by: "إعداد وتصميم", rule: "القاعدة", pick: "اختر لغتك",
    topics: "مواضيع السلامة", keyPoints: "أهم النقاط", doTitle: "افعل", dontTitle: "لا تفعل",
    noVideo: "المقطع يُضاف قريبًا", pledge: "فهمت وألتزم", pledged: "ملتزم",
    pledgedNote: "شكرًا لك. سلامتك تهمنا.", home: "كل المواضيع", lang: "اللغة",
    done: "تمت مشاهدته", stop: "لكلٍّ منّا صلاحية إيقاف أي عمل غير آمن."
  },
  en: {
    dir: "ltr", quizTitle: "Test yourself", quizSub: "Answer 5 questions. Score 5 out of 5 to unlock the badge.", startQuiz: "Start the quiz", qOf: "Question {n} of {t}", correct: "Correct!", wrong: "Not quite", nextQ: "Next", seeResult: "See result", yourScore: "Your score", retry: "Try again", perfect: "5 out of 5! The badge is yours", almost: "Close! You need 5 out of 5 for the badge", best: "Best score", refs: "Based on", heroTitle: "Go home safe.", heroSub: "Every day, every job. Six short topics in your language that protect you and your crew.", start: "Start with the 10 rules", tip: "Tip of the day", badges: "Your badges", progress: "{n} of {t} complete", allDone: "You're a safety hero 🏆", mission: "Mission", tapHint: "Tap each item once you understand it", locked: "Check every item to unlock the badge", claim: "Claim your badge", unlocked: "Badge unlocked!", next: "Next mission", missions: "Your missions", watch: "Watch", lead: "Top story", tenRules: "The ten rules", related: "More topics", read: "Read", minutes: "min", section: "Safety", site: "Safety Awareness", by: "Prepared & designed by", rule: "Rule", pick: "Choose your language",
    topics: "Safety topics", keyPoints: "Key points", doTitle: "Do", dontTitle: "Don't",
    noVideo: "Video coming soon", pledge: "I understand and commit", pledged: "Committed",
    pledgedNote: "Thank you. Your safety matters.", home: "All topics", lang: "Language",
    done: "Watched", stop: "Each of us has the authority to stop any unsafe work."
  },
  ur: {
    dir: "rtl", quizTitle: "خود کو آزمائیں", quizSub: "5 سوالوں کے جواب دیں۔ 5 میں سے 5 پر بیج ملے گا۔", startQuiz: "ٹیسٹ شروع کریں", qOf: "سوال {n} از {t}", correct: "درست جواب!", wrong: "غلط جواب", nextQ: "اگلا", seeResult: "نتیجہ", yourScore: "آپ کا اسکور", retry: "دوبارہ کوشش کریں", perfect: "5 میں سے 5! بیج آپ کا ہوا", almost: "قریب! بیج کے لیے 5 میں سے 5 چاہییں", best: "بہترین اسکور", refs: "حوالہ", heroTitle: "محفوظ گھر واپس جائیں", heroSub: "ہر دن، ہر کام میں۔ آپ کی زبان میں چھ مختصر موضوعات جو آپ اور آپ کی ٹیم کی حفاظت کرتے ہیں۔", start: "دس قوانین سے شروع کریں", tip: "آج کی ٹِپ", badges: "آپ کے بیج", progress: "{t} میں سے {n} مکمل", allDone: "آپ حفاظت کے ہیرو ہیں 🏆", mission: "مشن", tapHint: "ہر نکتہ سمجھنے کے بعد اس پر ٹیپ کریں", locked: "بیج کھولنے کے لیے تمام نکات پر نشان لگائیں", claim: "اپنا بیج لیں", unlocked: "بیج مل گیا!", next: "اگلا مشن", missions: "آپ کے مشن", watch: "دیکھیں", lead: "اہم موضوع", tenRules: "دس قوانین", related: "مزید موضوعات", read: "پڑھیں", minutes: "منٹ", section: "حفاظت", site: "حفاظتی آگاہی", by: "تیاری و ڈیزائن", rule: "اصول", pick: "اپنی زبان منتخب کریں",
    topics: "حفاظتی موضوعات", keyPoints: "اہم نکات", doTitle: "کریں", dontTitle: "نہ کریں",
    noVideo: "ویڈیو جلد شامل کی جائے گی", pledge: "میں سمجھ گیا اور عمل کروں گا", pledged: "عہد کر لیا",
    pledgedNote: "شکریہ۔ آپ کی حفاظت اہم ہے۔", home: "تمام موضوعات", lang: "زبان",
    done: "دیکھ لیا", stop: "ہم میں سے ہر ایک کو کسی بھی غیر محفوظ کام کو روکنے کا اختیار ہے۔"
  }
};

/* المواضيع */
const TOPICS = [
  {
    id: "risk", emoji: "📋",
    ar: {
      title: "تقييم المخاطر",
      intro: "قبل أي عمل: اعرف الخطر، وقدّر حجمه، وضع ما يمنعه.",
      points: [
        ["🔍", "حدّد المخاطر في موقع العمل: كهرباء، ارتفاع، رفع أحمال، حرارة، مواد خطرة."],
        ["👥", "اعرف من قد يتأذى: أنت، زملاؤك، المارّة."],
        ["📊", "قيّم الخطر: احتمال الحدوث × شدة الضرر."],
        ["🛡️", "طبّق هرم التحكم بالترتيب: الإزالة، ثم الاستبدال، ثم الضوابط الهندسية، ثم الضوابط الإدارية، وأخيرًا معدات الوقاية الشخصية."],
        ["✍️", "وقّع على التقييم بعد قراءته وفهمه، لا قبل."]
      ],
      do: ["اقرأ التقييم مع فريقك قبل البدء", "اسأل إذا لم تفهم أي خطر", "حدّث التقييم إذا تغيّرت ظروف العمل"],
      dont: ["لا توقّع دون أن تقرأ", "لا تبدأ بمهمة غير مذكورة في التقييم", "لا تتجاهل خطرًا جديدًا ظهر أثناء العمل"]
    },
    en: {
      title: "Risk Assessment",
      intro: "Before any job: know the hazard, rate it, and put controls in place.",
      points: [
        ["🔍", "Identify site hazards: electricity, height, lifting, heat, hazardous materials."],
        ["👥", "Know who could be harmed: you, your crew, passers-by."],
        ["📊", "Rate the risk: likelihood × severity."],
        ["🛡️", "Follow the hierarchy of controls: elimination, substitution, engineering controls, administrative controls, then PPE."],
        ["✍️", "Sign the assessment after you read and understand it, not before."]
      ],
      do: ["Review it with your crew before starting", "Ask if any hazard is unclear", "Update it when conditions change"],
      dont: ["Don't sign without reading", "Don't do tasks the assessment doesn't cover", "Don't ignore a new hazard that appears on the job"]
    },
    ur: {
      title: "رسک اسیسمنٹ",
      intro: "کسی بھی کام سے پہلے: خطرہ پہچانیں، اس کا اندازہ لگائیں، اور بچاؤ کا انتظام کریں۔",
      points: [
        ["🔍", "کام کی جگہ کے خطرات پہچانیں: بجلی، اونچائی، وزن اٹھانا، گرمی، خطرناک مواد۔"],
        ["👥", "جانیں کس کو نقصان ہو سکتا ہے: آپ، آپ کے ساتھی، راہگیر۔"],
        ["📊", "خطرے کا اندازہ: امکان × نقصان کی شدت۔"],
        ["🛡️", "کنٹرول کی ترتیب پر عمل کریں: خطرہ ختم کرنا، متبادل، انجینئرنگ کنٹرول، انتظامی کنٹرول، اور آخر میں ذاتی حفاظتی سامان۔"],
        ["✍️", "اسیسمنٹ پڑھ کر اور سمجھ کر دستخط کریں، پہلے نہیں۔"]
      ],
      do: ["کام سے پہلے ٹیم کے ساتھ پڑھیں", "کوئی خطرہ سمجھ نہ آئے تو پوچھیں", "حالات بدلیں تو اسیسمنٹ اپڈیٹ کریں"],
      dont: ["پڑھے بغیر دستخط نہ کریں", "اسیسمنٹ میں نہ لکھا کام نہ کریں", "کام کے دوران نئے خطرے کو نظرانداز نہ کریں"]
    }
  },

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
    id: "ppe", emoji: "⛑️",
    ar: {
      title: "معدات الوقاية الشخصية",
      intro: "آخر خط دفاع بينك وبين الإصابة. البسها صح، وافحصها قبل الاستخدام.",
      points: [
        ["⛑️", "الخوذة: مربوطة جيدًا وخالية من الشقوق."],
        ["🥽", "النظارة الواقية أو واقي الوجه حسب المهمة."],
        ["🧤", "قفازات مناسبة للعمل: عازلة للكهرباء أو مقاومة للقطع."],
        ["👢", "حذاء السلامة في كل وقت داخل الموقع."],
        ["🦺", "ملابس مقاومة للقوس الكهربائي (AR) في الأعمال الكهربائية، وسترة عاكسة."],
        ["🎧", "واقي الأذن عندما تصل الضوضاء إلى 85 ديسيبل أو أكثر."]
      ],
      do: ["افحص معداتك كل يوم", "استبدل التالف فورًا", "اختر المقاس المناسب لك"],
      dont: ["لا تعدّل المعدات", "لا تخلعها لأن الجو حار", "لا تستخدم معدات زميلك الشخصية"]
    },
    en: {
      title: "Personal Protective Equipment",
      intro: "Your last line of defence against injury. Wear it right and check it before use.",
      points: [
        ["⛑️", "Hard hat: strapped on and free of cracks."],
        ["🥽", "Safety glasses or face shield to suit the task."],
        ["🧤", "Gloves for the job: electrically insulated or cut-resistant."],
        ["👢", "Safety boots at all times on site."],
        ["🦺", "Arc-rated (AR) clothing for electrical work, and a high-visibility vest."],
        ["🎧", "Hearing protection when noise reaches 85 dB(A) or more."]
      ],
      do: ["Inspect your PPE every day", "Replace damaged items right away", "Use the right size for you"],
      dont: ["Don't modify your equipment", "Don't take it off because it's hot", "Don't share personal PPE"]
    },
    ur: {
      title: "ذاتی حفاظتی سامان",
      intro: "چوٹ سے بچاؤ کی آخری دیوار۔ درست پہنیں اور استعمال سے پہلے چیک کریں۔",
      points: [
        ["⛑️", "ہیلمٹ: پٹا بندھا ہو اور کوئی دراڑ نہ ہو۔"],
        ["🥽", "کام کے مطابق حفاظتی چشمہ یا فیس شیلڈ۔"],
        ["🧤", "کام کے مطابق دستانے: بجلی سے محفوظ یا کٹ سے محفوظ۔"],
        ["👢", "سائٹ پر ہر وقت حفاظتی جوتے۔"],
        ["🦺", "بجلی کے کام میں آرک ریٹڈ (AR) لباس، اور چمکدار جیکٹ۔"],
        ["🎧", "جب شور 85 ڈیسیبل یا زیادہ ہو تو کانوں کی حفاظت۔"]
      ],
      do: ["روزانہ اپنا سامان چیک کریں", "خراب چیز فوراً بدلیں", "اپنے ناپ کا سامان استعمال کریں"],
      dont: ["سامان میں تبدیلی نہ کریں", "گرمی کی وجہ سے نہ اتاریں", "دوسرے کا ذاتی سامان استعمال نہ کریں"]
    }
  },

  {
    id: "loto", emoji: "⚡",
    ar: {
      title: "العزل الكهربائي والأقفال",
      intro: "اعتبر كل موصل مكهربًا حتى تُثبت العكس بنفسك.",
      points: [
        ["🔌", "افصل مصدر الطاقة حسب إجراء العزل المعتمد."],
        ["🔒", "ضع قفلك الشخصي وبطاقتك، والمفتاح يبقى معك."],
        ["🧪", "افحص انعدام الجهد بجهاز مُختبَر قبل وبعد الفحص."],
        ["🌍", "طبّق التأريض المؤقت حيث يلزم."],
        ["📏", "التزم بمسافات الاقتراب الآمنة من المعدات المكهربة."]
      ],
      do: ["كل عامل يضع قفله الخاص", "تأكد من مصادر التغذية الخلفية", "اتبع تسلسل الإعادة للخدمة"],
      dont: ["لا تزل قفل غيرك أبدًا", "لا تعتمد على كلام زميلك أن الخط مفصول", "لا تعمل دون فحص الجهد"]
    },
    en: {
      title: "Electrical Isolation & LOTO",
      intro: "Treat every conductor as live until you have proven otherwise yourself.",
      points: [
        ["🔌", "Isolate the energy source following the approved procedure."],
        ["🔒", "Apply your personal lock and tag. Keep the key on you."],
        ["🧪", "Test for dead with a proven tester, before and after the test."],
        ["🌍", "Apply temporary earthing where required."],
        ["📏", "Keep minimum approach distances to energised equipment."]
      ],
      do: ["Every worker applies their own lock", "Check for back-feed sources", "Follow the return-to-service sequence"],
      dont: ["Never remove someone else's lock", "Don't take a colleague's word that it's dead", "Don't work without testing for voltage"]
    },
    ur: {
      title: "بجلی کی آئسولیشن اور لاک آؤٹ",
      intro: "ہر تار کو زندہ سمجھیں جب تک آپ خود ثابت نہ کر لیں کہ اس میں بجلی نہیں۔",
      points: [
        ["🔌", "منظور شدہ طریقے کے مطابق بجلی کا ذریعہ الگ کریں۔"],
        ["🔒", "اپنا ذاتی تالا اور ٹیگ لگائیں۔ چابی اپنے پاس رکھیں۔"],
        ["🧪", "ٹیسٹر سے چیک کریں کہ بجلی نہیں ہے، ٹیسٹ سے پہلے اور بعد ٹیسٹر جانچیں۔"],
        ["🌍", "جہاں ضرورت ہو عارضی ارتھنگ لگائیں۔"],
        ["📏", "بجلی والے آلات سے محفوظ فاصلہ رکھیں۔"]
      ],
      do: ["ہر کارکن اپنا تالا لگائے", "پیچھے سے آنے والی بجلی چیک کریں", "دوبارہ چالو کرنے کی ترتیب پر عمل کریں"],
      dont: ["کسی دوسرے کا تالا کبھی نہ کھولیں", "ساتھی کی بات پر بھروسہ نہ کریں، خود چیک کریں", "وولٹیج ٹیسٹ کے بغیر کام نہ کریں"]
    }
  },

  {
    id: "height", emoji: "🧗",
    ar: {
      title: "العمل على ارتفاع",
      intro: "السقوط من أكثر أسباب الوفاة في مواقع العمل. الحماية إلزامية فوق 1.8 متر.",
      points: [
        ["🦺", "ارتدِ حزام الجسم الكامل وافحصه قبل كل استخدام."],
        ["🔗", "اربط نفسك بنقطة تثبيت معتمدة، وحافظ على الربط 100٪ من الوقت."],
        ["🪜", "استخدم سقالة عليها بطاقة فحص خضراء، وسلّمًا سليمًا مثبّتًا."],
        ["🧰", "اربط الأدوات حتى لا تسقط، وطوّق المنطقة أسفلك."],
        ["🌬️", "أوقف العمل عند الرياح القوية."]
      ],
      do: ["خطة إنقاذ جاهزة قبل الصعود", "ثلاث نقاط تلامس على السلّم", "تحقق من بطاقة السقالة"],
      dont: ["لا تفك الربط للتحرك", "لا تصعد سقالة بطاقتها حمراء", "لا تحمل أغراضًا بيديك وأنت تصعد"]
    },
    en: {
      title: "Working at Height",
      intro: "Falls are a leading cause of death on site. Fall protection is mandatory above 1.8 m.",
      points: [
        ["🦺", "Wear a full-body harness and inspect it before every use."],
        ["🔗", "Tie off to an approved anchor and stay 100% tied off."],
        ["🪜", "Use scaffolds with a green tag, and sound, secured ladders."],
        ["🧰", "Tether your tools and barricade the area below."],
        ["🌬️", "Stop work in high winds."]
      ],
      do: ["Have a rescue plan before you climb", "Keep three points of contact on ladders", "Check the scaffold tag"],
      dont: ["Don't unclip to move", "Don't climb a red-tagged scaffold", "Don't carry items in your hands while climbing"]
    },
    ur: {
      title: "اونچائی پر کام",
      intro: "گرنا سائٹ پر موت کی بڑی وجوہات میں سے ہے۔ 1.8 میٹر سے اوپر حفاظت لازمی ہے۔",
      points: [
        ["🦺", "فل باڈی ہارنس پہنیں اور ہر بار استعمال سے پہلے چیک کریں۔"],
        ["🔗", "منظور شدہ اینکر سے بندھے رہیں، ہر وقت 100٪۔"],
        ["🪜", "سبز ٹیگ والی سکیفولڈنگ اور مضبوط، بندھی ہوئی سیڑھی استعمال کریں۔"],
        ["🧰", "اوزار باندھ کر رکھیں اور نیچے کی جگہ کو گھیر دیں۔"],
        ["🌬️", "تیز ہوا میں کام روک دیں۔"]
      ],
      do: ["چڑھنے سے پہلے ریسکیو پلان تیار رکھیں", "سیڑھی پر تین نقطوں کا رابطہ رکھیں", "سکیفولڈ کا ٹیگ چیک کریں"],
      dont: ["حرکت کے لیے ہک نہ کھولیں", "سرخ ٹیگ والی سکیفولڈ پر نہ چڑھیں", "چڑھتے وقت ہاتھوں میں سامان نہ اٹھائیں"]
    }
  },

  {
    id: "emergency", emoji: "🚨",
    ar: {
      title: "الاستجابة للطوارئ",
      intro: "اعرف ماذا تفعل قبل أن تحتاجه. الثواني الأولى تصنع الفرق.",
      points: [
        ["✋", "أوقف العمل فورًا وابتعد عن مصدر الخطر."],
        ["📢", "أطلق الإنذار وأبلغ المشرف."],
        ["🏃", "اتجه إلى نقطة التجمع عبر طريق الإخلاء، عكس اتجاه الريح عند تسرب الغاز."],
        ["🧮", "سجّل حضورك عند نقطة التجمع."],
        ["⛑️", "لا تقدّم إسعافًا إلا إذا كنت مدرّبًا والمكان آمن."]
      ],
      do: ["اعرف أقرب طفاية ونقطة تجمع", "احفظ: الدفاع المدني 998، الإسعاف 997، الطوارئ الموحد 911", "بلّغ عن أي حادث وشيك Near Miss"],
      dont: ["لا تعد لأخذ أغراضك", "لا تلمس مصابًا بصعقة قبل فصل الكهرباء", "لا تغادر نقطة التجمع دون إذن"]
    },
    en: {
      title: "Emergency Response",
      intro: "Know what to do before you need it. The first seconds make the difference.",
      points: [
        ["✋", "Stop work at once and move away from the hazard."],
        ["📢", "Raise the alarm and inform your supervisor."],
        ["🏃", "Go to the assembly point by the escape route, upwind in a gas release."],
        ["🧮", "Report in at the assembly point for the headcount."],
        ["⛑️", "Give first aid only if you are trained and the scene is safe."]
      ],
      do: ["Know your nearest extinguisher and assembly point", "Save: Civil Defense 998, Ambulance 997, Unified emergency 911", "Report every near miss"],
      dont: ["Don't go back for belongings", "Don't touch an electrocuted person before power is off", "Don't leave the assembly point without permission"]
    },
    ur: {
      title: "ہنگامی صورتحال",
      intro: "ضرورت سے پہلے جان لیں کیا کرنا ہے۔ پہلے چند سیکنڈ فرق ڈالتے ہیں۔",
      points: [
        ["✋", "فوراً کام روکیں اور خطرے سے دور ہو جائیں۔"],
        ["📢", "الارم بجائیں اور سپروائزر کو اطلاع دیں۔"],
        ["🏃", "ہنگامی راستے سے اسمبلی پوائنٹ جائیں، گیس لیک میں ہوا کے مخالف رخ۔"],
        ["🧮", "اسمبلی پوائنٹ پر اپنی حاضری لگوائیں۔"],
        ["⛑️", "صرف تربیت یافتہ ہوں اور جگہ محفوظ ہو تو ابتدائی طبی امداد دیں۔"]
      ],
      do: ["قریبی آگ بجھانے والا آلہ اور اسمبلی پوائنٹ جانیں", "یاد رکھیں: سول ڈیفنس 998، ایمبولینس 997، یونیفائیڈ ایمرجنسی 911", "ہر قریب الوقوع حادثے کی اطلاع دیں"],
      dont: ["سامان لینے واپس نہ جائیں", "بجلی بند کیے بغیر کرنٹ لگے شخص کو نہ چھوئیں", "اجازت کے بغیر اسمبلی پوائنٹ نہ چھوڑیں"]
    }
  }
];
