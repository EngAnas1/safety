/* =====================================================================
   الورش — كل ورشة: مقطع + محتوى نصي + مصادر قابلة للضغط + اختبار
   لإضافة ورشة جديدة: أضف عنصرًا جديدًا في WORKSHOPS، وأسئلتها في QUIZ باسم id نفسه
   ===================================================================== */

const WORKSHOPS = [
  {
    id: "irregular",
    icon: "img/ic/team.webp",
    video:  { ar: "videos/ws-irregular-ar.mp4", en: "videos/ws-irregular-en.mp4", ur: "videos/ws-irregular-ur.mp4" },
    poster: { ar: "videos/ws-irregular-ar.jpg", en: "videos/ws-irregular-en.jpg", ur: "videos/ws-irregular-ur.jpg" },

    ar: {
      title: "العمالة غير النظامية في مواقع العمل",
      sub: "عامل ليس على كفالة المنشأة… خطر لا يظهر في التصريح",
      watch: "شاهد: العامل السابع… مثال من الموقع",
      lead: [
        "عامل جديد في الموقع… لا أحد يعرف عنه شيئًا. إذا أُصيب اليوم: من هو؟ ومن يتحمّل المسؤولية؟",
        "تقييم المخاطر والتصريح يُبنيان على فريق معروف ومسجّل. والعامل غير النظامي خارج هذا كله: لم يحضر التهيئة، ولا يظهر في نموذج فريق العمل، ولا يُعدّ في نقطة التجمع. لذلك قد يكون أخطر ما في الموقع شخصًا لم يُسأل عن هويته."
      ],
      defTitle: "من هو العامل غير النظامي؟",
      def: "أي عامل يعمل في الموقع وهو ليس على كفالة المقاول.",
      types: [
        ["team",   "عامل مستعار",   "من منشأة أخرى أو من صديق في الموقع"],
        ["person", "عامل حر",       "يأخذ «يومية» دون عقد"],
        ["warn",   "متغيّب عن كفيله", "ترك العمل لدى كفيله وصار يتنقّل"],
        ["doc",    "تأشيرة لا تسمح", "دخل بتأشيرة زيارة أو غيرها"]
      ],
      riskTitle: "ليش هو خطر على السلامة؟",
      risks: [
        ["helmet", "غير مدرَّب",          "لم يحضر التهيئة ولا تدريب قواعد الحفاظ على الحياة"],
        ["badge",  "كفاءته غير موثّقة",   "لا شهادات ولا تأهيل معتمد للمهمة"],
        ["permit", "خارج نموذج فريق العمل", "غير مُدرج في فريق التصريح المعتمد"],
        ["ecg",    "لياقته مجهولة",       "لا فحص طبي، ولا تأمين يغطيه"],
        ["rescue", "خطر في الطوارئ",      "غير محصور في الإخلاء، ولا بيانات للتواصل"],
        ["lock",   "دخول غير مصرّح",      "شخص غير معتمد في مواقع حساسة"]
      ],
      chainTitle: "لو وقعت إصابة لعامل غير نظامي…",
      chain: [
        ["ecg",      "إصابة في الموقع",  "العامل بلا تأمين من المنشأة"],
        ["mag",      "تحقيق ومساءلة",    "من أدخله؟ ومن سمح له بالعمل؟"],
        ["hand",     "إيقاف وعقوبات",    "إيقاف أعمال وغرامات نظامية"],
        ["building", "سمعة المنشأة",     "أمام العميل والجهات الرسمية"]
      ],
      chainEnd: "وكل هذا… بدأ بعامل لم يُسأل عن هويته",
      checkTitle: "قبل أن يدخل أي عامل الموقع… تأكّد",
      checks: [
        "على كفالة المقاول",
        "يحمل بطاقات التعميد أو التأهيل والأمن الصناعي",
        "مُدرج في نموذج فريق العمل"
      ],
      close: "كل عامل في الموقع… معروف، ومدرَّب، ومسجَّل"
    },

    en: {
      title: "Irregular Labor on Work Sites",
      sub: "A worker outside the contractor’s sponsorship… a hazard the permit doesn’t reveal",
      watch: "Watch: The Seventh Worker… a site case example",
      lead: [
        "A new worker on site… nobody knows anything about him. If he is injured today: who is he? And who is accountable?",
        "The risk assessment and the permit are built on a known, registered crew. An irregular worker sits outside all of it: he missed the induction, he isn't on the Work Team Form, and he isn't counted at the assembly point. That is why the most dangerous thing on site can be a person whose identity nobody checked."
      ],
      defTitle: "Who is an irregular worker?",
      def: "Any worker on site who is not under the contractor’s sponsorship.",
      types: [
        ["team",   "Borrowed worker", "From another establishment, or a friend on site"],
        ["person", "Freelance worker", "Day-rate labor with no employment contract"],
        ["warn",   "Absconded worker", "Left his sponsor and moves between sites"],
        ["doc",    "Ineligible visa", "Entered on a visit visa or similar"]
      ],
      riskTitle: "Why is he a safety hazard?",
      risks: [
        ["helmet", "Untrained", "No site HSE induction or Life Saving Rules training"],
        ["badge",  "Unverified competency", "No certification or approved qualification for the task"],
        ["permit", "Not on Work Team Form", "Not listed on the authorized PTW crew"],
        ["ecg",    "Unknown fitness for work", "No medical fitness assessment or insurance coverage"],
        ["rescue", "Emergency response gap", "Not in the evacuation headcount; no emergency contact"],
        ["lock",   "Unauthorized access", "Unauthorized person in restricted areas"]
      ],
      chainTitle: "If an irregular worker is injured…",
      chain: [
        ["ecg",      "Workplace injury", "No employer insurance coverage"],
        ["mag",      "Incident investigation", "Who granted site access? Who authorized the work?"],
        ["hand",     "Stop-work & penalties", "Stop-work order and regulatory fines"],
        ["building", "Corporate reputation", "Before the client and regulatory authorities"]
      ],
      chainEnd: "All of this started with a worker whose identity was never verified",
      checkTitle: "Before any worker accesses the site… verify",
      checks: [
        "Under the contractor’s sponsorship",
        "Holds authorization, qualification, and industrial security cards",
        "Listed on the Work Team Form"
      ],
      close: "Every worker on site… identified, competent, and registered"
    },

    ur: {
      title: "کام کی جگہوں پر غیر قانونی مزدور",
      sub: "ایسا مزدور جو ٹھیکیدار کی کفالت میں نہیں… ایک خطرہ جو پرمٹ میں نظر نہیں آتا",
      watch: "دیکھیے: ساتواں مزدور… سائٹ کی ایک مثال",
      lead: [
        "سائٹ پر ایک نیا مزدور… اس کے بارے میں کوئی کچھ نہیں جانتا۔ اگر آج وہ زخمی ہو جائے: وہ کون ہے؟ اور ذمہ دار کون ہے؟",
        "رسک اسیسمنٹ اور پرمٹ ایک معلوم اور رجسٹرڈ ٹیم پر بنتے ہیں۔ غیر قانونی مزدور اس سب سے باہر ہے: اس نے انڈکشن نہیں لی، وہ ورک ٹیم فارم میں نہیں، اور اسمبلی پوائنٹ پر اس کی گنتی نہیں ہوتی۔ اسی لیے سائٹ کا سب سے بڑا خطرہ وہ شخص ہو سکتا ہے جس کی شناخت کسی نے نہیں پوچھی۔"
      ],
      defTitle: "غیر قانونی مزدور کون ہے؟",
      def: "ہر وہ مزدور جو سائٹ پر کام کرے اور ٹھیکیدار کی کفالت میں نہ ہو۔",
      types: [
        ["team",   "ادھار لیا گیا مزدور", "کسی دوسری کمپنی سے، یا سائٹ پر کسی دوست کے ذریعے"],
        ["person", "آزاد مزدور", "بغیر معاہدے کے دیہاڑی پر کام کرتا ہے"],
        ["warn",   "کفیل سے فرار", "اپنے کفیل کا کام چھوڑ کر سائٹوں پر پھرتا ہے"],
        ["doc",    "غیر موزوں ویزا", "وزٹ ویزا یا کسی اور ویزا پر آیا"]
      ],
      riskTitle: "وہ حفاظت کے لیے خطرہ کیوں ہے؟",
      risks: [
        ["helmet", "تربیت یافتہ نہیں", "نہ سائٹ انڈکشن، نہ لائف سیونگ رولز کی تربیت"],
        ["badge",  "قابلیت غیر مصدقہ", "کام کے لیے کوئی سرٹیفکیٹ یا منظور شدہ اہلیت نہیں"],
        ["permit", "ورک ٹیم فارم سے باہر", "منظور شدہ پرمٹ ٹیم میں شامل نہیں"],
        ["ecg",    "فٹنس نامعلوم", "نہ میڈیکل فٹنس چیک، نہ انشورنس"],
        ["rescue", "ایمرجنسی میں خطرہ", "انخلا کی گنتی میں شامل نہیں، رابطے کی معلومات نہیں"],
        ["lock",   "غیر مجاز داخلہ", "حساس جگہوں پر غیر منظور شدہ شخص"]
      ],
      chainTitle: "اگر کسی غیر قانونی مزدور کو چوٹ لگ جائے…",
      chain: [
        ["ecg",      "سائٹ پر چوٹ", "ٹھیکیدار کی طرف سے کوئی انشورنس نہیں"],
        ["mag",      "تحقیقات اور جواب دہی", "اسے کس نے داخل کیا؟ کام کی اجازت کس نے دی؟"],
        ["hand",     "کام کی بندش اور جرمانے", "کام روکنا اور قانونی جرمانے"],
        ["building", "کمپنی کی ساکھ", "کلائنٹ اور سرکاری اداروں کے سامنے"]
      ],
      chainEnd: "اور یہ سب… ایک ایسے مزدور سے شروع ہوا جس کی شناخت کسی نے نہیں پوچھی",
      checkTitle: "کسی بھی مزدور کے سائٹ میں داخل ہونے سے پہلے… یقینی بنائیں",
      checks: [
        "ٹھیکیدار کی کفالت میں ہو",
        "اتھارائزیشن، اہلیت اور انڈسٹریل سیکیورٹی کارڈ رکھتا ہو",
        "نام ورک ٹیم فارم میں ہو"
      ],
      close: "سائٹ پر ہر مزدور… معلوم، تربیت یافتہ، اور رجسٹرڈ"
    },

    /* المصادر: كل مصدر رابط يفتح صفحته الرسمية */
    sources: [
      { url: "https://laws.boe.gov.sa/BoeLaws/Laws/Viewer/3d62185f-7086-4481-b59b-ac7f00d6d2e8",
        ar: { n: "نظام العمل السعودي", by: "هيئة الخبراء بمجلس الوزراء", d: "المادة 39: لا يجوز لصاحب العمل أن يترك عامله يعمل لدى غيره، ولا أن يشغّل عامل غيره." },
        en: { n: "Saudi Labor Law", by: "Bureau of Experts at the Council of Ministers", d: "Article 39: an employer may not let its worker work for others, nor employ another employer’s worker." },
        ur: { n: "سعودی لیبر قانون", by: "بیورو آف ایکسپرٹس، کونسل آف منسٹرز", d: "دفعہ 39: آجر اپنے مزدور کو دوسروں کے لیے کام کرنے نہیں دے سکتا، نہ کسی دوسرے کا مزدور رکھ سکتا ہے۔" } },
      { url: "https://www.hrsd.gov.sa/sites/default/files/2025-02/%D8%A7%D9%84%D9%84%D8%A7%D8%A6%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D9%86%D9%81%D9%8A%D8%B0%D9%8A%D8%A9%20%D9%84%D9%86%D8%B8%D8%A7%D9%85%20%D8%A7%D9%84%D8%B9%D9%85%D9%84%20%D9%88%D9%85%D9%84%D8%AD%D9%82%D8%A7%D8%AA%D9%87%D8%A7.pdf",
        ar: { n: "اللائحة التنفيذية لنظام العمل", by: "وزارة الموارد البشرية والتنمية الاجتماعية", d: "تنظّم العمل لدى غير صاحب العمل، والعامل المعتمد عبر برنامج أجير لا يُعد مخالفًا." },
        en: { n: "Implementing Regulations of the Labor Law", by: "Ministry of Human Resources and Social Development", d: "Regulates work for another employer; a worker approved through the Ajeer program is not in violation." },
        ur: { n: "لیبر قانون کے نفاذی ضوابط", by: "وزارتِ افرادی وسائل و سماجی ترقی", d: "دوسرے آجر کے لیے کام کو منظم کرتے ہیں؛ اجیر پروگرام سے منظور شدہ مزدور خلاف ورزی میں نہیں۔" } },
      { url: "https://saudipedia.com/article/11715/%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF-%D9%88%D8%A3%D8%B9%D9%85%D8%A7%D9%84/%D9%85%D8%A7-%D9%87%D9%8A-%D9%85%D9%86%D8%B5%D8%A9-%D8%A3%D8%AC%D9%8A%D8%B1",
        ar: { n: "منصة أجير", by: "سعودية بيديا", d: "الطريق النظامي للعمل المؤقت والإعارة بين المنشآت، عبر تصاريح رسمية." },
        en: { n: "The Ajeer platform", by: "Saudipedia", d: "The lawful route for temporary work and worker loans between establishments, through official permits." },
        ur: { n: "اجیر پلیٹ فارم", by: "سعودی پیڈیا", d: "اداروں کے درمیان عارضی کام اور مزدور کی عاریت کا قانونی راستہ، سرکاری پرمٹ کے ذریعے۔" } },
      { url: "https://www.iso.org/standard/63787.html",
        ar: { n: "ISO 45001:2018", by: "المنظمة الدولية للمعايير ISO", d: "البند 8.1.4.2: التنسيق مع المقاولين لتحديد مخاطر أعمالهم والتحكم فيها." },
        en: { n: "ISO 45001:2018", by: "International Organization for Standardization", d: "Clause 8.1.4.2: coordinate with contractors to identify and control the risks of their work." },
        ur: { n: "ISO 45001:2018", by: "بین الاقوامی تنظیم برائے معیارات ISO", d: "شق 8.1.4.2: ٹھیکیداروں کے ساتھ مل کر ان کے کام کے خطرات کی نشاندہی اور کنٹرول۔" } },
      { url: "https://www.cdc.gov/niosh/blogs/2022/protecting-temporary-workers.html",
        ar: { n: "حماية العمال المؤقتين: أفضل الممارسات للمنشأة المستضيفة", by: "NIOSH / OSHA", d: "المنشأة المستضيفة مسؤولة عن سلامة كل من يعمل في موقعها، وعن تدريبه على مخاطر الموقع." },
        en: { n: "Protecting Temporary Workers: Best Practices for Host Employers", by: "NIOSH / OSHA", d: "The host employer is responsible for the safety of everyone working on its site, including site-specific training." },
        ur: { n: "عارضی مزدوروں کا تحفظ: میزبان آجر کے لیے بہترین طریقے", by: "NIOSH / OSHA", d: "میزبان آجر اپنی سائٹ پر کام کرنے والے ہر شخص کی حفاظت اور سائٹ کی تربیت کا ذمہ دار ہے۔" } }
    ]
  }
];

