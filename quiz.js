/* =====================================================================
   بنك أسئلة قواعد الحفاظ على الحياة
   كل محاولة تسحب 5 أسئلة لم تظهر في المحاولات السابقة
   a = رقم الإجابة الصحيحة (يبدأ من 0) — الخيارات تُخلط تلقائيًا
   e = شرح قصير يظهر بعد الإجابة
   ===================================================================== */

const QUIZ_SIZE = 5;

const REFS = {
  lsr:  ["IOGP Life-Saving Rules"],
  risk: ["ISO 45001:2018", "ISO 31000"]
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
  ,
  risk: [
    { a: 1,
      ar: { q: "ما هو «الخطر»؟", o: ["أي حادث وقع في الماضي", "أي شيء قد يسبب أذى", "أي عمل يحتاج تصريح"], e: "الخطر: أي شيء قد يسبب أذى، مثل الكهرباء والارتفاع والحفرة والمعدات المتحركة." },
      en: { q: "What is a “hazard”?", o: ["Any accident that happened in the past", "Anything that could cause harm", "Any job that needs a permit"], e: "A hazard is anything that could cause harm: electricity, height, excavations, moving equipment." },
      ur: { q: "”خطرہ“ کیا ہے؟", o: ["ماضی کا کوئی بھی حادثہ", "کوئی بھی چیز جو نقصان پہنچا سکے", "کوئی بھی کام جس کے لیے پرمٹ چاہیے"], e: "خطرہ ہر وہ چیز ہے جو نقصان پہنچا سکے: بجلی، اونچائی، کھدائی، حرکت کرتے آلات۔" } },
    { a: 0,
      ar: { q: "تقييم المخاطر يسأل سؤالين عن كل خطر:", o: ["ما شدته؟ وما احتماله؟", "من المسؤول؟ ومتى ينتهي العمل؟", "كم التكلفة؟ وكم العمال؟"], e: "الشدة: لو حدث، ما أسوأ نتيجة واقعية؟ والاحتمالية: ما فرصة أن يحدث؟" },
      en: { q: "A risk assessment asks two questions about each hazard:", o: ["How severe? How likely?", "Who is responsible? When does the job end?", "How much does it cost? How many workers?"], e: "Severity: if it happens, what is the worst realistic outcome? Likelihood: how likely is it to happen?" },
      ur: { q: "رسک اسیسمنٹ ہر خطرے کے بارے میں دو سوال پوچھتی ہے:", o: ["کتنا شدید؟ کتنا ممکن؟", "ذمہ دار کون؟ کام کب ختم ہوگا؟", "کتنی لاگت؟ کتنے کارکن؟"], e: "شدت: اگر ہو جائے تو بدترین حقیقی نتیجہ کیا ہے؟ امکان: ہونے کا کتنا موقع ہے؟" } },
    { a: 2,
      ar: { q: "الخطوة الأولى في الموقع:", o: ["ابدأ العمل ثم قيّم", "اسأل زميلك إذا كان المكان آمنًا", "راجع التقييم المعتمد للمهمة، ثم انظر حولك: هل ترى خطرًا غير مذكور؟"], e: "التقييم الإضافي يبدأ من التقييم المعتمد، ثم تبحث عن أي خطر جديد غير مذكور فيه." },
      en: { q: "Step one on site:", o: ["Start work, then assess", "Ask a colleague if the area is safe", "Review the job's approved assessment, then look around: is there a hazard it doesn't list?"], e: "The extra assessment starts from the approved one, then looks for any new hazard it doesn't mention." },
      ur: { q: "سائٹ پر پہلا قدم:", o: ["کام شروع کریں پھر جائزہ لیں", "ساتھی سے پوچھیں کہ جگہ محفوظ ہے", "کام کی منظور شدہ اسیسمنٹ دیکھیں، پھر اردگرد دیکھیں: کیا کوئی خطرہ اس میں درج نہیں؟"], e: "اضافی اسیسمنٹ منظور شدہ اسیسمنٹ سے شروع ہوتی ہے، پھر کوئی نیا غیر درج خطرہ تلاش کریں۔" } },
    { a: 1,
      ar: { q: "لاحظت أرضًا غير مستوية تحت سلة الرافعة، وهي غير مذكورة في التقييم:", o: ["أتجاهلها لأنها بسيطة", "أكتبها في سطر جديد بالتقييم وأقيّمها", "أبلغ عنها بعد انتهاء العمل"], e: "أي خطر غير مذكور يُكتب في سطر: العمل، الخطر، الحدث المحتمل، ووسائل التحكم الحالية." },
      en: { q: "You notice uneven ground under the bucket truck, and it is not in the assessment:", o: ["Ignore it, it's minor", "Write it on a new line in the assessment and rate it", "Report it after the job"], e: "Any unlisted hazard goes on a line: activity, hazard, possible event, existing controls." },
      ur: { q: "آپ نے باسکٹ ٹرک کے نیچے ناہموار زمین دیکھی جو اسیسمنٹ میں درج نہیں:", o: ["نظرانداز کریں، معمولی ہے", "اسیسمنٹ میں نئی سطر میں لکھیں اور درجہ دیں", "کام کے بعد اطلاع دیں"], e: "ہر غیر درج خطرہ ایک سطر میں لکھا جاتا ہے: کام، خطرہ، ممکنہ واقعہ، موجودہ کنٹرول۔" } },
    { a: 0,
      ar: { q: "في الخطوة الثانية، ماذا تكتب في سطر الخطر؟", o: ["العمل، الخطر، الحدث المحتمل، ووسائل التحكم الحالية", "اسمك ورقم جوالك فقط", "اسم المعدة فقط"], e: "مثال: رفع السلة، أرض غير مستوية، انقلاب السلة وسقوط العامل، حزام الأمان." },
      en: { q: "In step two, what do you write on the hazard line?", o: ["Activity, hazard, possible event, existing controls", "Only your name and phone number", "Only the equipment name"], e: "Example: lifting the bucket, uneven ground, bucket overturns and worker falls, safety harness." },
      ur: { q: "دوسرے قدم میں خطرے کی سطر میں کیا لکھیں؟", o: ["کام، خطرہ، ممکنہ واقعہ، موجودہ کنٹرول", "صرف اپنا نام اور فون نمبر", "صرف آلے کا نام"], e: "مثال: باسکٹ اٹھانا، ناہموار زمین، باسکٹ الٹنا اور کارکن کا گرنا، سیفٹی ہارنس۔" } },
    { a: 2,
      ar: { q: "الشدة 4 «كبيرة» تعني:", o: ["إسعافات أولية", "إصابة مفقدة لوقت العمل", "وفاة واحدة أو عجز"], e: "مقياس الشدة: 1 طفيفة، 2 بسيطة، 3 متوسطة، 4 كبيرة (وفاة واحدة أو عجز)، 5 كارثية." },
      en: { q: "Severity 4, “major”, means:", o: ["First aid", "A lost-time injury", "One fatality or disability"], e: "Severity: 1 negligible, 2 minor, 3 moderate, 4 major (one fatality or disability), 5 catastrophic." },
      ur: { q: "شدت 4 ”بڑی“ کا مطلب:", o: ["ابتدائی طبی امداد", "کام کا وقت ضائع کرنے والی چوٹ", "ایک موت یا معذوری"], e: "شدت: 1 معمولی، 2 ہلکی، 3 درمیانی، 4 بڑی (ایک موت یا معذوری)، 5 تباہ کن۔" } },
    { a: 0,
      ar: { q: "إصابة تحتاج إسعافات أولية فقط، شدتها:", o: ["1 طفيفة", "3 متوسطة", "5 كارثية"], e: "طفيفة (1) = إسعافات أولية." },
      en: { q: "An injury that needs first aid only has a severity of:", o: ["1 negligible", "3 moderate", "5 catastrophic"], e: "Negligible (1) = first aid." },
      ur: { q: "ایسی چوٹ جسے صرف ابتدائی طبی امداد چاہیے، اس کی شدت:", o: ["1 معمولی", "3 درمیانی", "5 تباہ کن"], e: "معمولی (1) = ابتدائی طبی امداد۔" } },
    { a: 1,
      ar: { q: "إصابة تفقد العامل وقت عمل، شدتها:", o: ["2 بسيطة", "3 متوسطة", "5 كارثية"], e: "متوسطة (3) = إصابة مفقدة لوقت العمل. بسيطة (2) = تتطلب علاجًا طبيًا." },
      en: { q: "An injury that causes lost work time has a severity of:", o: ["2 minor", "3 moderate", "5 catastrophic"], e: "Moderate (3) = lost-time injury. Minor (2) = needs medical treatment." },
      ur: { q: "ایسی چوٹ جس سے کام کا وقت ضائع ہو، اس کی شدت:", o: ["2 ہلکی", "3 درمیانی", "5 تباہ کن"], e: "درمیانی (3) = کام کا وقت ضائع کرنے والی چوٹ۔ ہلکی (2) = طبی علاج چاہیے۔" } },
    { a: 2,
      ar: { q: "الشدة 5 «كارثية» تعني:", o: ["تلف ممتلكات بسيط", "إصابة تتطلب علاجًا طبيًا", "وفيات متعددة"], e: "كارثية (5) = وفيات متعددة." },
      en: { q: "Severity 5, “catastrophic”, means:", o: ["Minor property damage", "An injury needing medical treatment", "Multiple fatalities"], e: "Catastrophic (5) = multiple fatalities." },
      ur: { q: "شدت 5 ”تباہ کن“ کا مطلب:", o: ["معمولی املاک کا نقصان", "طبی علاج والی چوٹ", "متعدد اموات"], e: "تباہ کن (5) = متعدد اموات۔" } },
    { a: 0,
      ar: { q: "في مقياس الاحتمالية، أعلى درجة (5) هي:", o: ["مؤكد حدوثه", "ممكن حدوثه", "نادر الحدوث"], e: "الاحتمالية: 1 نادر الحدوث، 2 غير مرجح، 3 ممكن، 4 محتمل، 5 مؤكد حدوثه." },
      en: { q: "On the likelihood scale, the highest score (5) is:", o: ["Almost certain", "Possible", "Rare"], e: "Likelihood: 1 rare, 2 unlikely, 3 possible, 4 likely, 5 almost certain." },
      ur: { q: "امکان کے پیمانے پر سب سے زیادہ درجہ (5):", o: ["یقینی", "ممکن", "شاذ و نادر"], e: "امکان: 1 شاذ، 2 غیر متوقع، 3 ممکن، 4 متوقع، 5 یقینی۔" } },
    { a: 1,
      ar: { q: "كيف نحسب مستوى الخطر؟", o: ["الشدة + الاحتمالية", "الشدة × الاحتمالية", "الاحتمالية ÷ الشدة"], e: "اضرب الرقمين، والمصفوفة 5×5 تحدد المستوى." },
      en: { q: "How do we calculate the risk level?", o: ["Severity + likelihood", "Severity × likelihood", "Likelihood ÷ severity"], e: "Multiply the two numbers; the 5×5 matrix gives the level." },
      ur: { q: "خطرے کی سطح کیسے نکالیں؟", o: ["شدت + امکان", "شدت × امکان", "امکان ÷ شدت"], e: "دونوں نمبر ضرب دیں؛ 5×5 میٹرکس سطح بتاتا ہے۔" } },
    { a: 2,
      ar: { q: "شدة 4 واحتمالية 4. ما النتيجة؟", o: ["8 = متوسط، ابدأ العمل", "12 = متوسط", "16 = خطر عالٍ، لا نبدأ العمل هكذا"], e: "4 × 4 = 16، خطر عالٍ: لا نبدأ العمل قبل تقليل الخطر." },
      en: { q: "Severity 4 and likelihood 4. What is the result?", o: ["8 = medium, start work", "12 = medium", "16 = high risk, do not start like this"], e: "4 × 4 = 16, high risk: don't start until the risk is reduced." },
      ur: { q: "شدت 4 اور امکان 4۔ نتیجہ کیا ہے؟", o: ["8 = درمیانی، کام شروع کریں", "12 = درمیانی", "16 = زیادہ خطرہ، ایسے کام شروع نہ کریں"], e: "4 × 4 = 16، زیادہ خطرہ: خطرہ کم کیے بغیر شروع نہ کریں۔" } },
    { a: 0,
      ar: { q: "النتيجة من 1 إلى 5 (منخفض). ماذا تفعل؟", o: ["تابع، وقيّم بشكل دوري", "أوقف التشغيل فورًا", "بلّغ مسؤول السلامة وانتظر"], e: "منخفض (1–5): تابع، وقيّم بشكل دوري." },
      en: { q: "The score is 1 to 5 (low). What do you do?", o: ["Monitor and reassess periodically", "Stop operations immediately", "Inform the safety officer and wait"], e: "Low (1–5): monitor and reassess periodically." },
      ur: { q: "نتیجہ 1 سے 5 (کم)۔ کیا کریں؟", o: ["نگرانی کریں اور وقتاً فوقتاً جائزہ لیں", "فوراً کام بند کریں", "سیفٹی آفیسر کو بتائیں اور انتظار کریں"], e: "کم (1–5): نگرانی کریں اور وقتاً فوقتاً جائزہ لیں۔" } },
    { a: 1,
      ar: { q: "النتيجة من 6 إلى 12 (متوسط). ماذا تفعل؟", o: ["لا شيء", "تابع وراقب، وقد تحتاج وسائل تحكم إضافية", "أوقف التشغيل"], e: "متوسط (6–12): تابع وراقب، وقد تحتاج وسائل تحكم إضافية." },
      en: { q: "The score is 6 to 12 (medium). What do you do?", o: ["Nothing", "Monitor closely; extra controls may be needed", "Stop operations"], e: "Medium (6–12): monitor closely; additional controls may be needed." },
      ur: { q: "نتیجہ 6 سے 12 (درمیانی)۔ کیا کریں؟", o: ["کچھ نہیں", "نگرانی کریں؛ اضافی کنٹرول کی ضرورت ہو سکتی ہے", "کام بند کریں"], e: "درمیانی (6–12): نگرانی کریں؛ اضافی کنٹرول کی ضرورت ہو سکتی ہے۔" } },
    { a: 2,
      ar: { q: "النتيجة من 13 إلى 20 (عالٍ). ماذا تفعل؟", o: ["تابع بشكل دوري فقط", "ابدأ العمل وانتبه", "نفّذ وسائل تحكم استباقية، وراجعها بعد 7 أيام"], e: "عالٍ (13–20): نفّذ وسائل تحكم استباقية، وراجعها بعد 7 أيام." },
      en: { q: "The score is 13 to 20 (high). What do you do?", o: ["Just monitor periodically", "Start work and be careful", "Put proactive controls in place and review them after 7 days"], e: "High (13–20): implement proactive controls and review them after 7 days." },
      ur: { q: "نتیجہ 13 سے 20 (زیادہ)۔ کیا کریں؟", o: ["صرف وقتاً فوقتاً نگرانی", "کام شروع کریں اور دھیان رکھیں", "پیشگی کنٹرول نافذ کریں اور 7 دن بعد جائزہ لیں"], e: "زیادہ (13–20): پیشگی کنٹرول نافذ کریں اور 7 دن بعد جائزہ لیں۔" } },
    { a: 0,
      ar: { q: "النتيجة من 21 إلى 25 (كارثي). ماذا تفعل؟", o: ["أوقف التشغيل، وراجع وسائل التحكم، وبلّغ المشرف ومسؤول السلامة", "أكمل العمل بسرعة لينتهي", "قيّم بعد أسبوع"], e: "كارثي (21–25): أوقف التشغيل، وراجع وسائل التحكم، وبلّغ المشرف ومسؤول السلامة." },
      en: { q: "The score is 21 to 25 (extreme). What do you do?", o: ["Stop operations, review the controls, inform the supervisor and safety officer", "Finish the job quickly", "Reassess next week"], e: "Extreme (21–25): stop operations, review controls, inform the supervisor and safety officer." },
      ur: { q: "نتیجہ 21 سے 25 (انتہائی)۔ کیا کریں؟", o: ["کام بند کریں، کنٹرول کا جائزہ لیں، سپروائزر اور سیفٹی آفیسر کو بتائیں", "جلدی سے کام ختم کریں", "اگلے ہفتے جائزہ لیں"], e: "انتہائی (21–25): کام بند کریں، کنٹرول کا جائزہ لیں، سپروائزر اور سیفٹی آفیسر کو بتائیں۔" } },
    { a: 1,
      ar: { q: "في الخطوة الرابعة لتقليل الخطر، بأي حل تبدأ؟", o: ["الاستبدال", "إزالة الخطر", "معدات الوقاية"], e: "ابدأ بأقوى الحلول: إزالة الخطر أولًا، ثم الاستبدال." },
      en: { q: "In step four, reducing the risk, which solution do you start with?", o: ["Substitution", "Elimination", "PPE"], e: "Start with the strongest solution: elimination first, then substitution." },
      ur: { q: "چوتھے قدم میں خطرہ کم کرنے کے لیے کس حل سے شروع کریں؟", o: ["متبادل", "خطرہ ختم کرنا", "حفاظتی سامان"], e: "سب سے مضبوط حل سے شروع کریں: پہلے خطرہ ختم کرنا، پھر متبادل۔" } },
    { a: 0,
      ar: { q: "بعد تطبيق الحلول، ماذا تفعل؟", o: ["أعيد التقييم", "أبدأ العمل مباشرة", "أحذف السطر من التقييم"], e: "نطبّق الحلول ثم نعيد التقييم لنتأكد أن الخطر انخفض فعلًا." },
      en: { q: "After applying the solutions, what do you do?", o: ["Reassess", "Start work straight away", "Delete the line from the assessment"], e: "Apply the solutions, then reassess to confirm the risk really dropped." },
      ur: { q: "حل لاگو کرنے کے بعد کیا کریں؟", o: ["دوبارہ جائزہ لیں", "فوراً کام شروع کریں", "اسیسمنٹ سے سطر حذف کریں"], e: "حل لاگو کریں، پھر دوبارہ جائزہ لیں کہ خطرہ واقعی کم ہوا۔" } },
    { a: 2,
      ar: { q: "في مثال السلة على أرض غير مستوية، ما الحلول التي خفّضت الخطر من 16 إلى 4؟", o: ["زيادة سرعة العمل", "حزام أمان إضافي فقط", "نقل السلة إلى أرض مستوية، ووضع ألواح تحت المساند"], e: "بعد الحلول: الشدة 4 × الاحتمالية 1 = 4، خطر منخفض." },
      en: { q: "In the bucket-on-uneven-ground example, which solutions cut the risk from 16 to 4?", o: ["Working faster", "Only an extra harness", "Moving the bucket to level ground and putting mats under the outriggers"], e: "After the solutions: severity 4 × likelihood 1 = 4, low risk." },
      ur: { q: "ناہموار زمین پر باسکٹ کی مثال میں کن حلوں نے خطرہ 16 سے 4 کیا؟", o: ["کام تیز کرنا", "صرف اضافی ہارنس", "باسکٹ کو ہموار زمین پر لے جانا اور سپورٹ کے نیچے تختے رکھنا"], e: "حل کے بعد: شدت 4 × امکان 1 = 4، کم خطرہ۔" } },
    { a: 1,
      ar: { q: "آخر شيء يُكتب في خطة تقليل المخاطر:", o: ["اسم الشركة", "المسؤول عن المتابعة وتاريخ التنفيذ", "عدد ساعات العمل"], e: "وأخيرًا: المسؤول عن المتابعة وتاريخ التنفيذ، ويعتمده المشرف." },
      en: { q: "The last thing written in the risk-reduction plan:", o: ["The company name", "Who follows up and the implementation date", "The number of working hours"], e: "Finally: who follows up and the date; the supervisor approves it." },
      ur: { q: "خطرہ کم کرنے کے منصوبے میں آخری چیز:", o: ["کمپنی کا نام", "فالو اپ کا ذمہ دار اور عمل درآمد کی تاریخ", "کام کے گھنٹوں کی تعداد"], e: "آخر میں: فالو اپ کا ذمہ دار اور تاریخ؛ سپروائزر منظوری دیتا ہے۔" } },
    { a: 0,
      ar: { q: "لماذا نقوم بكل هذا؟", o: ["لأن كل حادث يبدأ بخطر لم ينتبه له أحد", "لملء الأوراق فقط", "لأن المشرف يطلب ذلك فقط"], e: "كل حادث يبدأ بخطر لم ينتبه له أحد. دقائق قليلة تكشفه قبل أن يقع." },
      en: { q: "Why do we do all this?", o: ["Every accident starts with a hazard nobody noticed", "Just to fill in paperwork", "Only because the supervisor asks"], e: "Every accident starts with a hazard nobody noticed. A few minutes reveal it before it strikes." },
      ur: { q: "ہم یہ سب کیوں کرتے ہیں؟", o: ["ہر حادثہ ایک ایسے خطرے سے شروع ہوتا ہے جسے کسی نے نہیں دیکھا", "صرف کاغذات بھرنے کے لیے", "صرف اس لیے کہ سپروائزر کہتا ہے"], e: "ہر حادثہ ایک ان دیکھے خطرے سے شروع ہوتا ہے۔ چند منٹ اسے پہلے ہی دکھا دیتے ہیں۔" } }
  ]
};
