/* =====================================================================
   أسئلة الاختبار — 5 أسئلة لكل موضوع
   a = رقم الإجابة الصحيحة (يبدأ من 0) — الخيارات تُخلط تلقائيًا عند العرض
   e = شرح قصير يظهر بعد الإجابة
   ===================================================================== */

/* المراجع المعتمدة لكل موضوع */
const REFS = {
  risk:      ["ISO 45001:2018", "OSHA"],
  lsr:       ["IOGP Life-Saving Rules"],
  ppe:       ["OSHA 1910.132", "NFPA 70E", { ar: "نظام العمل السعودي", en: "Saudi Labor Law", ur: "سعودی لیبر قانون" }],
  loto:      ["OSHA 1910.147", "OSHA 1910.269"],
  height:    ["OSHA 1926 Subpart M"],
  emergency: [{ ar: "الكود السعودي للحماية من الحرائق SBC 801", en: "Saudi Fire Code SBC 801", ur: "سعودی فائر کوڈ SBC 801" }, { ar: "الدفاع المدني", en: "Civil Defense", ur: "سول ڈیفنس" }]
};

const QUIZ = {
  risk: [
    { a: 1,
      ar: { q: "ما أكثر إجراءات التحكم فعالية في هرم التحكم؟", o: ["معدات الوقاية الشخصية", "إزالة الخطر", "اللوحات التحذيرية"], e: "إزالة الخطر تأتي أولًا في هرم التحكم، ومعدات الوقاية آخر خط دفاع." },
      en: { q: "Which control is the most effective in the hierarchy of controls?", o: ["Personal protective equipment", "Elimination", "Warning signs"], e: "Elimination comes first in the hierarchy; PPE is the last line of defense." },
      ur: { q: "کنٹرول کی ترتیب میں سب سے مؤثر کنٹرول کون سا ہے؟", o: ["ذاتی حفاظتی سامان", "خطرہ ختم کرنا", "انتباہی بورڈ"], e: "خطرہ ختم کرنا پہلے آتا ہے؛ حفاظتی سامان آخری دفاع ہے۔" } },
    { a: 1,
      ar: { q: "كيف نحدد مستوى الخطورة؟", o: ["عدد العمال في الموقع", "احتمال الحدوث × شدة الضرر", "مدة العمل"], e: "مصفوفة المخاطر تجمع بين احتمال الحدوث وشدة الضرر." },
      en: { q: "How is the level of risk determined?", o: ["Number of workers on site", "Likelihood × severity", "Length of the job"], e: "A risk matrix combines likelihood with severity." },
      ur: { q: "خطرے کی سطح کیسے طے ہوتی ہے؟", o: ["سائٹ پر کارکنوں کی تعداد", "امکان × نقصان کی شدت", "کام کی مدت"], e: "رسک میٹرکس امکان اور شدت کو ملاتا ہے۔" } },
    { a: 1,
      ar: { q: "متى يجب مراجعة تقييم المخاطر؟", o: ["مرة في السنة فقط", "عند تغيّر ظروف العمل أو ظهور خطر جديد", "بعد انتهاء العمل"], e: "التقييم وثيقة حية: يُحدّث كلما تغيّرت الظروف أو ظهر خطر جديد." },
      en: { q: "When must the risk assessment be reviewed?", o: ["Once a year only", "When conditions change or a new hazard appears", "After the job is finished"], e: "It is a living document: update it whenever conditions change or a new hazard appears." },
      ur: { q: "رسک اسیسمنٹ کب دوبارہ دیکھنا چاہیے؟", o: ["صرف سال میں ایک بار", "جب حالات بدلیں یا نیا خطرہ سامنے آئے", "کام ختم ہونے کے بعد"], e: "حالات بدلیں یا نیا خطرہ آئے تو اسے فوراً اپڈیٹ کریں۔" } },
    { a: 2,
      ar: { q: "معدات الوقاية الشخصية في هرم التحكم هي:", o: ["أول إجراء نطبّقه", "بديل عن الضوابط الهندسية", "آخر خط دفاع"], e: "نستخدمها بعد تطبيق الإزالة والاستبدال والضوابط الهندسية والإدارية." },
      en: { q: "In the hierarchy of controls, PPE is:", o: ["The first control to apply", "A replacement for engineering controls", "The last line of defense"], e: "It is used after elimination, substitution, engineering and administrative controls." },
      ur: { q: "کنٹرول کی ترتیب میں ذاتی حفاظتی سامان ہے:", o: ["پہلا کنٹرول", "انجینئرنگ کنٹرول کا متبادل", "آخری دفاع"], e: "یہ باقی تمام کنٹرولز کے بعد استعمال ہوتا ہے۔" } },
    { a: 1,
      ar: { q: "متى توقّع على تقييم المخاطر؟", o: ["قبل قراءته لتوفير الوقت", "بعد قراءته وفهمه مع الفريق", "يوقّع المشرف نيابة عن الجميع"], e: "توقيعك يعني أنك فهمت كل خطر وإجراء التحكم فيه." },
      en: { q: "When do you sign the risk assessment?", o: ["Before reading it, to save time", "After reading and understanding it with the crew", "The supervisor signs for everyone"], e: "Your signature means you understand every hazard and its control." },
      ur: { q: "رسک اسیسمنٹ پر دستخط کب کریں؟", o: ["وقت بچانے کے لیے پڑھنے سے پہلے", "ٹیم کے ساتھ پڑھ کر اور سمجھ کر", "سپروائزر سب کی طرف سے دستخط کرے"], e: "دستخط کا مطلب ہے کہ آپ ہر خطرہ اور اس کا کنٹرول سمجھ گئے۔" } }
  ],

  lsr: [
    { a: 2,
      ar: { q: "قبل العمل على معدة فيها طاقة كهربائية أو ميكانيكية أو هيدروليكية:", o: ["أطفئ المفتاح فقط", "اطلب من زميل يراقب المفتاح", "اعزل، اقفل، علّق البطاقة، افحص"], e: "القاعدة الأولى: عزل الطاقة بالتسلسل الكامل قبل البدء." },
      en: { q: "Before working on equipment with electrical, mechanical or hydraulic energy:", o: ["Just switch it off", "Ask a colleague to watch the switch", "Isolate, lock, tag, test"], e: "Rule one: complete energy isolation before you start." },
      ur: { q: "بجلی، مکینیکل یا ہائیڈرولک توانائی والے آلے پر کام سے پہلے:", o: ["صرف سوئچ بند کریں", "ساتھی سے سوئچ پر نظر رکھنے کو کہیں", "الگ کریں، تالا لگائیں، ٹیگ لگائیں، ٹیسٹ کریں"], e: "پہلا قانون: کام سے پہلے مکمل آئسولیشن۔" } },
    { a: 1,
      ar: { q: "من أي ارتفاع تلزم الحماية من السقوط؟", o: ["3 أمتار", "1.8 متر", "5 أمتار"], e: "من 1.8 متر فأكثر: نظام حماية من السقوط ومربوط طوال الوقت." },
      en: { q: "From what height is fall protection required?", o: ["3 m", "1.8 m", "5 m"], e: "From 1.8 m and above: a fall protection system and tied off at all times." },
      ur: { q: "کس اونچائی سے گرنے سے حفاظت لازمی ہے؟", o: ["3 میٹر", "1.8 میٹر", "5 میٹر"], e: "1.8 میٹر یا زیادہ پر حفاظتی نظام اور ہر وقت بندھے رہنا لازمی ہے۔" } },
    { a: 0,
      ar: { q: "هل يجوز تعطيل كاشف الغاز والحريق مؤقتًا لإنهاء العمل؟", o: ["لا، أبدًا", "نعم إذا كان العمل قصيرًا", "نعم بموافقة شفهية"], e: "تجاوز وسائل تحكم السلامة ممنوع: لا الإيقاف الطارئ ولا كشف الغاز والحريق." },
      en: { q: "May you temporarily disable gas and fire detection to finish a job?", o: ["No, never", "Yes, if the job is short", "Yes, with verbal approval"], e: "Never bypass safety controls: not emergency shutdown, not gas and fire detection." },
      ur: { q: "کیا کام ختم کرنے کے لیے گیس اور آگ کا ڈیٹیکٹر عارضی طور پر بند کر سکتے ہیں؟", o: ["نہیں، کبھی نہیں", "ہاں اگر کام مختصر ہو", "ہاں زبانی اجازت سے"], e: "حفاظتی کنٹرولز کو کبھی بائی پاس نہ کریں۔" } },
    { a: 2,
      ar: { q: "في منطقة الخطر (خط النار)، أين لا تقف أبدًا؟", o: ["خلف الحاجز", "في نقطة التجمع", "بين جسم متحرك وجسم ثابت"], e: "الخطر من الأجسام المتحركة والمتطايرة والساقطة؛ لا تقف بين متحرك وثابت." },
      en: { q: "In the line of fire, where must you never stand?", o: ["Behind the barrier", "At the assembly point", "Between a moving and a fixed object"], e: "Danger comes from moving, flying and falling objects." },
      ur: { q: "خطرے کی لائن میں کہاں کبھی کھڑے نہ ہوں؟", o: ["رکاوٹ کے پیچھے", "اسمبلی پوائنٹ پر", "حرکت کرتی اور ساکن چیز کے درمیان"], e: "خطرہ حرکت کرتی، اڑتی اور گرتی چیزوں سے ہے۔" } },
    { a: 1,
      ar: { q: "ماذا يلزم لدخول مكان محصور؟", o: ["تصريح دخول فقط", "تصريح، عزل الطاقة، اختبار الهواء، ومراقب عند المدخل", "كمام وجه فقط"], e: "الأربعة كلها لازمة قبل الدخول." },
      en: { q: "What is required to enter a confined space?", o: ["An entry permit only", "Permit, energy isolated, air tested, attendant at the entrance", "A face mask only"], e: "All four are required before entry." },
      ur: { q: "تنگ جگہ میں داخلے کے لیے کیا ضروری ہے؟", o: ["صرف داخلے کا پرمٹ", "پرمٹ، توانائی الگ، ہوا کا ٹیسٹ، اور داخلے پر نگران", "صرف ماسک"], e: "داخلے سے پہلے چاروں چیزیں ضروری ہیں۔" } }
  ],

  ppe: [
    { a: 0,
      ar: { q: "من يتحمل تكلفة معدات الوقاية الشخصية؟", o: ["صاحب العمل", "العامل", "يتقاسمانها"], e: "نظام العمل السعودي يُلزم صاحب العمل بتوفير وسائل الوقاية دون تحميل العامل أي تكلفة." },
      en: { q: "Who pays for personal protective equipment?", o: ["The employer", "The worker", "They split the cost"], e: "Saudi Labor Law requires the employer to provide protection at no cost to the worker." },
      ur: { q: "ذاتی حفاظتی سامان کی قیمت کون ادا کرتا ہے؟", o: ["آجر (کمپنی)", "کارکن", "دونوں مل کر"], e: "سعودی لیبر قانون کے مطابق آجر کارکن پر کوئی خرچ ڈالے بغیر حفاظتی سامان فراہم کرے۔" } },
    { a: 1,
      ar: { q: "متى تفحص معدات الوقاية؟", o: ["مرة في الشهر", "قبل كل استخدام", "عندما تتلف فقط"], e: "الفحص قبل كل استخدام يكشف التلف قبل أن يخذلك." },
      en: { q: "When do you inspect your PPE?", o: ["Once a month", "Before every use", "Only when it breaks"], e: "Checking before every use finds damage before it fails you." },
      ur: { q: "حفاظتی سامان کب چیک کریں؟", o: ["مہینے میں ایک بار", "ہر استعمال سے پہلے", "صرف خراب ہونے پر"], e: "ہر استعمال سے پہلے چیک کرنے سے خرابی پہلے پتہ چلتی ہے۔" } },
    { a: 1,
      ar: { q: "متى يلزم واقي السمع؟", o: ["عند 60 ديسيبل", "عند 85 ديسيبل أو أكثر", "فقط عند 120 ديسيبل"], e: "85 ديسيبل هو حد الإجراء المعتمد لحماية السمع." },
      en: { q: "When is hearing protection required?", o: ["At 60 dB", "At 85 dB(A) or more", "Only at 120 dB"], e: "85 dB(A) is the recognized action level for hearing protection." },
      ur: { q: "کانوں کی حفاظت کب ضروری ہے؟", o: ["60 ڈیسیبل پر", "85 ڈیسیبل یا زیادہ پر", "صرف 120 ڈیسیبل پر"], e: "85 ڈیسیبل سماعت کی حفاظت کی تسلیم شدہ حد ہے۔" } },
    { a: 2,
      ar: { q: "ما الملابس المناسبة للعمل الكهربائي مع خطر القوس الكهربائي؟", o: ["ملابس بوليستر", "أي قميص بأكمام طويلة", "ملابس مقاومة للقوس الكهربائي (AR)"], e: "حسب NFPA 70E: ملابس مصنّفة للقوس الكهربائي؛ البوليستر يذوب ويلتصق بالجلد." },
      en: { q: "What clothing is right for electrical work with arc-flash risk?", o: ["Polyester clothing", "Any long-sleeve shirt", "Arc-rated (AR) clothing"], e: "Per NFPA 70E: arc-rated clothing. Polyester melts onto skin." },
      ur: { q: "آرک فلیش کے خطرے والے بجلی کے کام میں کون سا لباس درست ہے؟", o: ["پولیسٹر لباس", "کوئی بھی لمبی آستین", "آرک ریٹڈ (AR) لباس"], e: "NFPA 70E کے مطابق آرک ریٹڈ لباس؛ پولیسٹر جلد پر پگھل جاتا ہے۔" } },
    { a: 0,
      ar: { q: "خوذتك فيها شرخ. ماذا تفعل؟", o: ["أستبدلها فورًا", "ألصق الشرخ بشريط", "أكمل بها اليوم"], e: "الخوذة المتشققة لا تحمي؛ استبدلها فورًا." },
      en: { q: "Your hard hat has a crack. What do you do?", o: ["Replace it immediately", "Tape the crack", "Use it for the rest of today"], e: "A cracked hard hat will not protect you; replace it now." },
      ur: { q: "آپ کے ہیلمٹ میں دراڑ ہے۔ کیا کریں؟", o: ["فوراً بدلیں", "دراڑ پر ٹیپ لگائیں", "آج کے لیے استعمال کریں"], e: "دراڑ والا ہیلمٹ حفاظت نہیں کرتا؛ فوراً بدلیں۔" } }
  ],

  loto: [
    { a: 2,
      ar: { q: "من يحق له إزالة قفل العزل الشخصي؟", o: ["أي فني في الوردية", "المشرف في أي وقت", "العامل الذي وضعه فقط"], e: "القفل الشخصي يزيله صاحبه فقط، إلا بإجراء رسمي معتمد في حالات استثنائية." },
      en: { q: "Who may remove a personal isolation lock?", o: ["Any technician on shift", "The supervisor at any time", "Only the worker who applied it"], e: "Only its owner removes it, except through a formal approved procedure." },
      ur: { q: "ذاتی آئسولیشن تالا کون کھول سکتا ہے؟", o: ["شفٹ کا کوئی بھی ٹیکنیشن", "سپروائزر کسی بھی وقت", "صرف وہ کارکن جس نے لگایا"], e: "صرف مالک کھولے، سوائے باقاعدہ منظور شدہ طریقہ کار کے۔" } },
    { a: 0,
      ar: { q: "فريق من 4 عمال على نفس المعدة. كم قفلًا شخصيًا؟", o: ["4 أقفال، لكل عامل قفله", "قفل واحد للفريق", "قفلان"], e: "كل عامل يضع قفله الخاص ليحمي نفسه." },
      en: { q: "A crew of 4 works on the same equipment. How many personal locks?", o: ["4, one per worker", "One for the crew", "Two"], e: "Each worker applies their own lock to protect themselves." },
      ur: { q: "4 کارکن ایک ہی آلے پر کام کر رہے ہیں۔ کتنے ذاتی تالے؟", o: ["4، ہر کارکن کا اپنا", "پوری ٹیم کا ایک", "دو"], e: "ہر کارکن اپنی حفاظت کے لیے اپنا تالا لگائے۔" } },
    { a: 1,
      ar: { q: "كيف تتأكد من انعدام الجهد؟", o: ["ألمس الموصل بظهر يدي", "أختبر الجهاز على مصدر حي، ثم أفحص، ثم أختبر الجهاز مرة أخرى", "أعتمد على مؤشر اللوحة"], e: "طريقة حي، ميت، حي: تتأكد أن جهاز الفحص سليم قبل وبعد." },
      en: { q: "How do you prove the circuit is dead?", o: ["Touch it with the back of my hand", "Prove the tester on a live source, test, then prove the tester again", "Trust the panel indicator"], e: "Live-dead-live: confirm the tester works before and after." },
      ur: { q: "کیسے یقینی بنائیں کہ بجلی نہیں ہے؟", o: ["ہاتھ کی پشت سے چھوئیں", "ٹیسٹر کو زندہ سورس پر چیک کریں، ٹیسٹ کریں، پھر ٹیسٹر دوبارہ چیک کریں", "پینل کے انڈیکیٹر پر بھروسہ کریں"], e: "لائیو-ڈیڈ-لائیو: ٹیسٹر کو پہلے اور بعد میں جانچیں۔" } },
    { a: 2,
      ar: { q: "لماذا نطبّق التأريض المؤقت على الخطوط؟", o: ["لتحسين الإضاءة", "لتسريع العمل", "للحماية من الجهد المستحث أو إعادة التغذية بالخطأ"], e: "التأريض المؤقت يحميك إذا عاد الجهد بشكل غير متوقع." },
      en: { q: "Why do we apply temporary grounding to lines?", o: ["To improve lighting", "To work faster", "To protect against induced voltage or accidental re-energizing"], e: "It protects you if voltage returns unexpectedly." },
      ur: { q: "لائنوں پر عارضی ارتھنگ کیوں لگاتے ہیں؟", o: ["روشنی بہتر کرنے کے لیے", "کام تیز کرنے کے لیے", "انڈیوسڈ وولٹیج یا غلطی سے بجلی آنے سے بچاؤ کے لیے"], e: "اگر بجلی اچانک واپس آئے تو یہ آپ کی حفاظت کرتی ہے۔" } },
    { a: 1,
      ar: { q: "زميلك يقول: «الخط مفصول، ابدأ». ماذا تفعل؟", o: ["أبدأ لأني أثق فيه", "أتحقق بنفسي وأضع قفلي", "أبدأ بحذر"], e: "لا تعتمد على كلام أحد: اعزل وافحص بنفسك." },
      en: { q: "A colleague says: “The line is dead, go ahead.” What do you do?", o: ["Start, I trust him", "Verify it myself and apply my lock", "Start carefully"], e: "Never rely on someone's word: isolate and test yourself." },
      ur: { q: "ساتھی کہتا ہے: ”لائن بند ہے، شروع کرو۔“ آپ کیا کریں گے؟", o: ["شروع کروں گا، مجھے اعتماد ہے", "خود تصدیق کروں گا اور اپنا تالا لگاؤں گا", "احتیاط سے شروع کروں گا"], e: "کسی کی بات پر بھروسہ نہ کریں: خود الگ کریں اور ٹیسٹ کریں۔" } }
  ],

  height: [
    { a: 0,
      ar: { q: "ماذا تعني البطاقة الخضراء على السقالة؟", o: ["مفحوصة وآمنة للاستخدام", "تحت الإنشاء", "ممنوع الاستخدام"], e: "الخضراء: مفحوصة وآمنة. الحمراء: ممنوع الصعود." },
      en: { q: "What does a green tag on a scaffold mean?", o: ["Inspected and safe to use", "Under construction", "Do not use"], e: "Green: inspected and safe. Red: do not climb." },
      ur: { q: "سکیفولڈ پر سبز ٹیگ کا مطلب؟", o: ["چیک شدہ اور استعمال کے لیے محفوظ", "زیر تعمیر", "استعمال ممنوع"], e: "سبز: محفوظ۔ سرخ: مت چڑھیں۔" } },
    { a: 1,
      ar: { q: "كم نقطة تلامس تحافظ عليها على السلّم؟", o: ["نقطتان", "ثلاث نقاط", "نقطة واحدة"], e: "يدان وقدم، أو قدمان ويد، طوال الوقت." },
      en: { q: "How many points of contact do you keep on a ladder?", o: ["Two", "Three", "One"], e: "Two hands and a foot, or two feet and a hand, at all times." },
      ur: { q: "سیڑھی پر کتنے نقطوں کا رابطہ رکھیں؟", o: ["دو", "تین", "ایک"], e: "ہر وقت دو ہاتھ اور ایک پاؤں، یا دو پاؤں اور ایک ہاتھ۔" } },
    { a: 2,
      ar: { q: "بماذا تربط حبل الأمان؟", o: ["أي أنبوب قريب", "درابزين السقالة", "نقطة تثبيت معتمدة تتحمل قوة السقوط"], e: "نقطة التثبيت يجب أن تكون معتمدة لتحمل السقوط (حوالي 22 كيلونيوتن لكل عامل)." },
      en: { q: "What do you tie your lanyard to?", o: ["Any nearby pipe", "The scaffold guardrail", "An approved anchor rated for fall arrest"], e: "Anchors must be rated for fall arrest (about 22 kN / 5,000 lb per worker)." },
      ur: { q: "لینیارڈ کس سے باندھیں؟", o: ["قریب کا کوئی بھی پائپ", "سکیفولڈ کی ریلنگ", "گرنے کو روکنے کے لیے منظور شدہ اینکر"], e: "اینکر گرنے کی قوت کے لیے منظور شدہ ہو (تقریباً 22 کلو نیوٹن فی کارکن)۔" } },
    { a: 0,
      ar: { q: "ماذا يجب أن يكون جاهزًا قبل الصعود؟", o: ["خطة إنقاذ", "كوب ماء", "سماعات"], e: "العامل المعلّق بالحزام يحتاج إنقاذًا سريعًا؛ الخطة تُجهَّز قبل الصعود." },
      en: { q: "What must be ready before you climb?", o: ["A rescue plan", "A cup of water", "Headphones"], e: "A worker suspended in a harness needs fast rescue; plan it before climbing." },
      ur: { q: "چڑھنے سے پہلے کیا تیار ہونا چاہیے؟", o: ["ریسکیو پلان", "پانی کا گلاس", "ہیڈ فون"], e: "ہارنس میں لٹکے کارکن کو فوری ریسکیو چاہیے؛ پلان پہلے بنائیں۔" } },
    { a: 1,
      ar: { q: "تحتاج تتحرك على البرج من نقطة لأخرى:", o: ["أفك الحبل للحظة وأتحرك", "أستخدم الحبل المزدوج وأبقى مربوطًا 100٪", "أتحرك بسرعة دون ربط"], e: "الحبل المزدوج يبقيك مربوطًا طوال الحركة." },
      en: { q: "You need to move from one point to another on a tower:", o: ["Unclip for a moment and move", "Use a double lanyard and stay 100% tied off", "Move quickly without clipping"], e: "A double lanyard keeps you tied off during every move." },
      ur: { q: "ٹاور پر ایک جگہ سے دوسری جگہ جانا ہے:", o: ["ایک لمحے کے لیے کھول کر چلیں", "ڈبل لینیارڈ استعمال کریں اور 100٪ بندھے رہیں", "بغیر باندھے جلدی چلیں"], e: "ڈبل لینیارڈ ہر حرکت میں آپ کو بندھا رکھتا ہے۔" } }
  ],

  emergency: [
    { a: 2,
      ar: { q: "رقم الدفاع المدني في السعودية:", o: ["997", "993", "998"], e: "998 الدفاع المدني، 997 الإسعاف (الهلال الأحمر)، 911 الطوارئ الموحد." },
      en: { q: "The Civil Defense number in Saudi Arabia:", o: ["997", "993", "998"], e: "998 Civil Defense, 997 Ambulance (Red Crescent), 911 unified emergency." },
      ur: { q: "سعودی عرب میں سول ڈیفنس کا نمبر:", o: ["997", "993", "998"], e: "998 سول ڈیفنس، 997 ایمبولینس (ہلال احمر)، 911 یونیفائیڈ ایمرجنسی۔" } },
    { a: 1,
      ar: { q: "حدث تسرب غاز. إلى أين تتجه؟", o: ["مع اتجاه الريح", "عكس اتجاه الريح أو بشكل جانبي له", "أبقى مكاني"], e: "تحرّك عكس الريح أو جانبيًا حتى لا يصلك الغاز." },
      en: { q: "There is a gas release. Which way do you go?", o: ["Downwind", "Upwind or crosswind", "Stay where I am"], e: "Move upwind or crosswind so the gas does not reach you." },
      ur: { q: "گیس لیک ہو گئی۔ کس طرف جائیں؟", o: ["ہوا کے رخ پر", "ہوا کے مخالف یا ترچھے رخ", "اپنی جگہ رہیں"], e: "ہوا کے مخالف یا ترچھے رخ جائیں تاکہ گیس آپ تک نہ پہنچے۔" } },
    { a: 0,
      ar: { q: "زميلك تعرّض لصعقة وما زال ملامسًا للتيار. أول خطوة:", o: ["افصل مصدر الكهرباء قبل لمسه", "اسحبه بيدك فورًا", "صب عليه ماء"], e: "لا تلمسه قبل فصل التيار، وإلا ستصبح أنت الضحية الثانية." },
      en: { q: "A colleague is being electrocuted and still in contact. First step:", o: ["Cut the power before touching him", "Pull him away by hand", "Pour water on him"], e: "Do not touch him until the power is off, or you become the second victim." },
      ur: { q: "ساتھی کو کرنٹ لگ رہا ہے اور وہ ابھی بھی تار سے لگا ہے۔ پہلا قدم:", o: ["چھونے سے پہلے بجلی بند کریں", "ہاتھ سے کھینچیں", "اس پر پانی ڈالیں"], e: "بجلی بند ہونے سے پہلے نہ چھوئیں، ورنہ آپ دوسرے متاثر ہوں گے۔" } },
    { a: 1,
      ar: { q: "طريقة استخدام طفاية الحريق:", o: ["رش عشوائي على اللهب", "اسحب المسمار، وجّه للقاعدة، اضغط، حرّك يمين ويسار", "رش على أعلى اللهب"], e: "طريقة PASS: وجّه دائمًا إلى قاعدة النار." },
      en: { q: "How do you use a fire extinguisher?", o: ["Spray randomly at the flames", "Pull the pin, Aim at the base, Squeeze, Sweep", "Spray at the top of the flames"], e: "PASS: always aim at the base of the fire." },
      ur: { q: "آگ بجھانے والا آلہ کیسے استعمال کریں؟", o: ["شعلوں پر بے ترتیب چھڑکیں", "پن کھینچیں، بنیاد کی طرف کریں، دبائیں، دائیں بائیں گھمائیں", "شعلوں کے اوپر چھڑکیں"], e: "PASS طریقہ: ہمیشہ آگ کی بنیاد پر۔" } },
    { a: 2,
      ar: { q: "وصلت نقطة التجمع. ماذا تفعل؟", o: ["أرجع آخذ أغراضي", "أغادر للبيت", "أسجّل حضوري ولا أغادر دون إذن"], e: "العدّ في نقطة التجمع يكشف إن كان أحد مفقودًا." },
      en: { q: "You reach the assembly point. What do you do?", o: ["Go back for my belongings", "Go home", "Report for the headcount and stay until released"], e: "The headcount reveals if anyone is missing." },
      ur: { q: "آپ اسمبلی پوائنٹ پہنچ گئے۔ کیا کریں؟", o: ["سامان لینے واپس جائیں", "گھر چلے جائیں", "حاضری لگوائیں اور اجازت کے بغیر نہ جائیں"], e: "گنتی سے پتہ چلتا ہے کہ کوئی لاپتہ تو نہیں۔" } }
  ]
};
