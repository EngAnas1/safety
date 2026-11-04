/* =====================================================================
   المحتوى النصي والمصادر لكل قسم
   أنواع الكتل: lead (فقرات) · tiles (بطاقات) · scale (مقياس مرقّم) · chain (خطوات)
                checks (قائمة تحقق) · rules (القواعد العشر من content.js) · close (جملة ختامية)
   الأيقونة: "ic:اسم" من مجلد img/ic، أو إيموجي
   ===================================================================== */

const SECTION_TEXT = {
  lsr: {
    ar: [
      { type: "lead", p: [
        "معظم الوفيات في مواقع العمل تتكرر بنفس الأسباب: طاقة لم تُعزل، سقوط من ارتفاع، حمولة سقطت، أو دخول مكان محصور دون فحص الهواء.",
        "قواعد الحفاظ على الحياة عشر قواعد بسيطة تمنع هذه الأسباب. لا استثناء فيها ولا اختصار، وتنطبق على كل موظف ومقاول في كل مهمة." ] },
      { type: "rules", h: "القواعد العشر" },
      { type: "tiles", h: "إذا رأيت مخالفة", cols: "four", items: [
        ["ic:hand", "أوقف العمل", "لكلٍّ منّا صلاحية إيقاف أي عمل غير آمن"],
        ["ic:warn", "نبّه زميلك", "بهدوء، ووضّح القاعدة التي خالفها"],
        ["ic:person", "بلّغ مشرفك", "حتى تُصحَّح المخالفة قبل استئناف العمل"],
        ["ic:check", "استأنف بأمان", "بعد تطبيق وسيلة التحكم الصحيحة"] ] },
      { type: "close", t: "قاعدة واحدة تُخالَف قد تكلّف حياة" }
    ],
    en: [
      { type: "lead", p: [
        "Most fatalities on work sites repeat the same causes: energy that wasn’t isolated, a fall from height, a dropped load, or entering a confined space without testing the air.",
        "The Life Saving Rules are ten simple rules that prevent these causes. There are no exceptions and no shortcuts, and they apply to every employee and contractor on every task." ] },
      { type: "rules", h: "The ten rules" },
      { type: "tiles", h: "If you see a violation", cols: "four", items: [
        ["ic:hand", "Stop the work", "Each of us has the authority to stop unsafe work"],
        ["ic:warn", "Tell your colleague", "Calmly, and explain the rule that was broken"],
        ["ic:person", "Inform your supervisor", "So it is corrected before work resumes"],
        ["ic:check", "Resume safely", "Once the right control is in place"] ] },
      { type: "close", t: "One broken rule can cost a life" }
    ],
    ur: [
      { type: "lead", p: [
        "سائٹ پر زیادہ تر اموات انہی وجوہات سے ہوتی ہیں: توانائی الگ نہ کی گئی، اونچائی سے گرنا، وزن گرنا، یا ہوا ٹیسٹ کیے بغیر تنگ جگہ میں داخل ہونا۔",
        "زندگی بچانے والے قوانین دس سادہ قوانین ہیں جو ان وجوہات کو روکتے ہیں۔ ان میں کوئی رعایت یا شارٹ کٹ نہیں، اور یہ ہر ملازم اور ٹھیکیدار پر ہر کام میں لاگو ہیں۔" ] },
      { type: "rules", h: "دس قوانین" },
      { type: "tiles", h: "اگر آپ خلاف ورزی دیکھیں", cols: "four", items: [
        ["ic:hand", "کام روکیں", "ہم میں سے ہر ایک کو غیر محفوظ کام روکنے کا اختیار ہے"],
        ["ic:warn", "ساتھی کو بتائیں", "نرمی سے، اور ٹوٹا ہوا قانون سمجھائیں"],
        ["ic:person", "سپروائزر کو اطلاع دیں", "تاکہ کام دوبارہ شروع ہونے سے پہلے درست ہو"],
        ["ic:check", "محفوظ طریقے سے دوبارہ شروع کریں", "درست کنٹرول لگنے کے بعد"] ] },
      { type: "close", t: "ایک ٹوٹا ہوا قانون ایک جان لے سکتا ہے" }
    ]
  },

  risk: {
    ar: [
      { type: "lead", p: [
        "الخطر: أي شيء قد يسبب أذى، مثل الكهرباء، والعمل على ارتفاع، والحفرة، والمعدات المتحركة.",
        "تقييم المخاطر يسأل سؤالين عن كل خطر: لو حدث، ما أسوأ نتيجة واقعية؟ (الشدة) وما فرصة أن يحدث؟ (الاحتمالية). وهذا التقييم الإضافي في الموقع يُكمّل التقييم الأساسي المعتمد للمهمة ولا يحلّ محله." ] },
      { type: "chain", h: "الخطوات الأربع", items: [
        ["ic:doc", "راجع التقييم المعتمد", "ثم انظر حولك: هل ترى خطرًا غير مذكور؟"],
        ["ic:permit", "اكتبه في سطر", "العمل، والخطر، والحدث المحتمل، ووسائل التحكم الحالية"],
        ["ic:mag", "أعطه درجتين", "الشدة والاحتمالية، ثم اضربهما"],
        ["ic:check", "قلّل الخطر وأعد التقييم", "ابدأ بأقوى الحلول، ثم يعتمده المشرف"] ] },
      { type: "scale", h: "الشدة: لو حدث… ما أسوأ نتيجة واقعية؟", items: [
        [1, "طفيفة", "إسعافات أولية"], [2, "بسيطة", "تتطلب علاجًا طبيًا"], [3, "متوسطة", "إصابة مفقدة لوقت العمل"],
        [4, "كبيرة", "وفاة واحدة أو عجز"], [5, "كارثية", "وفيات متعددة"] ] },
      { type: "scale", h: "الاحتمالية: ما فرصة حدوثه؟", items: [
        [1, "نادر الحدوث", "لم يحدث في المنشأة"], [2, "غير مرجح", ""], [3, "ممكن حدوثه", ""],
        [4, "محتمل حدوثه", ""], [5, "مؤكد حدوثه", "أكثر من مرة في العام"] ] },
      { type: "levels", h: "مستوى الخطر = الشدة × الاحتمالية", items: [
        ["low", "منخفض 1–5", "تابع، وقيّم بشكل دوري"],
        ["med", "متوسط 6–12", "تابع وراقب، وقد تحتاج وسائل تحكم إضافية"],
        ["high", "عالٍ 13–20", "نفّذ وسائل تحكم استباقية، وراجعها بعد 7 أيام"],
        ["ext", "كارثي 21–25", "أوقف التشغيل، وراجع وسائل التحكم، وبلّغ المشرف ومسؤول السلامة"] ] },
      { type: "checks", h: "ابدأ بأقوى الحلول", items: [
        "إزالة الخطر", "الاستبدال", "الضوابط الهندسية", "الضوابط الإدارية", "معدات الوقاية الشخصية: آخر خط دفاع" ] },
      { type: "tiles", h: "مثال من الموقع: سلة رافعة على أرض غير مستوية", cols: "four", items: [
        ["ic:warn", "الخطر", "انقلاب السلة وسقوط العامل"],
        ["ic:mag", "قبل الحلول: 16", "الشدة 4 × الاحتمالية 4 = خطر عالٍ، لا نبدأ العمل"],
        ["ic:check", "الحلول", "نقل السلة إلى أرض مستوية، وألواح تحت المساند"],
        ["ic:badge", "بعد الحلول: 4", "الشدة 4 × الاحتمالية 1 = خطر منخفض"] ] },
      { type: "close", t: "كل حادث يبدأ بخطر لم ينتبه له أحد. دقائق قليلة تكشفه قبل أن يقع" }
    ],
    en: [
      { type: "lead", p: [
        "A hazard is anything that could cause harm: electricity, working at height, an excavation, moving equipment.",
        "A risk assessment asks two questions about each hazard: if it happens, what is the worst realistic outcome? (severity) And how likely is it? (likelihood). This extra on-site assessment complements the job’s approved base assessment; it does not replace it." ] },
      { type: "chain", h: "The four steps", items: [
        ["ic:doc", "Review the approved assessment", "Then look around: is there a hazard it doesn’t list?"],
        ["ic:permit", "Write it in one line", "Activity, hazard, possible event, existing controls"],
        ["ic:mag", "Give it two scores", "Severity and likelihood, then multiply them"],
        ["ic:check", "Reduce the risk, reassess", "Start with the strongest controls; the supervisor approves"] ] },
      { type: "scale", h: "Severity: if it happens, what is the worst realistic outcome?", items: [
        [1, "Insignificant", "First aid only"], [2, "Minor", "Needs medical treatment"], [3, "Moderate", "Lost-time injury"],
        [4, "Major", "One death or disability"], [5, "Catastrophic", "Multiple deaths"] ] },
      { type: "scale", h: "Likelihood: how likely is it to happen?", items: [
        [1, "Rare", "Never happened in the company"], [2, "Unlikely", ""], [3, "Possible", ""],
        [4, "Likely", ""], [5, "Almost certain", "More than once a year"] ] },
      { type: "levels", h: "Risk level = severity × likelihood", items: [
        ["low", "Low 1–5", "Keep checking, and review it regularly"],
        ["med", "Medium 6–12", "Monitor closely; you may need extra controls"],
        ["high", "High 13–20", "Put strong controls in place; review after 7 days"],
        ["ext", "Extreme 21–25", "Stop the operation, review controls, inform the supervisor and safety officer"] ] },
      { type: "checks", h: "Start with the strongest controls", items: [
        "Elimination", "Substitution", "Engineering controls", "Administrative controls", "PPE: the last line of defense" ] },
      { type: "tiles", h: "Site example: a bucket truck on uneven ground", cols: "four", items: [
        ["ic:warn", "Hazard", "The truck tips over and the worker falls"],
        ["ic:mag", "Before controls: 16", "Severity 4 × likelihood 4 = high risk; don’t start"],
        ["ic:check", "Controls", "Move the truck to level ground; pads under the outriggers"],
        ["ic:badge", "After controls: 4", "Severity 4 × likelihood 1 = low risk"] ] },
      { type: "close", t: "Every accident starts with a hazard nobody noticed. A few minutes find it before it happens" }
    ],
    ur: [
      { type: "lead", p: [
        "خطرہ ہر وہ چیز ہے جو نقصان پہنچا سکے: بجلی، اونچائی پر کام، کھدائی، حرکت کرتے آلات۔",
        "رسک اسیسمنٹ ہر خطرے کے بارے میں دو سوال پوچھتی ہے: اگر ہو جائے تو بدترین حقیقی نتیجہ کیا ہے؟ (شدت) اور ہونے کا کتنا امکان ہے؟ (امکان)۔ سائٹ پر یہ اضافی اسیسمنٹ کام کی منظور شدہ بنیادی اسیسمنٹ کو مکمل کرتی ہے، اس کی جگہ نہیں لیتی۔" ] },
      { type: "chain", h: "چار مراحل", items: [
        ["ic:doc", "منظور شدہ اسیسمنٹ دیکھیں", "پھر اردگرد دیکھیں: کیا کوئی خطرہ درج نہیں؟"],
        ["ic:permit", "اسے ایک سطر میں لکھیں", "کام، خطرہ، ممکنہ واقعہ، موجودہ کنٹرول"],
        ["ic:mag", "دو درجے دیں", "شدت اور امکان، پھر انہیں ضرب دیں"],
        ["ic:check", "خطرہ کم کریں، دوبارہ جائزہ لیں", "سب سے مضبوط حل سے شروع کریں؛ سپروائزر منظوری دے"] ] },
      { type: "scale", h: "شدت: اگر ہو جائے تو بدترین حقیقی نتیجہ کیا ہے؟", items: [
        [1, "معمولی", "صرف ابتدائی طبی امداد"], [2, "ہلکی", "طبی علاج چاہیے"], [3, "درمیانی", "کام کا وقت ضائع کرنے والی چوٹ"],
        [4, "بڑی", "ایک موت یا معذوری"], [5, "تباہ کن", "متعدد اموات"] ] },
      { type: "scale", h: "امکان: ہونے کا کتنا موقع ہے؟", items: [
        [1, "شاذ و نادر", "کمپنی میں کبھی نہیں ہوا"], [2, "غیر متوقع", ""], [3, "ممکن", ""],
        [4, "متوقع", ""], [5, "یقینی", "سال میں ایک سے زیادہ بار"] ] },
      { type: "levels", h: "خطرے کی سطح = شدت × امکان", items: [
        ["low", "کم 1–5", "نگرانی کریں اور وقتاً فوقتاً جائزہ لیں"],
        ["med", "درمیانی 6–12", "قریبی نگرانی؛ اضافی کنٹرول کی ضرورت ہو سکتی ہے"],
        ["high", "زیادہ 13–20", "پیشگی کنٹرول نافذ کریں؛ 7 دن بعد جائزہ لیں"],
        ["ext", "انتہائی 21–25", "کام بند کریں، کنٹرول کا جائزہ لیں، سپروائزر اور سیفٹی آفیسر کو بتائیں"] ] },
      { type: "checks", h: "سب سے مضبوط حل سے شروع کریں", items: [
        "خطرہ ختم کرنا", "متبادل", "انجینئرنگ کنٹرول", "انتظامی کنٹرول", "ذاتی حفاظتی سامان: آخری دفاع" ] },
      { type: "tiles", h: "سائٹ کی مثال: ناہموار زمین پر باسکٹ ٹرک", cols: "four", items: [
        ["ic:warn", "خطرہ", "ٹرک الٹنا اور کارکن کا گرنا"],
        ["ic:mag", "کنٹرول سے پہلے: 16", "شدت 4 × امکان 4 = زیادہ خطرہ؛ کام شروع نہ کریں"],
        ["ic:check", "کنٹرول", "ٹرک کو ہموار زمین پر لے جانا؛ سپورٹ کے نیچے تختے"],
        ["ic:badge", "کنٹرول کے بعد: 4", "شدت 4 × امکان 1 = کم خطرہ"] ] },
      { type: "close", t: "ہر حادثہ ایک ان دیکھے خطرے سے شروع ہوتا ہے۔ چند منٹ اسے پہلے ہی دکھا دیتے ہیں" }
    ]
  }
};