/* أسئلة ورشة العمالة غير النظامية — من محتوى العرض والمقطع والمصادر */
QUIZ.irregular = [
  { a: 1,
    ar: { q: "من هو العامل غير النظامي؟", o: ["أي عامل جديد في الموقع", "أي عامل يعمل في الموقع وهو ليس على كفالة المقاول", "العامل الذي يعمل بالليل فقط"], e: "التعريف: أي عامل يعمل في الموقع وهو ليس على كفالة المقاول." },
    en: { q: "Who is an irregular worker?", o: ["Any new worker on site", "Any worker on site who is not under the contractor’s sponsorship", "A worker who only works night shifts"], e: "Definition: any worker on site who is not under the contractor’s sponsorship." },
    ur: { q: "غیر قانونی مزدور کون ہے؟", o: ["سائٹ پر کوئی بھی نیا مزدور", "ہر وہ مزدور جو سائٹ پر کام کرے اور ٹھیکیدار کی کفالت میں نہ ہو", "صرف رات کو کام کرنے والا مزدور"], e: "تعریف: ہر وہ مزدور جو سائٹ پر کام کرے اور ٹھیکیدار کی کفالت میں نہ ہو۔" } },
  { a: 0,
    ar: { q: "عامل جاء من منشأة أخرى، أو أحضره صديق في الموقع. ما نوعه؟", o: ["عامل مستعار", "عامل مدرَّب", "عامل دائم"], e: "العامل المستعار: من منشأة أخرى أو من صديق في الموقع." },
    en: { q: "A worker came from another establishment, or a friend on site brought him. What type is he?", o: ["Borrowed worker", "Trained worker", "Permanent worker"], e: "A borrowed worker comes from another establishment, or through a friend on site." },
    ur: { q: "مزدور کسی دوسری کمپنی سے آیا، یا سائٹ پر کوئی دوست لایا۔ یہ کس قسم کا ہے؟", o: ["ادھار لیا گیا مزدور", "تربیت یافتہ مزدور", "مستقل مزدور"], e: "ادھار لیا گیا مزدور: کسی دوسری کمپنی سے، یا سائٹ پر کسی دوست کے ذریعے۔" } },
  { a: 2,
    ar: { q: "عامل يأخذ «يومية» دون أي عقد. ما نوعه؟", o: ["متغيّب عن كفيله", "تأشيرة لا تسمح", "عامل حر"], e: "العامل الحر: يأخذ يومية دون عقد." },
    en: { q: "A worker takes day-rate pay with no contract. What type is he?", o: ["Absconded worker", "Ineligible visa", "Freelance worker"], e: "A freelance worker takes day-rate labor with no employment contract." },
    ur: { q: "مزدور بغیر کسی معاہدے کے دیہاڑی لیتا ہے۔ یہ کس قسم کا ہے؟", o: ["کفیل سے فرار", "غیر موزوں ویزا", "آزاد مزدور"], e: "آزاد مزدور: بغیر معاہدے کے دیہاڑی پر کام کرتا ہے۔" } },
  { a: 1,
    ar: { q: "عامل ترك العمل لدى كفيله وصار يتنقّل بين المواقع:", o: ["عامل مستعار نظامي", "متغيّب عن كفيله", "عامل على كفالة المقاول"], e: "المتغيّب عن كفيله: ترك العمل لدى كفيله وصار يتنقّل." },
    en: { q: "A worker left his sponsor and moves between sites:", o: ["A lawfully borrowed worker", "Absconded worker", "A worker under the contractor’s sponsorship"], e: "An absconded worker left his sponsor and moves between sites." },
    ur: { q: "مزدور اپنے کفیل کا کام چھوڑ کر سائٹوں پر پھرتا ہے:", o: ["قانونی طور پر ادھار مزدور", "کفیل سے فرار", "ٹھیکیدار کی کفالت میں مزدور"], e: "کفیل سے فرار: اپنے کفیل کا کام چھوڑ کر سائٹوں پر پھرتا ہے۔" } },
  { a: 0,
    ar: { q: "لماذا العامل غير النظامي غير مدرَّب؟", o: ["لم يحضر التهيئة ولا تدريب قواعد الحفاظ على الحياة", "لأنه جديد في المهنة فقط", "لأنه لا يتكلم العربية"], e: "غير مدرَّب: لم يحضر التهيئة ولا تدريب قواعد الحفاظ على الحياة." },
    en: { q: "Why is an irregular worker untrained?", o: ["He had no site HSE induction or Life Saving Rules training", "Only because he is new to the trade", "Because he doesn’t speak Arabic"], e: "Untrained: no site HSE induction or Life Saving Rules training." },
    ur: { q: "غیر قانونی مزدور تربیت یافتہ کیوں نہیں؟", o: ["نہ سائٹ انڈکشن لی، نہ لائف سیونگ رولز کی تربیت", "صرف اس لیے کہ وہ پیشے میں نیا ہے", "کیونکہ وہ عربی نہیں بولتا"], e: "تربیت یافتہ نہیں: نہ سائٹ انڈکشن، نہ لائف سیونگ رولز کی تربیت۔" } },
  { a: 2,
    ar: { q: "في مقطع «العامل السابع»، لماذا قال المشرف في نقطة التجمع إن العدد 6/6؟", o: ["لأن السابع غادر الموقع مبكرًا", "لأن السابع كان في نقطة تجمع أخرى", "لأن السابع لم يكن في نموذج فريق العمل، فلم يُحسب"], e: "لم يكن في القائمة… فلم يكن في الحسبان. بقي داخل غرفة الكيابل." },
    en: { q: "In “The Seventh Worker”, why did the supervisor count 6/6 at the assembly point?", o: ["The seventh had left the site early", "The seventh was at another assembly point", "The seventh wasn’t on the Work Team Form, so he wasn’t counted"], e: "He wasn’t on the list… so he wasn’t counted. He was still inside the cable room." },
    ur: { q: "”ساتواں مزدور“ میں سپروائزر نے اسمبلی پوائنٹ پر 6/6 کیوں گنا؟", o: ["ساتواں جلدی سائٹ چھوڑ گیا تھا", "ساتواں کسی اور اسمبلی پوائنٹ پر تھا", "ساتواں ورک ٹیم فارم میں نہیں تھا، اس لیے گنا نہیں گیا"], e: "وہ لسٹ میں نہیں تھا… اس لیے گنتی میں نہیں تھا۔ وہ کیبل روم کے اندر ہی تھا۔" } },
  { a: 1,
    ar: { q: "خطر العامل غير النظامي في الطوارئ:", o: ["يعرف طرق الإخلاء أفضل من غيره", "غير محصور في الإخلاء، ولا بيانات للتواصل", "لا يوجد خطر في الطوارئ"], e: "خطر في الطوارئ: غير محصور في الإخلاء، ولا بيانات للتواصل." },
    en: { q: "The irregular worker’s risk in an emergency:", o: ["He knows the escape routes better than others", "He isn’t in the evacuation headcount, and there’s no emergency contact", "There is no emergency risk"], e: "Emergency response gap: not in the evacuation headcount; no emergency contact." },
    ur: { q: "ایمرجنسی میں غیر قانونی مزدور کا خطرہ:", o: ["وہ انخلا کے راستے دوسروں سے بہتر جانتا ہے", "انخلا کی گنتی میں شامل نہیں، رابطے کی معلومات نہیں", "ایمرجنسی میں کوئی خطرہ نہیں"], e: "ایمرجنسی میں خطرہ: انخلا کی گنتی میں شامل نہیں، رابطے کی معلومات نہیں۔" } },
  { a: 0,
    ar: { q: "إذا أُصيب عامل غير نظامي، أول ما يواجهه:", o: ["أنه بلا تأمين من المنشأة", "تأمين كامل من المنشأة", "لا شيء، لأنه ليس من الفريق"], e: "إصابة في الموقع: العامل بلا تأمين من المنشأة." },
    en: { q: "If an irregular worker is injured, the first problem is:", o: ["He has no employer insurance coverage", "He has full employer insurance", "Nothing, since he’s not on the crew"], e: "Workplace injury: no employer insurance coverage." },
    ur: { q: "اگر غیر قانونی مزدور زخمی ہو تو پہلا مسئلہ:", o: ["ٹھیکیدار کی طرف سے کوئی انشورنس نہیں", "ٹھیکیدار کی پوری انشورنس", "کچھ نہیں، کیونکہ وہ ٹیم میں نہیں"], e: "سائٹ پر چوٹ: ٹھیکیدار کی طرف سے کوئی انشورنس نہیں۔" } },
  { a: 2,
    ar: { q: "بعد إصابة عامل غير نظامي، ما تسلسل العواقب؟", o: ["إصابة ثم لا شيء", "سمعة ثم إصابة", "إصابة، ثم تحقيق ومساءلة، ثم إيقاف وعقوبات، ثم سمعة المنشأة"], e: "إصابة في الموقع ← تحقيق ومساءلة ← إيقاف وعقوبات ← سمعة المنشأة." },
    en: { q: "After an irregular worker is injured, what is the chain of consequences?", o: ["Injury, then nothing", "Reputation, then injury", "Injury, then investigation, then stop-work and penalties, then corporate reputation"], e: "Injury → investigation → stop-work & penalties → corporate reputation." },
    ur: { q: "غیر قانونی مزدور کے زخمی ہونے کے بعد نتائج کی ترتیب کیا ہے؟", o: ["چوٹ، پھر کچھ نہیں", "ساکھ، پھر چوٹ", "چوٹ، پھر تحقیقات، پھر کام کی بندش اور جرمانے، پھر کمپنی کی ساکھ"], e: "چوٹ ← تحقیقات ← کام کی بندش اور جرمانے ← کمپنی کی ساکھ۔" } },
  { a: 1,
    ar: { q: "قبل أن يدخل أي عامل الموقع، تأكّد من:", o: ["عمره وجنسيته فقط", "أنه على كفالة المقاول، ويحمل بطاقات التعميد أو التأهيل والأمن الصناعي، ومُدرج في نموذج فريق العمل", "أنه يملك سيارة"], e: "ثلاث نقاط قبل الدخول: الكفالة، والبطاقات، ونموذج فريق العمل." },
    en: { q: "Before any worker accesses the site, verify that he is:", o: ["Of a certain age and nationality only", "Under the contractor’s sponsorship, holds authorization, qualification and industrial security cards, and is on the Work Team Form", "The owner of a car"], e: "Three checks before entry: sponsorship, cards, Work Team Form." },
    ur: { q: "کسی بھی مزدور کے سائٹ میں داخل ہونے سے پہلے یقینی بنائیں کہ:", o: ["صرف اس کی عمر اور قومیت", "ٹھیکیدار کی کفالت میں ہو، اتھارائزیشن، اہلیت اور انڈسٹریل سیکیورٹی کارڈ رکھتا ہو، اور ورک ٹیم فارم میں ہو", "اس کے پاس گاڑی ہو"], e: "داخلے سے پہلے تین باتیں: کفالت، کارڈ، ورک ٹیم فارم۔" } },
  { a: 0,
    ar: { q: "لاحظت عاملًا لا تعرفه يبدأ العمل في الموقع:", o: ["لا يبدأ العمل حتى تتأكد من كفالته وبطاقاته وتسجيله، وتبلّغ المشرف", "أتركه يعمل لأن الفريق يحتاج يدًا", "أسأله بعد انتهاء العمل"], e: "كل عامل في الموقع يجب أن يكون معروفًا، ومدرَّبًا، ومسجَّلًا قبل أن يبدأ." },
    en: { q: "You notice a worker you don’t know starting work on site:", o: ["He doesn’t start until his sponsorship, cards and registration are verified, and you tell the supervisor", "Let him work, the crew needs a hand", "Ask him after the job"], e: "Every worker on site must be identified, competent and registered before starting." },
    ur: { q: "آپ نے ایک نامعلوم مزدور کو سائٹ پر کام شروع کرتے دیکھا:", o: ["جب تک کفالت، کارڈ اور رجسٹریشن کی تصدیق نہ ہو کام شروع نہ کرے، اور سپروائزر کو بتائیں", "کام کرنے دیں، ٹیم کو مدد چاہیے", "کام کے بعد اس سے پوچھیں"], e: "سائٹ پر ہر مزدور کام سے پہلے معلوم، تربیت یافتہ اور رجسٹرڈ ہو۔" } },
  { a: 2,
    ar: { q: "حسب نظام العمل السعودي (المادة 39)، هل يجوز للمنشأة أن تشغّل عامل منشأة أخرى؟", o: ["نعم، بموافقة شفهية من الكفيل", "نعم، إذا كان العمل قصيرًا", "لا، إلا عبر الطريق النظامي المعتمد مثل برنامج أجير"], e: "المادة 39 تمنع تشغيل عامل الغير، والعمل المعتمد عبر برنامج أجير لا يُعد مخالفة." },
    en: { q: "Under Saudi Labor Law (Article 39), may an establishment employ another establishment’s worker?", o: ["Yes, with the sponsor’s verbal approval", "Yes, if the job is short", "No, except through the approved lawful route such as the Ajeer program"], e: "Article 39 prohibits employing another employer’s worker; approved work through Ajeer is not a violation." },
    ur: { q: "سعودی لیبر قانون (دفعہ 39) کے مطابق کیا کوئی ادارہ دوسرے ادارے کا مزدور رکھ سکتا ہے؟", o: ["ہاں، کفیل کی زبانی اجازت سے", "ہاں، اگر کام مختصر ہو", "نہیں، سوائے منظور شدہ قانونی راستے جیسے اجیر پروگرام کے"], e: "دفعہ 39 دوسرے کا مزدور رکھنا منع کرتی ہے؛ اجیر کے ذریعے منظور شدہ کام خلاف ورزی نہیں۔" } }
];
