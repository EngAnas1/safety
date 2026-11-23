/* المحتوى التعليمي قبل الاختبار. كل معلومة مرتبطة بمصدرها:
   q = رقم سؤال في البنك (يُعرض مصدره الموثّق نفسه)، fg = [صفحة، من، إلى] في دليل تعبئة التصاريح. */
const LEARN = [
 { id: "docs", ic: "📑",
   ar: { t: "وثائق السلامة ومن يصدرها", d: "أول ما تسأل عنه اللجنة: ما الوثيقة، ومن يحق له إصدارها." },
   en: { t: "Safety documents and who issues them", d: "The committee's first question: which document, and who may issue it." },
   must: [
     { ar: "وثائق الجهد المتوسط لا يصدرها إلا موظف السعودية للطاقة المعمَّد. موظف المقاول يُعمَّد مصدرًا على الجهد المنخفض فقط.", en: "Medium-voltage documents are issued only by an authorized Saudi Electricity (SE) employee. A contractor employee can be an Issuer on low voltage only.", q: "d84" },
     { ar: "طلب العزل والتأريض (IER) يُصدر ويُستلم بين مراكز التحكم للجهات التشغيلية، أي بين موظفي السعودية للطاقة فقط، وليس من الوثائق المصرّح للمقاول بإصدارها.", en: "The Isolation & Earthing Request (IER) is issued and received between the control centers of the operating entities, i.e. by SE employees only. It is not among the documents a contractor may issue.", q: "d83" }
   ],
   facts: [
     { ar: "الوثائق الأساسية خمس: MV PTW، LV PTW، SFT، LOA، CSEP.", en: "There are five primary documents: MV PTW, LV PTW, SFT, LOA and CSEP.", q: "c54" },
     { ar: "الوثائق الثانوية ثلاث: EXC للحفر، WAH للعمل على المرتفعات، LOP لرفع الأحمال.", en: "There are three secondary documents: EXC for excavation, WAH for work at height, LOP for lifting.", q: "c55" },
     { ar: "الوثيقة الثانوية تابعة لوثيقة أساسية، ويصدرها مصدر الوثيقة الأساسية، ومدتها تساوي مدة الأساسية أو أقل.", en: "A secondary document belongs to a primary one, is issued by the main document's Issuer, and lasts no longer than the primary.", q: "x_sec" },
     { ar: "IER وثيقة إضافية، وليست تصريح عمل يسمح للمستلم بالبدء في العمل.", en: "IER is an additional document; it is not a permit that lets the Receiver start work.", q: "x_ier" },
     { ar: "مصدر المقاول على الجهد المنخفض يصدر: LV PTW وLOA وSFT، ومعها الثانوية EXC وWAH وLOP.", en: "A contractor LV Issuer may issue LV PTW, LOA and SFT, plus the secondary EXC, WAH and LOP.", q: "d02" },
     { ar: "المستلم قد يكون موظف الشركة أو المقاول، على الجهد المتوسط والمنخفض، ويخوّله المصدر والمستلم اللجنةُ الدائمة للتأهيل.", en: "The Receiver can be an SE or contractor employee, on MV and LV. Issuers and Receivers are authorized by the Permanent Qualification Committee.", q: "d78" },
     { ar: "لكل وثيقة سلامة ثلاث نسخ: للمصدر، وللمستلم، وللسجل.", en: "Every safety document has three copies: Issuer, Receiver, and Record.", q: "x_cop" },
     { ar: "لا يحق للمصدر أن يصدر وثيقة السلامة لنفسه.", en: "The Issuer may not issue a safety document to himself.", q: "x_self" }
   ] },
 { id: "use", ic: "🧭",
   ar: { t: "متى تُستخدم كل وثيقة", d: "طابق نوع العمل بالوثيقة: معزول ومؤرض، أو اختبار، أو قريب من مشحون، أو مكان محصور." },
   en: { t: "When each document is used", d: "Match the job to the document: isolated and earthed, testing, near live parts, or a confined space." },
   facts: [
     { ar: "تصريح العمل (PTW) للأعمال على معدات معزولة ومؤرضة، ويتطلب تركيب الأقفال والبطاقات التحذيرية.", en: "A Permit to Work (PTW) is for work on isolated and earthed equipment, and requires safety locks and warning tags.", q: "d40" },
     { ar: "التأريض في PTW بمفتاح التأريض الرئيسي للمعدة إن وجد، أو بالأرضي المتنقل.", en: "Under a PTW, earthing is by the equipment's main earth switch if fitted, or a portable earth.", q: "d39" },
     { ar: "التعميد بالاختبار (SFT) لاختبار متانة العزل أو مقاومة التوصيل، ومدته يوم واحد.", en: "Sanction for Test (SFT) is for insulation-strength or contact-resistance tests, and lasts one day.", q: "x_sft" },
     { ar: "عند إصدار SFT لفريق محدد لا تُصدر وثائق سلامة لبقية الفرق على نفس المعدة.", en: "When an SFT is issued to one working party, no safety documents are issued to the other parties.", q: "x_sft1" },
     { ar: "تحديد المسلك (LOA) للإنشاءات والمشاريع الجديدة، وللأعمال القريبة من معدات أو شبكات مشحونة.", en: "Limitation of Access (LOA) is for construction and new projects, and for work near live equipment or networks.", q: "x_loa" },
     { ar: "يُستثنى من LOA في الإنشاءات الجديدة: مشاريع تسليم المفتاح بمحطات شبكة التوزيع الرئيسة.", en: "Excluded from LOA in new construction: turnkey projects at main distribution network substations.", q: "d44" },
     { ar: "العزل تحت LOA لا يخوّل العمل على المعدات المعزولة، وعزل الجهد المتوسط تحتها لموظفي الشركة المعمدين فقط.", en: "Isolation under an LOA does not allow work on the isolated equipment, and isolating MV under it is for authorized SE employees only.", q: "x_loa2" },
     { ar: "دخول الأماكن المحصورة (CSEP) وثيقة مستقلة، ولا تغني عن وثيقة السلامة للأعمال الكهربائية داخلها.", en: "Confined Space Entry (CSEP) is a separate document; it does not replace the safety document for electrical work inside.", q: "x_cse" },
     { ar: "في المكان المحصور: مشرف مؤهل ومنقذ خارج المنطقة طوال وجود أشخاص بالداخل، وقياس مستمر للغازات.", en: "In a confined space: a qualified supervisor and a rescuer stay outside while anyone is inside, with continuous gas monitoring.", q: "d51" },
     { ar: "العمل على المرتفعات: احتمال السقوط مسافة 1.8 م أو أكثر.", en: "Work at height means a possible fall of 1.8 m or more.", q: "s25" },
     { ar: "لا تحتاج وثيقة سلامة: الفحص البصري، وأخذ القراءات التي لا تتطلب برامج تشغيلية، وفصل وإعادة التيار لعداد المشترك عن طريق قاطع العداد.", en: "No safety document is needed for visual inspection, readings that need no switching program, or switching a customer meter off and on with the meter breaker.", q: "d57" }
   ] },
 { id: "roles", ic: "🧑‍🔧",
   ar: { t: "مسؤوليات المصدر والمستلم", d: "ما يجب على كل طرف قبل العمل وأثناءه وبعده." },
   en: { t: "Issuer and Receiver duties", d: "What each party must do before, during and after the work." },
   facts: [
     { ar: "المصدر يحمل في الموقع أصل بطاقة التأهيل سارية المفعول، ويزور الموقع ويصدر التصريح منه.", en: "The Issuer carries the original, valid authorization card on site, visits the site and issues the permit there.", q: "d16" },
     { ar: "المصدر يكتب رقم البرنامج التشغيلي في جزء الإصدار قبل البدء في العزل.", en: "The Issuer writes the switching program number in the issue part before isolation starts.", q: "x_spno" },
     { ar: "نقاط العزل معروفة ومسماة ومعلّمة بشكل دائم، وتطابق الأرقام المكتوبة في الوثيقة.", en: "Isolation points are known, named and permanently labelled, and match the numbers on the document.", q: "d17" },
     { ar: "المستلم يزور الموقع مع المصدر ويستلم الوثيقة في الموقع، ولا يبدأ العمل قبل إصدارها.", en: "The Receiver visits the site with the Issuer, receives the document there, and does not start before it is issued.", q: "c46" },
     { ar: "بعد الاستلام وقبل العمل يفحص المستلم بأجهزة معتمدة عزل كل مصادر الطاقة وتفريغ الطاقة المخزنة.", en: "After receiving and before work, the Receiver uses approved testers to confirm all energy sources are isolated and stored energy discharged.", q: "d23" },
     { ar: "تُعرض الوثيقة في الموقع ومعها تقييم المخاطر وإجراءات العمل الآمنة واجتماع السلامة ونموذج أسماء فريق العمل.", en: "The document is displayed on site with the risk assessment, safe work procedure, toolbox talk and team name form.", q: "x_att" },
     { ar: "يمكن للمستلم استلام حتى 3 وثائق إذا كانت المواقع داخل دائرة قطرها 1 كم.", en: "A Receiver may hold up to 3 documents if the sites are within a 1 km diameter circle.", q: "x_max3" },
     { ar: "مهندس التحكم يكرر نقاط الفصل والعزل مع المصدر «كلمة بكلمة» في مكالمة صوتية مسجلة.", en: "The control engineer repeats the isolation points with the Issuer word for word on a recorded call.", q: "x_ctrl" },
     { ar: "البرنامج التشغيلي للجهد المنخفض يعدّه المقاول، ويراجعه القسم الطالب، ويعتمده مركز التوجيه.", en: "The LV switching program is prepared by the contractor, reviewed by the requesting section and approved by the dispatch center.", q: "x_sp" }
   ] },
 { id: "earth", ic: "⏚",
   ar: { t: "العزل والتأريض", d: "الترتيب والتوقيت ومن يركّب ماذا، والقيم الرقمية." },
   en: { t: "Isolation and earthing", d: "Order, timing, who fits what, and the numbers." },
   facts: [
     { ar: "الأرضي الرئيسي للدائرة (CME) يوصل قبل إصدار الوثيقة ويبقى طوال العمل، وبتوجيه مهندس التحكم للجهد المتوسط.", en: "The Circuit Main Earth (CME) is applied before the document is issued and stays for the whole job, on the control engineer's instruction for MV.", q: "x_cme" },
     { ar: "لا يُزال الأرضي الرئيسي إلا بموافقة مصدر الوثيقة.", en: "The main earth is removed only with the Issuer's approval.", q: "d36" },
     { ar: "الأرضي المتنقل يوضع بعد إصدار الوثيقة، ويركّبه المستلم المعمد أو العامل المشارك المعمد بإشراف المستلم.", en: "The portable earth goes on after issue, fitted by the authorized Receiver or an authorized competent worker under the Receiver's supervision.", q: "x_pe2" },
     { ar: "التوصيل بالأرض أولًا ثم بالموصلات، والإزالة من الموصلات أولًا ثم من الأرض.", en: "Connect to earth first, then the conductors; remove from the conductors first, then earth.", q: "x_seq" },
     { ar: "كل عمود عليه معدات جهد متوسط يُؤرَّض بأربعة قضبان على الأقل.", en: "Every pole carrying MV equipment is earthed with at least four rods.", q: "s83" },
     { ar: "أقل مسافة بين تأريض الجهد المتوسط وأقرب تأريض تعادل جهد منخفض 4 م.", en: "Minimum distance between the MV earthing system and the nearest LV neutral earth is 4 m.", q: "s84" },
     { ar: "أقصى مقاومة تأريض: المحطات ومانعات الصواعق 5 أوم، كبائن الجهد المنخفض 10 أوم، الأعمدة 20 أوم.", en: "Maximum earth resistance: substations and surge arresters 5 Ω, LV pillars 10 Ω, poles 20 Ω.", q: "s80" },
     { ar: "اختبار النقاط الثلاث: افحص الجهاز على مصدر مشحون، ثم الدائرة، ثم الجهاز مرة أخرى على نفس المصدر.", en: "3-point test: check the tester on a live source, test the circuit, then re-check the tester on the same source.", q: "s35" }
   ] },
 { id: "locks", ic: "🔒",
   ar: { t: "الأقفال والبطاقات التحذيرية", d: "الألوان، والمفاتيح، وكسر القفل، وتغيير الوردية." },
   en: { t: "Locks and warning tags", d: "Colours, keys, breaking a lock, and shift change." },
   facts: [
     { ar: "قفل المصدر أحمر، والمستلم أصفر، والعامل المشارك أزرق، والقفل المتعدد وصندوق أقفال المجموعة أحمر.", en: "Issuer lock red, Receiver yellow, competent worker blue; multi-lock and group lock box red.", q: "lockR" },
     { ar: "بطاقة التوقيف (Hold) حمراء للأعمال التشغيلية كعزل المعدة.", en: "The Hold tag is red, used in operational work such as isolating equipment.", q: "r05" },
     { ar: "بطاقة الحدود (Boundary) حمراء وبيضاء لتحديد معدة مشحونة قريبة قد تُعامل خطأً على أنها معزولة.", en: "The Boundary tag is red and white, marking nearby live equipment that could be mistaken as isolated.", q: "r01" },
     { ar: "بطاقة التنبيه (Caution) صفراء للظروف غير الطبيعية، وبطاقة الاختبار (Test) خضراء مزرقة.", en: "Caution tag yellow (abnormal conditions); Test tag teal.", q: "r03" },
     { ar: "بطاقة التأريض (Ground) خضراء، وتُستخدم في حالات تأريض المعدة فقط.", en: "The Ground tag is green, used only when the equipment is earthed.", q: "r08" },
     { ar: "المفتاح الشامل (Master Key) ممنوع، ولا يزيد عدد مفاتيح القفل الواحد عن مفتاحين.", en: "A master key is forbidden, and one lock has no more than two keys.", q: "x_key" },
     { ar: "لا يعطي الموظف مفتاح قفله لأي شخص آخر.", en: "An employee never gives his lock key to anyone else.", q: "s61" },
     { ar: "كسر القفل عند غياب صاحبه: لجنة برئاسة مدير الدائرة/مكتب الخدمات ومعه مؤهلان معمدان، مصدر ومستلم.", en: "Breaking a lock when its owner is absent: a committee headed by the department/service office manager with two authorized persons, an Issuer and a Receiver.", q: "s62" },
     { ar: "إذا وضع موظف المقاول القفل ولم يكن موجودًا، فلا يزيله أو يكسره إلا موظف الشركة.", en: "If a contractor employee's lock must be removed in his absence, only an SE employee removes or breaks it.", q: "x_contr" },
     { ar: "عند تغيير الوردية يضع الموظف الجديد قفله وبطاقته أولًا، ثم يزيل القديم قفله.", en: "At shift change the new employee fits his lock and tag first, then the old one removes his.", q: "x_shift" },
     { ar: "كل بطاقة تُستخدم مرة واحدة ثم تُتلف.", en: "Each tag is used once, then discarded.", q: "s65" }
   ] },
 { id: "life", ic: "⏱️",
   ar: { t: "المدد، والنقل، والإلغاء، والإغلاق", d: "من يوافق على المدة، وكيف تنتقل الوثيقة وتُغلق." },
   en: { t: "Durations, transfer, cancelling, closing", d: "Who approves the duration, and how a document is transferred and closed." },
   facts: [
     { ar: "الحد الأقصى لمدة أي وثيقة سلامة 120 يومًا.", en: "The maximum duration of any safety document is 120 days.", q: "c18" },
     { ar: "PTW: حتى 14 يومًا رئيس القسم، 15 إلى 60 مدير الدائرة/مكتب الخدمات، 61 إلى 120 مدير الإدارة.", en: "PTW: up to 14 days Section Head, 15–60 Division/Service Office Manager, 61–120 Department Manager.", q: "x_d2" },
     { ar: "LOA: حتى 30 يومًا المصدر مباشرة، 31 إلى 60 رئيس القسم، 61 إلى 120 مدير الدائرة/مكتب الخدمات.", en: "LOA: up to 30 days the Issuer directly, 31–60 Section Head, 61–120 Division/Service Office Manager.", q: "d64" },
     { ar: "الموافقة على المدة خطية أو عبر بريد الشركة، وتُرفق بالوثيقة.", en: "Duration approval is written or by company e-mail, attached to the document.", q: "x_d6" },
     { ar: "النقل: يطلبه المستلم الحالي من المصدر، ويتم بحضور المصدر والمستلم الحالي والجديد، ويُغلقها المستلم الأخير.", en: "Transfer: the current Receiver asks the Issuer; done with the Issuer, current and new Receivers present; the last Receiver closes it.", q: "c19" },
     { ar: "الإلغاء بتعبئة خانة الإلغاء مع ذكر السبب. المستلم يبلغ المصدر، والمصدر يبلغ رئيسه المباشر.", en: "Cancel by filling the cancel box with the reason. The Receiver informs the Issuer; the Issuer informs his direct supervisor.", q: "x_can2" },
     { ar: "بعد تصحيح الوضع غير الآمن يُستأنف العمل بوثيقة سلامة جديدة.", en: "After an unsafe condition is corrected, work resumes under a new safety document.", q: "d72" },
     { ar: "لا يُلغى أو يُنقل أو يُقفل التصريح إلا من قبل مستلمه.", en: "Only its Receiver cancels, transfers or closes the document.", q: "x_only" },
     { ar: "لا يُصدر التصريح ولا يُلغى ولا يُغلق عن طريق الهاتف.", en: "A permit is never issued, cancelled or closed by telephone.", q: "x_phone" },
     { ar: "قبل إبلاغ مركز التحكم بالجاهزية: تفتيش مشترك بين المصدر والمستلم.", en: "Before reporting readiness to the control center, the Issuer and Receiver inspect the site together.", q: "d67" },
     { ar: "تُحفظ نسخ الوثائق 12 شهرًا لأغراض التدقيق.", en: "Copies are kept for 12 months for audit.", q: "x_rec" }
   ] },
 { id: "ppe", ic: "⚡",
   ar: { t: "حدود الاقتراب والوقاية الشخصية", d: "المسافات، والقوس الكهربائي، واختبار المعدات العازلة." },
   en: { t: "Approach boundaries and PPE", d: "Distances, arc flash, and testing insulating equipment." },
   facts: [
     { ar: "حد الاقتراب المحدود: داخله خطر صدمة. حد الاقتراب المقيد: داخله خطر صدمة متزايد بسبب القوس مع الحركة غير المقصودة.", en: "Limited approach boundary: a shock hazard exists inside. Restricted approach boundary: increased shock risk from arc-over combined with inadvertent movement.", q: "q07" },
     { ar: "حد الحماية من الوميض القوسي: داخله قد يُصاب الشخص بحرق من الدرجة الثانية.", en: "Arc flash boundary: inside it a person could receive a second-degree burn.", q: "q94" },
     { ar: "مسافة الاقتراب: خط معزول أقل من 300 فولت 1 م، وخط غير معزول أقل من 50 ك.ف 3 م.", en: "Approach distance: insulated line under 300 V — 1 m; un-insulated line under 50 kV — 3 m.", q: "s33" },
     { ar: "تُلبس الملابس المقاومة للقوس فوق حد حروق الدرجة الثانية 1.2 cal/cm².", en: "Arc-rated clothing is worn above the second-degree burn threshold of 1.2 cal/cm².", q: "s06" },
     { ar: "تُفحص المعدات العازلة قبل كل يوم استخدام، وتُعطى القفازات اختبار هواء مع الفحص.", en: "Insulating equipment is inspected before each day's use; gloves get an air test with the inspection.", q: "s01" },
     { ar: "الاختبار الكهربائي الدوري: القفازات كل 6 أشهر، والأكمام والبطانيات كل 12 شهرًا.", en: "Periodic electrical test: gloves every 6 months, sleeves and blankets every 12 months.", q: "q01" }
   ] },
 { id: "civil", ic: "🏗️",
   ar: { t: "الحفر والرفع", d: "أرقام الحفريات والرافعات التي تتكرر في الأسئلة." },
   en: { t: "Excavation and lifting", d: "The excavation and crane numbers that keep coming up." },
   facts: [
     { ar: "الحفرية الأعمق من 1.5 م تُسند أو تُشكَّل جوانبها بانحدار آمن، ما لم يشهد مهندس بعدم وجود خطر انهيار.", en: "An excavation deeper than 1.5 m is shored or sloped back, unless an engineer certifies there is no collapse risk.", q: "s102" },
     { ar: "ناتج الحفر على مسافة 1 م على الأقل من حافة الحفرية، ولا يعمل أحد داخل الحفرية بمفرده.", en: "Spoil is kept at least 1 m from the edge, and nobody works in an excavation alone.", q: "s103" },
     { ar: "سلم الحفرية بزاوية 75° ويرتفع 1 م فوق نقطة الخروج.", en: "Excavation ladders at 75°, extending 1 m above the stepping-off point.", q: "s105" },
     { ar: "منطقة الأمان حول الرافعة: طول الذراع كاملًا + 10 م وبزاوية 360°.", en: "Crane safety zone: full jib length + 10 m, 360° around.", q: "s106" },
     { ar: "سلال رفع الأشخاص لا تُستخدم في رياح فوق 7 م/ث، وحمل المنصة لا يتجاوز 50% من سعة الرافعة.", en: "Man baskets are not used in wind above 7 m/s, and the platform load stays within 50% of crane capacity.", q: "s107" },
     { ar: "لا تُستخدم الرافعة لسحب الحمل أفقيًا، وأقصى ميل عند تسويتها 1%.", en: "Never use a crane to pull a load sideways; level it to a maximum slope of 1%.", q: "s109" }
   ] },
 { id: "fill", ic: "✍️",
   ar: { t: "كيف تُعبّأ التصاريح", d: "من دليل تعبئة تصاريح العمل. هذا ما يُصحَّح عليه الجزء العملي." },
   en: { t: "How permits are filled in", d: "From the work-permit filling guide. The practical part is marked on this." },
   facts: [
     { ar: "اسم/رقم البرنامج التشغيلي يبدأ بـ WE04.", en: "The switching program name/number starts with WE04.", fg: [1, 0.16, 0.26] },
     { ar: "في تصريح الجهد المنخفض تُكتب خانة «الرقم المرجعي (933)» برقم البرنامج التشغيلي الذي يبدأ بـ WE04.", en: "On the LV PTW, the “Reference no (933)” box takes the switching program number starting WE04.", fg: [4, 0.48, 0.74] },
     { ar: "رقم تصريح العمل هو الرقم المطبوع في زاوية التصريح (S.No)، وهو الرقم المعتمد.", en: "The permit number is the one printed in the form's corner (S.No); that is the official number.", fg: [4, 0.17, 0.46] },
     { ar: "الموقع: المدينة - الحي، ثم الدائرة، ثم الوحدة والمحطة والمغذي إن وجدت، ثم أمر العمل.", en: "Location: city – district, then department, then unit, station and feeder if any, then the work order.", fg: [1, 0.36, 0.6] },
     { ar: "وصف العمل واضح (مثل: إزالة شبكة هوائية، حفر وتمديد)، ونقاط العزل بأرقامها (مثل 22553 و22554).", en: "A clear description of work (e.g. remove an overhead network, dig and lay), and isolation points by number (e.g. 22553 and 22554).", fg: [1, 0.64, 0.82] },
     { ar: "في «تم وضع» وقائمة تأكيدات المستلم: ✓ لكل بند ينطبق، وN/A لما لا ينطبق. لا تُترك أي خانة فارغة.", en: "In “Has been put” and the Receiver's checklist: ✓ for each item that applies, N/A for what doesn't. Never leave a box blank.", fg: [2, 0.17, 0.43] },
     { ar: "مسؤول الجهة المعنية: ضع دائرة على الجهة (تشغيل/صيانة/إنشاءات/طوارئ/اختبارات/أخرى) واكتب اسم المسؤول.", en: "Concerned official: circle the party (operation/maintenance/construction/emergency/tests/other) and write the official's name.", fg: [2, 0.5, 0.8] },
     { ar: "إذا لم توجد نقاط عزل (مثل LOA بلا عزل): تُكتب N/A في نقاط العزل والأقفال والبطاقات وأرقام الأقفال.", en: "If there are no isolation points (e.g. an LOA with no isolation), write N/A for isolation points, locks, tags and lock numbers.", fg: [5, 0.08, 0.48] }
   ] }
];
const LEARN_4 = [
  ["ar", "rtl", "اختبار اللجنة الفعلي يُقدَّم باللغتين العربية والإنجليزية فقط."],
  ["en", "ltr", "The actual committee exam is offered in Arabic and English only."],
  ["ur", "rtl", "کمیٹی کا اصل امتحان صرف عربی اور انگریزی زبان میں ہوتا ہے۔"],
  ["hi", "ltr", "समिति की वास्तविक परीक्षा केवल अरबी और अंग्रेज़ी भाषा में होती है।"]
];
