/* =====================================================================
   بنك أسئلة قواعد الحفاظ على الحياة
   كل محاولة تسحب 5 أسئلة لم تظهر في المحاولات السابقة
   a = رقم الإجابة الصحيحة (يبدأ من 0) — الخيارات تُخلط تلقائيًا
   e = شرح قصير يظهر بعد الإجابة
   ===================================================================== */

const QUIZ_SIZE = 5;

const REFS = {
  lsr: ["IOGP Life-Saving Rules"]
};

const QUIZ = {
  lsr: [
    /* 1 — عزل الطاقة */
    { a: 2,
      ar: { q: "قبل العمل على معدة فيها طاقة كهربائية أو ميكانيكية أو هيدروليكية:", o: ["أطفئ المفتاح فقط", "اطلب من زميل يراقب المفتاح", "اعزل، اقفل، علّق البطاقة، افحص"], e: "القاعدة الأولى: عزل الطاقة بالتسلسل الكامل قبل البدء." },
      en: { q: "Before working on equipment with electrical, mechanical or hydraulic energy:", o: ["Just switch it off", "Ask a colleague to watch the switch", "Isolate, lock, tag, test"], e: "Rule one: complete energy isolation before you start." },
      ur: { q: "بجلی، مکینیکل یا ہائیڈرولک توانائی والے آلے پر کام سے پہلے:", o: ["صرف سوئچ بند کریں", "ساتھی سے سوئچ پر نظر رکھنے کو کہیں", "الگ کریں، تالا لگائیں، ٹیگ لگائیں، ٹیسٹ کریں"], e: "پہلا قانون: کام سے پہلے مکمل آئسولیشن۔" } },
    { a: 1,
      ar: { q: "أي أنواع الطاقة يجب عزلها قبل العمل؟", o: ["الكهربائية فقط", "الكهربائية والميكانيكية والهيدروليكية", "لا شيء إذا كانت المعدة مطفأة"], e: "كل مصادر الطاقة تُعزل: كهربائية، ميكانيكية، هيدروليكية." },
      en: { q: "Which types of energy must be isolated before work?", o: ["Electrical only", "Electrical, mechanical and hydraulic", "None if the equipment is switched off"], e: "Isolate every energy source: electrical, mechanical, hydraulic." },
      ur: { q: "کام سے پہلے کون سی توانائی الگ کرنی ہے؟", o: ["صرف بجلی", "بجلی، مکینیکل اور ہائیڈرولک", "کچھ نہیں اگر آلہ بند ہو"], e: "ہر توانائی الگ کریں: بجلی، مکینیکل، ہائیڈرولک۔" } },

    /* 2 — تصريح العمل */
    { a: 1,
      ar: { q: "أي الأعمال تحتاج تصريح عمل قبل البدء؟", o: ["العمل الساخن فقط", "الطاقة والحفر والعمل الساخن والمرتفعات", "الأعمال الكبيرة فقط"], e: "التصريح الصحيح مطلوب للطاقة والحفر والعمل الساخن والمرتفعات." },
      en: { q: "Which jobs need a work permit before starting?", o: ["Hot work only", "Energy, excavation, hot work and height", "Only big jobs"], e: "The right permit is required for energy, excavation, hot work and height." },
      ur: { q: "کن کاموں کے لیے شروع کرنے سے پہلے ورک پرمٹ چاہیے؟", o: ["صرف ہاٹ ورک", "توانائی، کھدائی، ہاٹ ورک اور اونچائی", "صرف بڑے کام"], e: "توانائی، کھدائی، ہاٹ ورک اور اونچائی کے لیے درست پرمٹ ضروری ہے۔" } },
    { a: 0,
      ar: { q: "متى يجب أن يكون التصريح الصحيح معك؟", o: ["قبل أن تبدأ العمل", "بعد ما تبدأ بنصف ساعة", "في نهاية اليوم"], e: "التصريح الصحيح قبل أن تبدأ، لا بعد." },
      en: { q: "When must you have the right permit?", o: ["Before you start the job", "Half an hour after starting", "At the end of the day"], e: "Right permit before you start, never after." },
      ur: { q: "درست پرمٹ کب ہونا چاہیے؟", o: ["کام شروع کرنے سے پہلے", "شروع کرنے کے آدھے گھنٹے بعد", "دن کے آخر میں"], e: "کام سے پہلے درست پرمٹ، بعد میں نہیں۔" } },

    /* 3 — معدات الوقاية الشخصية */
    { a: 2,
      ar: { q: "معدات الوقاية الشخصية هي:", o: ["أول إجراء للسلامة", "اختيارية في الأعمال القصيرة", "خط دفاعك الأخير"], e: "معدات الوقاية خط دفاعك الأخير بينك وبين الإصابة." },
      en: { q: "Personal protective equipment is:", o: ["The first safety measure", "Optional for short jobs", "Your last line of defense"], e: "PPE is your last line of defense against injury." },
      ur: { q: "ذاتی حفاظتی سامان ہے:", o: ["پہلا حفاظتی اقدام", "مختصر کاموں میں اختیاری", "آپ کی آخری دفاعی لائن"], e: "حفاظتی سامان چوٹ کے خلاف آپ کی آخری دفاعی لائن ہے۔" } },
    { a: 1,
      ar: { q: "متى تلبس معدات الوقاية؟", o: ["عند حضور المشرف فقط", "طوال وقت العمل", "في بداية العمل فقط"], e: "ارتدها طوال وقت العمل، وافحصها قبل كل استخدام." },
      en: { q: "When do you wear your PPE?", o: ["Only when the supervisor is around", "For the whole job", "Only at the start"], e: "Wear it for the whole job and inspect it before every use." },
      ur: { q: "حفاظتی سامان کب پہنیں؟", o: ["صرف سپروائزر کی موجودگی میں", "پورے کام کے دوران", "صرف شروع میں"], e: "پورے کام کے دوران پہنیں اور ہر استعمال سے پہلے چیک کریں۔" } },

    /* 4 — العمل على المرتفعات */
    { a: 1,
      ar: { q: "من أي ارتفاع تلزم الحماية من السقوط؟", o: ["3 أمتار", "1.8 متر", "5 أمتار"], e: "من 1.8 متر فأكثر: نظام حماية من السقوط ومربوط طوال الوقت." },
      en: { q: "From what height is fall protection required?", o: ["3 m", "1.8 m", "5 m"], e: "From 1.8 m and above: a fall protection system and tied off at all times." },
      ur: { q: "کس اونچائی سے گرنے سے حفاظت لازمی ہے؟", o: ["3 میٹر", "1.8 میٹر", "5 میٹر"], e: "1.8 میٹر یا زیادہ پر حفاظتی نظام اور ہر وقت بندھے رہنا لازمی ہے۔" } },
    { a: 1,
      ar: { q: "تصعد برجًا وتحتاج تتنقل بين نقطتين:", o: ["أفك الحبل لحظة وأتحرك", "أستخدم الحبل المزدوج وأبقى مربوطًا", "أتحرك بسرعة دون ربط"], e: "حبل مزدوج عند صعود الأبراج حتى تبقى مربوطًا طوال الحركة." },
      en: { q: "You are climbing a tower and need to move between two points:", o: ["Unclip for a moment and move", "Use a double lanyard and stay tied off", "Move quickly without clipping"], e: "A double lanyard on towers keeps you tied off during every move." },
      ur: { q: "آپ ٹاور پر چڑھ رہے ہیں اور دو جگہوں کے درمیان جانا ہے:", o: ["ایک لمحے کے لیے کھول کر چلیں", "ڈبل لینیارڈ سے بندھے رہیں", "بغیر باندھے جلدی چلیں"], e: "ٹاور پر ڈبل لینیارڈ ہر حرکت میں آپ کو بندھا رکھتا ہے۔" } },

    /* 5 — تجاوز وسائل تحكم السلامة */
    { a: 0,
      ar: { q: "هل يجوز تعطيل كاشف الغاز والحريق مؤقتًا لإنهاء العمل؟", o: ["لا، أبدًا", "نعم إذا كان العمل قصيرًا", "نعم بموافقة شفهية"], e: "لا تعطّل الإيقاف الطارئ ولا كشف الغاز والحريق." },
      en: { q: "May you temporarily disable gas and fire detection to finish a job?", o: ["No, never", "Yes, if the job is short", "Yes, with verbal approval"], e: "Never disable emergency shutdown or gas and fire detection." },
      ur: { q: "کیا کام ختم کرنے کے لیے گیس اور آگ کا ڈیٹیکٹر عارضی طور پر بند کر سکتے ہیں؟", o: ["نہیں، کبھی نہیں", "ہاں اگر کام مختصر ہو", "ہاں زبانی اجازت سے"], e: "ایمرجنسی شٹ ڈاؤن یا گیس اور آگ کا ڈیٹیکشن کبھی بند نہ کریں۔" } },
    { a: 2,
      ar: { q: "وجدت حاجزًا يمنع الطريق المختصر لموقع عملك:", o: ["أتخطاه بسرعة", "أزيله وأرجعه بعدين", "لا أتخطاه وأستخدم الطريق المسموح"], e: "لا تتخطَّ الحواجز؛ وُضعت لتحميك من خطر خلفها." },
      en: { q: "A barrier blocks the short way to your work area:", o: ["Step over it quickly", "Move it and put it back later", "Do not cross it; use the permitted route"], e: "Never cross barriers; they protect you from a hazard behind them." },
      ur: { q: "ایک رکاوٹ آپ کے کام کی جگہ کا مختصر راستہ روک رہی ہے:", o: ["جلدی سے پار کر لیں", "ہٹا دیں اور بعد میں واپس رکھ دیں", "پار نہ کریں، اجازت شدہ راستہ لیں"], e: "رکاوٹیں کبھی پار نہ کریں؛ یہ پیچھے کے خطرے سے بچاتی ہیں۔" } },

    /* 6 — العمل الساخن */
    { a: 0,
      ar: { q: "تحتاج تلحم قطعة بسيطة لمدة دقيقتين، والتصريح غير جاهز:", o: ["لا ألحم بدون تصريح ساري", "ألحم لأنها مدة قصيرة", "ألحم وأنتبه"], e: "لا لحام ولا قطع بدون تصريح، مهما كانت المدة قصيرة." },
      en: { q: "You need a two-minute weld and the permit is not ready:", o: ["No welding without a valid permit", "Weld, it is only short", "Weld carefully"], e: "No welding or cutting without a permit, however short the job." },
      ur: { q: "دو منٹ کی ویلڈنگ کرنی ہے اور پرمٹ تیار نہیں:", o: ["درست پرمٹ کے بغیر ویلڈنگ نہیں", "ویلڈ کر لیں، کام مختصر ہے", "احتیاط سے ویلڈ کریں"], e: "پرمٹ کے بغیر ویلڈنگ یا کٹنگ نہیں، چاہے کام کتنا ہی مختصر ہو۔" } },
    { a: 1,
      ar: { q: "قبل العمل الساخن، ماذا تفعل بالمواد القابلة للاشتعال؟", o: ["أغطيها بقطعة قماش", "أزيلها من منطقة العمل", "أتركها لأنها بعيدة شوي"], e: "أزل المواد القابلة للاشتعال قبل أي لحام أو قطع." },
      en: { q: "Before hot work, what do you do with flammable materials?", o: ["Cover them with a cloth", "Remove them from the work area", "Leave them, they are a bit far"], e: "Remove flammable materials before any welding or cutting." },
      ur: { q: "ہاٹ ورک سے پہلے آتش گیر مواد کا کیا کریں؟", o: ["کپڑے سے ڈھانپ دیں", "کام کی جگہ سے ہٹا دیں", "چھوڑ دیں، تھوڑا دور ہے"], e: "ویلڈنگ یا کٹنگ سے پہلے آتش گیر مواد ہٹا دیں۔" } },

    /* 7 — دخول الأماكن المحصورة */
    { a: 1,
      ar: { q: "ماذا يلزم لدخول مكان محصور؟", o: ["تصريح دخول فقط", "تصريح، عزل الطاقة، اختبار الهواء، ومراقب عند المدخل", "كمام وجه فقط"], e: "الأربعة كلها لازمة قبل الدخول." },
      en: { q: "What is required to enter a confined space?", o: ["An entry permit only", "Permit, energy isolated, air tested, attendant at the entrance", "A face mask only"], e: "All four are required before entry." },
      ur: { q: "تنگ جگہ میں داخلے کے لیے کیا ضروری ہے؟", o: ["صرف داخلے کا پرمٹ", "پرمٹ، توانائی الگ، ہوا کا ٹیسٹ، اور داخلے پر نگران", "صرف ماسک"], e: "داخلے سے پہلے چاروں چیزیں ضروری ہیں۔" } },
    { a: 2,
      ar: { q: "زميلك داخل خزان (مكان محصور). أين يكون المراقب؟", o: ["في المكتب", "داخل الخزان معه", "عند المدخل طوال الوقت"], e: "المراقب يبقى عند المدخل طوال الوقت، يتابع ويطلب النجدة عند الحاجة." },
      en: { q: "Your colleague is inside a tank (confined space). Where is the attendant?", o: ["In the office", "Inside the tank with him", "At the entrance the whole time"], e: "The attendant stays at the entrance throughout, watching and calling for help if needed." },
      ur: { q: "آپ کا ساتھی ٹینک (تنگ جگہ) کے اندر ہے۔ نگران کہاں ہو؟", o: ["دفتر میں", "اس کے ساتھ ٹینک کے اندر", "پورا وقت داخلی راستے پر"], e: "نگران پورا وقت داخلی راستے پر رہے اور ضرورت پر مدد بلائے۔" } },

    /* 8 — العمل في منطقة الخطر */
    { a: 2,
      ar: { q: "في منطقة الخطر، أين لا تقف أبدًا؟", o: ["خلف الحاجز", "في نقطة التجمع", "بين جسم متحرك وجسم ثابت"], e: "لا تقف بين متحرك وثابت." },
      en: { q: "In the line of fire, where must you never stand?", o: ["Behind the barrier", "At the assembly point", "Between a moving and a fixed object"], e: "Never stand between moving and fixed objects." },
      ur: { q: "خطرے کی لائن میں کہاں کبھی کھڑے نہ ہوں؟", o: ["رکاوٹ کے پیچھے", "اسمبلی پوائنٹ پر", "حرکت کرتی اور ساکن چیز کے درمیان"], e: "حرکت کرتی اور ساکن چیز کے درمیان کبھی نہ کھڑے ہوں۔" } },
    { a: 0,
      ar: { q: "مصادر الخطر في منطقة الخطر هي الأجسام:", o: ["المتحركة والمتطايرة والساقطة", "الثابتة فقط", "الصغيرة فقط"], e: "الخطر: متحرك، متطاير، ساقط. ابقَ يقظًا ومنتبهًا." },
      en: { q: "In the line of fire, the danger comes from objects that are:", o: ["Moving, flying and falling", "Fixed only", "Small only"], e: "Danger: moving, flying, falling. Stay alert." },
      ur: { q: "خطرے کی لائن میں خطرہ کن چیزوں سے ہے؟", o: ["حرکت کرتی، اڑتی اور گرتی", "صرف ساکن", "صرف چھوٹی"], e: "خطرہ: حرکت کرتی، اڑتی، گرتی چیزیں۔ چوکس رہیں۔" } },

    /* 9 — عمليات الرفع */
    { a: 1,
      ar: { q: "ماذا يلزم قبل أي عملية رفع؟", o: ["سائق يعرف المكان فقط", "خطة رفع معتمدة، مشغّل مؤهل، ومعدات مفحوصة", "رافعة جديدة فقط"], e: "الرفع الآمن: خطة معتمدة، مشغّل مؤهل، معدات مفحوصة." },
      en: { q: "What is needed before any lift?", o: ["Just a driver who knows the site", "An approved lift plan, qualified operator and inspected equipment", "Just a new crane"], e: "Safe lifting: approved plan, qualified operator, inspected equipment." },
      ur: { q: "کسی بھی لفٹنگ سے پہلے کیا ضروری ہے؟", o: ["صرف جگہ جاننے والا ڈرائیور", "منظور شدہ لفٹ پلان، اہل آپریٹر اور چیک شدہ آلات", "صرف نئی کرین"], e: "محفوظ لفٹنگ: منظور شدہ پلان، اہل آپریٹر، چیک شدہ آلات۔" } },
    { a: 2,
      ar: { q: "الحمولة أثقل قليلًا من حد الرافعة:", o: ["أرفعها ببطء", "أرفعها مرة وحدة فقط", "لا أتجاوز حد الحمولة أبدًا"], e: "لا تتجاوز حد الحمولة أبدًا، حتى لو بفرق بسيط." },
      en: { q: "The load is slightly heavier than the crane's limit:", o: ["Lift it slowly", "Lift it just once", "Never exceed the load limit"], e: "Never exceed the load limit, even by a little." },
      ur: { q: "وزن کرین کی حد سے تھوڑا زیادہ ہے:", o: ["آہستہ اٹھائیں", "صرف ایک بار اٹھائیں", "وزن کی حد سے کبھی تجاوز نہ کریں"], e: "وزن کی حد سے کبھی تجاوز نہ کریں، چاہے تھوڑا سا ہو۔" } },
    { a: 0,
      ar: { q: "الرافعة تعمل قرب خطوط كهرباء هوائية:", o: ["أحافظ على مسافة آمنة من الخطوط", "أكمل لأن الخطوط عالية", "أرفع بسرعة"], e: "مسافة آمنة من خطوط الكهرباء جزء من قاعدة عمليات الرفع." },
      en: { q: "The crane is working near overhead power lines:", o: ["Keep a safe distance from the lines", "Carry on, the lines are high", "Lift quickly"], e: "A safe distance from power lines is part of the lifting rule." },
      ur: { q: "کرین اوپر کی بجلی کی لائنوں کے قریب کام کر رہی ہے:", o: ["لائنوں سے محفوظ فاصلہ رکھیں", "جاری رکھیں، لائنیں اونچی ہیں", "جلدی اٹھائیں"], e: "بجلی کی لائنوں سے محفوظ فاصلہ لفٹنگ کے قانون کا حصہ ہے۔" } },

    /* 10 — قيادة المركبات والمعدات */
    { a: 1,
      ar: { q: "متى يحق لك قيادة مركبة أو معدة في الموقع؟", o: ["إذا أعرف أسوق", "معي رخصة سارية وأنا مرتاح ومنتبه", "إذا المسافة قصيرة"], e: "رخصة قيادة سارية، وأنت مرتاح ومنتبه." },
      en: { q: "When may you drive a vehicle or equipment on site?", o: ["If I know how to drive", "With a valid license, rested and alert", "If the distance is short"], e: "Valid driving license, rested and alert." },
      ur: { q: "سائٹ پر گاڑی یا آلہ کب چلا سکتے ہیں؟", o: ["اگر مجھے چلانا آتا ہو", "درست لائسنس کے ساتھ، آرام کیا ہوا اور چوکس", "اگر فاصلہ مختصر ہو"], e: "درست ڈرائیونگ لائسنس، آرام کیا ہوا اور چوکس۔" } },

    /* صلاحية إيقاف العمل */
    { a: 2,
      ar: { q: "من يحق له إيقاف أي عمل غير آمن؟", o: ["المدير فقط", "مسؤول السلامة فقط", "كل واحد منا"], e: "لكلٍّ منّا صلاحية إيقاف أي عمل غير آمن." },
      en: { q: "Who has the authority to stop unsafe work?", o: ["Only the manager", "Only the safety officer", "Every one of us"], e: "Each of us has the authority to stop any unsafe work." },
      ur: { q: "غیر محفوظ کام روکنے کا اختیار کس کے پاس ہے؟", o: ["صرف مینیجر", "صرف سیفٹی آفیسر", "ہم میں سے ہر ایک"], e: "ہم میں سے ہر ایک کو غیر محفوظ کام روکنے کا اختیار ہے۔" } }
  ]
};
