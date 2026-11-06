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
      { url: "https://www.cdc.gov/niosh/blogs/2022/protecting-temporary-workers.html#:~:text=host%20employer",
        ar: { n: "حماية العمال المؤقتين: أفضل الممارسات للمنشأة المستضيفة", by: "NIOSH / OSHA", d: "المنشأة المستضيفة مسؤولة عن سلامة كل من يعمل في موقعها، وعن تدريبه على مخاطر الموقع." },
        en: { n: "Protecting Temporary Workers: Best Practices for Host Employers", by: "NIOSH / OSHA", d: "The host employer is responsible for the safety of everyone working on its site, including site-specific training." },
        ur: { n: "عارضی مزدوروں کا تحفظ: میزبان آجر کے لیے بہترین طریقے", by: "NIOSH / OSHA", d: "میزبان آجر اپنی سائٹ پر کام کرنے والے ہر شخص کی حفاظت اور سائٹ کی تربیت کا ذمہ دار ہے۔" } }
    ]
  }
  ,
  {
    id: "traffic",
    icon: "img/ic/car.webp",
    video:  { ar: "videos/ws-traffic-ar.mp4", en: "videos/ws-traffic-en.mp4", ur: "videos/ws-traffic-ur.mp4" },
    poster: { ar: "videos/ws-traffic-ar.jpg", en: "videos/ws-traffic-en.jpg", ur: "videos/ws-traffic-ur.jpg" },

    ar: {
      title: "حماية موقع العمل من المرور والجمهور",
      sub: "ثلاثة يتشاركون موقع العمل… وتأمين الموقع يحميهم معًا",
      watch: "شاهد: حماية موقع العمل في دقيقة ونصف",
      blocks: [
        { type: "lead", p: [
          "موقع عمل صغير على الطريق يتشاركه ثلاثة: السائق، والمارّة، وفريق العمل. كل واحد منهم يرى الموقع بطريقة مختلفة.",
          "السائق يمرّ في ثوانٍ ويعتمد على ما يراه أمامه، والمارّ لا يعرف مخاطر الموقع، والفريق منشغل بعمله وظهره غالبًا للطريق. لذلك تأمين الموقع لا يحمي الفريق وحده، بل يحمي الثلاثة معًا." ] },
        { type: "tiles", h: "ثلاثة يتشاركون موقع العمل", cols: "three", items: [
          ["ic:car", "السائق", "يمرّ بالموقع في ثوانٍ، ويعتمد على ما يراه أمامه"],
          ["ic:person", "المارّة", "لا يعرفون ما نعرفه عن الموقع ومخاطره"],
          ["ic:team", "فريق العمل", "منشغل بعمله، وظهره غالبًا للطريق"] ] },
        { type: "figure", src: "img/ws/traffic-road.webp", cap: "المناطق الخمس لموقع العمل على الطريق، بترتيب مرور السائق" },
        { type: "zones", h: "المناطق الخمس", items: [
          ["التحذير المسبق", "لوحات قبل الموقع بمسافة تكفي ليتمهّل السائق"],
          ["التحويل", "أقماع مائلة تدريجيًا ولوحة سهم مضاءة ترشد السائق إلى المسار الآخر"],
          ["المنطقة العازلة", "مساحة فارغة تفصل المرور عن الفريق"],
          ["منطقة العمل", "حواجز صلبة حول الحفريات والمعدات والعاملين"],
          ["نهاية الأعمال", "لوحة تخبر السائق أن الطريق عاد إلى طبيعته"] ] },
        { type: "figure", src: "img/ws/traffic-ped.webp", h: "المارّة", cap: "المارّة لا يعرفون مخاطر الموقع. حاجز واضح، ولوحة مفهومة، وممر آمن… يُبعدهم عن الحفرة" },
        { type: "compare", h: "في الليل: الضوء يجعل الموقع مرئيًا", items: [
          ["img/ws/traffic-night-off.webp", "بدون إضاءة", "bad"],
          ["img/ws/traffic-night-on.webp", "إضاءة وأضواء تحذيرية وسترات عاكسة", "ok"] ] },
        { type: "checks", h: "قبل أن تبدأ العمل على الطريق… تأكّد", items: [
          "لوحات التحذير المسبق في مكانها وعلى مسافة كافية",
          "الأقماع ولوحة السهم المضاءة توجّه المرور بعيدًا عن الموقع",
          "المنطقة العازلة فارغة: لا معدات ولا مواد ولا عمال",
          "حواجز صلبة حول الحفريات، وممر آمن للمارّة",
          "إضاءة وأضواء تحذيرية وسترات عاكسة في العمل الليلي" ] },
        { type: "close", t: "موقع مؤمَّن… فريق آمن، وجمهور آمن" }
      ]
    },

    en: {
      title: "Protecting the Work Zone from Traffic and the Public",
      sub: "Three road users share the work zone… and a properly secured work zone protects all three",
      watch: "Watch: Work Zone Protection in 90 Seconds",
      blocks: [
        { type: "lead", p: [
          "A small work site on the road is shared by three: the driver, pedestrians, and the work crew. Each of them sees the site differently.",
          "The driver passes in seconds and relies on what is in front of him, the pedestrian doesn’t know the site’s hazards, and the crew is busy working, often with their backs to the road. So securing the site doesn’t protect the crew alone; it protects all three." ] },
        { type: "tiles", h: "Three road users share the work zone", cols: "three", items: [
          ["ic:car", "Drivers", "Pass the site in seconds and rely on what they see ahead"],
          ["ic:person", "Pedestrians", "Unaware of the site hazards we know about"],
          ["ic:team", "Work crew", "Focused on the task, often with their back to traffic"] ] },
        { type: "figure", src: "img/ws/traffic-road-en.webp", cap: "Temporary traffic management: the five zones, in the order drivers meet them" },
        { type: "zones", h: "The five TTM zones", items: [
          ["Advance Warning Area", "Advance warning signs placed far enough ahead for drivers to reduce speed"],
          ["Transition Area", "A gradual cone taper and an illuminated arrow board guide drivers into the open lane"],
          ["Buffer Space", "A clear, unoccupied space separating live traffic from the work crew"],
          ["Work Area", "Rigid barriers around excavations, plant and workers"],
          ["Termination Area", "An END OF ROADWORKS sign informs drivers that normal road conditions resume"] ] },
        { type: "figure", src: "img/ws/traffic-ped-en.webp", h: "Pedestrian Safety", cap: "Pedestrians are unaware of site hazards. Clear barriers, understandable signage and a protected pedestrian walkway… keep them away from the excavation" },
        { type: "compare", h: "At night: lighting makes the work zone visible", items: [
          ["img/ws/traffic-night-off-en.webp", "Without lighting", "bad"],
          ["img/ws/traffic-night-on-en.webp", "Work lighting, warning beacons and high-visibility vests", "ok"] ] },
        { type: "checks", h: "Before you start work on the road… verify", items: [
          "Advance warning signs are in place, far enough ahead",
          "Cones and the lit arrow board steer traffic away from the site",
          "The buffer space is empty: no plant, materials or workers",
          "Rigid barriers around excavations, and a safe walkway for pedestrians",
          "Lighting, warning lights and reflective vests for night work" ] },
        { type: "close", t: "A secured work zone… safe workers, safe public" }
      ]
    },

    ur: {
      title: "ورک زون کو ٹریفک اور عوام سے محفوظ رکھنا",
      sub: "تین فریق ورک زون میں شریک ہیں… اور محفوظ ورک زون تینوں کی حفاظت کرتا ہے",
      watch: "دیکھیے: ورک زون کی حفاظت ڈیڑھ منٹ میں",
      blocks: [
        { type: "lead", p: [
          "سڑک پر ایک چھوٹی سی کام کی جگہ میں تین فریق شریک ہیں: ڈرائیور، پیدل چلنے والا، اور کام کی ٹیم۔ ہر ایک جگہ کو مختلف انداز سے دیکھتا ہے۔",
          "ڈرائیور چند سیکنڈ میں گزرتا ہے اور جو سامنے دیکھے اسی پر بھروسہ کرتا ہے، پیدل چلنے والا سائٹ کے خطرات نہیں جانتا، اور ٹیم کام میں مصروف ہوتی ہے، اکثر سڑک کی طرف پیٹھ کیے۔ اس لیے جگہ محفوظ بنانا صرف ٹیم کو نہیں، تینوں کو بچاتا ہے۔" ] },
        { type: "tiles", h: "تین فریق ورک زون میں شریک ہیں", cols: "three", items: [
          ["ic:car", "ڈرائیور", "چند سیکنڈ میں سائٹ سے گزرتا ہے، اور جو سامنے دیکھتا ہے اسی پر چلتا ہے"],
          ["ic:person", "پیدل چلنے والے", "سائٹ کے خطرات سے واقف نہیں"],
          ["ic:team", "ورک ٹیم", "اپنے کام میں مصروف، اکثر ٹریفک کی طرف پیٹھ"] ] },
        { type: "figure", src: "img/ws/traffic-road-en.webp", cap: "سڑک پر ورک زون کے پانچ زون، اس ترتیب سے جس میں ڈرائیور گزرتا ہے" },
        { type: "zones", h: "ٹی ٹی ایم کے پانچ زون", items: [
          ["ایڈوانس وارننگ ایریا", "سائٹ سے پہلے کافی فاصلے پر وارننگ سائن، تاکہ ڈرائیور رفتار کم کرے"],
          ["ٹرانزیشن ایریا", "کونز کی بتدریج ٹیپر اور روشن ایرو بورڈ ڈرائیور کو کھلی لین کی طرف لے جاتے ہیں"],
          ["بفر اسپیس", "خالی جگہ جو ٹریفک کو ورک ٹیم سے الگ رکھتی ہے"],
          ["ورک ایریا", "کھدائی، مشینری اور مزدوروں کے گرد مضبوط بیریئر"],
          ["ٹرمینیشن ایریا", "سائن جو ڈرائیور کو بتاتا ہے کہ سڑک معمول پر آ گئی"] ] },
        { type: "figure", src: "img/ws/traffic-ped-en.webp", h: "پیدل چلنے والوں کی حفاظت", cap: "پیدل چلنے والے سائٹ کے خطرات سے واقف نہیں۔ واضح بیریئر، سمجھ میں آنے والا سائن، اور محفوظ راستہ… انہیں کھدائی سے دور رکھتے ہیں" },
        { type: "compare", h: "رات میں: روشنی ورک زون کو نمایاں کرتی ہے", items: [
          ["img/ws/traffic-night-off-en.webp", "بغیر روشنی", "bad"],
          ["img/ws/traffic-night-on-en.webp", "ورک لائٹس، وارننگ بیکنز اور ہائی وزیبلٹی جیکٹس", "ok"] ] },
        { type: "checks", h: "سڑک پر کام شروع کرنے سے پہلے… یقینی بنائیں", items: [
          "پیشگی انتباہی بورڈ اپنی جگہ پر اور کافی فاصلے پر ہوں",
          "کون اور روشن تیر والا بورڈ ٹریفک کو جگہ سے دور موڑیں",
          "حفاظتی خالی جگہ خالی ہو: نہ آلات، نہ سامان، نہ کارکن",
          "کھدائی کے گرد مضبوط رکاوٹیں، اور پیدل چلنے والوں کے لیے محفوظ راستہ",
          "رات کے کام میں روشنی، انتباہی بتیاں اور چمکدار جیکٹیں" ] },
        { type: "close", t: "محفوظ ورک زون… محفوظ ورک ٹیم، محفوظ عوام" }
      ]
    },

    sources: [
      { url: "https://mutcd.fhwa.dot.gov/HTM/2009/part6/fig6c_01_longdesc.htm",
        ar: { n: "مناطق التحكم المروري المؤقت (الشكل 6C-1)", by: "MUTCD — الإدارة الفيدرالية للطرق الأمريكية FHWA", d: "يقسّم موقع العمل على الطريق إلى: التحذير المسبق، والتحويل، ومنطقة النشاط (ومنها المنطقة العازلة)، ونهاية الأعمال." },
        en: { n: "Temporary Traffic Control zone areas (Figure 6C-1)", by: "MUTCD — U.S. Federal Highway Administration", d: "Divides a road work zone into advance warning, transition, activity area (including the buffer space), and termination." },
        ur: { n: "عارضی ٹریفک کنٹرول کے حصے (شکل 6C-1)", by: "MUTCD — امریکی وفاقی ہائی وے ایڈمنسٹریشن", d: "سڑک پر کام کی جگہ کو تقسیم کرتا ہے: پیشگی انتباہ، راستہ موڑنا، سرگرمی کا علاقہ (بشمول حفاظتی جگہ)، اور اختتام۔" } },
      { url: "https://mutcd.fhwa.dot.gov/htm/2009/part6/part6_toc.htm",
        ar: { n: "الجزء السادس: التحكم المروري المؤقت", by: "MUTCD — FHWA", d: "الدليل الكامل للوحات والأقماع والحواجز والإضاءة في مناطق العمل." },
        en: { n: "Part 6: Temporary Traffic Control", by: "MUTCD — FHWA", d: "The full guide to signs, cones, barriers and lighting in work zones." },
        ur: { n: "حصہ 6: عارضی ٹریفک کنٹرول", by: "MUTCD — FHWA", d: "کام کی جگہوں میں بورڈ، کون، رکاوٹوں اور روشنی کی مکمل رہنمائی۔" } },
      { url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.200",
        ar: { n: "اللوحات والإشارات والحواجز في مواقع الإنشاء", by: "OSHA 1926.200", d: "وسائل التحكم المروري لحماية العاملين يجب أن تطابق الجزء السادس من MUTCD." },
        en: { n: "Accident prevention signs and tags; traffic control", by: "OSHA 1926.200", d: "Traffic control devices protecting construction workers must conform to Part 6 of the MUTCD." },
        ur: { n: "تعمیراتی جگہوں پر بورڈ، اشارے اور رکاوٹیں", by: "OSHA 1926.200", d: "کارکنوں کے تحفظ کے لیے ٹریفک کنٹرول کے آلات MUTCD کے حصہ 6 کے مطابق ہوں۔" } },
      { url: "https://osha.gov/highway-workzones/standards",
        ar: { n: "مناطق العمل على الطرق: المعايير", by: "OSHA", d: "المعايير المطبّقة على العمل بجوار المرور واللوحات والحواجز." },
        en: { n: "Highway Work Zones: Standards", by: "OSHA", d: "The standards that apply to working next to traffic, signs and barricades." },
        ur: { n: "سڑک پر کام کی جگہیں: معیارات", by: "OSHA", d: "ٹریفک کے ساتھ کام، بورڈ اور رکاوٹوں پر لاگو معیارات۔" } },
      { url: "https://www.hse.gov.uk/construction/safetytopics/publicprotection.htm#:~:text=excavations%2C%20manholes",
        ar: { n: "حماية الجمهور في مواقع الإنشاء", by: "هيئة الصحة والسلامة البريطانية HSE", d: "المارّة قد يسقطون في الحفريات وفتحات الصرف، فيلزم حواجز أو أغطية، ومحيط واضح للموقع." },
        en: { n: "Protecting the public", by: "UK Health and Safety Executive (HSE)", d: "People can fall into excavations and manholes, so barriers or covers and a clear site perimeter are needed." },
        ur: { n: "تعمیراتی جگہوں پر عوام کا تحفظ", by: "برطانوی ہیلتھ اینڈ سیفٹی ایگزیکٹو HSE", d: "لوگ کھدائی اور مین ہول میں گر سکتے ہیں، اس لیے رکاوٹیں یا ڈھکن اور واضح حد بندی ضروری ہے۔" } }
    ]
  }
  ,
  {
    id: "fire",
    emoji: "🧯",
    icon: "img/ic/fire.webp",
    video:  { ar: "", en: "", ur: "" },
    poster: { ar: "", en: "", ur: "" },
    lab: "lab/fire.html",

    ar: {
      title: "أساسيات مكافحة الحريق",
      sub: "أغلب الحرائق تبدأ من شرارة صغيرة… اعرف كيف تمنعها وكيف تطفئها",
      watch: "شاهد: أساسيات مكافحة الحريق",
      blocks: [
        { type: "lead", p: [
          "قالت العرب قديمًا: «معظم النار من مستصغر الشرر». الحريق يبقى نارًا ما دام تحت السيطرة، فإذا فقدنا السيطرة عليه صار حادثًا.",
          "في هذه الورشة تتعرف على عناصر الحريق ومراحله، وطرق إطفائه، وأنواع الحرائق وطفاياتها، والطريقة الصحيحة لاستخدام الطفاية. وفيها مختبر تفاعلي تجرّب فيه بنفسك." ] },
        { type: "lab", h: "جرّب بنفسك في المختبر التفاعلي", p: "رباعي الحريق، ومراحل الحريق، والطفايات، وطريقة PASS… كلها بمحاكاة ثلاثية الأبعاد.", btn: "افتح مختبر مكافحة الحريق" },
        { type: "tiles", h: "رباعي الحريق: أربعة عناصر يحتاجها الحريق", cols: "four", items: [
          ["🪵", "الوقود", "صلب مثل الخشب والورق، أو سائل مثل الزيوت والبنزين، أو غاز مثل البيوتان والميثان"],
          ["💨", "الأكسجين", "موجود في الهواء بنسبة 19–21٪ تقريبًا"],
          ["🔥", "الحرارة", "ترفع المادة إلى درجة اشتعالها"],
          ["⚛️", "التفاعل المتسلسل", "تفاعلات سريعة تُبقي اللهب مستمرًا وتنشره"] ] },
        { type: "tiles", h: "طرق الإطفاء: أزل عنصرًا واحدًا وينطفئ الحريق", cols: "four", items: [
          ["🚚", "التجويع", "إبعاد الوقود أو عزله عن النار"],
          ["🫧", "الخنق", "قطع الأكسجين بالرغوة أو ثاني أكسيد الكربون"],
          ["💧", "التبريد", "خفض الحرارة تحت درجة الاشتعال بالماء"],
          ["🧪", "كسر التفاعل المتسلسل", "بالبودرة الكيميائية الجافة"] ] },
        { type: "zones", h: "مراحل الحريق الأربع", items: [
          ["المرحلة الابتدائية", "جزيئات احتراق دقيقة لا تُرى، بلا دخان ولا لهب. يكشفها الكاشف الأيوني"],
          ["مرحلة الدخان", "دخان مرئي بدون لهب أو حرارة واضحة. يكشفها الكاشف الكهروضوئي"],
          ["مرحلة اللهب", "لهب ظاهر ودخان أكثر وحرارة محسوسة. يكشفها كاشف الأشعة تحت الحمراء"],
          ["مرحلة الحرارة", "حرارة عالية وغازات سامة، وتتطور خلال ثوانٍ. يكشفها كاشف الحرارة"] ] },
        { type: "tiles", h: "أنواع الحرائق", cols: "five", items: [
          ["🅰️", "الفئة A", "مواد صلبة عادية: خشب، ورق، قماش. تُطفأ بالماء أو الرغوة"],
          ["🅱️", "الفئة B", "سوائل وغازات قابلة للاشتعال. تُطفأ بالرغوة أو البودرة الجافة"],
          ["⚡", "الفئة C", "معدات كهربائية. تُطفأ بثاني أكسيد الكربون أو البودرة الجافة"],
          ["🔩", "الفئة D", "معادن مثل الألومنيوم والمغنيسيوم. تُطفأ ببودرة خاصة"],
          ["🍳", "الفئة K", "زيوت الطبخ في المطابخ"] ] },
        { type: "tiles", h: "أنواع الطفايات", cols: "four", items: [
          ["💧", "طفاية الماء", "للفئة A فقط. لا تُستخدم أبدًا على الكهرباء"],
          ["🫧", "طفاية الرغوة (بيج/أصفر)", "للفئتين A وB. لا تُستخدم على الكهرباء"],
          ["🌫️", "طفاية ثاني أكسيد الكربون (أحمر/أسود)", "للفئتين B وC. بوق كبير وبلا مؤشر ضغط، وضعيفة في الهواء الطلق"],
          ["🧯", "طفاية البودرة الجافة (أحمر/أزرق)", "للفئات A وB وC. سريعة، لكن الحريق قد يعود لأنها لا تبرّد"] ] },
        { type: "checks", h: "طريقة PASS لاستخدام الطفاية", items: [
          "P: اسحب مسمار الأمان",
          "A: وجّه الفوهة إلى قاعدة اللهب",
          "S: اضغط على المقبض",
          "S: حرّك الفوهة يمينًا ويسارًا حتى تنطفئ النار" ] },
        { type: "tiles", h: "قبل وأثناء الإطفاء", cols: "four", items: [
          ["🌬️", "الريح خلفك", "قاتل الحريق والريح في ظهرك، لا في وجهك"],
          ["📏", "مسافة آمنة", "ابقَ على 8 أقدام (حوالي 2.4 متر) على الأقل"],
          ["⬇️", "انخفض واقترب", "اقترب منخفضًا، ووجّه إلى قاعدة النار لا إلى أعلاها"],
          ["↩️", "ارجع بنفس الطريق", "بعد الإطفاء تراجع بحذر، وانتبه لعودة الاشتعال"] ] },
        { type: "tiles", h: "أخطاء شائعة", cols: "four", items: [
          ["❌", "الإطفاء عكس الريح", "يقلل الكفاءة ويعرّضك للحرارة والدخان"],
          ["❌", "توجيه المادة لأعلى اللهب", "الصحيح: قاعدة اللهب"],
          ["❌", "الرش قبل الوصول للمسافة الفعّالة", "تفرغ الطفاية قبل أن تصل للنار"],
          ["❌", "ترك الموقع قبل التأكد", "عدم التأكد من الإطفاء الكامل قد يسبب عودة الحريق"] ] },
        { type: "checks", h: "قبل أن تحتاج الطفاية… تأكّد", items: [
          "الطفاية في مكانها الصحيح، وظاهرة، ولا شيء يعيق الوصول إليها",
          "مسمار الأمان مثبّت",
          "مؤشر الضغط في المنطقة الخضراء",
          "نوع الطفاية مناسب لنوع المواد في المكان",
          "لا تواجه حريقًا بدون تدريب ومعدات مناسبة" ] },
        { type: "close", t: "معظم النار من مستصغر الشرر… الوقاية تبدأ قبل الشرارة" }
      ]
    },

    en: {
      title: "Basic Fire Fighting",
      sub: "Most fires start from a tiny spark… learn how to prevent them and how to put them out",
      watch: "Watch: Basic fire fighting",
      blocks: [
        { type: "lead", p: [
          "An old Arab saying goes: “Most fires start from a tiny spark.” Fire stays fire while it is under control; once control is lost, it becomes an incident.",
          "In this workshop you learn the elements and stages of fire, how fires are extinguished, the classes of fire and their extinguishers, and the right way to use an extinguisher. There is also an interactive lab to try it yourself." ] },
        { type: "lab", h: "Try it yourself in the interactive lab", p: "The fire tetrahedron, fire stages, extinguishers and the PASS technique… all in 3D simulation.", btn: "Open the fire fighting lab" },
        { type: "tiles", h: "The fire tetrahedron: four elements a fire needs", cols: "four", items: [
          ["🪵", "Fuel", "Solid like wood and paper, liquid like oils and gasoline, or gas like butane and methane"],
          ["💨", "Oxygen", "About 19–21% of the air"],
          ["🔥", "Heat", "Raises the material to its ignition temperature"],
          ["⚛️", "Chain reaction", "Rapid reactions that keep the flame going and spreading"] ] },
        { type: "tiles", h: "Extinguishing methods: remove one element and the fire goes out", cols: "four", items: [
          ["🚚", "Starvation", "Remove or isolate the fuel"],
          ["🫧", "Smothering", "Cut off oxygen with foam or CO₂"],
          ["💧", "Cooling", "Bring the temperature below ignition with water"],
          ["🧪", "Chain-reaction inhibition", "With dry chemical powder"] ] },
        { type: "zones", h: "The four stages of fire", items: [
          ["Preliminary stage", "Invisible combustion particles, no smoke or flame. Detected by ionization detectors"],
          ["Smoking stage", "Visible smoke without flame or noticeable heat. Detected by photoelectric detectors"],
          ["Flame stage", "Visible flames, more smoke, perceptible heat. Detected by infrared detectors"],
          ["Heat stage", "Intense heat and toxic gases, developing within seconds. Detected by heat detectors"] ] },
        { type: "tiles", h: "Classes of fire", cols: "five", items: [
          ["🅰️", "Class A", "Ordinary solids: wood, paper, textiles. Water or foam"],
          ["🅱️", "Class B", "Flammable liquids and gases. Foam or dry powder"],
          ["⚡", "Class C", "Energized electrical equipment. CO₂ or dry powder"],
          ["🔩", "Class D", "Metals such as aluminum and magnesium. Special dry powder"],
          ["🍳", "Class K", "Cooking oils in kitchens"] ] },
        { type: "tiles", h: "Types of extinguishers", cols: "four", items: [
          ["💧", "Water", "Class A only. Never on electrical fires"],
          ["🫧", "Foam (beige/yellow)", "Classes A and B. Not on electrical fires"],
          ["🌫️", "CO₂ (red/black)", "Classes B and C. Large horn, no pressure gauge, weak outdoors"],
          ["🧯", "Dry powder (red/blue)", "Classes A, B and C. Fast, but no cooling, so the fire may reignite"] ] },
        { type: "checks", h: "The PASS technique", items: [
          "P: Pull the safety pin",
          "A: Aim at the base of the flames",
          "S: Squeeze the handle",
          "S: Sweep from side to side until the fire is out" ] },
        { type: "tiles", h: "Before and during extinguishing", cols: "four", items: [
          ["🌬️", "Wind at your back", "Fight the fire with the wind behind you, not in your face"],
          ["📏", "Safe distance", "Stay at least 8 feet (about 2.4 m) away"],
          ["⬇️", "Stay low", "Approach low and aim at the base, not the top of the fire"],
          ["↩️", "Back away the same way", "After it’s out, retreat carefully and watch for reignition"] ] },
        { type: "tiles", h: "Common mistakes", cols: "four", items: [
          ["❌", "Fighting against the wind", "Lowers efficiency and exposes you to heat and smoke"],
          ["❌", "Aiming at the top of the flames", "Correct: the base of the flames"],
          ["❌", "Discharging too early", "The extinguisher empties before reaching the fire"],
          ["❌", "Leaving before it’s fully out", "Not confirming extinguishment can lead to reignition"] ] },
        { type: "checks", h: "Before you need the extinguisher… verify", items: [
          "It is in the right place, visible and unobstructed",
          "The safety pin is in place",
          "The pressure gauge is in the green zone",
          "The extinguisher type suits the materials in the area",
          "Don’t fight a fire without training and the right equipment" ] },
        { type: "close", t: "Most fires start from a tiny spark… prevention starts before the spark" }
      ]
    },

    ur: {
      title: "آگ بجھانے کی بنیادی باتیں",
      sub: "زیادہ تر آگ ایک چھوٹی سی چنگاری سے شروع ہوتی ہے… اسے روکنا اور بجھانا سیکھیں",
      watch: "دیکھیے: آگ بجھانے کی بنیادی باتیں",
      blocks: [
        { type: "lead", p: [
          "عربوں کا پرانا قول ہے: ”زیادہ تر آگ چھوٹی چنگاری سے لگتی ہے“۔ آگ جب تک قابو میں ہے آگ ہے؛ قابو سے نکل جائے تو حادثہ بن جاتی ہے۔",
          "اس ورکشاپ میں آپ آگ کے عناصر اور مراحل، آگ بجھانے کے طریقے، آگ کی اقسام اور ان کے آلات، اور آگ بجھانے والے آلے کا درست استعمال سیکھیں گے۔ ساتھ میں ایک انٹرایکٹو لیب بھی ہے جس میں آپ خود آزما سکتے ہیں۔" ] },
        { type: "lab", h: "انٹرایکٹو لیب میں خود آزمائیں", p: "آگ کا چار رخی ہرم، آگ کے مراحل، آلات اور PASS طریقہ… سب سہ جہتی نقل میں۔", btn: "آگ بجھانے کی لیب کھولیں" },
        { type: "tiles", h: "آگ کے چار عناصر", cols: "four", items: [
          ["🪵", "ایندھن", "ٹھوس جیسے لکڑی اور کاغذ، مائع جیسے تیل اور پیٹرول، یا گیس جیسے بیوٹین اور میتھین"],
          ["💨", "آکسیجن", "ہوا میں تقریباً 19–21٪"],
          ["🔥", "حرارت", "مادے کو جلنے کے درجہ حرارت تک لے جاتی ہے"],
          ["⚛️", "مسلسل کیمیائی عمل", "تیز ردعمل جو شعلے کو جاری اور پھیلاتے ہیں"] ] },
        { type: "tiles", h: "بجھانے کے طریقے: ایک عنصر ہٹائیں اور آگ بجھ جاتی ہے", cols: "four", items: [
          ["🚚", "ایندھن ہٹانا", "ایندھن کو آگ سے دور یا الگ کرنا"],
          ["🫧", "دم گھونٹنا", "جھاگ یا کاربن ڈائی آکسائیڈ سے آکسیجن روکنا"],
          ["💧", "ٹھنڈا کرنا", "پانی سے درجہ حرارت جلنے کی حد سے نیچے لانا"],
          ["🧪", "کیمیائی عمل توڑنا", "خشک کیمیائی پاؤڈر سے"] ] },
        { type: "zones", h: "آگ کے چار مراحل", items: [
          ["ابتدائی مرحلہ", "نظر نہ آنے والے ذرات، نہ دھواں نہ شعلہ۔ آئیونائزیشن ڈیٹیکٹر پکڑتا ہے"],
          ["دھوئیں کا مرحلہ", "نظر آنے والا دھواں، شعلہ یا واضح حرارت نہیں۔ فوٹو الیکٹرک ڈیٹیکٹر پکڑتا ہے"],
          ["شعلے کا مرحلہ", "نظر آنے والا شعلہ، زیادہ دھواں، محسوس ہونے والی حرارت۔ انفراریڈ ڈیٹیکٹر پکڑتا ہے"],
          ["حرارت کا مرحلہ", "شدید حرارت اور زہریلی گیسیں، سیکنڈوں میں بڑھتی ہیں۔ ہیٹ ڈیٹیکٹر پکڑتا ہے"] ] },
        { type: "tiles", h: "آگ کی اقسام", cols: "five", items: [
          ["🅰️", "کلاس A", "عام ٹھوس اشیاء: لکڑی، کاغذ، کپڑا۔ پانی یا جھاگ"],
          ["🅱️", "کلاس B", "آتش گیر مائعات اور گیسیں۔ جھاگ یا خشک پاؤڈر"],
          ["⚡", "کلاس C", "بجلی کے آلات۔ کاربن ڈائی آکسائیڈ یا خشک پاؤڈر"],
          ["🔩", "کلاس D", "دھاتیں جیسے ایلومینیم اور میگنیشیم۔ خاص پاؤڈر"],
          ["🍳", "کلاس K", "کچن میں کھانا پکانے کا تیل"] ] },
        { type: "tiles", h: "آگ بجھانے والے آلات کی اقسام", cols: "four", items: [
          ["💧", "پانی", "صرف کلاس A۔ بجلی پر کبھی نہیں"],
          ["🫧", "جھاگ (بیج/پیلا)", "کلاس A اور B۔ بجلی پر نہیں"],
          ["🌫️", "کاربن ڈائی آکسائیڈ (سرخ/سیاہ)", "کلاس B اور C۔ بڑا ہارن، پریشر گیج نہیں، کھلی جگہ پر کمزور"],
          ["🧯", "خشک پاؤڈر (سرخ/نیلا)", "کلاس A، B اور C۔ تیز، لیکن ٹھنڈا نہیں کرتا اس لیے آگ دوبارہ لگ سکتی ہے"] ] },
        { type: "checks", h: "PASS طریقہ", items: [
          "P: حفاظتی پن کھینچیں",
          "A: شعلے کی جڑ کی طرف رخ کریں",
          "S: ہینڈل دبائیں",
          "S: دائیں بائیں گھمائیں جب تک آگ بجھ نہ جائے" ] },
        { type: "tiles", h: "بجھانے سے پہلے اور دوران", cols: "four", items: [
          ["🌬️", "ہوا آپ کی پیٹھ پر", "ہوا پیچھے ہو، سامنے نہیں"],
          ["📏", "محفوظ فاصلہ", "کم از کم 8 فٹ (تقریباً 2.4 میٹر) دور رہیں"],
          ["⬇️", "جھک کر قریب جائیں", "جھک کر قریب جائیں اور جڑ پر رخ کریں، اوپر نہیں"],
          ["↩️", "اسی راستے واپس", "بجھنے کے بعد احتیاط سے پیچھے ہٹیں، دوبارہ بھڑکنے پر نظر رکھیں"] ] },
        { type: "tiles", h: "عام غلطیاں", cols: "four", items: [
          ["❌", "ہوا کے خلاف بجھانا", "کارکردگی کم اور حرارت و دھوئیں کا سامنا"],
          ["❌", "شعلے کے اوپر رخ کرنا", "درست: شعلے کی جڑ"],
          ["❌", "بہت پہلے چھڑکنا", "آلہ آگ تک پہنچنے سے پہلے خالی ہو جاتا ہے"],
          ["❌", "مکمل بجھنے سے پہلے چھوڑ دینا", "آگ دوبارہ لگ سکتی ہے"] ] },
        { type: "checks", h: "آلے کی ضرورت سے پہلے… یقینی بنائیں", items: [
          "آلہ صحیح جگہ پر، نظر آنے والا اور راستہ صاف ہو",
          "حفاظتی پن اپنی جگہ پر ہو",
          "پریشر گیج سبز حصے میں ہو",
          "آلے کی قسم جگہ کے مواد کے مطابق ہو",
          "تربیت اور مناسب سامان کے بغیر آگ کا سامنا نہ کریں" ] },
        { type: "close", t: "زیادہ تر آگ چھوٹی چنگاری سے لگتی ہے… بچاؤ چنگاری سے پہلے شروع ہوتا ہے" }
      ]
    },

    sources: [
      { url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.157",
        ar: { n: "طفايات الحريق المحمولة", by: "OSHA 1910.157", d: "وضع الطفايات واستخدامها وصيانتها وفحصها، والفحص البصري الشهري والصيانة السنوية." },
        en: { n: "Portable fire extinguishers", by: "OSHA 1910.157", d: "Placement, use, maintenance and testing of extinguishers, with monthly visual checks and annual maintenance." },
        ur: { n: "پورٹیبل آگ بجھانے والے آلات", by: "OSHA 1910.157", d: "آلات کی جگہ، استعمال، دیکھ بھال اور جانچ، ماہانہ معائنہ اور سالانہ مرمت کے ساتھ۔" } },
      { url: "https://www.osha.gov/etools/evacuation-plans-procedures/emergency-standards/portable-extinguishers/required",
        ar: { n: "متطلبات طفايات الحريق", by: "OSHA — دليل الإخلاء والطوارئ", d: "الفحص الشهري والسنوي، وتدريب العاملين على استخدام الطفاية عند التعيين وسنويًا." },
        en: { n: "Portable extinguishers: OSHA requirements", by: "OSHA eTool: Evacuation Plans and Procedures", d: "Monthly and annual checks, and training employees to use extinguishers on hiring and yearly." },
        ur: { n: "آگ بجھانے والے آلات کے تقاضے", by: "OSHA — انخلا اور ایمرجنسی گائیڈ", d: "ماہانہ اور سالانہ جانچ، اور ملازمین کو بھرتی پر اور سالانہ تربیت۔" } },
      { url: "https://www.osha.gov/fire-safety",
        ar: { n: "السلامة من الحريق", by: "OSHA", d: "نظرة عامة على مخاطر الحريق في أماكن العمل والمعايير المطبّقة." },
        en: { n: "Fire Safety", by: "OSHA", d: "Overview of workplace fire hazards and the standards that apply." },
        ur: { n: "آگ سے حفاظت", by: "OSHA", d: "کام کی جگہوں پر آگ کے خطرات اور لاگو معیارات کا جائزہ۔" } }
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

/* أسئلة ورشة حماية موقع العمل من المرور والجمهور */
QUIZ.traffic = [
  { a: 1,
    ar: { q: "من الثلاثة الذين يتشاركون موقع العمل على الطريق؟", o: ["المهندس والمشرف والعامل", "السائق والمارّة وفريق العمل", "العميل والمقاول والمورّد"], e: "ثلاثة يتشاركون الموقع: السائق، والمارّة، وفريق العمل، وتأمينه يحميهم معًا." },
    en: { q: "Which three share a road work site?", o: ["The engineer, supervisor and worker", "The driver, pedestrians and the work crew", "The client, contractor and supplier"], e: "Three share the site: the driver, pedestrians and the crew, and securing it protects all of them." },
    ur: { q: "سڑک پر کام کی جگہ میں کون تین شریک ہیں؟", o: ["انجینئر، سپروائزر اور کارکن", "ڈرائیور، راہگیر اور کام کی ٹیم", "کلائنٹ، ٹھیکیدار اور سپلائر"], e: "تین شریک ہیں: ڈرائیور، راہگیر اور ٹیم، اور جگہ محفوظ بنانا تینوں کو بچاتا ہے۔" } },
  { a: 0,
    ar: { q: "لماذا فريق العمل معرّض للخطر من المرور؟", o: ["منشغل بعمله، وظهره غالبًا للطريق", "لأنه يقود بسرعة", "لأنه لا يلبس خوذة"], e: "الفريق منشغل بعمله، وظهره غالبًا للطريق، فلا يرى السيارة القادمة." },
    en: { q: "Why is the work crew at risk from traffic?", o: ["They’re busy working, often with their backs to the road", "They drive too fast", "They don’t wear hard hats"], e: "The crew is busy working, often with their backs to the road, so they don’t see the oncoming car." },
    ur: { q: "کام کی ٹیم ٹریفک سے خطرے میں کیوں ہے؟", o: ["کام میں مصروف، اکثر سڑک کی طرف پیٹھ کیے", "کیونکہ وہ تیز گاڑی چلاتے ہیں", "کیونکہ وہ ہیلمٹ نہیں پہنتے"], e: "ٹیم کام میں مصروف ہوتی ہے، اکثر سڑک کی طرف پیٹھ کیے، اس لیے آنے والی گاڑی نہیں دیکھتی۔" } },
  { a: 2,
    ar: { q: "ما أول منطقة يمرّ بها السائق قبل موقع العمل؟", o: ["منطقة العمل", "المنطقة العازلة", "التحذير المسبق"], e: "التحذير المسبق: لوحات قبل الموقع بمسافة تكفي ليتمهّل السائق." },
    en: { q: "What is the first zone a driver passes before the work site?", o: ["The work area", "The buffer zone", "Advance warning"], e: "Advance warning: signs far enough before the site for the driver to slow down." },
    ur: { q: "کام کی جگہ سے پہلے ڈرائیور سب سے پہلے کس حصے سے گزرتا ہے؟", o: ["کام کا علاقہ", "حفاظتی خالی جگہ", "پیشگی انتباہ"], e: "پیشگی انتباہ: جگہ سے پہلے اتنے فاصلے پر بورڈ کہ ڈرائیور رفتار کم کر لے۔" } },
  { a: 1,
    ar: { q: "ما الذي يرشد السائق إلى المسار الآخر في منطقة التحويل؟", o: ["عامل يلوّح بيده فقط", "أقماع مائلة تدريجيًا ولوحة سهم مضاءة", "شريط تحذير على الأرض"], e: "التحويل: أقماع مائلة تدريجيًا ولوحة سهم مضاءة ترشد السائق إلى المسار الآخر." },
    en: { q: "What guides the driver into the other lane in the transition zone?", o: ["A worker waving his hand only", "Gradually angled cones and a lit arrow board", "Warning tape on the ground"], e: "Transition: gradually angled cones and a lit arrow board guide the driver into the other lane." },
    ur: { q: "راستہ موڑنے والے حصے میں ڈرائیور کو دوسری لین کی طرف کون لے جاتا ہے؟", o: ["صرف ہاتھ ہلاتا کارکن", "بتدریج ترچھے کون اور روشن تیر والا بورڈ", "زمین پر انتباہی ٹیپ"], e: "راستہ موڑنا: بتدریج ترچھے کون اور روشن تیر والا بورڈ ڈرائیور کو دوسری لین میں لے جاتے ہیں۔" } },
  { a: 2,
    ar: { q: "ما وظيفة المنطقة العازلة؟", o: ["تخزين المواد والمعدات", "موقف لسيارات الفريق", "مساحة فارغة تفصل المرور عن الفريق"], e: "المنطقة العازلة مساحة فارغة تفصل المرور عن الفريق، وتعطي هامشًا لسيارة خرجت عن مسارها." },
    en: { q: "What is the buffer zone for?", o: ["Storing materials and equipment", "Parking the crew’s vehicles", "An empty space separating traffic from the crew"], e: "The buffer is an empty space separating traffic from the crew, giving room for a vehicle that strays." },
    ur: { q: "حفاظتی خالی جگہ کس لیے ہے؟", o: ["سامان اور آلات رکھنے کے لیے", "ٹیم کی گاڑیاں کھڑی کرنے کے لیے", "خالی جگہ جو ٹریفک کو ٹیم سے الگ رکھتی ہے"], e: "حفاظتی جگہ خالی ہوتی ہے تاکہ ٹریفک ٹیم سے الگ رہے اور بھٹکی گاڑی کو گنجائش ملے۔" } },
  { a: 0,
    ar: { q: "وضعت مولّدًا داخل المنطقة العازلة لأنه أقرب. ما الخطأ؟", o: ["المنطقة العازلة يجب أن تبقى فارغة", "لا خطأ، المهم أنه قريب", "الخطأ أنه بلا غطاء فقط"], e: "المنطقة العازلة تبقى فارغة: لا معدات ولا مواد ولا عمال." },
    en: { q: "You put a generator in the buffer zone because it’s closer. What’s wrong?", o: ["The buffer zone must stay empty", "Nothing, closer is better", "Only that it has no cover"], e: "The buffer zone stays empty: no equipment, no materials, no workers." },
    ur: { q: "آپ نے جنریٹر حفاظتی خالی جگہ میں رکھ دیا کیونکہ قریب ہے۔ غلطی کیا ہے؟", o: ["حفاظتی جگہ خالی رہنی چاہیے", "کوئی غلطی نہیں، قریب ہونا بہتر ہے", "صرف یہ کہ اس پر ڈھکن نہیں"], e: "حفاظتی جگہ خالی رہتی ہے: نہ آلات، نہ سامان، نہ کارکن۔" } },
  { a: 1,
    ar: { q: "ما الذي يحيط بالحفريات والمعدات والعاملين في منطقة العمل؟", o: ["شريط بلاستيك فقط", "حواجز صلبة", "لا شيء إذا كان العمل قصيرًا"], e: "منطقة العمل: حواجز صلبة حول الحفريات والمعدات والعاملين." },
    en: { q: "What surrounds excavations, equipment and workers in the work area?", o: ["Plastic tape only", "Rigid barriers", "Nothing if the job is short"], e: "Work area: rigid barriers around excavations, equipment and workers." },
    ur: { q: "کام کے علاقے میں کھدائی، آلات اور کارکنوں کے گرد کیا ہوتا ہے؟", o: ["صرف پلاسٹک ٹیپ", "مضبوط رکاوٹیں", "کچھ نہیں اگر کام مختصر ہو"], e: "کام کا علاقہ: کھدائی، آلات اور کارکنوں کے گرد مضبوط رکاوٹیں۔" } },
  { a: 2,
    ar: { q: "ما وظيفة لوحة نهاية الأعمال؟", o: ["تطلب من السائق التوقف", "تشكر الفريق", "تخبر السائق أن الطريق عاد إلى طبيعته"], e: "نهاية الأعمال: لوحة تخبر السائق أن الطريق عاد إلى طبيعته." },
    en: { q: "What does the end-of-works sign do?", o: ["Tells the driver to stop", "Thanks the crew", "Tells the driver the road is back to normal"], e: "End of works: a sign telling the driver the road is back to normal." },
    ur: { q: "کام کے اختتام کا بورڈ کیا کرتا ہے؟", o: ["ڈرائیور کو رکنے کا کہتا ہے", "ٹیم کا شکریہ ادا کرتا ہے", "ڈرائیور کو بتاتا ہے کہ سڑک معمول پر آ گئی"], e: "کام کا اختتام: بورڈ جو ڈرائیور کو بتائے کہ سڑک معمول پر آ گئی۔" } },
  { a: 0,
    ar: { q: "ما الذي يُبعد المارّة عن الحفرة؟", o: ["حاجز واضح، ولوحة مفهومة، وممر آمن", "تنبيههم بالصوت فقط", "تغطية الحفرة بقطعة قماش"], e: "المارّة لا يعرفون مخاطر الموقع: حاجز واضح، ولوحة مفهومة، وممر آمن." },
    en: { q: "What keeps pedestrians away from the excavation?", o: ["A clear barrier, an understandable sign and a safe walkway", "Just shouting a warning", "Covering the hole with a cloth"], e: "Pedestrians don’t know the hazards: a clear barrier, an understandable sign and a safe walkway." },
    ur: { q: "راہگیروں کو کھدائی سے کیا دور رکھتا ہے؟", o: ["واضح رکاوٹ، سمجھ میں آنے والا بورڈ، اور محفوظ راستہ", "صرف آواز دے کر خبردار کرنا", "گڑھے کو کپڑے سے ڈھانپنا"], e: "راہگیر خطرات نہیں جانتے: واضح رکاوٹ، سمجھ میں آنے والا بورڈ، اور محفوظ راستہ۔" } },
  { a: 1,
    ar: { q: "ما الذي يجعل موقع العمل مرئيًا في الليل؟", o: ["أقماع إضافية فقط", "إضاءة وأضواء تحذيرية وسترات عاكسة", "إطفاء الأنوار لتقليل التشتت"], e: "في الليل: إضاءة وأضواء تحذيرية وسترات عاكسة تجعل الموقع والفريق مرئيين." },
    en: { q: "What makes the work site visible at night?", o: ["Extra cones only", "Lighting, warning lights and reflective vests", "Turning lights off to reduce distraction"], e: "At night: lighting, warning lights and reflective vests make the site and crew visible." },
    ur: { q: "رات میں کام کی جگہ کو کیا نظر آنے والا بناتا ہے؟", o: ["صرف اضافی کون", "روشنی، انتباہی بتیاں اور چمکدار جیکٹیں", "خلل کم کرنے کے لیے بتیاں بند کرنا"], e: "رات میں روشنی، انتباہی بتیاں اور چمکدار جیکٹیں جگہ اور ٹیم کو نظر آنے والا بناتی ہیں۔" } },
  { a: 2,
    ar: { q: "لماذا توضع لوحات التحذير المسبق على مسافة قبل الموقع؟", o: ["لتوفير مكان في الموقع", "لأنها كبيرة الحجم", "حتى يكون لدى السائق وقت كافٍ ليتمهّل"], e: "السائق يمرّ في ثوانٍ؛ المسافة تعطيه وقتًا ليرى ويتمهّل قبل الوصول." },
    en: { q: "Why are advance warning signs placed a distance before the site?", o: ["To save space on site", "Because they are large", "So the driver has enough time to slow down"], e: "The driver passes in seconds; the distance gives him time to see and slow down before arriving." },
    ur: { q: "پیشگی انتباہی بورڈ جگہ سے پہلے فاصلے پر کیوں لگائے جاتے ہیں؟", o: ["جگہ بچانے کے لیے", "کیونکہ وہ بڑے ہوتے ہیں", "تاکہ ڈرائیور کو رفتار کم کرنے کا وقت ملے"], e: "ڈرائیور چند سیکنڈ میں گزرتا ہے؛ فاصلہ اسے دیکھنے اور رفتار کم کرنے کا وقت دیتا ہے۔" } },
  { a: 0,
    ar: { q: "وصلت للموقع ووجدت لوحة السهم المضاءة لا تعمل. ماذا تفعل؟", o: ["لا يبدأ العمل حتى تُصلَح أو تُستبدل، وأبلّغ المشرف", "أبدأ العمل، الأقماع تكفي", "أنتظر حتى الليل"], e: "لوحة السهم جزء من التحويل الآمن؛ بدونها يقلّ وضوح المسار للسائق." },
    en: { q: "You arrive and the lit arrow board isn’t working. What do you do?", o: ["Work doesn’t start until it’s fixed or replaced, and I tell the supervisor", "Start, the cones are enough", "Wait until night"], e: "The arrow board is part of a safe transition; without it the path is less clear to drivers." },
    ur: { q: "آپ پہنچے اور روشن تیر والا بورڈ کام نہیں کر رہا۔ کیا کریں؟", o: ["ٹھیک یا تبدیل ہونے تک کام شروع نہ ہو، اور سپروائزر کو بتائیں", "شروع کریں، کون کافی ہیں", "رات تک انتظار کریں"], e: "تیر والا بورڈ محفوظ راستہ موڑنے کا حصہ ہے؛ اس کے بغیر ڈرائیور کو راستہ کم واضح ہوتا ہے۔" } }
];

/* أسئلة ورشة أساسيات مكافحة الحريق — من كتاب SAF02 */
QUIZ.fire = [
  { a: 1,
    ar: { q: "ما العناصر الأربعة لرباعي الحريق؟", o: ["الماء والهواء والتراب والنار", "الوقود والأكسجين والحرارة والتفاعل المتسلسل", "الدخان واللهب والرماد والحرارة"], e: "رباعي الحريق: وقود، وأكسجين، وحرارة، وتفاعل كيميائي متسلسل." },
    en: { q: "What are the four elements of the fire tetrahedron?", o: ["Water, air, earth and fire", "Fuel, oxygen, heat and chain reaction", "Smoke, flame, ash and heat"], e: "The tetrahedron: fuel, oxygen, heat and the chemical chain reaction." },
    ur: { q: "آگ کے چار عناصر کون سے ہیں؟", o: ["پانی، ہوا، مٹی اور آگ", "ایندھن، آکسیجن، حرارت اور مسلسل کیمیائی عمل", "دھواں، شعلہ، راکھ اور حرارت"], e: "چار عناصر: ایندھن، آکسیجن، حرارت اور مسلسل کیمیائی عمل۔" } },
  { a: 2,
    ar: { q: "ما نسبة الأكسجين في الهواء تقريبًا؟", o: ["5–10٪", "50٪", "19–21٪"], e: "الأكسجين موجود في الهواء بنسبة 19–21٪ تقريبًا." },
    en: { q: "About how much of the air is oxygen?", o: ["5–10%", "50%", "19–21%"], e: "Oxygen makes up about 19–21% of the air." },
    ur: { q: "ہوا میں آکسیجن تقریباً کتنی ہے؟", o: ["5–10٪", "50٪", "19–21٪"], e: "ہوا میں آکسیجن تقریباً 19–21٪ ہے۔" } },
  { a: 0,
    ar: { q: "إطفاء الحريق بخفض حرارته تحت درجة الاشتعال بالماء يسمى:", o: ["التبريد", "التجويع", "الخنق"], e: "التبريد: خفض الحرارة تحت درجة الاشتعال، غالبًا بالماء." },
    en: { q: "Putting out a fire by bringing its temperature below ignition with water is called:", o: ["Cooling", "Starvation", "Smothering"], e: "Cooling: lowering the temperature below the ignition point, usually with water." },
    ur: { q: "پانی سے درجہ حرارت جلنے کی حد سے نیچے لا کر آگ بجھانا کہلاتا ہے:", o: ["ٹھنڈا کرنا", "ایندھن ہٹانا", "دم گھونٹنا"], e: "ٹھنڈا کرنا: درجہ حرارت جلنے کی حد سے نیچے لانا، عموماً پانی سے۔" } },
  { a: 1,
    ar: { q: "إبعاد الوقود عن النار أو عزله يسمى:", o: ["التبريد", "التجويع", "كسر التفاعل"], e: "التجويع: حرمان النار من الوقود بإبعاده أو عزله." },
    en: { q: "Removing or isolating the fuel from the fire is called:", o: ["Cooling", "Starvation", "Chain inhibition"], e: "Starvation: depriving the fire of fuel by removing or isolating it." },
    ur: { q: "ایندھن کو آگ سے دور یا الگ کرنا کہلاتا ہے:", o: ["ٹھنڈا کرنا", "ایندھن ہٹانا", "کیمیائی عمل توڑنا"], e: "ایندھن ہٹانا: آگ کو ایندھن سے محروم کرنا۔" } },
  { a: 2,
    ar: { q: "حريق في لوحة كهربائية مكهربة. أي طفاية تختار؟", o: ["طفاية الماء", "طفاية الرغوة", "ثاني أكسيد الكربون أو البودرة الجافة"], e: "الماء والرغوة موصلان للكهرباء. افصل التيار إن أمكن واستخدم CO₂ أو البودرة الجافة." },
    en: { q: "A fire in an energized electrical panel. Which extinguisher?", o: ["Water", "Foam", "CO₂ or dry powder"], e: "Water and foam conduct electricity. Cut the power if possible and use CO₂ or dry powder." },
    ur: { q: "بجلی والے پینل میں آگ۔ کون سا آلہ استعمال کریں؟", o: ["پانی", "جھاگ", "کاربن ڈائی آکسائیڈ یا خشک پاؤڈر"], e: "پانی اور جھاگ بجلی کے موصل ہیں۔ ممکن ہو تو بجلی بند کریں اور CO₂ یا پاؤڈر استعمال کریں۔" } },
  { a: 0,
    ar: { q: "حريق خشب وورق وقماش، من أي فئة؟", o: ["الفئة A", "الفئة B", "الفئة D"], e: "الفئة A: المواد الصلبة العادية مثل الخشب والورق والقماش." },
    en: { q: "A fire in wood, paper and textiles is which class?", o: ["Class A", "Class B", "Class D"], e: "Class A: ordinary solid combustibles such as wood, paper and textiles." },
    ur: { q: "لکڑی، کاغذ اور کپڑے کی آگ کس کلاس کی ہے؟", o: ["کلاس A", "کلاس B", "کلاس D"], e: "کلاس A: عام ٹھوس اشیاء جیسے لکڑی، کاغذ اور کپڑا۔" } },
  { a: 1,
    ar: { q: "حريق في معدن المغنيسيوم أو الألومنيوم:", o: ["يُطفأ بالماء", "فئة D ويُطفأ ببودرة خاصة", "يُطفأ بالرغوة"], e: "الفئة D: معادن، وتُطفأ ببودرة خاصة لأن المواد العادية قد تزيد التفاعل." },
    en: { q: "A fire in magnesium or aluminum:", o: ["Put it out with water", "Is Class D and needs special powder", "Put it out with foam"], e: "Class D: metals, extinguished with a special powder; ordinary agents may intensify the reaction." },
    ur: { q: "میگنیشیم یا ایلومینیم کی آگ:", o: ["پانی سے بجھائیں", "کلاس D ہے اور خاص پاؤڈر چاہیے", "جھاگ سے بجھائیں"], e: "کلاس D: دھاتیں، خاص پاؤڈر سے؛ عام مواد ردعمل بڑھا سکتے ہیں۔" } },
  { a: 2,
    ar: { q: "ماذا تعني P في طريقة PASS؟", o: ["اضغط المقبض", "حرّك الفوهة", "اسحب مسمار الأمان"], e: "PASS: اسحب المسمار، وجّه للقاعدة، اضغط المقبض، حرّك يمينًا ويسارًا." },
    en: { q: "What does P stand for in PASS?", o: ["Press the handle", "Point the nozzle", "Pull the safety pin"], e: "PASS: Pull the pin, Aim at the base, Squeeze the handle, Sweep side to side." },
    ur: { q: "PASS میں P کا مطلب کیا ہے؟", o: ["ہینڈل دبائیں", "نوزل گھمائیں", "حفاظتی پن کھینچیں"], e: "PASS: پن کھینچیں، جڑ کی طرف رخ، ہینڈل دبائیں، دائیں بائیں گھمائیں۔" } },
  { a: 0,
    ar: { q: "إلى أين توجّه فوهة الطفاية؟", o: ["قاعدة اللهب", "أعلى اللهب", "الدخان"], e: "وجّه دائمًا إلى قاعدة اللهب أو قلب الحريق، لا إلى أعلاه." },
    en: { q: "Where do you aim the extinguisher?", o: ["The base of the flames", "The top of the flames", "The smoke"], e: "Always aim at the base or heart of the fire, never the top." },
    ur: { q: "آلے کا رخ کہاں کریں؟", o: ["شعلے کی جڑ", "شعلے کا اوپر", "دھواں"], e: "ہمیشہ شعلے کی جڑ یا آگ کے دل پر، اوپر نہیں۔" } },
  { a: 1,
    ar: { q: "من أي جهة تقاتل الحريق في مكان مفتوح؟", o: ["والريح في وجهك", "والريح خلفك", "لا يهم اتجاه الريح"], e: "قاتل الحريق والريح خلفك؛ عكس الريح يعرّضك للحرارة والدخان ويقلل الكفاءة." },
    en: { q: "Which way do you face a fire outdoors?", o: ["With the wind in your face", "With the wind at your back", "Wind direction doesn’t matter"], e: "Keep the wind at your back; facing it exposes you to heat and smoke and lowers efficiency." },
    ur: { q: "کھلی جگہ پر آگ کا سامنا کس طرف سے کریں؟", o: ["ہوا چہرے پر ہو", "ہوا پیٹھ پر ہو", "ہوا کا رخ اہم نہیں"], e: "ہوا پیٹھ پر رکھیں؛ مخالف رخ پر حرارت اور دھواں آتا ہے اور کارکردگی کم ہوتی ہے۔" } },
  { a: 2,
    ar: { q: "لماذا قد يعود الحريق بعد إطفائه بطفاية البودرة الجافة؟", o: ["لأنها موصلة للكهرباء", "لأنها تحتوي ماء", "لأنها لا تبرّد المادة المحترقة"], e: "البودرة تخنق النار بسرعة لكنها لا تبرّد، فقد يعود الاشتعال؛ تأكد من الإطفاء الكامل." },
    en: { q: "Why can a fire reignite after a dry powder extinguisher?", o: ["It conducts electricity", "It contains water", "It doesn’t cool the burning material"], e: "Powder knocks the fire down fast but doesn’t cool, so it can reignite; confirm it is fully out." },
    ur: { q: "خشک پاؤڈر کے بعد آگ دوبارہ کیوں لگ سکتی ہے؟", o: ["یہ بجلی کا موصل ہے", "اس میں پانی ہوتا ہے", "یہ جلتے مادے کو ٹھنڈا نہیں کرتا"], e: "پاؤڈر تیزی سے بجھاتا ہے مگر ٹھنڈا نہیں کرتا؛ مکمل بجھنے کی تصدیق کریں۔" } },
  { a: 0,
    ar: { q: "طفاية بلا مؤشر ضغط ولها بوق كبير، ما نوعها؟", o: ["ثاني أكسيد الكربون", "البودرة الجافة", "الماء"], e: "طفاية CO₂ لها بوق كبير وبلا مؤشر ضغط، وتصلح للفئتين B وC." },
    en: { q: "An extinguisher with a large horn and no pressure gauge is:", o: ["CO₂", "Dry powder", "Water"], e: "CO₂ extinguishers have a large horn and no gauge; they suit Classes B and C." },
    ur: { q: "بڑے ہارن والا اور پریشر گیج کے بغیر آلہ کون سا ہے؟", o: ["کاربن ڈائی آکسائیڈ", "خشک پاؤڈر", "پانی"], e: "CO₂ آلے کا بڑا ہارن ہوتا ہے اور گیج نہیں؛ کلاس B اور C کے لیے۔" } }
];