/* المصادر لكل قسم: كل مصدر يفتح صفحته في تبويب جديد */
const SECTION_SOURCES = {
  lsr: [
    { url: "https://www.iogp.org/life-savingrules/",
      ar: { n: "قواعد الحفاظ على الحياة", by: "IOGP: الرابطة الدولية لمنتجي النفط والغاز", d: "المرجع الدولي لقواعد الحفاظ على الحياة، ومنه مواد التطبيق والملصقات." },
      en: { n: "Life-Saving Rules", by: "IOGP: International Association of Oil & Gas Producers", d: "The international reference for the Life-Saving Rules, with implementation material and posters." },
      ur: { n: "زندگی بچانے والے قوانین", by: "IOGP: تیل و گیس پیدا کرنے والوں کی بین الاقوامی تنظیم", d: "زندگی بچانے والے قوانین کا بین الاقوامی حوالہ، عمل درآمد کے مواد اور پوسٹرز کے ساتھ۔" } },
    { url: "https://www.iogp.org/bookstore/product/life-saving-rules/",
      ar: { n: "تقرير IOGP رقم 459", by: "IOGP", d: "التقرير الذي يشرح القواعد وإرشادات تطبيقها وتحليل الحوادث الذي بُنيت عليه." },
      en: { n: "IOGP Report 459", by: "IOGP", d: "The report explaining the rules, implementation guidance, and the incident analysis behind them." },
      ur: { n: "IOGP رپورٹ 459", by: "IOGP", d: "قوانین، ان پر عمل کی رہنمائی، اور ان کے پیچھے حادثات کا تجزیہ۔" } },
    { url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147#:~:text=not%20capable%20of%20being%20locked%20out",
      ar: { n: "التحكم في الطاقة الخطرة (العزل والإقفال)", by: "OSHA 1910.147", d: "متطلبات عزل الطاقة وإقفالها ووضع البطاقات قبل الصيانة." },
      en: { n: "Control of Hazardous Energy (Lockout/Tagout)", by: "OSHA 1910.147", d: "Requirements to isolate, lock and tag energy before servicing equipment." },
      ur: { n: "خطرناک توانائی کا کنٹرول (لاک آؤٹ/ٹیگ آؤٹ)", by: "OSHA 1910.147", d: "مرمت سے پہلے توانائی الگ کرنے، تالا اور ٹیگ لگانے کے تقاضے۔" } },
    { url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.501#:~:text=Unprotected%20sides%20and%20edges",
      ar: { n: "واجب توفير الحماية من السقوط", by: "OSHA 1926.501", d: "متى تلزم الحماية من السقوط، وأنواع الأنظمة: الحواجز، وشبكات الأمان، وأنظمة منع السقوط الشخصية." },
      en: { n: "Duty to Have Fall Protection", by: "OSHA 1926.501", d: "When fall protection is required, and the systems: guardrails, safety nets and personal fall arrest." },
      ur: { n: "گرنے سے حفاظت کی ذمہ داری", by: "OSHA 1926.501", d: "گرنے سے حفاظت کب لازمی ہے، اور نظام: ریلنگ، حفاظتی جال اور ذاتی گرنے سے بچاؤ۔" } },
    { url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.146#:~:text=Attendant%20means",
      ar: { n: "الأماكن المحصورة التي تتطلب تصريحًا", by: "OSHA 1910.146", d: "التصريح، واختبار الهواء، ودور المراقب عند المدخل." },
      en: { n: "Permit-Required Confined Spaces", by: "OSHA 1910.146", d: "Entry permits, air testing, and the attendant’s role at the entrance." },
      ur: { n: "پرمٹ والی تنگ جگہیں", by: "OSHA 1910.146", d: "داخلے کا پرمٹ، ہوا کا ٹیسٹ، اور داخلی راستے پر نگران کا کردار۔" } }
  ],
  risk: [
    { url: "https://www.iso.org/standard/63787.html",
      ar: { n: "ISO 45001:2018", by: "المنظمة الدولية للمعايير ISO", d: "نظام إدارة السلامة والصحة المهنية، ومنه تحديد المخاطر وتقييمها وهرم التحكم." },
      en: { n: "ISO 45001:2018", by: "International Organization for Standardization", d: "The OH&S management system standard, including hazard identification, risk assessment and the hierarchy of controls." },
      ur: { n: "ISO 45001:2018", by: "بین الاقوامی تنظیم برائے معیارات ISO", d: "پیشہ ورانہ صحت و حفاظت کا انتظامی نظام، بشمول خطرات کی شناخت، جائزہ اور کنٹرول کی ترتیب۔" } },
    { url: "https://www.iso.org/standard/65694.html",
      ar: { n: "ISO 31000:2018", by: "المنظمة الدولية للمعايير ISO", d: "مبادئ إدارة المخاطر وإطارها وعمليتها لأي منظمة." },
      en: { n: "ISO 31000:2018", by: "International Organization for Standardization", d: "Principles, framework and process for managing risk in any organization." },
      ur: { n: "ISO 31000:2018", by: "بین الاقوامی تنظیم برائے معیارات ISO", d: "کسی بھی ادارے میں خطرات کے انتظام کے اصول، ڈھانچہ اور طریقہ۔" } },
    { url: "https://www.osha.gov/safety-management/hazard-identification#:~:text=evaluate%20each%20hazard",
      ar: { n: "تحديد المخاطر وتقييمها", by: "OSHA", d: "كيف تجد المخاطر في الموقع وتقيّمها قبل أن تسبب أذى." },
      en: { n: "Hazard Identification and Assessment", by: "OSHA", d: "How to find hazards on site and assess them before they cause harm." },
      ur: { n: "خطرات کی شناخت اور جائزہ", by: "OSHA", d: "سائٹ پر خطرات کیسے ڈھونڈیں اور نقصان سے پہلے ان کا جائزہ لیں۔" } },
    { url: "https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html#:~:text=preferred%20order",
      ar: { n: "هرم التحكم", by: "NIOSH", d: "ترتيب وسائل التحكم من الأقوى (الإزالة) إلى الأضعف (معدات الوقاية)." },
      en: { n: "Hierarchy of Controls", by: "NIOSH", d: "Controls ranked from most effective (elimination) to least (PPE)." },
      ur: { n: "کنٹرول کی ترتیب", by: "NIOSH", d: "کنٹرول سب سے مؤثر (خطرہ ختم کرنا) سے کم مؤثر (حفاظتی سامان) تک۔" } }
  ]
};
