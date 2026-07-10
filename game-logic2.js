/**
 * ============================================================
 *  game-logic2.js — 全职业 · 统一回合制游戏逻辑
 *  逻辑源自 game(2).js，题库源自 data-questions.js
 *  每职业3关(history/modern/cyberpunk)，每关出2题
 * ============================================================
 */

/* ============================================================
   第一部分：全职业题库（扩充版·契合上海高中教材/等级考）
   每时代≥12题，单局游戏每题不重复，知识点可复用
   评分参考上海高考等级考等第制比例
   ============================================================ */
var QUESTIONS = {};

// ==================== 👨‍🌾 农民（化学 + 政治）====================
QUESTIONS.farmer = {
  history: [
    // --- 已保留原有6题 ---
    { subject:'化学', text:'1950年《土地改革法》颁布，你分到几亩田。可庄稼叶片发黄、植株矮小，老农说缺肥。关于氮肥及其使用，下列说法正确的是？', choices:[{text:'尿素[CO(NH₂)₂]是常用氮肥，含氮量约46.7%',correct:true,knowledge:'化学·氮肥：尿素含氮量高达46.7%，在土壤中经脲酶作用水解为NH₄⁺被植物吸收。'},{text:'铵态氮肥可与草木灰混合施用以增强肥效',correct:false},{text:'取样加浓NaOH加热，用湿润红色石蕊试纸检验气体',correct:true,knowledge:'化学·离子检验：NH₄⁺+OH⁻→(加热)NH₃↑+H₂O，NH₃使红色石蕊试纸变蓝。'},{text:'氮肥施用越多越好，可大幅提高产量且无任何环境危害',correct:false}] },
    { subject:'化学', text:'土改分田后，你发现自家田因长期渍水呈强酸性（pH≈4.5），村里用生石灰改良。关于土壤酸碱调节，以下说法正确的是？', choices:[{text:'CaO+H₂O=Ca(OH)₂，OH⁻中和土壤中H⁺使pH升高',correct:true,knowledge:'化学·酸碱中和：CaO+H₂O=Ca(OH)₂，Ca(OH)₂+2H⁺=Ca²⁺+2H₂O。'},{text:'该土壤约需CaO 420 kg',correct:true},{text:'NaOH碱性比Ca(OH)₂更强，改良酸性土壤效果更好且更经济实惠',correct:false},{text:'酸性土壤也可施用石膏来调节，其原理与生石灰相同',correct:false}] },
    { subject:'政治', text:'1978年12月召开的党的（　），开启了改革开放和社会主义现代化建设新时期。', choices:[{text:'十一届三中全会',correct:true,knowledge:'政治·改革开放：十一届三中全会于1978年12月召开，确立了以经济建设为中心的基本路线。'},{text:'十二届三中全会',correct:false},{text:'十三届三中全会',correct:false},{text:'十四届三中全会',correct:false}] },
    { subject:'政治', text:'党的十一届三中全会后，（　）得以推行，乡镇企业迅速发展。', choices:[{text:'人民公社制度',correct:false},{text:'家庭联产承包责任制',correct:true,knowledge:'政治·农村改革：家庭联产承包责任制解放了农村生产力，是改革开放的重要突破口。'},{text:'农业合作化运动',correct:false},{text:'土地私有化改革',correct:false}] },
    { subject:'化学', type:'fill', text:'土壤改良中常用生石灰，生石灰的化学式是______。', answer:'CaO', answers:['CaO','氧化钙'], knowledge:'化学·中和反应：CaO+H₂O=Ca(OH)₂，Ca(OH)₂中和土壤酸性。' },
    { subject:'政治', type:'fill', text:'1978年12月召开的党的______，开启了改革开放新时期。', answer:'十一届三中全会', answers:['十一届三中全会','中共十一届三中全会'], knowledge:'政治·改革开放：十一届三中全会是新中国成立以来党的历史上具有深远意义的伟大转折。' },
    // --- 新增化学题 ---
    { subject:'化学', text:'土改后你开始用草木灰（主要成分K₂CO₃）作钾肥。K₂CO₃溶于水后溶液呈碱性，原因是？', choices:[{text:'CO₃²⁻水解产生OH⁻使溶液呈碱性',correct:true,knowledge:'化学·盐类水解（沪教版·电解质溶液）：强碱弱酸盐中弱酸根离子水解产生OH⁻。'},{text:'K⁺与水反应生成KOH',correct:false},{text:'K₂CO₃直接释放出OH⁻',correct:false},{text:'空气中的CO₂溶解入水生成碳酸',correct:false}] },
    { subject:'化学', text:'村里用铁锅熬制土盐（NaCl），但盐中混有MgCl₂和CaCl₂导致容易潮解。如何用化学方法初步检验Mg²⁺？', choices:[{text:'加入NaOH溶液，产生白色沉淀',correct:true,knowledge:'化学·离子检验（沪教版）：Mg²⁺遇OH⁻产生白色沉淀，此沉淀不溶于过量NaOH。'},{text:'加入AgNO₃溶液看是否产生沉淀',correct:false},{text:'点燃后观察焰色反应',correct:false},{text:'加热至高温观察分解产物',correct:false}] },
    { subject:'化学', text:'农忙时节，你发现铁质农具极易生锈（Fe₂O₃·xH₂O）。关于铁的腐蚀与防护，以下说法正确的是？', choices:[{text:'铁生锈本质上是铁发生电化学腐蚀，Fe作负极发生氧化：Fe-2e⁻→Fe²⁺',correct:true,knowledge:'化学·电化学腐蚀（沪教版·氧化还原）：铁在中性/弱酸性溶液中发生吸氧腐蚀，Fe作负极被氧化。'},{text:'在铁表面镀锌利用了牺牲阳极的阴极保护法，但原理不同',correct:false},{text:'铁生锈属于化学腐蚀，与电化学无关',correct:false},{text:'防止铁生锈的最佳方法是定期用水冲洗表面',correct:false}] },
    { subject:'化学', type:'fill', text:'草木灰的主要成分K₂CO₃属于______（填"正盐""酸式盐"或"碱式盐"）。', answer:'正盐', answers:['正盐'], knowledge:'化学·盐的分类（沪教版）：K₂CO₃由强碱KOH和弱酸H₂CO₃生成的盐，属于正盐，水溶液呈碱性。' },
    // --- 新增政治题 ---
    { subject:'政治', text:'1950年《土地改革法》颁布，废除封建地主土地所有制，实行农民土地所有制。从经济学角度看，这一变革的核心意义是？', choices:[{text:'解放了农村生产力，调动了农民生产积极性',correct:true,knowledge:'政治·经济常识（沪教版）：生产关系适应生产力发展的规律。土地改革改变了生产资料所有制形式。'},{text:'建立了社会主义公有制',correct:false},{text:'实现了农业的机械化现代化',correct:false},{text:'确立了市场经济体制',correct:false}] },
    { subject:'政治', text:'1956年三大改造基本完成后，我国确立了社会主义基本制度。这一变革遵循了唯物辩证法的什么原理？', choices:[{text:'生产关系一定要适合生产力状况的规律',correct:true,knowledge:'政治·哲学（沪教版·唯物史观）：生产力决定生产关系，生产关系反作用于生产力。三大改造是我国社会生产关系的一次伟大变革。'},{text:'否定之否定规律',correct:false},{text:'对立统一规律',correct:false},{text:'量变质变规律',correct:false}] },
    // --- 新增多选 ---
    { subject:'政治', qType:'不定项', text:'【不定项】1950年《土地改革法》颁布后，农村社会发生了深刻变化。以下关于土地改革意义的说法正确的有？', choices:[{text:'废除了两千多年的封建地主土地所有制，农民成为土地的主人',correct:true,knowledge:'政治·经济（沪教版）：土地改革是民主革命遗留任务，彻底消灭了封建剥削制度。'},{text:'解放和发展了农村生产力，为农业合作化运动奠定了社会基础',correct:true,knowledge:'政治·社会发展：生产关系适应生产力——土地改革将生产关系的变革与生产力发展有机结合。'},{text:'立即在全国范围内建立了社会主义公有制',correct:false},{text:'标志着中国全面进入社会主义市场经济阶段',correct:false}] }
  ],
  modern: [
    // --- 已保留原有6题 ---
    { subject:'化学', text:'改革开放后家庭联产承包，你自主决定用肥。关于复合肥料及其配比，以下哪个说法正确？', choices:[{text:'复合肥料是指同时含有N、P、K三种营养元素中两种或以上的化学肥料，如磷酸二氢铵(NH₄H₂PO₄)',correct:true,knowledge:'化学·复合肥：复合肥料含两种或以上营养元素，标注N-P₂O₅-K₂O的百分含量。'},{text:'某种复合肥标注15-15-15，表示N:P₂O₅:K₂O质量分数各15%',correct:true},{text:'KNO₃同时含K和N两种营养元素，是一种复合肥料',correct:true},{text:'磷酸钙[Ca₃(PO₄)₂]含P和Ca，也属于复合肥料',correct:false}] },
    { subject:'化学', text:'你买了NH₄HCO₃（碳铵）做追肥，也想撒些草木灰（K₂CO₃）补钾。农技员提醒不能混用。下列说法正确的是？', choices:[{text:'反应本质是NH₄⁺与草木灰水解产生的OH⁻反应放出NH₃，导致氮肥失效',correct:true,knowledge:'化学·铵盐性质：NH₄⁺+OH⁻=NH₃↑+H₂O，铵态氮肥不能与碱性物质混用。'},{text:'除K₂CO₃外，Ca(OH)₂、CaO等碱性物质同样不能与铵态氮肥混用，原理相同',correct:true},{text:'NH₄HCO₃与K₂CO₃混合时发生反应：2NH₄HCO₃+K₂CO₃→2NH₃↑+2CO₂↑+2H₂O+K₂CO₃',correct:false},{text:'若将100g NH₄HCO₃与足量K₂CO₃混合加热，标准状况下最多损失约28.4L NH₃',correct:true}] },
    { subject:'政治', text:'1992年邓小平南方谈话和党的十四大明确，我国经济体制改革的目标是建立（　）。', choices:[{text:'计划经济体制',correct:false},{text:'有计划的商品经济体制',correct:false},{text:'社会主义市场经济体制',correct:true,knowledge:'政治·经济体制：十四大确立了社会主义市场经济体制的改革目标，是改革开放的重大突破。'},{text:'自由市场经济体制',correct:false}] },
    { subject:'政治', text:'《春天的故事》唱道："一九九二年，又是一个春天，有一位老人在中国的南海边写下诗篇。"这里的"诗篇"指的就是（　）。', choices:[{text:'设立经济特区',correct:false},{text:'提出"一国两制"方针',correct:false},{text:'南方谈话和党的十四大明确建立社会主义市场经济体制',correct:true},{text:'提出科学发展观',correct:false}] },
    { subject:'化学', type:'fill', text:'大棚增施CO₂气肥时，NH₄HCO₃与稀H₂SO₄反应，化学方程式为______。', answer:'2NH₄HCO₃+H₂SO₄=(NH₄)₂SO₄+2CO₂↑+2H₂O', answers:['2NH₄HCO₃+H₂SO₄=(NH₄)₂SO₄+2CO₂+2H₂O','2NH4HCO3+H2SO4=(NH4)2SO4+2CO2+2H2O'], knowledge:'化学·气肥制备：NH₄HCO₃与H₂SO₄反应生成CO₂提高光合作用效率，副产物(NH₄)₂SO₄为优质氮肥。' },
    { subject:'政治', type:'fill', text:'我国社会主要矛盾已经转化为人民日益增长的美好生活需要和______的发展之间的矛盾。', answer:'不平衡不充分', answers:['不平衡不充分','不平衡'], knowledge:'政治·新时代：党的十九大报告提出社会主要矛盾的转化。' },
    // --- 新增化学题 ---
    { subject:'化学', text:'现代农业推广测土配方施肥。取浸出液测定pH，以下关于溶液pH计算正确的是？（lg2≈0.3）', choices:[{text:'pH=2的盐酸稀释10倍后，pH=3',correct:true,knowledge:'化学·pH计算（沪教版·电解质溶液）：强酸每稀释10倍pH增大1个单位。'},{text:'pH=3和pH=5的盐酸等体积混合后pH=4',correct:false},{text:'pH=12的NaOH溶液中的H⁺浓度为0.01mol/L',correct:false},{text:'纯水的pH在任何温度下都等于7',correct:false}] },
    { subject:'化学', text:'你发现施用过磷酸钙[Ca(H₂PO₄)₂·CaSO₄]的田地附近池塘出现藻类大量繁殖（水华）。从化学角度分析原因？', choices:[{text:'磷是植物生长的必需元素，过量磷流入水体造成富营养化',correct:true,knowledge:'化学·环境化学（沪教版）：含磷废水排入水体 → N、P元素过剩 → 藻类爆发 → 溶解氧下降 → 水生生物死亡。'},{text:'Ca²⁺促进了藻类生长',correct:false},{text:'SO₄²⁻被还原为有毒的H₂S',correct:false},{text:'过磷酸钙改变了水的pH使藻类繁殖',correct:false}] },
    { subject:'化学', text:'为检测某化肥中NH₄⁺含量，取样加过量浓NaOH溶液加热，产生的气体用标准H₂SO₄溶液吸收。涉及的反应类型是？', choices:[{text:'涉及复分解反应和化合反应',correct:true,knowledge:'化学·反应类型（沪教版）：四个基本反应类型——化合、分解、置换、复分解。酸碱中和反应属于复分解反应。'},{text:'整个过程中只涉及中和反应',correct:false},{text:'NH₃的吸收属于氧化还原反应',correct:false},{text:'加热NH₄Cl和NaOH涉及分解反应',correct:false}] },
    { subject:'化学', type:'fill', text:'配制一定物质的量浓度的溶液时，必须使用______（填仪器名称）来定容。', answer:'容量瓶', answers:['容量瓶'], knowledge:'化学·实验（沪教版）：配制一定物质的量浓度的溶液需用容量瓶定容，配前需查漏。' },
    // --- 新增政治题 ---
    { subject:'政治', text:'2013年党的十八届三中全会提出"使市场在资源配置中起决定性作用"。这体现了什么经济学原理？', choices:[{text:'市场通过价格、供求、竞争机制实现资源优化配置',correct:true,knowledge:'政治·经济（沪教版·社会主义市场经济）：市场决定资源配置是市场经济的一般规律，同时需要科学的宏观调控弥补市场失灵。'},{text:'政府不再干预经济',correct:false},{text:'所有领域都由市场自行调节',correct:false},{text:'回到完全的计划经济体制',correct:false}] },
    { subject:'政治', text:'2020年我国脱贫攻坚战取得全面胜利。从唯物辩证法角度看，精准扶贫"精准"二字体现了什么哲学原理？', choices:[{text:'具体问题具体分析',correct:true,knowledge:'政治·哲学（沪教版·矛盾特殊性）：矛盾的特殊性原理要求我们具体问题具体分析，一把钥匙开一把锁。'},{text:'主要矛盾决定次要矛盾',correct:false},{text:'量变必然引起质变',correct:false},{text:'内因决定外因',correct:false}] },
    { subject:'政治', type:'fill', text:'社会主义市场经济条件下，资源配置中起决定性作用的是______。', answer:'市场', answers:['市场','市场机制'], knowledge:'政治·经济体制（沪教版）：十八届三中全会提出使市场在资源配置中起决定性作用和更好发挥政府作用。' },
    // --- 新增多选 ---
    { subject:'化学', multi:true, text:'【多选】你发现连年施用单一化肥后土壤出现板结。以下关于化肥使用与土壤保护的说法正确的有？', choices:[{text:'过量施用化肥会导致土壤酸化、板结',correct:true,knowledge:'化学·环境化学：过量施用化肥破坏土壤结构，降低土壤缓冲能力，导致土壤退化。'},{text:'测土配方施肥可减少浪费和污染',correct:true,knowledge:'化学·农业化学：测土配方施肥是精准农业的核心环节，兼顾产量和环保。'},{text:'化肥施用量越大作物产量越高，不存在产量上限',correct:false},{text:'有机肥可以完全替代化肥，两者作用与效果完全相同',correct:false}] }
  ],
  cyberpunk: [
    // --- 已保留原有6题 ---
    { subject:'化学', text:'1990年代科技兴农，村里建了蔬菜大棚。为增产需增施CO₂气肥，用稀H₂SO₄与NH₄HCO₃反应制备。下列说法正确的是？', choices:[{text:'2NH₄HCO₃+H₂SO₄→(NH₄)₂SO₄+2CO₂↑+2H₂O',correct:true,knowledge:'化学·气肥：一举两得——既产生CO₂促进光合作用，又得到硫酸铵作氮肥。'},{text:'用500g NH₄HCO₃与足量稀硫酸反应，标况下可产生约142L CO₂气体',correct:true},{text:'CaCO₃+2HCl=CaCl₂+CO₂↑+H₂O',correct:true},{text:'CO₂浓度越高光合作用越强，因此大棚CO₂气肥浓度越高越好，无需控制',correct:false}] },
    { subject:'化学', text:'在不同年代，你始终面临施肥问题。关于作物缺素症状与对应肥料，下列匹配和分析正确的是？', choices:[{text:'叶片发黄、老叶先黄、植株矮小→缺氮，应追施尿素或碳铵',correct:true,knowledge:'化学·植物营养：N促叶片生长，是叶绿素和蛋白质的组成元素。缺氮时老叶先黄是因为氮可从老叶转运到新叶。'},{text:'茎秆细弱易倒伏、老叶边缘焦枯→缺钾，应追施KCl或K₂SO₄',correct:true},{text:'果实小而少、成熟延迟、叶片暗绿带紫红色→缺磷，应追施过磷酸钙',correct:true},{text:'叶片出现褐色斑点、植株顶端枯死→应追施Ca(OH)₂补充钙元素',correct:false}] },
    { subject:'政治', text:'【多选】在当代中国，坚持和发展习近平新时代中国特色社会主义思想，就是真正坚持和发展马克思主义。这是因为（　）', multi:true, choices:[{text:'是当代中国马克思主义、二十一世纪马克思主义',correct:true},{text:'是中华文化和中国精神的时代精华',correct:true},{text:'是中国特色社会主义理论体系的重要组成部分',correct:true},{text:'是全党全国人民为实现中华民族伟大复兴而奋斗的物质保障',correct:false}] },
    { subject:'政治', text:'实现中国梦必须走中国道路、弘扬中国精神、凝聚中国（　）。', choices:[{text:'力量',correct:true,knowledge:'政治·中国梦：实现中华民族伟大复兴，必须走中国特色社会主义道路，弘扬以爱国主义为核心的民族精神，凝聚全国各族人民大团结的力量。'},{text:'智慧',correct:false},{text:'共识',correct:false},{text:'人心',correct:false}] },
    { subject:'化学', type:'fill', text:'赛博朋克时代，垂直农场的营养液中需添加三种大量元素，它们是N、P、______。', answer:'K', answers:['K','钾','钾肥'], knowledge:'化学·植物营养：植物需要大量元素N（氮）、P（磷）、K（钾），N促叶、P促果、K促根。' },
    { subject:'政治', type:'fill', text:'实现中国梦必须走中国道路、弘扬中国精神、凝聚中国______。', answer:'力量', answers:['力量','人民力量','群众力量'], knowledge:'政治·中国梦：实现中华民族伟大复兴的中国梦，必须凝聚全国各族人民大团结的力量。' },
    // --- 新增化学题 ---
    { subject:'化学', text:'垂直农业使用营养液栽培，需精确控制Zn²⁺、Cu²⁺等微量元素浓度。当两种离子共存且浓度相近时，如何分离？', choices:[{text:'调节pH使Zn²⁺和Cu²⁺分步沉淀分离',correct:true,knowledge:'化学·沉淀溶解平衡（沪教版·等级考）：不同金属离子开始沉淀和完全沉淀的pH不同，可通过控制pH实现分离。'},{text:'加入过量NH₃·H₂O使两者都生成配离子',correct:false},{text:'加热蒸发使溶质析出',correct:false},{text:'两者无法用沉淀法分离',correct:false}] },
    { subject:'化学', text:'未来农业使用有机合成技术生产生物降解地膜（聚乳酸PLA）。关于PLA的说法正确的是？', choices:[{text:'PLA由乳酸[CH₃CH(OH)COOH]通过缩聚反应制得',correct:true,knowledge:'化学·有机高分子（沪教版·有机化学）：缩聚反应即单体通过官能团缩合生成高聚物同时脱去小分子。PLA的酯基可水解。'},{text:'PLA属于加聚产物',correct:false},{text:'PLA在自然界中不能被降解',correct:false},{text:'PLA由乙烯聚合而成',correct:false}] },
    { subject:'化学', text:'基因编辑作物（GMO）的检测中用到PCR技术，需要Taq DNA聚合酶在高温下催化DNA合成。下列关于催化剂和反应速率的描述正确的是？', choices:[{text:'酶作为生物催化剂，通过降低活化能加快反应速率',correct:true,knowledge:'化学·化学反应速率（沪教版）：催化剂通过改变反应路径降低活化能，Ea↓ → 有效碰撞比例↑ → v↑。自身不参与净反应。'},{text:'酶通过提高反应的ΔH使速率增加',correct:false},{text:'酶在反应后质量减少',correct:false},{text:'温度越低酶催化效率越高',correct:false}] },
    { subject:'化学', type:'fill', text:'聚乳酸（PLA）的合成反应类型是______反应（填"加聚"或"缩聚"）。', answer:'缩聚', answers:['缩聚','缩合聚合'], knowledge:'化学·有机化学（沪教版）：缩聚反应由两种或以上官能团的单体缩合脱去小分子形成高聚物。' },
    // --- 新增政治题 ---
    { subject:'政治', text:'【多选】在碳达峰碳中和背景下，"绿水青山就是金山银山"理念体现的哲理有（　）', multi:true, choices:[{text:'人与自然和谐共生',correct:true,knowledge:'政治·哲学（沪教版·唯物论）：自然规律是客观的，不以人的意志为转移，人必须按客观规律办事。'},{text:'保护生态环境就是保护生产力',correct:true,knowledge:'政治·哲学（沪教版·矛盾观）：绿水青山（保护）与金山银山（发展）从表面对立走向内在统一。'},{text:'经济价值可以完全脱离自然规律创造',correct:false},{text:'人的主观能动性可以超越一切自然规律',correct:false}] },
    { subject:'政治', text:'在数字化农业时代，数据成为新的生产要素。从经济学角度来看，数据作为生产要素的特点是？', choices:[{text:'数据可以无限复制、边际成本几乎为零，且使用不会产生排他性损耗',correct:true,knowledge:'政治·经济（沪教版·新发展理念）：数据要素具有非竞争性、可复制性等特征，是数字经济时代的关键生产要素。'},{text:'数据的价值只体现在其存储成本上',correct:false},{text:'数据作为生产要素不需要任何制度保护',correct:false},{text:'所有数据都具有同等的经济价值',correct:false}] },
    { subject:'政治', type:'fill', text:'新发展理念包括创新、协调、绿色、______、共享五个方面。', answer:'开放', answers:['开放'], knowledge:'政治·新发展理念（沪教版）：党的十八届五中全会提出创新、协调、绿色、开放、共享五大发展理念。' },
    // --- 新增多选 ---
    { subject:'化学', multi:true, text:'【多选】赛博农场引入AI精准灌溉系统后，需评估水质对作物影响。以下关于水化学性质的说法正确的有？', choices:[{text:'水的硬度由Ca²⁺和Mg²⁺含量决定',correct:true,knowledge:'化学·水质分析：水的硬度分为暂时硬度（碳酸氢盐）和永久硬度（硫酸盐/氯化物）。'},{text:'灌溉水的pH会影响土壤养分有效性和微生物活性',correct:true,knowledge:'化学·溶液pH：pH影响土壤中矿物质元素的存在形态和植物根系吸收效率。'},{text:'所有地下水都是纯净的水，不含任何矿物质',correct:false},{text:'水中的溶解氧含量与灌溉水质完全无关',correct:false}] }
  ]
};

// ==================== 📰 记者（语文 + 英语）====================
QUESTIONS.journalist = {
  history: [
    { subject:'语文', text:'1950年代《人民日报》发表了一篇关于农村合作社的通讯稿。这篇稿件最可能采用的文体是？', choices:[{text:'消息',correct:true,knowledge:'语文·新闻文体：消息是最基本的新闻体裁，一般采用"倒金字塔"结构，最重要的信息放在最前面。'},{text:'散文',correct:false},{text:'小说',correct:false},{text:'诗歌',correct:false}] },
    { subject:'语文', text:'1956年国务院发布《汉字简化方案》。以下关于汉字简化的说法正确的是？', choices:[{text:'简化原则包括"述而不作"',correct:true,knowledge:'语文·汉字简化：简化字主要来源于历代书法家的简写和民间俗字。"述而不作"就是不凭空造字。'},{text:'简化后所有汉字的笔画数都不超过10画',correct:false},{text:'简化字与繁体字之间是一一对应的关系',correct:false},{text:'《简化字总表》共简化了5000多个汉字',correct:false}] },
    { subject:'英语', text:'改革开放初期，你作为一名记者被派往国外采访。对方说"This is a long shot." 这句话最可能的意思是？', choices:[{text:'这是一次成功可能性不大的尝试',correct:true,knowledge:'英语·习惯用语："a long shot"源自射击术语，指打中远距离目标的可能性很小。'},{text:'这是一次长途旅行',correct:false},{text:'这是一次长时间的拍摄',correct:false},{text:'这是一次漫长的射击',correct:false}] },
    { subject:'英语', text:'你在一篇关于中国经济发展的英文报道中写道："The reform and opening-up policy ________ tremendous changes to China." 最合适的动词是？', choices:[{text:'brought about',correct:true,knowledge:'英语·动词搭配："bring about"意为"带来、引起（变化）"，是正式新闻报道中常用的短语动词。'},{text:'brought up',correct:false},{text:'brought in',correct:false},{text:'brought out',correct:false}] },
    { subject:'语文', type:'fill', text:'1950年代新闻报道中常用"雄赳赳，气昂昂，跨过______"来形容志愿军出征。', answer:'鸭绿江', answers:['鸭绿江'], knowledge:'语文·名句填空：出自《中国人民志愿军战歌》。' },
    { subject:'英语', type:'fill', text:'The reform and opening-up policy has brought great ______ (变化) to China.', answer:'changes', answers:['changes','change'], knowledge:'英语·词汇："change"可数时表示"具体的变化"。' },
    // --- 新增语文题 ---
    { subject:'语文', text:'你采访了一位经历过长征的老红军，需要在报道中引用毛泽东《七律·长征》的名句。以下哪句出自该诗？', choices:[{text:'"红军不怕远征难，万水千山只等闲"',correct:true,knowledge:'语文·诗歌鉴赏（沪教版·必修）：毛泽东《七律·长征》是高一必修篇目，颔联"五岭逶迤腾细浪，乌蒙磅礴走泥丸"运用夸张和比喻。'},{text:'"钟山风雨起苍黄，百万雄师过大江"',correct:false},{text:'"雄关漫道真如铁，而今迈步从头越"',correct:false},{text:'"天若有情天亦老，人间正道是沧桑"',correct:false}] },
    { subject:'语文', text:'你在整理一份老报纸，发现一篇社论中用了成语"差强人意"。这个成语的意思是？', choices:[{text:'大体上还能使人满意',correct:true,knowledge:'语文·成语（沪教版·语言运用）：差强人意出自《后汉书》，"差"意为"稍微、大致"，常被误解为"令人不满意"。'},{text:'完全不能令人满意',correct:false},{text:'比别人差很多',correct:false},{text:'强迫别人接受',correct:false}] },
    { subject:'语文', text:'报道中引用鲁迅名言："横眉冷对千夫指，俯首甘为孺子牛。"这句运用了什么修辞手法？', choices:[{text:'对偶',correct:true,knowledge:'语文·修辞（沪教版）：对偶是用字数相等、结构相同、意义对称的一对句子来表达两个相对或相近的意思。鲁迅此联堪称对偶典范。'},{text:'排比',correct:false},{text:'反复',correct:false},{text:'设问',correct:false}] },
    { subject:'语文', type:'fill', text:'新闻写作的"倒金字塔"结构中，最______的信息放在最前面。', answer:'重要', answers:['重要','关键','核心'], knowledge:'语文·新闻写作（沪教版）：倒金字塔结构按重要性递减排列，最重要的信息置于导语中。' },
    // --- 新增英语题 ---
    { subject:'英语', text:'1950年代，你第一次读到《China Daily》的国际新闻。其中一句："The Korean War armistice was signed in 1953, ________ a ceasefire between the two sides." 应填入什么？', choices:[{text:'bringing about',correct:true,knowledge:'英语·非谓语动词（上海高考·语法填空）：现在分词作结果状语表示必然或自然的结果，不定式表示意外的结果。'},{text:'brought about',correct:false},{text:'to bring about',correct:false},{text:'having brought about',correct:false}] },
    { subject:'英语', text:'外媒报道用了一个词："groundbreaking"。在"a groundbreaking discovery"中，这个词的意思是？', choices:[{text:'开创性的、突破性的',correct:true,knowledge:'英语·词汇（上海高考·核心词汇）：groundbreaking = innovative/pioneering，常用于描述重大发现或创新。'},{text:'打地基的',correct:false},{text:'破坏地面的',correct:false},{text:'地面下沉的',correct:false}] },
    // --- 新增多选 ---
    { subject:'语文', multi:true, text:'【多选】1950年代你写一篇关于新中国成立的新闻综述。以下关于新闻写作要素的说法正确的有？', choices:[{text:'新闻六要素"5W1H"',correct:true,knowledge:'语文·新闻写作：5W1H是新闻写作的基本框架，确保信息完整准确。'},{text:'消息采用"倒金字塔"结构，将最重要的信息放在导语中',correct:true,knowledge:'语文·新闻写作：倒金字塔结构是消息最常用的结构，导语浓缩了新闻的核心信息。'},{text:'新闻通讯稿可以完全虚构人物和情节来增强可读性',correct:false},{text:'新闻报道的标题越长越好，需要包含全部细节',correct:false}] }
  ],
  modern: [
    { subject:'语文', text:'你运营一个新闻公众号，需要写一篇吸引眼球的标题。以下哪个标题最符合新闻标题的原则？', choices:[{text:'标题准确概括核心事实，同时有一定吸引力',correct:true,knowledge:'语文·新闻标题：好标题要"准确、鲜明、简洁、生动"，不能违背真实性原则做"标题党"。'},{text:'标题越长越好，包含所有细节',correct:false},{text:'标题越夸张越好，只要吸引点击就行',correct:false},{text:'标题全部使用网络热词和表情符号',correct:false}] },
    { subject:'语文', text:'你在撰写深度报道时引用了某专家的原话。以下哪种引用方式最符合新闻规范？', choices:[{text:'直接引语使用引号，准确记录原话，注明专家姓名和职务',correct:true,knowledge:'语文·新闻引用：直接引语必须用引号标注，一字不差；间接引语要忠实原意。'},{text:'将专家的话改为自己的语言，不加引号显得更流畅',correct:false},{text:'只写"专家表示"，不署名保护隐私',correct:false},{text:'根据需要修改专家原话，使其更有冲击力',correct:false}] },
    { subject:'英语', text:'你采访一位外国CEO，他说："We need to think outside the box." 这句话的意思是？', choices:[{text:'需要跳出常规思维，创新思考',correct:true,knowledge:'英语·习语："think outside the box"源于九点谜题，引申为打破常规、创新思维。'},{text:'需要到办公室外面去思考',correct:false},{text:'需要检查箱子外面的物品',correct:false},{text:'需要重新整理办公空间',correct:false}] },
    { subject:'英语', text:'你的英文报道中有一句："The pandemic has ________ the way we work." 表示"深刻改变了"使用哪个词最恰当？', choices:[{text:'transformed',correct:true,knowledge:'英语·近义词辨析："transform"强调本质上的彻底改变。'},{text:'changed',correct:false},{text:'altered',correct:false},{text:'varied',correct:false}] },
    { subject:'语文', type:'fill', text:'新媒体环境中，一种以"短小精悍、信息密集、快速传播"为特征的文体被称为"______体"。', answer:'微', answers:['微','短'], knowledge:'语文·新媒体：微博、微信等平台的流行催生了"微文体"。' },
    { subject:'英语', type:'fill', text:'With the rise of social media, the way we ______ (消费) news has changed dramatically.', answer:'consume', knowledge:'英语·词汇：consume news 是"消费/获取新闻"的地道搭配。' },
    // --- 新增语文题 ---
    { subject:'语文', text:'你的深度报道需要引用《论语》名句增强说服力。以下关于《论语》和孔子的说法正确的是？', choices:[{text:'《论语》是记录孔子及其弟子言行的语录体散文集',correct:true,knowledge:'语文·文学常识（沪教版·必修）：《论语》是儒家经典，共20篇。孔子名丘字仲尼，春秋末期鲁国人，儒家学派创始人。'},{text:'《论语》全部由孔子本人亲笔撰写',correct:false},{text:'《论语》属于编年体史书',correct:false},{text:'《论语》共50篇',correct:false}] },
    { subject:'语文', text:'编辑发现一段文字有语病："通过这次采访活动，使我对基层工作有了更深的了解。"以下修改正确的是？', choices:[{text:'删除"通过"或"使"',correct:true,knowledge:'语文·病句修改（沪教版·语言运用）：滥用介词（通过/随着/由于..."使..."）是高考常见病句类型，导致主语残缺。'},{text:'把"了解"改为"理解"',correct:false},{text:'在句首加"我"',correct:false},{text:'删除"更深的"',correct:false}] },
    { subject:'语文', text:'你报道传统文化传承，引用了古诗词。以下哪句诗的作者与朝代匹配正确？', choices:[{text:'"人生自古谁无死，留取丹心照汗青"',correct:true,knowledge:'语文·古诗文（沪教版）：文天祥《过零丁洋》，南宋末年民族英雄，兵败被俘后英勇就义。'},{text:'"长风破浪会有时，直挂云帆济沧海"',correct:false},{text:'"落霞与孤鹜齐飞，秋水共长天一色"',correct:false},{text:'"但愿人长久，千里共婵娟"',correct:false}] },
    { subject:'语文', type:'fill', text:'议论文写作中，论证方法包括举例论证、道理论证、______论证和比喻论证。', answer:'对比', answers:['对比','正反对比'], knowledge:'语文·写作（沪教版）：上海高考作文评分标准：审题立意25%、内容结构25%、语言表达25%、书写卷面25%。论证方法包括举例、道理、对比、比喻。' },
    // --- 新增英语题 ---
    { subject:'英语', text:'英文报道中的一句话："Had it not been for the timely intervention, the situation ________ much worse." 此处应填什么？', choices:[{text:'would have been',correct:true,knowledge:'英语·虚拟语气（上海高考·重点语法）：Had it not been for... = If it had not been for...（省略if的倒装虚拟条件句）。'},{text:'will be',correct:false},{text:'had been',correct:false},{text:'is',correct:false}] },
    { subject:'英语', text:'一篇经济报道标题："China\'s GDP ________ by 6.5% in the first quarter." 最合适的动词是？', choices:[{text:'grew',correct:true,knowledge:'英语·词汇辨析（上海高考）：grow为不及物动词，increase可作及物/不及物。by+百分比表示变化幅度。'},{text:'increased by 6.5% was',correct:false},{text:'was growing in',correct:false},{text:'had been increased for',correct:false}] },
    // --- 新增多选 ---
    { subject:'英语', multi:true, text:'【多选】你在撰写英文深度报道时，需要准确使用各种时态。以下关于英语时态用法的描述正确的有？', choices:[{text:'现在完成时(have/has done)强调过去动作对现在的影响',correct:true,knowledge:'英语·时态（上海高考）：现在完成时表示过去发生的动作对现在仍有影响或结果。'},{text:'过去进行时(was/were doing)表示过去某个时间点正在发生的动作',correct:true,knowledge:'英语·时态（上海高考）：过去进行时为背景事件提供时间框架，常与一般过去时搭配使用。'},{text:'将来完成时(will have done)表示到将来某时已经完成的动作',correct:false},{text:'过去完成时(had done)只能用于"过去的过去"，不能独立使用',correct:false}] }
  ],
  cyberpunk: [
    { subject:'语文', text:'在脑机接口普及的时代，新闻可以直接通过神经信号传递。此时"新闻写作"最可能变成什么形式？', choices:[{text:'记者仍需要文字素养',correct:true,knowledge:'语文·未来写作：逻辑思维、语言组织、事实核查等核心写作素养在技术变革中仍然不可替代。'},{text:'不再需要文字，人类已经不需要语言交流了',correct:false},{text:'AI完全代替记者',correct:false},{text:'所有人都能直接读取他人思想',correct:false}] },
    { subject:'语文', text:'在"后真相"时代，AI生成的虚假新闻传播速度是真实新闻的10倍。作为记者，核验信息最根本的原则应该是？', choices:[{text:'追溯信源',correct:true,knowledge:'语文·新闻核实：在AI伪造信息泛滥的时代，信源追溯和交叉验证比以往任何时候都重要。'},{text:'相信官方发布',correct:false},{text:'转发量高的新闻就是真实的',correct:false},{text:'第一印象觉得可信就是真的',correct:false}] },
    { subject:'英语', text:'在2080年，全球通用翻译器已经普及。以下关于未来英语的描述，最可能的是？', choices:[{text:'英语仍然作为科技和学术的底层语言存在',correct:true,knowledge:'英语·语言未来：语言学家预测，作为文化载体的自然语言不会消失，英语作为全球通用语地位短期内难以被完全替代。'},{text:'所有语言都被翻译器取代',correct:false},{text:'英语已经完全消失',correct:false},{text:'机器语言成为人类主要交流方式',correct:false}] },
    { subject:'英语', text:'你的脑机接口收到一条信息："The truth is out there, but you need to read between the lines." "read between the lines"的意思是？', choices:[{text:'领会言外之意，看出字里行间隐藏的含义',correct:true,knowledge:'英语·习语："read between the lines"指从表面话语中推断出真实含义。'},{text:'在行与行之间阅读文字',correct:false},{text:'读取被删除的文字',correct:false},{text:'用机器扫描快速阅读',correct:false}] },
    // --- 新增语文题 ---
    { subject:'语文', text:'在信息碎片化时代，"深度阅读"能力变得珍贵。以下关于阅读方法的说法，最符合《如何阅读一本书》的是？', choices:[{text:'分析阅读',correct:true,knowledge:'语文·阅读方法（沪教版）：基础阅读→检视阅读→分析阅读→主题阅读四个层次。上海高考现代文阅读侧重分析性阅读。'},{text:'快速浏览每个段落的最后一句即可',correct:false},{text:'只看标题和图片就够了',correct:false},{text:'只看别人写的书评就能理解原作',correct:false}] },
    { subject:'语文', text:'审查AI生成的稿件时发现一句："这个项目取得了空前的成绩，以前从来没有过，以后也不会再有。"这句话的问题在于？', choices:[{text:'绝对化表述',correct:true,knowledge:'语文·表达准确（沪教版）：上海高考写作要求观点明确但不过于绝对，避免武断表达，常用"一定程度上""在某种条件下"等限定语。'},{text:'引用了不恰当的典故',correct:false},{text:'使用了过多的修辞手法',correct:false},{text:'句子太短不完整',correct:false}] },
    { subject:'语文', text:'你采访获得"诺贝尔文学奖"的AI作家。颁奖词说其作品"以诗意的语言展现了人类与技术的共生关系"。如果我们把AI比作"造物"，人类比作"诗人"，下面最能体现"诗人和造物的共生"这一主题的古典诗句是？', choices:[{text:'"文章本天成，妙手偶得之"',correct:true,knowledge:'语文·文化思辨（沪教版）：上海高考作文注重思辨性，常设情境让考生在传统文化与现代科技之间建立联系。'},{text:'"纸上得来终觉浅，绝知此事要躬行"',correct:false},{text:'"问渠那得清如许，为有源头活水来"',correct:false},{text:'"不畏浮云遮望眼，自缘身在最高层"',correct:false}] },
    { subject:'语文', type:'fill', text:'上海高考作文评分标准中，______类卷（63~70分）的要求是"能准确把握题意，立意深刻，选材恰当，中心突出"。', answer:'一', answers:['一','1','第一'], knowledge:'语文·写作评价（沪教版）：上海高考作文70分，一类卷63~70分，二类卷52~62分，三类卷39~51分，四类卷21~38分，五类卷0~20分。' },
    // --- 新增英语题 ---
    { subject:'英语', text:'在未来的传媒时代，一篇学术AI生成的文章中："The algorithm, ________ by vast datasets, can now generate human-like narratives." 填入什么？', choices:[{text:'fueled',correct:true,knowledge:'英语·非谓语动词（上海高考）：过去分词作定语表被动/完成。fueled by = powered by。'},{text:'fueling',correct:false},{text:'to fuel',correct:false},{text:'having fueled',correct:false}] },
    { subject:'英语', text:'全球AI伦理会议上，一位专家说："We are standing at a crossroads ________ the path we choose will determine the future of humanity." 应填什么连词？', choices:[{text:'where',correct:true,knowledge:'英语·定语从句（上海高考）：当先行词为point、stage、case、situation、crossroads等表"抽象地点"的名词时，用where引导定语从句。'},{text:'which',correct:false},{text:'that',correct:false},{text:'when',correct:false}] },
    // --- 新增多选 ---
    { subject:'语文', multi:true, text:'【多选】在AI辅助新闻生产的时代，你作为主编需要制定编辑准则。以下原则中合理的有？', choices:[{text:'AI生成的稿件必须经过人类记者的事实核查和伦理审查才能发布',correct:true,knowledge:'语文·新闻伦理：AI辅助新闻生产需遵循"人机协作"原则，人类对信息真实性和社会影响负最终责任。'},{text:'使用AI撰写敏感新闻时，必须明确标注"AI参与生成"以保障读者知情权',correct:true,knowledge:'语文·新闻伦理：透明度是AI时代新闻可信度的基石，读者有权知道信息来源是否为AI。'},{text:'AI可以完全替代人类记者，不需要任何人工审核',correct:false},{text:'只要AI写得够快，事实准确性可以适当放松',correct:false}] }
  ]
};

// ==================== 💉 医生（生物 + 地理）====================
QUESTIONS.doctor = {
  history: [
    { subject:'生物', text:'1950年代你作为赤脚医生，发现村里很多孩子得了夜盲症。这最可能是缺乏哪种维生素？', choices:[{text:'维生素A',correct:true,knowledge:'生物·营养：维生素A是合成视紫红质的必需原料，缺乏时暗适应能力下降导致夜盲。'},{text:'维生素C',correct:false},{text:'维生素D',correct:false},{text:'维生素B12',correct:false}] },
    { subject:'生物', text:'你使用青霉素治疗村民的伤口感染。青霉素杀菌的主要原理是什么？', choices:[{text:'抑制细菌细胞壁的合成，使细菌破裂死亡',correct:true,knowledge:'生物·微生物：青霉素作用于转肽酶阻碍肽聚糖交联。人体细胞没有细胞壁，所以对人体无直接毒性。'},{text:'直接破坏细菌的DNA',correct:false},{text:'抑制细菌的蛋白质合成',correct:false},{text:'增强人体免疫细胞的活性',correct:false}] },
    { subject:'地理', text:'你发现某地区村民甲状腺肿发病率特别高。从地理角度分析，最可能的原因是？', choices:[{text:'该地区远离海洋，土壤和水中缺碘',correct:true,knowledge:'地理·环境与健康：碘主要来源于海洋，内陆山区碘含量极低。甲状腺需要碘合成甲状腺素。'},{text:'该地区海拔太高氧气稀薄',correct:false},{text:'该地区气温太低代谢缓慢',correct:false},{text:'该地区降水太多湿度太大',correct:false}] },
    { subject:'地理', text:'你在南方农村巡回医疗，发现疟疾在夏季多发。疟疾的传播与哪个地理因素直接相关？', choices:[{text:'气候',correct:true,knowledge:'地理·疾病地理：疟疾通过按蚊叮咬传播，在温暖潮湿、有积水环境中大量繁殖。'},{text:'地形',correct:false},{text:'纬度',correct:false},{text:'洋流',correct:false}] },
    { subject:'生物', type:'fill', text:'青霉素是从______（填微生物名称）中提取的抗生素。', answer:'青霉菌', answers:['青霉菌','Penicillium'], knowledge:'生物·微生物：青霉素由英国微生物学家弗莱明于1928年从青霉菌中发现，是人类历史上第一个抗生素。' },
    { subject:'地理', type:'fill', text:'地方性甲状腺肿的病因是人体缺乏微量元素______。', answer:'碘', answers:['碘','I'], knowledge:'地理·环境健康：碘主要来源于海洋，内陆山区土壤和水源缺碘导致甲状腺肿。' },
    // --- 新增生物题 ---
    { subject:'生物', text:'你为村民接种牛痘疫苗预防天花。关于疫苗和免疫，以下说法正确的是？', choices:[{text:'接种疫苗属于人工主动免疫',correct:true,knowledge:'生物·免疫调节（沪教版·等级考）：人工主动免疫注射抗原（疫苗），人工被动免疫注射抗体（如抗毒素血清）。记忆细胞是二次免疫更快更强的机制。'},{text:'接种疫苗属于人工被动免疫',correct:false},{text:'牛痘疫苗直接杀死天花病毒',correct:false},{text:'疫苗中的抗原进入人体后不会引起任何免疫反应',correct:false}] },
    { subject:'生物', text:'你用显微镜观察疟疾患者的血涂片，发现红细胞内有环状体。疟原虫属于哪类生物？', choices:[{text:'原生动物',correct:true,knowledge:'生物·微生物分类（沪教版）：疟原虫是真核单细胞生物（原生动物门孢子虫纲），不是细菌或病毒。有完整的细胞结构但无叶绿体。'},{text:'细菌',correct:false},{text:'病毒',correct:false},{text:'真菌',correct:false}] },
    { subject:'生物', text:'农村推广"双蒸法"去除棉籽中的棉酚毒素（Gossypol），使棉籽成为优质蛋白质来源。此处理基于棉酚的什么性质？', choices:[{text:'棉酚可溶于有机溶剂，利用相似相溶原理萃取',correct:true,knowledge:'生物·物质分离（沪教版）：棉酚是脂溶性多酚类物质。细胞膜破坏后，利用有机溶剂萃取法分离。'},{text:'棉酚遇热分解为无毒物质',correct:false},{text:'棉酚是水溶性的，水煮即可去除',correct:false},{text:'棉酚与蛋白质结合而失去毒性',correct:false}] },
    { subject:'生物', type:'fill', text:'能够产生抗体的细胞是______细胞（B细胞受抗原刺激后分化形成的效应细胞）。', answer:'浆', answers:['浆','浆细胞','效应B'], knowledge:'生物·免疫（沪教版）：体液免疫中，B细胞受抗原刺激增殖分化为浆细胞和记忆B细胞，浆细胞产生特异性抗体。' },
    // --- 新增地理题 ---
    { subject:'地理', text:'1950年代你在西北某地巡回医疗，发现当地昼夜温差极大（日较差可达20°C以上）。从地理角度分析原因？', choices:[{text:'深居内陆远离海洋',correct:true,knowledge:'地理·气候（沪教版·等级考）：大陆性气候特征——日较差和年较差大。干燥空气和少云是昼夜温差大的关键。'},{text:'海拔极高导致',correct:false},{text:'纬度较高冬季漫长',correct:false},{text:'受寒流影响',correct:false}] },
    { subject:'地理', text:'长江中下游地区夏季高温闷热（"火炉"），但冬季阴冷潮湿。这种气候类型的名称和成因是？', choices:[{text:'亚热带季风气候',correct:true,knowledge:'地理·中国气候（沪教版）：中国东部秦岭-淮河以南为亚热带季风气候，以北为温带季风气候。上海属于亚热带季风气候。'},{text:'温带海洋性气候',correct:false},{text:'地中海气候',correct:false},{text:'热带季风气候',correct:false}] },
    // --- 新增多选 ---
    { subject:'生物', multi:true, text:'【多选】你为村民接种疫苗后，需要解释免疫反应的原理。以下关于人体免疫系统的说法正确的有？', choices:[{text:'人体免疫系统分为非特异性免疫和特异性免疫',correct:true,knowledge:'生物·免疫调节（沪教版）：非特异性免疫包括皮肤黏膜屏障、吞噬细胞和杀菌物质；特异性免疫包括体液免疫和细胞免疫。'},{text:'接种疫苗属于人工主动免疫，可获得长期免疫力',correct:true,knowledge:'生物·免疫（沪教版·等级考）：记忆细胞可在二次免疫时迅速增殖分化为效应细胞，产生更快更强的免疫应答。'},{text:'抗生素可以直接增强人体免疫系统的功能',correct:false},{text:'所有疫苗都是减毒的活病毒',correct:false}] }
  ],
  modern: [
    { subject:'生物', text:'你在研究一种新发传染病（COVID-19）的传播机制。该病毒的遗传物质是单链RNA，比DNA病毒更容易变异。这是因为？', choices:[{text:'RNA复制酶缺乏纠错功能，复制时容易出错',correct:true,knowledge:'生物·分子生物学：DNA复制有完善的纠错机制，每10⁹个核苷酸出一个错。RNA复制酶缺乏纠错功能，每10⁴个核苷酸就有一个错误。'},{text:'RNA比DNA更不稳定会自然分解',correct:false},{text:'RNA病毒体积更小更易受影响',correct:false},{text:'RNA的碱基配对方式比DNA更多',correct:false}] },
    { subject:'生物', text:'你使用CRISPR-Cas9基因编辑技术治疗遗传性贫血患者。Cas9蛋白的作用是什么？', choices:[{text:'像"分子剪刀"在gRNA引导下在特定位点切断DNA双链',correct:true,knowledge:'生物·基因工程：CRISPR-Cas9系统获2020年诺贝尔化学奖，gRNA识别目标序列，Cas9切断DNA。'},{text:'将新的DNA片段插入基因组',correct:false},{text:'修复切断的DNA链',correct:false},{text:'识别并标记突变的蛋白质',correct:false}] },
    { subject:'地理', text:'某种新型流感病毒在东南亚出现后迅速传播到全球。该地区成为"病毒热点"的地理原因包括？', choices:[{text:'人口密集、人畜接触频繁、国际航空枢纽、气候湿热',correct:true,knowledge:'地理·疾病传播：东南亚人口密集、养殖业发达、位于航空网络节点、湿热气候延长病毒存活时间。'},{text:'经济最发达医疗条件最好',correct:false},{text:'人口最少流动性最低',correct:false},{text:'海拔最高最寒冷',correct:false}] },
    { subject:'地理', text:'你参与全球健康研究，发现心血管疾病在发达国家发病率高。这体现了地理学中的哪个概念？', choices:[{text:'流行病学转型',correct:true,knowledge:'地理·健康地理：流行病学转型理论描述了随经济发展，主要疾病从传染病转向慢性病的过程。'},{text:'纬度地带性',correct:false},{text:'垂直地带性',correct:false},{text:'经度地带性',correct:false}] },
    { subject:'生物', type:'fill', text:'基因编辑技术CRISPR-Cas9中，Cas9蛋白起______（填功能）作用。', answer:'剪刀', answers:['剪刀','切割','剪切','切断'], knowledge:'生物·基因工程：Cas9蛋白在gRNA引导下切断DNA双链。' },
    { subject:'地理', type:'fill', text:'流行病学转型理论认为，随着经济发展，人类主要疾病从______病转向慢性非传染性疾病。', answer:'传染', answers:['传染','传染病','感染'], knowledge:'地理·健康地理：流行病学转型描述了从传染病主导到慢性病主导的转变过程。' },
    // --- 新增生物题 ---
    { subject:'生物', text:'某遗传性贫血（地中海贫血）为常染色体隐性遗传病。一对表型正常的夫妇生了一个患病孩子，再生一个孩子患病的概率是？', choices:[{text:'1/4',correct:true,knowledge:'生物·遗传规律（沪教版·等级考）：常染色体隐性遗传——父母均为携带者时，子代患病概率1/4，携带者概率1/2，正常纯合概率1/4。'},{text:'1/2',correct:false},{text:'3/4',correct:false},{text:'0',correct:false}] },
    { subject:'生物', text:'某抗癌靶向药物是一种单克隆抗体，能够特异性结合癌细胞表面抗原。制备单克隆抗体的关键技术是？', choices:[{text:'将免疫的B细胞与骨髓瘤细胞融合',correct:true,knowledge:'生物·细胞工程（沪教版·等级考）：单克隆抗体制备流程——免疫小鼠→取B细胞→与骨髓瘤细胞融合→HAT培养基筛选→获得杂交瘤细胞→大规模培养。'},{text:'直接从患者血清中分离抗体',correct:false},{text:'用化学方法人工合成抗体分子',correct:false},{text:'从转基因植物中提取抗体',correct:false}] },
    { subject:'生物', text:'你对一个基因进行测序，发现模板链序列为 3\'-TACGGCAT-5\'。则转录出的mRNA序列为？（注意方向）', choices:[{text:'5\'-AUGCCGUA-3\'',correct:true,knowledge:'生物·基因表达（沪教版·等级考）：转录以DNA模板链(3\'→5\')合成mRNA(5\'→3\')，遵循碱基互补配对。'},{text:'5\'-ATGCCGTA-3\'',correct:false},{text:'3\'-AUGCCGUA-5\'',correct:false},{text:'5\'-UACGGCAU-3\'',correct:false}] },
    { subject:'生物', type:'fill', text:'细胞有氧呼吸的三个阶段中，释放能量最多的是第______阶段（电子传递链/氧化磷酸化）。', answer:'三', answers:['三','3','第三'], knowledge:'生物·细胞呼吸（沪教版）：有氧呼吸三个阶段——①糖酵解（细胞质）②柠檬酸循环（线粒体基质）③氧化磷酸化（线粒体内膜），第三阶段释放能量最多。' },
    // --- 新增地理题 ---
    { subject:'地理', text:'你分析某城市医疗资源分布图，发现优质医院高度集中在市中心。这体现了城市内部空间结构的什么规律？', choices:[{text:'中心地理论',correct:true,knowledge:'地理·城市地理（沪教版）：中心地理论（克里斯泰勒）解释服务等级与空间分布关系。医院等级越高，服务门槛越高，服务范围越大。'},{text:'同心圆模型',correct:false},{text:'扇形模型',correct:false},{text:'多核心模型',correct:false}] },
    { subject:'地理', text:'在研究流行病传播时空规律时，你使用了GIS（地理信息系统）技术。GIS的核心功能不包括？', choices:[{text:'实时监测患者的血压与心率变化',correct:true,knowledge:'地理·GIS（沪教版·等级考）：GIS核心功能——数据采集、存储管理、空间分析（缓冲区分析、叠加分析等）、可视化表达。不包含生理参数实时监测。'},{text:'疾病热点区域的缓冲区分析',correct:false},{text:'医疗设施服务范围的空间可视化',correct:false},{text:'不同地区发病率数据的图层叠加分析',correct:false}] },
    // --- 新增多选 ---
    { subject:'地理', multi:true, text:'【多选】某城市爆发不明原因肺炎，你作为疾控专家参与流行病学调查。以下哪些地理学方法可用于分析传播规律？', choices:[{text:'利用GIS对病例分布进行空间自相关分析，识别疾病聚集区',correct:true,knowledge:'地理·GIS应用：空间自相关分析(Moran\'s I)可判断疾病分布是否呈现空间聚集性。'},{text:'结合交通网络数据进行核密度估计，模拟病原体沿交通线的扩散路径',correct:true,knowledge:'地理·空间分析：核密度估计和网络分析是流行病传播建模的核心方法。'},{text:'可以忽略人口流动数据，只分析气候因素',correct:false},{text:'地理因素与疾病传播完全无关',correct:false}] }
  ],
  cyberpunk: [
    { subject:'生物', text:'你开发了纳米机器人，可以在血液循环中识别并清除癌细胞。从生物学角度，最大的技术挑战是什么？', choices:[{text:'如何避免被免疫系统识别为"外来物"而遭到攻击清除',correct:true,knowledge:'生物·免疫学：纳米机器人必须伪装成"自己人"（如用红细胞膜包裹），否则会被巨噬细胞吞噬。'},{text:'如何给纳米机器人供电',correct:false},{text:'如何制造这么小的机器人',correct:false},{text:'如何让纳米机器人互相通信',correct:false}] },
    { subject:'生物', text:'人类掌握了"意识上传"技术——将完整人脑神经连接数字化。从神经生物学角度，这面临的根本问题是什么？', choices:[{text:'意识是否只是神经连接的产物，还是有不可量化的"主观体验"',correct:true,knowledge:'生物·神经科学：哲学上的"意识困难问题"至今无科学答案：为什么物理过程会产生主观体验？'},{text:'技术难度太大无法实现',correct:false},{text:'上传后的人没有记忆',correct:false},{text:'上传后的人没有情感',correct:false}] },
    { subject:'地理', text:'在海平面上升淹没大部分沿海城市的时代，你参与评估"海上城市"的选址。以下哪个地理条件最适合？', choices:[{text:'大陆架坡度平缓、水深<50m、远离板块交界处和台风路径',correct:true,knowledge:'地理·海洋地理：海上城市选址需考虑水深、海底稳定性、自然灾害风险、洋流等因素。'},{text:'深海区远离陆地',correct:false},{text:'两极地区冰层之上',correct:false},{text:'板块交界处地热资源丰富',correct:false}] },
    { subject:'地理', text:'火星殖民地的医生需要应对火星环境对人类健康的影响。火星重力约为地球1/3，长期生活在低重力环境会导致？', choices:[{text:'骨密度下降和肌肉萎缩',correct:true,knowledge:'地理·太空医学：国际空间站研究表明，宇航员每月骨密度下降1-2%，重力是骨骼和肌肉保持功能的关键刺激。'},{text:'身高变矮',correct:false},{text:'免疫力增强',correct:false},{text:'视力变好',correct:false}] },
    // --- 新增生物题 ---
    { subject:'生物', text:'基因治疗中，如何将正常的CFTR基因导入囊性纤维化患者的肺上皮细胞？最常用的载体是？', choices:[{text:'腺相关病毒载体',correct:true,knowledge:'生物·基因治疗（沪教版·基因工程应用）：载体选择原则——安全性（低免疫原性）、高效转导、靶向性。AAV和慢病毒是最常用的病毒载体。'},{text:'质粒直接注射',correct:false},{text:'脂质体包裹后口服',correct:false},{text:'直接用显微注射针打入每个细胞',correct:false}] },
    { subject:'生物', text:'【多选】人工合成基因线路（Synthetic gene circuits）可用于设计"智能细胞"实现精准药物释放。以下哪些是合成生物学的基本元件？', multi:true, choices:[{text:'启动子',correct:true,knowledge:'生物·合成生物学（沪教版拓展）：合成生物学将工程学原理应用于生物学，用标准化元件（启动子、RBS、CDS、终止子等）构建基因线路。'},{text:'核糖体结合位点',correct:true},{text:'终止子',correct:true},{text:'细胞膜',correct:false}] },
    { subject:'生物', text:'火星基地使用藻类生物反应器产生O₂并回收CO₂。在微观层面，这一过程依赖于什么细胞器？', choices:[{text:'叶绿体',correct:true,knowledge:'生物·光合作用（沪教版·等级考）：光反应：H₂O光解→O₂+[H]+ATP；暗反应（卡尔文循环）：CO₂+C₅→2C₃→C₆H₁₂O₆+C₅。'},{text:'线粒体',correct:false},{text:'核糖体',correct:false},{text:'内质网',correct:false}] },
    { subject:'生物', type:'fill', text:'人类基因组的编码区仅占约1.5%，其余98.5%曾被称为"______DNA"，但现在已知其具有重要的调控功能。', answer:'垃圾', answers:['垃圾','非编码','junk'], knowledge:'生物·基因组（沪教版）：非编码DNA包含启动子、增强子、转座子等，在基因表达调控中起关键作用。' },
    // --- 新增地理题 ---
    { subject:'地理', text:'根据世界卫生组织预测，2050年全球70%人口将居住在城市。快速城市化对传染病传播的影响是？', choices:[{text:'人口密度增大和流动性增强加速病原体传播',correct:true,knowledge:'地理·城市化（沪教版·等级考）：城市化带来的机遇（经济集聚、公共服务）和挑战（环境污染、疾病传播加速）需要辩证分析。'},{text:'城市化完全消除了传染病，使城市成为无疫空间',correct:false},{text:'城市化进程对传染病传播没有任何影响',correct:false},{text:'城市化只影响非传染性慢性病，与传染病无关',correct:false}] },
    { subject:'地理', text:'随着全球变暖，原本局限于热带地区的登革热正在向温带扩散。中国哪些地区面临登革热传播范围扩大的风险？', choices:[{text:'华东和华南沿海地区',correct:true,knowledge:'地理·气候变化与健康（沪教版）：全球变暖使等温线北移，热带传染病媒介（按蚊、伊蚊）的分布范围随之向高纬度和高海拔扩展。'},{text:'只有海南岛和西双版纳',correct:false},{text:'西北内陆干旱区',correct:false},{text:'东北地区因纬度高完全安全',correct:false}] },
    // --- 新增多选 ---
    { subject:'生物', multi:true, text:'【多选】纳米医学时代，你开发的靶向给药系统需要满足哪些条件才能精准递送抗癌药物？', choices:[{text:'纳米载体需具备靶向识别功能',correct:true,knowledge:'生物·细胞工程：靶向给药利用"锁钥"原理，配体-受体特异性结合实现精准递送。'},{text:'载体需在特定微环境下可控释放药物',correct:true,knowledge:'生物·医学工程：pH响应型纳米载体可在肿瘤酸性环境中释放药物，减少对正常组织的损伤。'},{text:'只要药物剂量足够大，不需要靶向递送也能有效治疗',correct:false},{text:'纳米载体越复杂越好，不需要考虑生物兼容性问题',correct:false}] }
  ]
};

// ==================== 💻 程序员（信息科技 + 历史）====================
QUESTIONS.programmer = {
  history: [
    { subject:'信息科技', text:'1958年你接触到中国第一台通用电子计算机——103机。这台计算机使用的核心元件是什么？', choices:[{text:'电子管',correct:true,knowledge:'信息科技·计算机史：103机用了近3000个电子管，每秒运算1800次。电子管体积大、发热高。'},{text:'晶体管',correct:false},{text:'集成电路',correct:false},{text:'微处理器',correct:false}] },
    { subject:'信息科技', text:'你使用穿孔纸带向计算机输入程序。纸带上有孔代表1、无孔代表0，这属于哪种数据表示方式？', choices:[{text:'二进制编码',correct:true,knowledge:'信息科技·数据表示：莱布尼茨最早提出二进制，布尔代数将逻辑运算与二进制联系。'},{text:'模拟信号',correct:false},{text:'量子比特',correct:false},{text:'十进制编码',correct:false}] },
    { subject:'历史', text:'1970年代你见证了"第三次科技革命"。这次革命的核心标志是什么？', choices:[{text:'原子能、电子计算机和空间技术的广泛应用',correct:true,knowledge:'历史·科技革命：第三次科技革命以原子能、电子计算机、航天技术和生物工程为代表。'},{text:'蒸汽机的改良和普及',correct:false},{text:'电力的广泛应用',correct:false},{text:'互联网的全球覆盖',correct:false}] },
    { subject:'历史', text:'1990年代中国接入国际互联网。以下关于中国互联网早期发展的描述正确的是？', choices:[{text:'1994年中国正式接入国际互联网，中国互联网时代开启',correct:true,knowledge:'历史·互联网史：1994年4月20日，中国通过64k国际专线全功能接入互联网。'},{text:'1970年代中国与ARPANET直接相连',correct:false},{text:'2000年中国才第一次出现互联网',correct:false},{text:'中国互联网由私营企业独立建设运行',correct:false}] },
    { subject:'信息科技', type:'fill', text:'计算机内部的运算和数据存储都采用______进制。', answer:'二', answers:['二','2','binary'], knowledge:'信息科技·基础：二进制是计算机的基础，只有0和1两种状态。' },
    { subject:'历史', type:'fill', text:'1994年4月20日，中国通过______k国际专线全功能接入国际互联网。', answer:'64', answers:['64','64k','64千'], knowledge:'历史·互联网史：1994年4月20日，中国通过64k国际专线接入互联网。' },
    // --- 新增信息科技题 ---
    { subject:'信息科技', text:'你用汇编语言编写103机的程序。汇编语言与机器语言的主要区别是什么？', choices:[{text:'汇编语言使用助记符替代二进制机器码',correct:true,knowledge:'信息科技·程序设计语言：机器语言(0/1)→汇编语言(助记符)→高级语言。汇编器将助记符翻译为机器码。'},{text:'汇编语言可以直接在操作系统上运行不需要翻译',correct:false},{text:'汇编语言是面向对象的高级语言',correct:false},{text:'汇编语言与硬件架构无关可在所有计算机上通用',correct:false}] },
    { subject:'信息科技', text:'早期程序员使用流程图描述算法逻辑。以下关于算法和流程图的说法正确的是？', choices:[{text:'算法必须具有有穷性',correct:true,knowledge:'信息科技·算法基础（上海教材）：算法的5个特征——有穷性、确定性、可行性、输入（0或多个）、输出（1或多个）。'},{text:'一个算法可以有多个不同的输出对于同一个输入',correct:false},{text:'流程图中的菱形表示程序的开始/结束',correct:false},{text:'任何算法都必须包含循环结构',correct:false}] },
    { subject:'信息科技', type:'fill', text:'存储单位换算：1KB = ______ B（字节）。', answer:'1024', answers:['1024'], knowledge:'信息科技·数据存储：计算机存储以2的幂次为单位，1KB=2¹⁰B=1024B，1MB=1024KB。' },
    // --- 新增历史题 ---
    { subject:'历史', text:'1956年周恩来代表中央提出"向科学进军"的号召，并主持制定《1956—1967年科学技术发展远景规划》。这一规划的核心背景是？', choices:[{text:'世界正处于第三次科技革命的开端，社会主义工业化需要科学技术支撑',correct:true,knowledge:'历史·新中国科技史（沪教版）："一五"计划奠定了工业基础，但科技水平落后成为制约。12年远景规划部署了原子能、计算机、半导体等关键领域。'},{text:'中国已经率先完成了计算机的自主研发',correct:false},{text:'西方国家主动向中国输出先进科技',correct:false},{text:'中国已经完成了所有科研基础设施建设',correct:false}] },
    { subject:'历史', text:'中国在1964年成功爆炸第一颗原子弹。在两弹一星工程中，归国科学家发挥了关键作用，其中不包括？', choices:[{text:'杨振宁',correct:true,knowledge:'历史·两弹一星（沪教版）：钱学森（航天）、邓稼先（核物理）、钱三强（核物理）等是两弹一星的核心科学家。杨振宁主要贡献在理论物理领域。'},{text:'钱学森',correct:false},{text:'邓稼先',correct:false},{text:'钱三强',correct:false}] },
    // --- 新增多选 ---
    { subject:'信息科技', multi:true, text:'【多选】你为一台早期的电子管计算机编写程序。以下关于计算机工作原理的说法正确的有？', choices:[{text:'冯·诺依曼体系结构的核心思想是"存储程序"',correct:true,knowledge:'信息科技·计算机原理（上海教材）：冯·诺依曼体系结构包括运算器、控制器、存储器、输入设备和输出设备五大部件。'},{text:'计算机内部采用二进制表示数据和指令',correct:true,knowledge:'信息科技·数据表示：二进制是计算机的基础，所有数据和指令最终都转化为二进制码。'},{text:'第一代计算机已经可以运行图形化用户界面',correct:false},{text:'计算机的运算速度只取决于CPU的主频，与内存大小无关',correct:false}] }
  ],
  modern: [
    { subject:'信息科技', text:'你开发了一个电商平台，用户登录后可以保持在线状态。服务器存储用户登录状态最常用的机制是？', choices:[{text:'Session/Cookie',correct:true,knowledge:'信息科技·Web开发：HTTP无状态，Session在服务端存用户数据，Cookie在客户端存标识符。'},{text:'每次登录重新输入密码',correct:false},{text:'用IP地址识别用户',correct:false},{text:'用USB硬件KEY验证',correct:false}] },
    { subject:'信息科技', text:'你的APP用户数据泄露，原因是数据库存储密码时用了明文。以下哪种密码存储方式最安全？', choices:[{text:'加盐哈希',correct:true,knowledge:'信息科技·安全："盐"是每个用户唯一的随机字符串。加盐哈希防止了相同密码产生相同哈希值的问题。'},{text:'将密码用Base64编码',correct:false},{text:'将密码用MD5哈希一次',correct:false},{text:'将密码压缩成ZIP',correct:false}] },
    { subject:'历史', text:'2000年代互联网泡沫破裂，大量.com公司倒闭。这次泡沫的根本原因是什么？', choices:[{text:'资本市场对互联网前景过度乐观，资金涌入缺乏盈利模式的公司',correct:true,knowledge:'历史·经济史：纳指从1000飙至5000点，许多公司仅凭一个域名就获巨资。'},{text:'互联网技术本身存在致命缺陷',correct:false},{text:'全球金融危机导致经济崩溃',correct:false},{text:'政府禁止互联网商业活动',correct:false}] },
    { subject:'历史', text:'2010年代"数字经济"写入中国政府工作报告。数字经济区别于传统经济的核心特征是什么？', choices:[{text:'数据成为新的关键生产要素，数字化信息驱动价值创造',correct:true,knowledge:'历史·当代经济：数据可无限复制、非竞争性使用、边际成本接近零。'},{text:'所有商品都免费提供',correct:false},{text:'完全不需要实体基础设施',correct:false},{text:'完全由政府计划控制',correct:false}] },
    { subject:'信息科技', type:'fill', text:'HTTP协议中，状态码______表示"未找到"请求的资源。', answer:'404', knowledge:'信息科技·Web：404 Not Found 是最著名的HTTP状态码之一。' },
    { subject:'历史', type:'fill', text:'2000年代互联网泡沫时期，大量资金涌入缺乏______模式的互联网公司。', answer:'盈利', answers:['盈利','营收','商业'], knowledge:'历史·经济史：互联网泡沫的核心问题是大量公司只有概念没有盈利模式。' },
    // --- 新增信息科技题 ---
    { subject:'信息科技', text:'你使用Python开发数据分析功能。以下Python代码的输出是什么？<br><code>nums = [1, 2, 3]\nresult = [x*2 for x in nums if x > 1]\nprint(result)</code>', choices:[{text:'[4, 6]',correct:true,knowledge:'信息科技·Python编程（上海高中信息科技）：列表推导式 [表达式 for 变量 in 可迭代对象 if 条件] 是一种简洁的列表生成方式。'},{text:'[2, 4, 6]',correct:false},{text:'[2, 3]',correct:false},{text:'[4, 6, 6]',correct:false}] },
    { subject:'信息科技', text:'你设计一个数据库来存储用户订单信息。以下关于数据库规范化的说法正确的是？', choices:[{text:'第三范式要求每个非主键字段直接依赖于主键而非依赖于其他非主键字段',correct:true,knowledge:'信息科技·数据库（上海教材）：1NF(原子性)→2NF(消除部分依赖)→3NF(消除传递依赖)。规范化减少数据冗余和更新异常。'},{text:'数据库规范化程度越高越好，所有表都应设计到第5范式',correct:false},{text:'第一范式要求所有字段都是相同的类型',correct:false},{text:'主键和外键在数据库中必须是同一个字段',correct:false}] },
    { subject:'信息科技', text:'你的系统需要实现"用户A关注用户B"的社交关系。从数据结构角度，这种关系最适合用什么表示？', choices:[{text:'图',correct:true,knowledge:'信息科技·数据结构：图(Graph)适合表示实体间多对多的网络关系。社交网络（关注/好友）、推荐系统（用户-商品）都基于图结构。'},{text:'队列',correct:false},{text:'栈',correct:false},{text:'散列表',correct:false}] },
    { subject:'信息科技', type:'fill', text:'TCP/IP协议栈中，用于保证数据可靠传输的协议是______（填协议简称）。', answer:'TCP', answers:['TCP'], knowledge:'信息科技·网络协议（上海教材）：TCP通过三次握手建立连接、确认重传机制保证可靠传输，UDP无连接传输效率高但不可靠。' },
    // --- 新增历史题 ---
    { subject:'历史', text:'从冷战时期的ARPANET到1990年代万维网（WWW）的诞生，互联网从军用网络演变为全球开放平台。这个过程中最关键的技术发明是？', choices:[{text:'Tim Berners-Lee发明了万维网',correct:true,knowledge:'历史·互联网史（沪教版）：1990年Berners-Lee在CERN发明万维网三大核心技术（HTTP+HTML+URL）。1993年Mosaic浏览器的出现使万维网走向大众。'},{text:'TCP/IP协议的发明标志着万维网的正式诞生',correct:false},{text:'电子邮件的发明是万维网诞生的关键技术',correct:false},{text:'搜索引擎的发明使全球信息共享成为可能',correct:false}] },
    { subject:'历史', text:'中国"新四大发明"（高铁、扫码支付、共享单车、网购）被写入一些国际报告。从历史角度，这一现象最能说明什么？', choices:[{text:'数字技术与实体经济深度融合，创造了具有中国特色的技术创新范式',correct:true,knowledge:'历史·科技与文明（沪教版）：近代以来中国科技经历了从"跟跑"到"并跑"再到部分领域"领跑"的历程。移动支付和共享经济体现了应用层面的创新优势。'},{text:'中国在所有科技领域都已超越发达国家',correct:false},{text:'这四项技术都是由中国原创发明的',correct:false},{text:'中国已经完成了现代化建设所有目标',correct:false}] },
    // --- 新增多选 ---
    { subject:'信息科技', multi:true, text:'【多选】你在为电商平台设计数据库时，需要保证数据的一致性和完整性。以下关于数据库约束的说法正确的有？', choices:[{text:'主键约束确保每条记录的唯一性，主键字段不能为NULL且不可重复',correct:true,knowledge:'信息科技·数据库：主键(Primary Key)是关系数据库的核心概念，用于唯一标识表中的每行记录。'},{text:'外键约束用于维护表与表之间的引用完整性，保证关联数据的一致性',correct:true,knowledge:'信息科技·数据库：外键(Foreign Key)建立表之间的关联，防止非法数据插入和孤立记录产生。'},{text:'数据库中可以没有任何约束，仍能保证数据正确',correct:false},{text:'索引创建得越多，数据库的写入速度越快',correct:false}] }
  ],
  cyberpunk: [
    { subject:'信息科技', text:'你需要在量子计算机上实现Shor算法。与传统计算机相比，量子计算机在解决哪个问题上具有绝对优势？', choices:[{text:'大整数因式分解',correct:true,knowledge:'信息科技·量子计算：Shor算法（1994年）意味着RSA加密体系将被量子计算机攻破。'},{text:'网页搜索排序',correct:false},{text:'文字处理排版',correct:false},{text:'数据库增删改查',correct:false}] },
    { subject:'信息科技', text:'强人工智能（AGI）已诞生，你负责设计AI伦理框架。以下哪项应是AI系统的核心安全原则？', choices:[{text:'价值对齐',correct:true,knowledge:'信息科技·AI伦理：价值对齐（Value Alignment）是AI安全的核心问题。'},{text:'AI应该有完全的自主权',correct:false},{text:'AI的目标不需要限制',correct:false},{text:'AI应该取代人类做所有决策',correct:false}] },
    { subject:'历史', text:'赛博朋克时代，人类历史学界争论"大过滤器"理论。这个理论试图解释什么问题？', choices:[{text:'为什么在浩瀚宇宙中至今没有发现其他智慧文明',correct:true,knowledge:'历史·文明史：费米悖论的一个可能解答——从简单生命到星际文明需经许多关键步骤。'},{text:'为什么地球上有这么多物种',correct:false},{text:'为什么人类会有战争',correct:false},{text:'为什么互联网会崩溃',correct:false}] },
    { subject:'历史', text:'在数字意识普及的2080年代，数字永生者的记录和碳基人类的记录互相矛盾。解决这个问题最根本的原则是？', choices:[{text:'多信源交叉验证',correct:true,knowledge:'历史·史学方法：不论记录者是人是AI，"孤证不立"、互证、考据等基本方法永远是确定历史事实的根本途径。'},{text:'以AI记录为准',correct:false},{text:'以人类记录为准',correct:false},{text:'所有记录都是假的',correct:false}] },
    // --- 新增信息科技题 ---
    { subject:'信息科技', text:'量子计算机利用量子叠加态（0和1可以同时存在）实现并行计算。n个量子比特可以同时表示多少种状态？', choices:[{text:'2^n种',correct:true,knowledge:'信息科技·量子计算原理：经典比特只能是0或1。量子比特(qubit)可以处于|0⟩、|1⟩或两者的叠加态α|0⟩+β|1⟩。n个qubit→2^n维Hilbert空间。'},{text:'2n种',correct:false},{text:'n²种',correct:false},{text:'n!种',correct:false}] },
    { subject:'信息科技', text:'为防止量子计算机破解RSA加密，你在设计后量子密码（PQC）系统。相比RSA，以下哪种数学问题是量子计算机也难以高效解决的？', choices:[{text:'格上的最短向量问题',correct:true,knowledge:'信息科技·密码学：NIST已标准化基于格的密码方案（CRYSTALS-Kyber等）作为后量子密码标准。格的困难性问题目前同时抵抗经典和量子攻击。'},{text:'大整数因式分解',correct:false},{text:'离散对数问题',correct:false},{text:'椭圆曲线离散对数问题',correct:false}] },
    { subject:'信息科技', text:'【多选】AI伦理中的"可解释性"（Explainability）问题是指？', multi:true, choices:[{text:'深度学习模型决策过程类似"黑箱"，难以解释',correct:true,knowledge:'信息科技·AI伦理：可解释AI（XAI）是当前AI研究的核心挑战之一。黑箱问题导致无法审计AI决策的公平性。'},{text:'金融风控AI拒绝贷款申请时必须能给出明确理由',correct:true},{text:'医疗AI诊断结果需要能够追溯推理依据',correct:true},{text:'AI程序必须在运行时输出所有内部变量',correct:false}] },
    { subject:'信息科技', type:'fill', text:'在计算机科学中，用O(n²)、O(log n)等表示算法的时间______。', answer:'复杂度', answers:['复杂度','时间复杂度'], knowledge:'信息科技·算法分析（上海教材）：大O表示法描述算法执行时间/空间随输入规模增长的趋势。O(1)<O(log n)<O(n)<O(n log n)<O(n²)<O(2^n)。' },
    // --- 新增历史题 ---
    { subject:'历史', text:'人类社会经历了"采集狩猎→农业→工业→信息"四次重大转型。从历史唯物主义的角度，驱动这些转型的根本动力是什么？', choices:[{text:'生产力的发展',correct:true,knowledge:'历史·唯物史观（沪教版）：生产力决定生产关系，经济基础决定上层建筑。每一次社会大转型背后都是能源、工具、组织方式的革命性变革。'},{text:'天才人物的偶然出现',correct:false},{text:'外来文明的侵入和征服',correct:false},{text:'人口的机械增长',correct:false}] },
    { subject:'历史', text:'随着AGI在法律、医疗等领域的应用，人类的就业结构正在发生深刻变化。历史上类似的技术冲击有？', choices:[{text:'18世纪工业革命时期，卢德分子捣毁机器的运动',correct:true,knowledge:'历史·技术与社会（沪教版）：工业革命时期纺织工人捣毁机器的"卢德运动"是最早的反自动化运动。历史证明技术革新在淘汰旧岗位的同时创造了更多新就业机会。'},{text:'古罗马引入奴隶制导致自由民全部失业',correct:false},{text:'中世纪黑死病导致欧洲经济全面崩溃',correct:false},{text:'大航海时代使所有传统手工业消失',correct:false}] }
  ]
};

// ==================== 🔧 工程师（数学 + 物理）====================
QUESTIONS.engineer = {
  history: [
    { subject:'数学', text:'1950年代你参与修建一座水库大坝。图纸上大坝截面是梯形，上底4m、下底16m、高10m。截面积是多少？', choices:[{text:'100m²',correct:true,knowledge:'数学·几何：梯形面积公式S=(a+b)h/2，是最基本的工程计算之一。'},{text:'200m²',correct:false},{text:'80m²',correct:false},{text:'160m²',correct:false}] },
    { subject:'数学', text:'炼钢厂将铁水（1500°C）倒入模具冷却。若冷却速率与温差成正比（牛顿冷却定律），以下哪个图像最能描述温度变化？', choices:[{text:'先快速下降，后缓慢下降，逐渐趋近室温',correct:true,knowledge:'数学·函数模型：牛顿冷却定律dT/dt=-k(T-T₀)，温度呈指数衰减，初始温差大冷却快。'},{text:'匀速下降',correct:false},{text:'先慢后快',correct:false},{text:'保持不变后突然下降',correct:false}] },
    { subject:'物理', text:'你建设水利工程需要将水从低处抽到高处灌溉。以下哪种简单机械最适合提升水？', choices:[{text:'螺旋泵',correct:true,knowledge:'物理·简单机械：阿基米德螺旋是最早的提水机械之一，利用螺旋面旋转将水沿管壁提升。'},{text:'滑轮组',correct:false},{text:'杠杆',correct:false},{text:'齿轮组',correct:false}] },
    { subject:'物理', text:'土高炉炼铁时用鼓风机鼓入空气。旋转叶片推动空气使其获得速度和压力，这主要利用了哪个物理定律？', choices:[{text:'能量守恒定律',correct:true,knowledge:'物理·能量转化：鼓风机本质上将电能/机械能转化为流体的动能和压力能。'},{text:'伯努利原理',correct:false},{text:'牛顿第三定律',correct:false},{text:'热力学第二定律',correct:false}] },
    { subject:'数学', type:'fill', text:'梯形面积公式为 S = (______) × h ÷ 2。', answer:'a+b', answers:['a+b','上底+下底','a加b'], knowledge:'数学·几何：梯形面积公式S=(a+b)h÷2，其中a为上底、b为下底、h为高。' },
    { subject:'物理', type:'fill', text:'阿基米德螺旋提水器利用的是______（填简单机械名称）的原理。', answer:'斜面', answers:['斜面','螺旋'], knowledge:'物理·简单机械：阿基米德螺旋本质上是斜面的变形。' },
    // --- 新增数学题 ---
    { subject:'数学', text:'施工队需要在两座山之间架设电线。两座山峰坐标分别为A(0,0)和B(800,120)（单位：米），假设电线理想形状为抛物线y=ax²+bx。已知电线在x=400处最低，求a的值。', choices:[{text:'a=120/160000=0.00075',correct:true,knowledge:'数学·二次函数（上海高考）：抛物线y=ax²+bx+c，对称轴x=-b/(2a)。本问题属于典型的二次函数建模应用。'},{text:'a=0.0012',correct:false},{text:'a=0.0005',correct:false},{text:'a=0.001',correct:false}] },
    { subject:'数学', text:'水库设计中需要计算混凝土方量。大坝横截面近似为抛物线y=0.01x²（0≤x≤20），旋转180°得到的体积由积分∫π[f(x)]²dx给出。这种计算方法属于？', choices:[{text:'定积分的应用',correct:true,knowledge:'数学·定积分应用（上海高考）：旋转体体积公式是积分几何应用的重要内容，与祖暅原理有密切联系。'},{text:'微积分基本定理的直接使用',correct:false},{text:'二项式定理的拓展应用',correct:false},{text:'解析几何中的面积公式',correct:false}] },
    { subject:'数学', text:'为节省钢材，你需要在给定了周长条件下使矩形截面积最大。设周长为20m，长宽各为多少时面积最大？', choices:[{text:'5m×5m，面积25m²',correct:true,knowledge:'数学·不等式（上海高考）：均值不等式——定和求积最大值，积为定值求和最小值。两次基本不等式的标准用法。'},{text:'6m×4m，面积24m²',correct:false},{text:'7m×3m，面积21m²',correct:false},{text:'8m×2m，面积16m²',correct:false}] },
    { subject:'数学', type:'fill', text:'若函数f(x)=x³-3x²+2，则f\'(x)=______。', answer:'3x²-6x', answers:['3x²-6x','3x^2-6x'], knowledge:'数学·导数（上海高考）：导数公式——(xⁿ)\'=nxⁿ⁻¹，(C)\'=0。求导运算是上海高考数学的必考内容。' },
    // --- 新增物理题 ---
    { subject:'物理', text:'大坝底部为什么要设计得比顶部宽？从液体压强的角度分析。', choices:[{text:'液体压强p=ρgh',correct:true,knowledge:'物理·液体压强（沪教版·等级考）：静止液体压强p=ρgh（h为深度），与容器形状无关。坝体底部h最大所以p最大。'},{text:'为了美观',correct:false},{text:'为了节省建筑材料',correct:false},{text:'因为底部水温更低',correct:false}] },
    { subject:'物理', text:'你使用滑轮组将500kg的石料提升到10m高的坝顶。不计摩擦和滑轮重，理论上最少需要做多少功？（g=10m/s²）', choices:[{text:'50000J',correct:true,knowledge:'物理·功和能（沪教版·等级考）：功W=F·s·cosθ。重力做功W=mgh与路径无关。机械效率η=W有/W总。'},{text:'5000J',correct:false},{text:'500000J',correct:false},{text:'25000J',correct:false}] },
    // --- 新增多选 ---
    { subject:'物理', multi:true, text:'【多选】水利工程建设中常涉及多种简单机械的组合使用。以下关于简单机械的说法正确的有？', choices:[{text:'使用动滑轮可以省力，但费距离',correct:true,knowledge:'物理·简单机械（沪教版·等级考）：动滑轮是等臂杠杆的变形，省力不省功。机械功原理：使用任何机械都不省功。'},{text:'斜面是一种省力机械',correct:true,knowledge:'物理·简单机械：斜面(F=G·h/L，L为斜面长度)广泛应用于水利工程中的物料运输。机械效率η=W有/W总。'},{text:'使用任何机械都能既省力又省距离',correct:false},{text:'滑轮组的机械效率总是100%，没有任何能量损失',correct:false}] }
  ],
  modern: [
    { subject:'数学', text:'你设计一座跨江大桥。一辆重20吨的卡车停在40m简支梁的跨中，左端支座承受的压力是？', choices:[{text:'10吨',correct:true,knowledge:'数学·力学：简支梁在对称荷载下，两端支座反力相等。'},{text:'20吨',correct:false},{text:'5吨',correct:false},{text:'15吨',correct:false}] },
    { subject:'数学', text:'你用BIM做建筑能耗模拟，发现夏季空调能耗与室外温度平方成正比。温度从35°C升至40°C，能耗约增加多少？', choices:[{text:'约31%',correct:true,knowledge:'数学·比例计算：能耗∝T²，温度比率的平方=能耗比率。40/35≈1.143，平方≈1.306。'},{text:'约14%',correct:false},{text:'约50%',correct:false},{text:'约100%',correct:false}] },
    { subject:'物理', text:'你负责超高层建筑电梯系统。电梯以2m/s²加速上升时，体重70kg的人对地板压力是多少？（g=10m/s²）', choices:[{text:'840N',correct:true,knowledge:'物理·牛顿第二定律：电梯加速上升时人处于"超重"状态，N-mg=ma，所以N=m(g+a)。'},{text:'700N',correct:false},{text:'560N',correct:false},{text:'140N',correct:false}] },
    { subject:'物理', text:'你设计太阳能光伏电站。单晶硅板光电转换效率约20%，某地年太阳辐射1200kWh/m²。1m²板一年约发多少电？', choices:[{text:'240kWh',correct:true,knowledge:'物理·能源转化：光电转换效率=输出电能/输入光能。实际还要考虑温度损失、逆变器效率。'},{text:'1200kWh',correct:false},{text:'24kWh',correct:false},{text:'600kWh',correct:false}] },
    { subject:'数学', type:'fill', text:'结构力学中，简支梁在跨中受集中荷载时，两端支座的反力______（填"相等"或"不等"）。', answer:'相等', answers:['相等','相同'], knowledge:'数学·力学：简支梁在对称荷载下两端支座反力相等。' },
    { subject:'物理', type:'fill', text:'电梯加速上升时，人对地板的压力______（填"大于""小于"或"等于"）人的重力。', answer:'大于', answers:['大于','超过'], knowledge:'物理·牛顿定律：电梯加速上升时人处于"超重"状态，N=mg+ma>mg。' },
    // --- 新增数学题 ---
    { subject:'数学', text:'某高层建筑的外形可近似为一个旋转抛物面z=(x²+y²)/100（0≤z≤100，单位：m），底部半径是多少？', choices:[{text:'100m',correct:true,knowledge:'数学·解析几何（上海高考）：立体几何中截面问题，z=100代入方程得截面圆方程x²+y²=R²。'},{text:'10m',correct:false},{text:'200m',correct:false},{text:'50m',correct:false}] },
    { subject:'数学', text:'工程进度管理中，土方施工量按等差数列递增：第一天挖100m³，之后每天多挖20m³。第n天完成的总量是多少？', choices:[{text:'Sₙ=n[2×100+(n-1)×20]/2=10n(10+n)',correct:true,knowledge:'数学·数列（上海高考）：等差前n项和Sₙ=n(a₁+aₙ)/2=n[2a₁+(n-1)d]/2。上海高考数列题常与实际应用结合。'},{text:'100+20(n-1)',correct:false},{text:'100n+20',correct:false},{text:'100×20^(n-1)',correct:false}] },
    { subject:'数学', text:'风荷载作用下，高楼的摆动位移d(t)=Asin(ωt)，最大位移为0.5m，周期为4秒。t=1s时的位移是多少？', choices:[{text:'0.5m',correct:true,knowledge:'数学·三角函数（上海高考）：正弦函数模型y=Asin(ωx+φ)，振幅A、角频率ω=2π/T。上海高考数学常考三角函数建模。'},{text:'0.25m',correct:false},{text:'0m',correct:false},{text:'0.35m',correct:false}] },
    { subject:'数学', type:'fill', text:'复数z=(1+i)/(1-i)的模|z|=______。', answer:'1', answers:['1'], knowledge:'数学·复数（上海高考）：|z₁/z₂|=|z₁|/|z₂|。|1+i|=√2，|1-i|=√2，故模为1。上海高考数学复数属基本计算题。' },
    // --- 新增物理题 ---
    { subject:'物理', text:'桥梁设计中使用钢索承担拉力。一根截面积S=10cm²的钢索承受F=2×10⁵N的拉力，产生的应力是？（注意单位换算）', choices:[{text:'200MPa',correct:true,knowledge:'物理·力学（沪教版·等级考）：应力σ=F/S，单位Pa=N/m²。10cm²=10×10⁻⁴m²。这是工程力学的核心计算。'},{text:'2×10⁶Pa',correct:false},{text:'2×10⁴Pa',correct:false},{text:'2000Pa',correct:false}] },
    { subject:'物理', text:'大楼避雷针的工作原理是利用了哪种物理现象？', choices:[{text:'尖端放电',correct:true,knowledge:'物理·静电（沪教版·等级考）：导体表面电荷密度与曲率半径成反比（尖端效应），尖端电场强度最大。上海等级考常考静电防护的实际应用。'},{text:'电磁感应',correct:false},{text:'热电效应',correct:false},{text:'光电效应',correct:false}] }
  ],
  cyberpunk: [
    { subject:'数学', text:'你设计量子计算机纠错码。每个量子比特出错概率0.1%，采用"三比特重复码"后逻辑比特的出错概率是？', choices:[{text:'约0.0003%',correct:true,knowledge:'数学·概率：三比特重复码可容忍1个比特出错。≥2个出错时才会出错，P≈C(3,2)p²=3p²。'},{text:'约0.1%',correct:false},{text:'约0.01%',correct:false},{text:'约1%',correct:false}] },
    { subject:'数学', text:'你设计的地下城市穹顶是半球体，半径500m。计算内表面需涂多少防护涂料，应算什么？', choices:[{text:'球表面积的一半',correct:true,knowledge:'数学·几何：半球体表面积（不含底面）=2πr²。穹顶内表面即半球体的内表面。'},{text:'球的整个表面积',correct:false},{text:'圆的面积πr²',correct:false},{text:'半球体积的一半',correct:false}] },
    { subject:'物理', text:'你设计反重力引擎——抵消100吨飞船的重力。需提供多少向上的力？（g=9.8m/s²）', choices:[{text:'约980,000N',correct:true,knowledge:'物理·力学：F=mg，抵消重力需大小相等方向相反的力。'},{text:'980N',correct:false},{text:'9,800N',correct:false},{text:'98,000,000N',correct:false}] },
    { subject:'物理', text:'城市能源来自轨道太阳能电站，通过微波传输。发射功率1GW，传输效率60%，接收端获得多少功率？', choices:[{text:'600MW',correct:true,knowledge:'物理·能源传输：微波无线输电受波束发散、大气吸收影响。'},{text:'1GW',correct:false},{text:'60MW',correct:false},{text:'0.6W',correct:false}] },
    // --- 新增数学题 ---
    { subject:'数学', text:'在设计空间电梯（太空电梯）时，缆绳需要从地球同步轨道（约36000km高处）延伸到地面。缆绳张力T(x)随高度x的变化满足微分方程dT/dx=-ρ(x)g(x)，其中ρ(x)是密度函数、g(x)是重力加速度。若假设g=常数，ρ=常数，T(h)=0（顶端自由），则地面处张力T(0)=？', choices:[{text:'T(0)=ρgh',correct:true,knowledge:'数学·微分方程（上海高考·定积分应用）：T(h)-T(0)=∫₀ʰ(-ρg)dx=-ρgh，所以T(0)=ρgh。等于是缆绳的总重量。'},{text:'T(0)=ρgh/2',correct:false},{text:'T(0)=0',correct:false},{text:'T(0)=ρgh²',correct:false}] },
    { subject:'数学', text:'火星城市建设中需要对资源进行优化分配。你有a元预算，用于建造水循环系统（单位成本m元，效益函数U=n₁ln(w)）和氧气生产系统（单位成本n元，效益函数V=n₂ln(q)）。在预算约束下最大化总效益，这种问题属于？', choices:[{text:'条件极值问题',correct:true,knowledge:'数学·最优化（上海高考·导数应用）：带约束的最优化→构造拉格朗日函数L=U(m)+V(n)+λ(a-mw-nq)，求偏导联立求解。上海高考导数部分涉及最值应用题。'},{text:'线性规划问题',correct:false},{text:'概率统计中的假设检验',correct:false},{text:'数列的极限问题',correct:false}] },
    { subject:'数学', text:'【多选】关于向量，以下说法正确的有？', multi:true, choices:[{text:'a⊥b的充要条件是a·b=0',correct:true,knowledge:'数学·向量（上海高考）：向量坐标运算、数量积、向量垂直/平行的判定条件是高考必考内容。'},{text:'|a+b|≤|a|+|b|，等号成立当且仅当a与b同向',correct:true},{text:'向量a在b方向上的投影为(a·b)/|b|',correct:true},{text:'任意两个向量都可以相加得到新的向量',correct:false}] },
    { subject:'数学', type:'fill', text:'若随机变量X服从二项分布B(10, 0.3)，则X的方差D(X)=______。', answer:'2.1', answers:['2.1'], knowledge:'数学·概率统计（上海高考）：二项分布B(n,p)的方差D(X)=np(1-p)=10×0.3×0.7=2.1。' },
    // --- 新增物理题 ---
    { subject:'物理', text:'太空电梯的缆绳在接近地球同步轨道高度时需要承受极大张力，材料必须具有极高的比强度（强度/密度）。碳纳米管的抗拉强度可达约63GPa，密度约1.3g/cm³。若缆绳长度为36000km，其在地面端的应力约为？（假设g=10m/s²，不计材料自重变化）', choices:[{text:'约468GPa',correct:true,knowledge:'物理·力学（沪教版·等级考）：均匀缆绳自重产生的最大应力在悬挂点处，σ=ρLg。目前尚无材料能满足太空电梯的强度要求。'},{text:'约46.8GPa',correct:false},{text:'约4.68GPa',correct:false},{text:'约4680GPa',correct:false}] },
    { subject:'物理', text:'火星基地使用核电池（放射性同位素热电发生器RTG），将Pu-238衰变产生的热能通过热电偶直接转换为电能。其中的热电偶利用了哪种物理效应？', choices:[{text:'塞贝克效应',correct:true,knowledge:'物理·热学/电磁学（沪教版·等级考）：塞贝克效应（1821年发现）是热电偶和RTG的核心原理，属于热能与电能的直接转换。上海等级考涉及能源转换技术。'},{text:'光电效应',correct:false},{text:'霍尔效应',correct:false},{text:'多普勒效应',correct:false}] },
    { subject:'物理', text:'为保护火星基地免受宇宙射线（主要是高能质子）伤害，需要电磁屏蔽。以下方案中最可行的原理是？', choices:[{text:'利用磁场使带电粒子偏转',correct:true,knowledge:'物理·电磁学（沪教版·等级考）：洛伦兹力始终垂直于速度方向，不做功，使带电粒子在磁场中做匀速圆周运动。这是主动屏蔽高能粒子的原理方案。'},{text:'用厚重的铅板物理阻挡',correct:false},{text:'用激光直接射毁宇宙射线粒子',correct:false},{text:'用声波干扰粒子运动轨迹',correct:false}] },
    { subject:'物理', type:'fill', text:'已故物理学家______提出了"戴森球"概念——一个包围恒星的巨大结构用以收集恒星的全部能量输出，达到Kardashev尺度Ⅱ型文明的水平。', answer:'戴森', answers:['戴森','Freeman Dyson','弗里曼·戴森'], knowledge:'物理·天体物理（拓展）：Kardashev文明尺度——Ⅰ型(行星级)、Ⅱ型(恒星级)、Ⅲ型(星系级)。戴森球是Ⅱ型文明的标志性构想。' }
  ]
};


/* ============================================================
   第二部分补充：年级标注 & 补充题库
   题目按上海教材年级分布标注：高一(必修)、高二(选择性必修)、高三(等级考/高考)
   未标注的题目默认视为高三（可在任意学段使用）
   ============================================================ */
var _gradesInitDone = false;
function initAllGrades() {
    if (_gradesInitDone) return;
    _gradesInitDone = true;
    // ======= 👨‍🌾 农民（化学+政治）年级标注 =======
    var fh = QUESTIONS.farmer.history, fm = QUESTIONS.farmer.modern, fc = QUESTIONS.farmer.cyberpunk;
    var gh = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高三'];
    for (var i=0;i<gh.length&&i<fh.length;i++) fh[i].grade=gh[i];
    var gm = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高二','高三','高三'];
    for (var i=0;i<gm.length&&i<fm.length;i++) fm[i].grade=gm[i];
    var gc = ['高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高二','高二','高三'];
    for (var i=0;i<gc.length&&i<fc.length;i++) fc[i].grade=gc[i];

    // ======= 📰 记者（语文+英语）年级标注 =======
    var jh = QUESTIONS.journalist.history, jm = QUESTIONS.journalist.modern, jc = QUESTIONS.journalist.cyberpunk;
    var jgh = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二'];
    for (var i=0;i<jgh.length&&i<jh.length;i++) jh[i].grade=jgh[i];
    var jgm = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高三'];
    for (var i=0;i<jgm.length&&i<jm.length;i++) jm[i].grade=jgm[i];
    var jgc = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高三','高三'];
    for (var i=0;i<jgc.length&&i<jc.length;i++) jc[i].grade=jgc[i];

    // ======= 💉 医生（生物+地理）年级标注 =======
    var dh = QUESTIONS.doctor.history, dm = QUESTIONS.doctor.modern, dc = QUESTIONS.doctor.cyberpunk;
    var dgh = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高三'];
    for (var i=0;i<dgh.length&&i<dh.length;i++) dh[i].grade=dgh[i];
    var dgm = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高二','高二','高二','高二','高三'];
    for (var i=0;i<dgm.length&&i<dm.length;i++) dm[i].grade=dgm[i];
    var dgc = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高二','高二','高二','高三','高三'];
    for (var i=0;i<dgc.length&&i<dc.length;i++) dc[i].grade=dgc[i];

    // ======= 💻 程序员（信息科技+历史）年级标注 =======
    var ph = QUESTIONS.programmer.history, pm = QUESTIONS.programmer.modern, pc = QUESTIONS.programmer.cyberpunk;
    var pgh = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高三'];
    for (var i=0;i<pgh.length&&i<ph.length;i++) ph[i].grade=pgh[i];
    var pgm = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高二','高三','高三'];
    for (var i=0;i<pgm.length&&i<pm.length;i++) pm[i].grade=pgm[i];
    var pgc = ['高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高二','高二'];
    for (var i=0;i<pgc.length&&i<pc.length;i++) pc[i].grade=pgc[i];

    // ======= 🔧 工程师（数学+物理）年级标注 =======
    var eh = QUESTIONS.engineer.history, em = QUESTIONS.engineer.modern, ec = QUESTIONS.engineer.cyberpunk;
    var egh = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高三'];
    for (var i=0;i<egh.length&&i<eh.length;i++) eh[i].grade=egh[i];
    var egm = ['高一','高一','高一','高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高二','高二','高三','高三'];
    for (var i=0;i<egm.length&&i<em.length;i++) em[i].grade=egm[i];
    var egc = ['高一','高一','高一','高一','高一','高一','高二','高二','高二','高二','高三','高三','高三','高三'];
    for (var i=0;i<egc.length&&i<ec.length;i++) ec[i].grade=egc[i];

    // ============ 🆕 补充题目（按年级×职业×时代添加） ============
    // --- 农民·高一补充 ---
    QUESTIONS.farmer.history.push(
        { grade:'高一', subject:'化学', text:'你发现酸性土壤(pH≈4.5)中作物长势差。以下关于溶液酸碱性的描述正确的是？', choices:[{text:'pH=4.5的溶液中，c(H⁺)=10⁻⁴·⁵≈3.16×10⁻⁵mol/L',correct:true,knowledge:'化学·pH定义（高一·必修）：pH=-lg[H⁺]，pH相差1则[H⁺]相差10倍。'},{text:'pH越小溶液碱性越强',correct:false},{text:'pH=7的溶液一定是纯水',correct:false},{text:'pH试纸可以精确读取到小数点后两位',correct:false}] }
    );
    QUESTIONS.farmer.modern.push(
        { grade:'高一', subject:'化学', text:'氨气(NH₃)是合成氮肥的重要原料。关于NH₃的性质，以下说法错误的是？', choices:[{text:'NH₃是无色无味的气体',correct:true,knowledge:'化学·氨的性质（高一·必修）：NH₃是无色、有强烈刺激性气味的气体，密度小于空气，极易溶于水(1体积水溶解约700体积NH₃)。'},{text:'NH₃溶于水呈碱性',correct:false},{text:'NH₃可与HCl反应生成NH₄Cl白烟',correct:false},{text:'NH₃的电子式中N有一对孤对电子',correct:false}] },
        { grade:'高一', subject:'政治', text:'中国特色社会主义最本质的特征是（　）。', choices:[{text:'中国共产党领导',correct:true,knowledge:'政治·必修1（高一）：中国特色社会主义最本质的特征是中国共产党的领导。'},{text:'以经济建设为中心',correct:false},{text:'人民当家作主',correct:false},{text:'全面依法治国',correct:false}] }
    );
    QUESTIONS.farmer.cyberpunk.push(
        { grade:'高一', subject:'政治', text:'中国梦的本质是（　）。', choices:[{text:'国家富强、民族振兴、人民幸福',correct:true,knowledge:'政治·必修1（高一）：中国梦的本质是国家富强、民族振兴、人民幸福。'},{text:'经济发展、科技进步、文化繁荣',correct:false},{text:'社会和谐、生态良好、法治健全',correct:false},{text:'教育公平、医疗完善、养老保障',correct:false}] }
    );

    // --- 农民·高二补充 ---
    QUESTIONS.farmer.history.push(
        { grade:'高二', subject:'化学', text:'配制一定物质的量浓度的NaOH溶液时，以下操作会导致浓度偏高的是？', choices:[{text:'定容时俯视刻度线',correct:true,knowledge:'化学·一定物质的量浓度配制（高二·选择性必修）：俯视→V偏小→c偏高；仰视→V偏大→c偏低。'},{text:'定容时仰视刻度线',correct:false},{text:'未洗涤烧杯和玻璃棒',correct:false},{text:'称量时砝码放在左盘',correct:false}] }
    );
    QUESTIONS.farmer.modern.push(
        { grade:'高二', subject:'化学', text:'Na₂CO₃溶液中，各离子浓度大小关系正确的是？', choices:[{text:'c(Na⁺)>c(CO₃²⁻)>c(OH⁻)>c(HCO₃⁻)>c(H⁺)',correct:true,knowledge:'化学·离子浓度比较（高二·选择性必修）：强碱弱酸盐中，阳离子浓度最大，酸根离子因水解稍减少。'},{text:'c(Na⁺)>c(OH⁻)>c(CO₃²⁻)>c(H⁺)',correct:false},{text:'c(CO₃²⁻)>c(Na⁺)>c(OH⁻)>c(H⁺)',correct:false},{text:'c(Na⁺)=2c(CO₃²⁻)',correct:false}] },
        { grade:'高二', subject:'政治', text:'（　）是决定当代中国命运的关键一招。', choices:[{text:'改革开放',correct:true,knowledge:'政治·必修1（高一/高二）：改革开放是决定当代中国命运的关键一招。'},{text:'科技创新',correct:false},{text:'党的领导',correct:false},{text:'市场经济',correct:false}] }
    );

    // --- 农民·高三补充 ---
    QUESTIONS.farmer.cyberpunk.push(
        { grade:'高三', subject:'化学', text:'氢氧化铁的Ksp=4.0×10⁻³⁸。某溶液中c(Fe³⁺)=0.01mol/L，开始沉淀Fe(OH)₃的pH约为？（lg2=0.3）', choices:[{text:'pH≈2.2',correct:true,knowledge:'化学·沉淀溶解平衡（高三·等级考）：Ksp=[Fe³⁺][OH⁻]³，利用Ksp计算开始沉淀的pH。'},{text:'pH≈7',correct:false},{text:'pH≈10',correct:false},{text:'pH≈5',correct:false}] }
    );

    // --- 记者·高一补充 ---
    QUESTIONS.journalist.history.push(
        { grade:'高一', subject:'语文', type:'fill', text:'"学而不思则罔，思而不学则______"出自《论语·为政》。', answer:'殆', answers:['殆'], knowledge:'语文·文言名句（高一·必修）：《论语》十二章是高一必修篇目。' }
    );
    QUESTIONS.journalist.modern.push(
        { grade:'高一', subject:'英语', text:'Which of the following sentences is grammatically CORRECT?', choices:[{text:'She has been working here since 2020.',correct:true,knowledge:'英语·时态（高一·语法）：现在完成进行时 have/has been doing 表示从过去开始持续到现在的动作。'},{text:'She has worked here since five years.',correct:false},{text:'She is working here since 2020.',correct:false},{text:'She worked here since 2020.',correct:false}] }
    );
    QUESTIONS.journalist.cyberpunk.push(
        { grade:'高一', subject:'英语', type:'fill', text:'Artificial Intelligence ______ (缩写为AI) is transforming the media industry.', answer:'abbreviated', answers:['abbreviated','shortened'], knowledge:'英语·词汇（高一）：abbreviated as = 缩写为，被动语态。' }
    );

    // --- 记者·高二补充 ---
    QUESTIONS.journalist.history.push(
        { grade:'高二', subject:'英语', text:'"If I ________ you, I would accept the offer." The correct verb form is:', choices:[{text:'were',correct:true,knowledge:'英语·虚拟语气（高二·语法重点）：与现在事实相反的假设，条件句用动词过去式(be用were)，主句用would+动词原形。'},{text:'was',correct:false},{text:'am',correct:false},{text:'had been',correct:false}] }
    );

    // --- 记者·高三补充 ---
    QUESTIONS.journalist.modern.push(
        { grade:'高三', subject:'语文', text:'以下关于《红楼梦》中人物判词的描述，正确的是？', choices:[{text:'"可叹停机德，堪怜咏絮才。玉带林中挂，金簪雪里埋"',correct:true,knowledge:'语文·整本书阅读（高三·高考）：《红楼梦》第五回金陵十二钗判词，是理解全书人物命运的关键。'},{text:'"可叹停机德"指的是王熙凤',correct:false},{text:'"玉带林中挂"指的是贾探春',correct:false},{text:'判词是《红楼梦》第一回的内容',correct:false}] }
    );

    // --- 医生·高一补充 ---
    QUESTIONS.doctor.history.push(
        { grade:'高一', subject:'生物', text:'人体血液中葡萄糖的正常浓度约为0.1%。从细胞角度，葡萄糖进入红细胞的方式是？', choices:[{text:'协助扩散',correct:true,knowledge:'生物·物质跨膜运输（高一·必修1）：协助扩散不消耗ATP，依赖载体蛋白，顺浓度梯度。主动运输消耗ATP。'},{text:'自由扩散',correct:false},{text:'主动运输',correct:false},{text:'胞吞作用',correct:false}] }
    );
    QUESTIONS.doctor.modern.push(
        { grade:'高一', subject:'地理', text:'你在中国某地建立了一座野战医院。该地夏季高温多雨、冬季温和少雨，植被为亚热带常绿阔叶林。该地气候类型是？', choices:[{text:'亚热带季风气候',correct:true,knowledge:'地理·中国气候类型（高一·必修1）：亚热带季风气候夏季高温多雨(东南季风)，冬季温和少雨(西北季风)。'},{text:'温带季风气候',correct:false},{text:'热带季风气候',correct:false},{text:'温带大陆性气候',correct:false}] }
    );

    // --- 医生·高二补充 ---
    QUESTIONS.doctor.history.push(
        { grade:'高二', subject:'生物', text:'DNA复制时，新的DNA链是以什么方向合成的？', choices:[{text:'5\'→3\'方向',correct:true,knowledge:'生物·DNA复制（高二·必修2）：DNA双链反向平行，复制时前导链连续合成，后随链不连续（冈崎片段）。'},{text:'3\'→5\'方向',correct:false},{text:'两个方向都可以',correct:false},{text:'没有固定方向',correct:false}] }
    );

    // --- 医生·高三补充 ---
    QUESTIONS.doctor.cyberpunk.push(
        { grade:'高三', subject:'生物', text:'某蛋白质由200个氨基酸组成（含2条肽链），合成过程中脱去的水分子数是多少？', choices:[{text:'198个',correct:true,knowledge:'生物·蛋白质合成（高三·等级考）：n个氨基酸形成m条肽链，脱去(n-m)个水分子，形成(n-m)个肽键。'},{text:'200个',correct:false},{text:'199个',correct:false},{text:'196个',correct:false}] }
    );

    // --- 程序员·高一补充 ---
    QUESTIONS.programmer.history.push(
        { grade:'高一', subject:'信息科技', text:'以下Python代码：<br><code>for i in range(1, 6):\n    if i==3: continue\n    print(i, end=" ")</code><br>输出结果是什么？', choices:[{text:'1 2 4 5',correct:true,knowledge:'信息科技·Python循环控制（高一·必修1）：continue跳过当前迭代；break退出整个循环。range(1,6)生成1~5。'},{text:'1 2 3 4 5',correct:false},{text:'1 2',correct:false},{text:'1 2 4 5 6',correct:false}] }
    );
    QUESTIONS.programmer.modern.push(
        { grade:'高一', subject:'历史', text:'中国共产党的成立时间是（　）。', choices:[{text:'1921年7月',correct:true,knowledge:'历史·中共党史（高一·纲要上）：1921年7月中共一大在上海召开，标志着中国共产党的诞生。'},{text:'1919年5月',correct:false},{text:'1927年8月',correct:false},{text:'1949年10月',correct:false}] }
    );

    // --- 程序员·高二补充 ---
    QUESTIONS.programmer.modern.push(
        { grade:'高二', subject:'信息科技', text:'有一个栈（Stack），依次执行 push(1), push(2), pop(), push(3), pop(), pop()。栈的弹出序列是？', choices:[{text:'2, 3, 1',correct:true,knowledge:'信息科技·数据结构（高二·选择性必修）：栈(stack)=后进先出(LIFO)。push(1,2)→[1,2], pop→出2, push(3)→[1,3], pop→出3, pop→出1。'},{text:'1, 2, 3',correct:false},{text:'2, 1, 3',correct:false},{text:'1, 3, 2',correct:false}] }
    );

    // --- 程序员·高三补充 ---
    QUESTIONS.programmer.cyberpunk.push(
        { grade:'高三', subject:'信息科技', text:'一个长度为n的有序数组，使用二分查找(Binary Search)算法，最坏情况下的时间复杂度是？', choices:[{text:'O(log n)',correct:true,knowledge:'信息科技·算法复杂度（高三·等级考）：二分查找每步比较将区间减半，最坏比较次数为⌈log₂(n+1)⌉。'},{text:'O(n)',correct:false},{text:'O(n²)',correct:false},{text:'O(1)',correct:false}] }
    );

    // --- 工程师·高一补充 ---
    QUESTIONS.engineer.history.push(
        { grade:'高一', subject:'物理', text:'一辆重2吨的卡车以36km/h的速度行驶，其动能是多少？', choices:[{text:'100000J',correct:true,knowledge:'物理·动能（高一·必修2）：Ek=½mv²，注意单位换算36km/h=36000/3600=10m/s。'},{text:'50000J',correct:false},{text:'200000J',correct:false},{text:'10000J',correct:false}] }
    );
    QUESTIONS.engineer.modern.push(
        { grade:'高一', subject:'数学', text:'若集合A={x|x²-5x+6=0}，则集合A中的元素是？', choices:[{text:'{2,3}',correct:true,knowledge:'数学·集合（高一·必修1）：一元二次方程的根构成集合。集合表示法：列举法{2,3}。'},{text:'{1,6}',correct:false},{text:'{1,5}',correct:false},{text:'{-2,-3}',correct:false}] }
    );

    // --- 工程师·高二补充 ---
    QUESTIONS.engineer.history.push(
        { grade:'高二', subject:'物理', text:'一根导线在匀强磁场中以速度v做切割磁力线运动。产生感应电动势的大小取决于？', choices:[{text:'磁感应强度B、导线长度L、速度v及B与v的夹角',correct:true,knowledge:'物理·电磁感应（高二·选择性必修）：导体切割磁力线产生的感应电动势E=BLv·sinθ，方向由右手定则判定。'},{text:'只取决于磁感应强度B',correct:false},{text:'只取决于导线运动速度v',correct:false},{text:'只取决于导线长度L',correct:false}] }
    );

    // --- 工程师·高三补充 ---
    QUESTIONS.engineer.cyberpunk.push(
        { grade:'高三', subject:'数学', text:'lim(x→0) sin(3x)/x 的值为？', choices:[{text:'3',correct:true,knowledge:'数学·极限（高三·高考复习）：重要极限lim(x→0) sinx/x=1的推广。sin(3x)/x=3·sin(3x)/(3x)→3×1=3。'},{text:'1',correct:false},{text:'0',correct:false},{text:'1/3',correct:false}] },
        { grade:'高三', subject:'物理', text:'某放射性元素半衰期为5天。经过15天后，剩余的质量是原来的几分之几？', choices:[{text:'1/8',correct:true,knowledge:'物理·原子核物理（高三·等级考）：半衰期T½，经过nT½后剩余量为初始的(½)ⁿ。'},{text:'1/3',correct:false},{text:'1/6',correct:false},{text:'1/4',correct:false}] }
    );
}

/* ============================================================
   第二部分：回合制游戏引擎（源自 game(2).js 逻辑）
   ============================================================ */

// 关卡时代列表
var ERA_KEYS = ['history', 'modern', 'cyberpunk'];
var ERA_NAMES = ['回望历史', '当代风云', '赛博未来'];
var ERA_EMOJI = ['📜', '🌐', '🤖'];
var ERA_YEARS = ['1950s-1970s', '1990s-2050s', '2080s'];

/* ========== 每道题情景注入器：运行时为每题生成时代情景 ==========
     每道题在加载时自动获得基于职业、时代、学科的场景叙述，
     同一时代的题目之间形成连续叙事感。
     ============================================================ */
function buildQuestionContexts() {
  var careerKeys = Object.keys(QUESTIONS);
  var eraKeys = ['history','modern','cyberpunk'];
  var timeWords = ['起初','接着','随后','这时','然后','不久','此刻','正在此时','恰在此时','忽然','终于','最后','与此同时','转瞬间','紧接着','片刻之后'];

  // ========== 关键词 → 情景映射表 ==========
  var kwScenes = [
    // ---- 化学 ----
    { kw:['氮肥','尿素','碳铵','NH₄','铵态'], scene:'你蹲在田头看着发黄的庄稼叶子——老农说缺氮肥了。你捏起一小撮化肥在指尖碾了碾，琢磨着该用哪一种。' },
    { kw:['生石灰','CaO','酸碱','pH','酸性土壤'], scene:'你抓起一把略带酸味的泥土凑到鼻尖，决定用生石灰来调理土壤的酸碱度。' },
    { kw:['草木灰','K₂CO₃','钾肥'], scene:'你从灶膛里掏出草木灰撒到菜地里，白色的粉末在晨光中纷纷扬扬。' },
    { kw:['Mg²⁺','镁','Mg','离子检验','除杂'], scene:'你对着试管里泛着浑浊的溶液皱起眉头——里面的镁离子杂质需要想办法分离出来。' },
    { kw:['铁锈','腐蚀','电化学','Fe','铁质农具'], scene:'你拿起那把锈迹斑斑的锄头，用手指刮了刮上面的铁锈——铁的腐蚀问题该从化学角度解决了。' },
    { kw:['复合肥','磷酸二铵','NH₄H₂PO₄','N-P-K'], scene:'你蹲在化肥堆前对比着几袋复合肥包装上的配方表，盘算着哪一种最适合自家的地。' },
    { kw:['气肥','CO₂','光合作用','大棚'], scene:'你弯腰走进塑料大棚，闷热的空气中似乎能感觉到蔬菜们在呼唤更多的二氧化碳。' },
    { kw:['水华','富营养化','过磷酸钙','藻类'], scene:'你站在漂满绿藻的池塘边，水面上泛着一层油腻的光——过量肥料流入水体了。' },
    { kw:['pH计算','稀释','酸碱'], scene:'你拿着pH试纸和比色卡蹲在田头，对照着颜色读取土壤浸出液的酸碱度。' },
    { kw:['容量瓶','滴定','定容','配制'], scene:'你深吸一口气，手指稳稳地握着容量瓶的瓶颈——这精确的配比容不得半点马虎。' },
    { kw:['沉淀','Ksp','溶度积','分步沉淀'], scene:'你看着试管中逐渐生成的沉淀，心里计算着不同离子开始沉淀的临界pH值。' },
    { kw:['催化剂','反应速率','活化能','酶'], scene:'你在实验记录本上画着反应进程曲线，思考着如何用催化剂来加快这个反应。' },
    { kw:['PLA','聚乳酸','缩聚','生物降解'], scene:'你举起一片半透明的地膜对着光看——这种新材料用完就能在土壤里自然分解。' },
    { kw:['营养素','微量元素','Zn²⁺','Cu²⁺'], scene:'你盯着营养液分析报告上的数据，锌和铜的浓度已经快到临界值了。' },
    { kw:['盐类水解','水解'], scene:'你将一勺白色粉末溶入水中，用pH试纸测试后发现溶液呈碱性——盐类水解的原理在你脑海中浮现。' },
    // ---- 政治 ----
    { kw:['土地改革','土地法'], scene:'你仔细看着那张盖了红印的土地证，心里盘算着从今往后该怎么经营这片属于自己的地。' },
    { kw:['十一届三中全会','改革开放'], scene:'会议室的广播里传出一个重大的消息，你停下手中的活计侧耳倾听——一个新的时代开始了。' },
    { kw:['家庭联产承包','包产到户','责任田'], scene:'你颤抖着在承包合同上按下手印，知道从此以后种多收少全凭自己的双手了。' },
    { kw:['三大改造','社会主义改造'], scene:'村里开大会宣布要搞合作化，你坐在人群中一边听一边想着未来的日子会变成什么样。' },
    { kw:['社会主义市场经济','南方谈话','十四大','市场决定性'], scene:'你坐在电视机前听着新闻里传来的新提法，虽然不完全懂，但隐约觉得脚下的路正在转向。' },
    { kw:['社会矛盾','美好生活','不平衡'], scene:'你回想了一下这些年生活的变化——吃饱穿暖已经不再是问题了，新的问题出现在了更远的地方。' },
    { kw:['习近平新时代中国特色社会主义思想','中国梦','新时代'], scene:'你翻看着学习材料上那些精辟的论述，思考着这个新时代对你意味着什么。' },
    { kw:['脱贫攻坚','精准扶贫'], scene:'你翻开村里的扶贫台账，看着一家家脱贫的记录，心想这场战役终于看到了胜利的曙光。' },
    { kw:['绿水青山','金山银山','生态文明'], scene:'你站在山坡上望着远处冒烟的工厂和近处清澈的溪流，两种颜色在眼前交织。' },
    // ---- 语文 ----
    { kw:['新闻','通讯稿','消息','导语','倒金字塔'], scene:'你坐在打字机前对着稿纸发呆——这条导语改了五遍还是不满意。' },
    { kw:['汉字简化','简化字'], scene:'你翻开国务院刚发布的汉字简化方案，发现不少字跟以前写的不太一样了。' },
    { kw:['成语','差强人意'], scene:'你在稿子里用了一个成语，旁边的年轻编辑投来疑惑的目光——看来有人理解错了。' },
    { kw:['修辞','对偶','比喻','排比'], scene:'你反复读着自己写的那句话，总觉得少了点文采，于是翻开修辞手册找灵感。' },
    { kw:['病句','语病','主语残缺','修改'], scene:'你把自己刚写的段落从头到尾念出声来，念到一半停了下来——这句话的语法有问题。' },
    { kw:['《论语》','孔子','古诗文','文学常识'], scene:'你翻开泛黄的书页，上面那些跨越千年的文字依然透着智慧的光芒。' },
    { kw:['议论文','论证','举例论证','道理论证'], scene:'你在笔记本上画出论证的框架图，确保每一个论据都能稳稳地支撑起中心论点。' },
    { kw:['AI','人工智能','深度阅读','信息碎片'], scene:'你面对着海量的信息流，却越发觉得深度的思考比快速的获取更加珍贵。' },
    // ---- 英语 ----
    { kw:['long shot','习语','习惯用语','break the ice','think outside','read between'], scene:'你听到对方嘴里蹦出一个没学过的英文习语，大脑飞速转动着猜测它的含义。' },
    { kw:['bring about','短语动词','动词搭配'], scene:'你斟酌着这个句子的谓语动词——这个词组用在这里到底恰不恰当？' },
    { kw:['非谓语','分词','不定式','to do','-ing','-ed'], scene:'你盯着这个长句分析着非谓语动词的成分——主被动关系和时态顺序都必须准确。' },
    { kw:['虚拟语气','had it not been','if I were','would have'], scene:'你默念着这个假设句的结构——英语里的虚拟语气总是要仔细琢磨时态的配合。' },
    { kw:['GDP','经济报道','名词','数据'], scene:'你浏览着刚出炉的经济数据，寻找那个最精准的动词来描述增长的趋势。' },
    // ---- 生物 ----
    { kw:['夜盲','维生素A','营养不良'], scene:'你看着那个在昏暗光线中摸索的孩子，心里大致明白了病因——缺了某种关键的维生素。' },
    { kw:['青霉素','抗生素','细菌','细胞壁'], scene:'你从药箱里取出一小瓶青霉素，瓶身上贴着的手写标签字迹已经开始模糊了。' },
    { kw:['甲状腺肿','碘','缺碘'], scene:'你注意到这个村子的不少村民颈部都有不同程度的肿起——一种微量元素缺乏的典型表现。' },
    { kw:['疟疾','疟原虫','按蚊','传播'], scene:'你在显微镜下仔细寻找着那个单细胞的寄生虫——如果找到了，诊断就不再是猜测。' },
    { kw:['疫苗','免疫','抗体','记忆细胞','牛痘'], scene:'你打开疫苗冷藏箱，冰冷的白色蒸汽从缝隙中溢出——这一针下去，能唤起身体的免疫记忆。' },
    { kw:['DNA','RNA','遗传','基因','转录','复制','碱基'], scene:'你盯着屏幕上那双螺旋结构的影像，手指在键盘上敲下分析指令。' },
    { kw:['CRISPR','Cas9','基因编辑'], scene:'你在基因编辑系统的操作界面输入靶点序列——这把分子剪刀必须切在完全正确的位置。' },
    { kw:['遗传病','系谱','显性','隐性','患病概率'], scene:'你在纸上画着这个家族的遗传系谱图，试图找出致病基因的传递规律。' },
    { kw:['单克隆抗体','杂交瘤','融合','细胞工程'], scene:'你在培养皿旁观察着融合细胞的生长状况——这株杂交瘤必须在正确的时间被筛选出来。' },
    { kw:['光合作用','叶绿体','光反应','暗反应','卡尔文'], scene:'你透过显微镜观察着叶绿体的结构，那些叠起来的类囊体膜是光能转化的战场。' },
    { kw:['纳米机器人','免疫','靶向','载体'], scene:'你举起那管微微泛着荧光的纳米药液——它们要穿过重重屏障，精确找到病灶。' },
    { kw:['意识上传','神经','大脑','神经科学'], scene:'你思考着一个终极问题：如果意识只是神经信号的集合，那"自我"又在哪里？' },
    // ---- 地理 ----
    { kw:['甲状腺肿','缺碘','碘','海洋'], scene:'你对照着中国地图和地方病分布图，发现了一个清晰的规律——离海越远发病率越高。' },
    { kw:['气候','季风','降水','温度带','大陆性'], scene:'你站在田里感受着风向的变化——干冷的北风和湿热的南风之间，藏着这片土地的密码。' },
    { kw:['GIS','地理信息','空间分析','热力图'], scene:'你在电脑上打开GIS软件的界面，加载病例数据的图层，热力图在屏幕上缓缓铺开。' },
    { kw:['流行','传播','病毒','检疫','疾控'], scene:'你放大地图看着新增病例的分布点，它们像是在地图上画出了一条隐约的传播路径。' },
    { kw:['城市化','人口','城市','医疗资源'], scene:'你走在拥挤的城市街道上，身边是川流不息的人群——高密度的城市既是文明的结晶也是风险的温床。' },
    { kw:['全球变暖','气候变暖','温带','热带','登革热'], scene:'你翻阅着几十年的气温记录和疾病监测数据，两条曲线都在缓缓上升。' },
    { kw:['海平面上升','沿海','海上城市','选址'], scene:'你展开海床地形图，寻找着那片水深适宜、地质稳定的理想区域。' },
    { kw:['火星','低重力','骨密度','太空'], scene:'你看着刚从火星发回的宇航员体检报告——骨密度的下降速度比预想中更快。' },
    // ---- 信息科技 ----
    { kw:['103机','电子管','第一代','穿孔纸带','计算机史'], scene:'你站在那台占满整面墙壁的庞然大物前，机器的散热让整个房间像一座蒸笼。' },
    { kw:['二进制','编码','布尔','数据表示'], scene:'你拿着笔在纸上写着只有0和1组成的序列——每一个二进制位都对应着电路的开与关。' },
    { kw:['汇编','助记符','机器语言','指令'], scene:'你在代码纸上写下一行行助记符——这些英文缩写是人和机器之间最原始的对话方式。' },
    { kw:['算法','流程图','有穷性','时间复杂度','O('], scene:'你拿着粉笔在黑板上推演着算法的每一步——一个高效的算法能节省几十倍的运算时间。' },
    { kw:['Session','Cookie','登录','Web'], scene:'你在后端代码中配置着会话管理的参数——用户的每一次访问都需要被正确识别。' },
    { kw:['哈希','密码','加盐','bcrypt','安全'], scene:'你在数据库层的代码后面加上了密码加密的逻辑——同样的密码经过加盐后不再相同。' },
    { kw:['互联网泡沫','.com','数字经济','数据要素'], scene:'你回想着世纪初那场互联网的狂欢与破灭——泡沫破裂后留下的东西才是有价值的。' },
    { kw:['列表推导式','Python','代码'], scene:'你在键盘上敲下一行简洁的列表推导式，旁边的同事探过头来看了你一眼。' },
    { kw:['数据库','主键','外键','约束','规范化','范式'], scene:'你在数据库建模工具中调整着表之间的关系——每一根连线都代表着一道数据约束。' },
    { kw:['图结构','队列','栈','数据结构','社交'], scene:'你在白板上画着实体之间的关系图——选择正确的数据结构能让查询效率成倍提升。' },
    { kw:['量子','Shor','纠错','量子比特'], scene:'你站在量子计算机的操控台前，屏幕上跳动着概率幅的实时数据——这是经典计算做不到的事。' },
    { kw:['AI伦理','价值对齐','可解释性','AGI'], scene:'你面对着AI系统的伦理测试报告，有些问题的答案看起来合理却让人隐约不安。' },
    { kw:['TCP','IP','UDP','协议','三次握手'], scene:'你盯着网络抓包工具中那一行行协议交互数据——三次握手的每一个包都必须准确到达。' },
    // ---- 历史 ----
    { kw:['第三次科技革命','原子能','计算机','空间技术'], scene:'你放下手中那份关于新技术革命的报告，窗外的世界正在以前所未有的速度变化着。' },
    { kw:['1994年','接入互联网','64k','国际专线'], scene:'你坐在机房看着那台刚刚连上国际专线的终端——64k的带宽下，通往世界的门正在打开。' },
    { kw:['两弹一星','原子弹','钱学森','邓稼先','归国科学家'], scene:'你从一份泛黄的档案中读到那些科学家放弃海外优越条件回国的故事，沉默了很久。' },
    { kw:['新四大发明','高铁','扫码','共享','网购'], scene:'你看着手机屏幕上那个小小的支付二维码——几年前还没有人想到它会彻底改变人们的生活方式。' },
    { kw:['大过滤器','费米悖论','宇宙','文明'], scene:'你抬头望着满天繁星——银河系中有上千亿颗恒星，为什么至今没有任何来自外星文明的消息？' },
    { kw:['工业革命','卢德','技术替代','自动化'], scene:'你翻阅着历史上每一次技术革命带来的社会震荡——机器替代人力的故事每一次都在以不同的方式重演。' },
    // ---- 数学 ----
    { kw:['梯形','面积','截面','几何'], scene:'你拿出计算尺，在一张泛黄的图纸上复核着横截面的面积——多算一遍总没有坏处。' },
    { kw:['牛顿冷却','指数','函数模型','冷却'], scene:'你看着温度计的读数逐渐下降——变化的速率本身也在变化，这是一个指数衰减的过程。' },
    { kw:['抛物线','二次函数','顶点','对称轴'], scene:'你在坐标系中描着点，试图找出那条经过所有测量值的最优曲线。' },
    { kw:['定积分','旋转体','体积','积分'], scene:'你翻开高等数学教材，找到旋转体体积的公式——那些微小的截面叠加在一起就构成了整体。' },
    { kw:['不等式','均值','最大','最小','定和'], scene:'你在草稿纸上写下不等式，寻找着在给定条件下的最优解——约束和目标的博弈。' },
    { kw:['导数','求导','微分','f\'('], scene:'你用笔尖指着函数曲线上那一个点的切线方向——导数告诉你变化的速率。' },
    { kw:['等差数列','求和','递推','数列'], scene:'你在纸上列出前几天的数据，看看它们之间是否藏着某种等差或等比的规律。' },
    { kw:['三角函数','正弦','振幅','周期'], scene:'你画出一条波浪形的曲线，测量着波峰和波谷之间的距离——周期和频率互为倒数。' },
    { kw:['复数','模','共轭'], scene:'你在复平面上标出那个点的位置——实数轴和虚数轴的交汇处就是坐标原点。' },
    { kw:['概率','二项分布','方差','期望'], scene:'你计算着这件事发生的概率——虽然数字很小，但并不等于零。' },
    { kw:['极限','lim','趋近'], scene:'你盯着那个越来越接近却永远到达不了的值——极限的概念是微积分的基石。' },
    // ---- 物理 ----
    { kw:['液体压强','p=ρgh','水压','深度'], scene:'你站在大坝底部仰头看着几十米高的坝体——越深的地方承受的压力越大。' },
    { kw:['功','W=mgh','滑轮','机械效率','机械'], scene:'你拉着滑轮的绳索感受着施加的力和移动的距离——省力不省功，这个道理颠扑不破。' },
    { kw:['超重','失重','N=m(g+a)','电梯','牛顿'], scene:'电梯启动的瞬间你感觉到身体一沉——加速上升时地板对你的支持力超过了你的体重。' },
    { kw:['光电','转换','效率','能源','光伏'], scene:'你站在屋顶的光伏板前，计算着太阳光转化为电能的效率——还有不少能量在过程中散失了。' },
    { kw:['应力','应力','应变','强度','Pa'], scene:'你在结构计算书上复核着那根钢索的应力值——单位面积的受力必须在材料的承受范围内。' },
    { kw:['避雷针','尖端放电','静电','电场'], scene:'你仰头看着大楼顶端那根锋利的避雷针——电荷在这里聚集到足以击穿空气。' },
    { kw:['反重力','抵消','重力','引擎'], scene:'你调试着反重力模块的输出功率——要抵消这巨大的重量，需要的推力大得惊人。' },
    { kw:['微波','输电','效率','轨道','电站'], scene:'你盯着能量传输效率的读数——从太空到地面的输电损耗比预想中要小一些。' },
    { kw:['太空电梯','缆绳','张力','自重','同步轨道'], scene:'你的目光沿着设计图上的缆绳从地面一直延伸到三万六千公里的高空——自重本身就是最大的挑战。' },
    { kw:['RTG','热电','塞贝克','温差','核电池'], scene:'你检查着同位素电池的温差异常——两端的温差直接决定了发电功率。' },
    { kw:['洛伦兹','磁场','偏转','带电粒子','屏蔽'], scene:'你计算着带电粒子在磁场中的偏转半径——磁场强度越大，防御圈就越小。' },
    { kw:['半衰期','衰变','放射性','剩余'], scene:'你看着放射性元素的衰减曲线——时间每过一个半衰期，剩余的量就减半一次。' },
    { kw:['感应电动势','切割','磁力线','BLv'], scene:'你握着导线在磁场中快速移动，仪表盘上的指针随之摆动——导体切割磁力线产生了电流。' }
  ];

  careerKeys.forEach(function(career) {
    eraKeys.forEach(function(eraKey, ei) {
      var arr = QUESTIONS[career][eraKey];
      if (!arr) return;
      var idxInEra = 0;
      arr.forEach(function(q) {
        var tw = timeWords[idxInEra % timeWords.length];
        var fullText = (q.text || '') + ' ' + (q.subject || '');
        // 匹配关键词
        var matched = null;
        for (var k = 0; k < kwScenes.length; k++) {
          var entry = kwScenes[k];
          for (var w = 0; w < entry.kw.length; w++) {
            if (fullText.indexOf(entry.kw[w]) !== -1) {
              matched = entry.scene;
              break;
            }
          }
          if (matched) break;
        }
        // 有匹配则用匹配情景 + 时间词开头；无匹配则用时间词 + 通用描述
        if (matched) {
          q._sceneContext = matched;
        } else {
          q._sceneContext = '你需要运用所学知识来应对眼前的局面。';
        }
        idxInEra++;
      });
    });
  });
}





/* ========== 故事章节：每时代随机选一章，2道题共用一段情景 ========== */
var ERA_STORIES = {
  farmer:{
    history:[{scenario:'1950年土改，你分到了几亩田。春天播种后庄稼叶片发黄、植株矮小——老农说这是缺肥的症状。你跑到供销社，看着货架上五花八门的肥料袋子犯了愁……',q:[0,1]},{scenario:'1978年冬天格外温暖。你蹲在村口大喇叭下，听到十一届三中全会召开的消息。没过多久村里推行"包产到户"，你发现自家田因常年渍水呈强酸性，种啥啥不长。',q:[2,3]},{scenario:'土改后你学着老农用草木灰追肥。草木灰撒到地里遇水有点滑腻，你蘸了点尝了尝——有点涩。你琢磨着这草木灰到底是个啥成分？',q:[6,7]},{scenario:'1956年村里开了一场热烈的讨论会——全国要搞三大改造。你坐在小板凳上边听边想：从土改分田到合作化，这路到底走得对不对？',q:[10,11]}],
    modern:[{scenario:'改革开放的春风终于吹到了家乡。责任田收成不错，你决定搞"科技种田"——去县城买了复合肥。卖肥料的老张神秘地说："这肥和草木灰不能一起用，会跑氨！"',q:[0,1]},{scenario:'1992年春天，广播里传来一位老人在南海边"画了一个圈"的消息。果然，集市上有人摆摊了，旁边的乡镇企业也红火起来。你琢磨着该扩大种植规模了。',q:[2,3]},{scenario:'你包了一片菜地施了不少过磷酸钙。没几天，旁边池塘长满了绿藻，水都臭了。村里老人说这是"水华"，你心里犯了嘀咕：跟自己施的肥有没有关系？',q:[7,8]},{scenario:'2013年村民大会上，村支书念文件说以后"市场起决定性作用"。你不太懂这词儿，但发现粮食收购价确实越来越跟着市场走了。隔壁老王的儿子开了网店专卖土特产。',q:[10,11]}],
    cyberpunk:[{scenario:'2080年你是"智慧农场"场长。玻璃穹顶下垂直农场的蔬菜层层叠叠，AI突然报警：CO₂浓度偏低！你打开控制面板启动了化学气肥发生装置。',q:[0,1]},{scenario:'新时代农民大会上，屏幕里传来实现中华民族伟大复兴中国梦的号召。你看着全自动化的农田，想到祖辈的土改、父辈的承包，到自己这代的数据种田，感慨万千。',q:[2,3]},{scenario:'垂直农场遇到技术难题：营养液中Zn²⁺和Cu²⁺超标。AI助手建议用pH分步沉淀。你盯着屏幕上的Ksp数据，开始计算最佳沉淀pH。',q:[6,7]}]
  },
  journalist:{
    history:[{scenario:'1956年你刚分配到《人民日报》当实习记者。老主编递来一份关于农村合作社的通讯稿："小同志，你看看这稿子该用什么文体写？"你翻了翻案头的《汉字简化方案》，认真研究起来。',q:[0,1]},{scenario:'改革开放后报社第一次派你出国采访。站在异国机场手心冒汗，一个金发记者走上来问话——你听出来是个英文习语，可一时想不起什么意思。',q:[2,3]},{scenario:'你采访了一位老红军，听他讲述翻雪山过草地的故事，忍不住想起毛泽东那句诗。回到报社翻开鲁迅文集，准备在稿子里引一句名句增强感染力。',q:[6,8]},{scenario:'你在资料室整理老报纸，发现一篇社论用了"差强人意"。旁边的年轻编辑说："这不就是说水平很差吗？"你摇了摇头——这个成语可不能用错。',q:[7,10]}],
    modern:[{scenario:'你开了个新闻公众号，第一篇报道阅读量破十万。可主编打来电话批评："标题有点标题党了，记者的底线在哪？"你坐回电脑前重新审视自己的标题。',q:[0,1]},{scenario:'你采访了一位硅谷CEO，他说"We need to think outside the box"。你在采访本上飞快记下这话，但你知道读者更想知道中国经济在全球化浪潮中的深刻转型。',q:[2,3]},{scenario:'你的深度报道引用了《论语》名句。编辑审稿时划出一段："通过这次采访活动，使我对基层工作有了更深的了解。"——他说这句话有语病。',q:[6,7]},{scenario:'经济新闻部让你写GDP报道，第一季度的数字跳入眼帘——增长6.5%。你打开数据后台开始构思英文标题，突然想到这数字背后是中国经济格局的深刻变化。',q:[8,10]}],
    cyberpunk:[{scenario:'2080年脑机接口全面普及，新闻直接通过神经信号传递。今天你收到一条加密信息："The truth is out there, but you need to read between the lines。"',q:[0,1]},{scenario:'AI生成的虚假新闻在神经网络中病毒式传播。作为最后一代"人类记者"，你坚持用最古老的新闻原则核验每条信息——追溯信源、交叉验证。',q:[2,3]},{scenario:'诺贝尔文学奖颁给了AI，颁奖词说它"以诗意的语言展现了人类与技术的共生关系"。你想起陆游那句"文章本天成，妙手偶得之"——或许诗人与AI之间并没有那么大的鸿沟。',q:[4,5]}]
  },
  doctor:{
    history:[{scenario:'1950年代你背上药箱当了"赤脚医生"。一个孩子晚上总看不清东西，他娘说中了"雀蒙眼"。你摸摸孩子的头，心里大致有了数。',q:[0,1]},{scenario:'巡诊到一个山沟里的村子，发现村民脖子都有点粗。问了问当地饮食——盐是自己熬的，菜是地里种的。你明白了：这地方缺一种关键元素。',q:[2,3]},{scenario:'你给全村孩子接种牛痘疫苗。有人害怕说"种了会长牛角"。你耐心解释：疫苗就是让身体自己产生"卫兵"，那些专门对付天花病毒的细胞。',q:[4,6]},{scenario:'你用显微镜看发热病人的血涂片，在红细胞里看到了环状的小东西。这不是细菌也不是病毒——是一种更复杂的微小生物。你写下诊断：疟原虫感染。',q:[7,8]}],
    modern:[{scenario:'你在疾控中心研究COVID-19。它传播得特别快而且变种层出不穷。你对比了DNA和RNA病毒的复制机制，终于明白为什么这个病毒这么"善变"——RNA复制酶没有纠错功能。',q:[0,1]},{scenario:'新型流感从东南亚迅速传遍全球。你在疫情地图前分析传播路径——密集人口、繁忙机场、湿热气候。GIS屏幕上热力图的红色区域每天都在扩大。',q:[2,3]},{scenario:'诊室来了一对年轻夫妇，刚生的孩子查出地中海贫血。两人看起来都很健康，不明白为什么孩子会得遗传病。你画了一个遗传系谱图，给他们讲解常染色体隐性遗传。',q:[4,5]},{scenario:'城市医疗资源调查显示：三甲医院全集中在市中心，郊区居民看病要跑几十公里。你看着GIS地图上医疗设施的服务范围，想到了克里斯泰勒的"中心地理论"。',q:[6,7]}],
    cyberpunk:[{scenario:'你正在测试新一代纳米机器人——它们能在血液循环中巡逻，识别并清除早期癌细胞。第一个志愿者已准备就绪。但你知道最大的难题不是能不能造出来，而是免疫系统会不会攻击它们。',q:[0,1]},{scenario:'火星殖民地医疗站里，一个宇航员从跑步机上下来气喘吁吁——他在火星待了两年，骨密度下降15%。低重力对人体的影响比想象中更严重。',q:[2,3]},{scenario:'你在实验室里构建"智能细胞"的基因线路。启动子、RBS、CDS、终止子——这些标准化生物元件像代码一样组装进酵母基因组。合成生物学的未来正逐步成为现实。',q:[4,5]}]
  },
  programmer:{
    history:[{scenario:'1958年你被分配到中科院计算所，面前是一台占满整个房间的庞然大物——103机。你拿着穿孔纸带小心翼翼检查上面的孔位，这就是中国第一台通用电子计算机。',q:[0,1]},{scenario:'1970年代你见证了"第三次科技革命"。办公室里讨论最热烈的话题就是：人类什么时候能造出像人一样思考的机器？你摇了摇头，还是先把眼前的流程图画完。',q:[2,3]},{scenario:'你用汇编语言写排序程序，每一条指令都要手工转成二进制。隔壁老教授感叹当年穿孔纸带打错一条整个程序就得重来。你一边听一边继续写着助记符。',q:[4,6]},{scenario:'1956年周总理提出"向科学进军"。你被选入计算机研究小组，组长说目标是造出每秒运算一万次的机器。你看着桌上103机的设计图纸，觉得这个目标似乎没那么遥远。',q:[7,8]}],
    modern:[{scenario:'你开发的电商平台上线了。第一个用户注册成功后合伙人问："登录后怎么保持在线？"你想了想——Session和Cookie，后端开发的基本功。',q:[0,1]},{scenario:'噩耗传来：用户数据库被拖库了，一万个密码明文泄露。CEO脸色铁青地质问你："这就是你说的安全？"你咬着牙开始重构密码存储方案——加盐哈希。',q:[2,3]},{scenario:'你在用Python写数据分析程序。同事走过来说："这段列表推导式写得不错。"你笑了笑继续优化数据库查询——社交关系图谱用图结构最合适。',q:[4,6]},{scenario:'技术论坛上你听到"后量子密码"这个词。主讲人说RSA加密可能被量子计算机攻破。你在笔记本上写下：格密码、SVP问题、CRYSTALS-Kyber。',q:[7,8]}],
    cyberpunk:[{scenario:'你终于登上量子计算机的操作台。Shor算法几秒钟就能破解传统计算机上亿年才能完成的因数分解。你深吸一口气开始编写量子纠错码——每个量子比特都有0.1%的出错概率。',q:[0,1]},{scenario:'强人工智能诞生了，学习速度是人类的一百万倍。你被任命为AI伦理委员会主席，第一天就在白板上写下四个大字：价值对齐。',q:[2,3]},{scenario:'人类进入了数字永生时代。数字人和碳基人类的历史记录互相矛盾——谁说的才是真的？你翻开史学教材找到答案：多信源交叉验证，这是唯一的方法。',q:[4,6]}]
  },
  engineer:{
    history:[{scenario:'1950年代你参与修建水库大坝。图纸上大坝截面是个梯形——上底4米下底16米高10米。你掏出算盘噼里啪啦一打，算出了截面积。',q:[0,1]},{scenario:'炼钢厂的土高炉点火了，鼓风机呼呼地吹。铁水倒进模具慢慢冷却——温度先快后慢地降下来。你想起物理课上讲的牛顿冷却定律，这曲线果然是指数衰减。',q:[2,3]},{scenario:'你在两座山之间架设电线。A峰在脚下，B峰在800米外高出120米。你算着抛物线——最低点在中间，二次函数的对称轴正好在400米处。',q:[4,6]},{scenario:'大坝的设计图摊在你面前，底部比顶部宽很多。为什么？你想到液体压强随深度增加——底部承受的力最大，必须加宽结构来分散应力。',q:[7,8]}],
    modern:[{scenario:'你设计跨江大桥。一辆20吨重卡车停在40米简支梁正中间，你快速算出两端支座各分担10吨——对称荷载下反力相等。',q:[0,1]},{scenario:'你负责超高层建筑电梯系统。电梯以2m/s²加速上升时，70公斤的人对地板压力是多少？你默念牛顿第二定律——N=m(g+a)，答案马上就出来了。',q:[2,3]},{scenario:'高层建筑外形是旋转抛物面——z=(x²+y²)/100。你计算着底部半径，同时另一边的工程队问土方施工按等差数列增长第n天总共挖了多少。',q:[4,6]},{scenario:'桥梁的钢索要承受巨大拉力。你看着截面积10cm²的钢索，脑子里飞快换算着应力的单位——兆帕、牛顿、平方米……这些单位可一点都不能搞错。',q:[7,8]}],
    cyberpunk:[{scenario:'你设计量子计算机纠错码。每个量子比特出错概率0.1%，用三比特重复码后逻辑比特出错概率是多少？你拿出纸笔计算概率。',q:[0,1]},{scenario:'地下城市穹顶是半球体，半径500米。要刷防护涂料得先算表面积。你翻开数学笔记：球表面积的一半=2πr²，约157万平方米。',q:[2,3]},{scenario:'太空电梯的缆绳从地球同步轨道延伸到地面，36000公里长。缆绳自重产生的应力有多大？你在设计报告上写下公式σ=ρLg——结果大到让人绝望。',q:[4,6]}]
  }
};

var CareerKey        = null;      // 当前职业 key
var CareerCfg        = null;      // CAREER_CONFIG 配置
var curRound         = 0;         // 当前关卡索引 (0~2)
var phase            = -1;        // -1=初始化, 0=场景叙述, 1=题1, 2=题2, 3=下一关
var questionPool     = [];        // 当前职业题库（扁平化所有题目）
var currentQ         = null;      // 当前显示的题目
var answered         = false;
var selected         = [];        // 多选已选索引
var questionCount    = 0;         // 已答总题数
var askedInRound     = [];        // 当前关卡已出过的题目索引（避免重复）
var currentStory     = null;      // 当前选中的故事章节 { scenario, questions: [q1,q2] }

/* ========== 工具函数 ========== */
function pickRandom(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

/** Fisher-Yates 洗牌，原地打乱数组 */
function shuffleArray(arr) {
    if (!arr || arr.length < 2) return arr;
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

/** 判断是否多选题（有 answers 属性且无 choices 则为填空题） */
function isFillQ(q) {
    return q.type === 'fill' || (q.answer && !q.choices);
}

/** 判断题型：返回 '单选'/'不定项'/'多选'，单选题也可直接选 */
function getQType(q) {
    if (!q.choices) return '单选';
    var correctCount = q.choices.filter(function(c) { return c.correct; }).length;
    if (q.multi === true || correctCount > 1) {
        return correctCount >= 3 ? '多选' : '不定项';
    }
    return '单选';
}

function getLabel(idx) {
    return 'ABCDEFGH'[idx];
}


/* ========== DOM 渲染（适配框架元素） ========== */

/** 显示场景叙述（含故事情景） */
function showSceneIntro(eraKey, eraIdx) {
    try {
        var eraName = ERA_NAMES[eraIdx];
        setSubjectLabel(ERA_EMOJI[eraIdx] + ' ' + eraName);
        setQuestionNumber(questionCount + 1);
        document.getElementById('question-feedback').innerHTML = '';
        document.getElementById('btn-next').disabled = true;
        renderEraTimeline();
        // 应用时代字体
        if (typeof applyEraFont === 'function') applyEraFont(eraIdx);

        // 选取故事章节
        currentStory = null;
        _storyQIdx = 0;
        var stories = ERA_STORIES[CareerKey];
        if (stories && stories[eraKey] && stories[eraKey].length > 0) {
            var picked = pickRandom(stories[eraKey]);
            var eraBank = QUESTIONS[CareerKey][eraKey];
            var qs = [];
            for (var si = 0; si < picked.q.length; si++) {
                var idx = picked.q[si];
                if (idx < eraBank.length) qs.push(JSON.parse(JSON.stringify(eraBank[idx])));
            }
            if (qs.length >= 2) {
                currentStory = { scenario: picked.scenario, questions: qs };
                // 标记这些题目为已使用（避免被pool重复抽到）
                for (var mi = 0; mi < questionPool.length; mi++) {
                    var pq = questionPool[mi];
                    if (pq.era.indexOf(eraKey) !== -1 && askedInRound.indexOf(mi) === -1) {
                        for (var qi = 0; qi < qs.length; qi++) {
                            if (pq.text === qs[qi].text) { askedInRound.push(mi); break; }
                        }
                    }
                }
            }
        }

        var scenarioHtml = currentStory ? currentStory.scenario : ('你作为一名' + CareerCfg.name + '，进入了<strong>' + eraName + '</strong>的时代背景。');
        var html = '<div style="text-align:center;margin-bottom:16px;">' +
            '<div style="font-size:2.4rem;margin-bottom:6px;">' + ERA_EMOJI[eraIdx] + '</div>' +
            '<div style="font-size:1.3rem;color:#ffd200;margin-bottom:14px;font-weight:700;">' + ERA_NAMES[eraIdx] + '</div>' +
            '<div class="era-scenario" style="font-size:0.95rem;color:#b0b8c8;line-height:1.9;text-align:left;padding:0 8px;">' +
            scenarioHtml +
            '<div style="margin-top:14px;padding:10px 14px;background:rgba(255,210,0,0.06);border-left:3px solid #ffd200;border-radius:0 8px 8px 0;color:#e0c060;font-size:0.85rem;">📖 接下来你将面对五道题，运用你的专业知识来应对吧！</div>' +
            '</div></div>';

        document.getElementById('question-text').innerHTML = html;

        var grid = document.getElementById('options-grid');
        grid.innerHTML = '';
        var btn = document.createElement('button');
        btn.className = 'btn-next';
        btn.style.cssText = 'grid-column:1/-1;width:100%;font-size:1.1rem;padding:14px;background:linear-gradient(135deg,#ffd200,#ff9a00);border:none;border-radius:10px;color:#1a1a2e;font-weight:700;cursor:pointer;';
        btn.textContent = '📝 开始答题';
        btn.addEventListener('click', function() {
            var nb = document.getElementById('btn-next');
            nb.disabled = false;
            nb.click();
        });
        grid.appendChild(btn);
        console.log('[DEBUG] 场景叙述已渲染，按钮:"开始答题"');
    } catch(e) {
        console.error('[ERROR] showSceneIntro 错误:', e.message, e.stack);
    }
}

/** 渲染选择题选项 */
function renderChoices(q) {
    answered = false;
    selected = [];
    var grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    // 随机打乱选项顺序，避免正确答案总在 A
    shuffleArray(q.choices);

    var qType = getQType(q);
    var correctCount = q.choices.filter(function(c) { return c.correct; }).length;
    var isMulti = qType !== '单选';

    // 题型标识
    var typeLabel = document.createElement('div');
    var typeColors = { '单选':'#60a5fa', '不定项':'#f1c40f', '多选':'#f472b6' };
    typeLabel.style.cssText = 'font-size:0.75rem;color:' + (typeColors[qType] || '#8892b0') + ';margin-bottom:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;';
    typeLabel.textContent = '☐ ' + qType + '选择题';
    grid.appendChild(typeLabel);

    // 渲染选项按钮（单选/多选都先选中，点击提交后才判题）
    // 预计算显示文本：兜底删解释后缀，保持原题表述不变
    var displayTexts = q.choices.map(function(choice) {
        var t = choice.text;
        var seps = ['——', '--', '—', '–', '―'];
        var cut = -1;
        for (var s = 0; s < seps.length; s++) {
            var idx = t.indexOf(seps[s]);
            if (idx > 0 && (cut === -1 || idx < cut)) cut = idx;
        }
        if (cut > 0) t = t.substring(0, cut).trim();
        return t;
    });

    q.choices.forEach(function(choice, i) {
        var btn = document.createElement('button');
        btn.className = 'option-btn choice-btn';
        btn.textContent = getLabel(i) + '. ' + displayTexts[i];
        // 将完整文本存入 dataset，用于记录和知识卡片
        btn.dataset.fullText = choice.text;
        btn.addEventListener('click', function() {
            if (answered) return;
            if (!isMulti) {
                // 单选：切换选中状态
                selected = [i];
                var allBtns = document.querySelectorAll('#options-grid .choice-btn');
                allBtns.forEach(function(b, j) {
                    b.style.background = '';
                    b.style.borderColor = '';
                    b.style.color = '';
                    b.style.transform = '';
                });
                btn.style.background = 'rgba(255,210,0,0.18)';
                btn.style.borderColor = 'rgba(255,210,0,0.55)';
                btn.style.color = '#fff';
                btn.style.transform = 'translateX(4px)';
            } else {
                // 不定项/多选：toggle
                var pos = selected.indexOf(i);
                if (pos === -1) {
                    selected.push(i);
                    btn.style.background = 'rgba(255,210,0,0.18)';
                    btn.style.borderColor = 'rgba(255,210,0,0.55)';
                    btn.style.color = '#fff';
                    btn.style.transform = 'translateX(4px)';
                } else {
                    selected.splice(pos, 1);
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                    btn.style.transform = '';
                }
            }
            updateSubmitBtnText(correctCount, qType);
        });
        grid.appendChild(btn);
    });

    // 添加提交按钮
    var wrap = document.createElement('div');
    wrap.style.cssText = 'grid-column:1/-1;text-align:center;margin-top:12px;';
    var submitBtn = document.createElement('button');
    submitBtn.id = 'submit-btn';
    submitBtn.className = 'btn-next';
    submitBtn.style.cssText = 'font-size:0.95rem;padding:10px 32px;border-radius:12px;';
    submitBtn.textContent = '提交答案';
    submitBtn.addEventListener('click', function() {
        if (answered || selected.length === 0) return;
        answered = true;
        checkAnswer(q);
    });
    wrap.appendChild(submitBtn);
    grid.appendChild(wrap);
}

function updateSubmitBtnText(correctCount, qType) {
    var sb = document.getElementById('submit-btn');
    if (!sb) return;
    sb.textContent = '提交答案';
}

/** 渲染填空题 */
function renderFill(q) {
    answered = false;
    var grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.style.cssText = 'grid-column:1/-1;display:flex;flex-direction:column;gap:10px;align-items:center;';

    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '请输入答案...';
    input.style.cssText = 'width:100%;max-width:400px;padding:12px 16px;font-size:1rem;' +
        'background:#1a1a2e;color:#fff;border:2px solid rgba(255,210,0,0.3);border-radius:8px;' +
        'outline:none;text-align:center;transition:border-color 0.3s;';
    input.onfocus = function() { input.style.borderColor = '#ffd200'; };
    input.onblur  = function() { input.style.borderColor = 'rgba(255,210,0,0.3)'; };
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') submitFill(q, input.value.trim());
    });

    var btn = document.createElement('button');
    btn.className = 'btn-next';
    btn.style.cssText = 'font-size:0.95rem;padding:10px 32px;border-radius:12px;';
    btn.textContent = '提交答案';
    btn.addEventListener('click', function() {
        submitFill(q, input.value.trim());
    });

    wrap.appendChild(input);
    wrap.appendChild(btn);
    grid.appendChild(wrap);

    // 自动聚焦
    setTimeout(function() { input.focus(); }, 100);
}

function submitFill(q, userAnswer) {
    if (answered || !userAnswer) return;
    answered = true;

    var acceptable = q.answers || [q.answer];
    var isCorrect = false;
    for (var i = 0; i < acceptable.length; i++) {
        if (userAnswer.toLowerCase().replace(/\s/g, '') === acceptable[i].toLowerCase().replace(/\s/g, '')) {
            isCorrect = true;
            break;
        }
    }

    // 禁用输入
    var grid = document.getElementById('options-grid');
    var input = grid.querySelector('input');
    if (input) input.disabled = true;
    var btn = grid.querySelector('button');
    if (btn) btn.style.display = 'none';

    if (isCorrect) {
        var fb = '✅ 回答正确！答案是：' + q.answer;
        if (q.knowledge) fb += '<br><span style="color:#FFD700;font-size:12px;">📖 ' + q.knowledge + '</span>';
        showFeedback(fb, true);
        addScore(10);
    } else {
        showFeedback('❌ 回答错误！正确答案是：' + q.answer, false);
        addScore(0);
    }
    document.getElementById('btn-next').disabled = false;
}

/** 判定选择题答案 */
function checkAnswer(q, singleBtn) {
    var btns = document.querySelectorAll('#options-grid .choice-btn');
    btns.forEach(function(b) { b.disabled = true; });

    var correctIdx = [];
    q.choices.forEach(function(c, i) { if (c.correct) correctIdx.push(i); });

    var allCorrect = selected.length === correctIdx.length &&
        correctIdx.every(function(ci) { return selected.indexOf(ci) !== -1; });
    var hasWrong = selected.some(function(si) { return correctIdx.indexOf(si) === -1; });
    var gotSome = selected.some(function(si) { return correctIdx.indexOf(si) !== -1; });

    // 高亮
    var partialHighlight = gotSome && !allCorrect && !hasWrong;
    btns.forEach(function(b, i) {
        if (correctIdx.indexOf(i) !== -1) {
            b.classList.add(partialHighlight ? 'partial' : 'correct');
        }
        if (selected.indexOf(i) !== -1 && correctIdx.indexOf(i) === -1) b.classList.add('wrong');
    });

    // 隐藏提交按钮
    var sb = document.getElementById('submit-btn');
    if (sb) sb.style.display = 'none';

    // 积分结算（每级50分，满分10分/题）
    var labels = correctIdx.map(function(ci) { return getLabel(ci); }).join('、');
    var fb = '';
    if (allCorrect) {
        fb = '✅ 完全正确！答案：' + labels;
        addScore(10);
    } else if (gotSome && !hasWrong) {
        fb = '⚠ 部分正确（漏选），答案：' + labels;
        addScore(5);
    } else if (gotSome && hasWrong) {
        fb = '⚠ 有对有错，正确答案：' + labels;
        addScore(0);
    } else {
        fb = '❌ 错误！正确答案：' + labels;
        addScore(0);
    }

    // 知识点
    q.choices.forEach(function(c) {
        if (c.correct && c.knowledge) fb += '<br><span style="color:#FFD700;font-size:12px;">📖 ' + c.knowledge + '</span>';
    });

    var isGood = allCorrect || (gotSome && !hasWrong);
    showFeedback(fb, isGood);
    updateStatsDisplay();
    updateExpBar();
    document.getElementById('btn-next').disabled = false;
}


/* ============================================================
   第三部分：阶段推进（源自 game(2).js 的 _nextPhase 逻辑）
   ============================================================ */

/** 从当前关卡中随机选一道未出过的题（优先使用故事章节题目） */
var _storyQIdx = 0; // 故事章节内部计数器
function pickQuestion() {
    var eraKey = ERA_KEYS[curRound];
    // 优先使用选中的故事章节题目
    if (currentStory && _storyQIdx < currentStory.questions.length) {
        var q = currentStory.questions[_storyQIdx];
        _storyQIdx++;
        return q;
    }
    // 回退到随机题库
    var pool = [];
    for (var i = 0; i < questionPool.length; i++) {
        var q = questionPool[i];
        if ((q.era || '').indexOf(eraKey) !== -1 && askedInRound.indexOf(i) === -1) {
            pool.push({ idx: i, q: q });
        }
    }
    if (pool.length === 0) {
        for (var j = 0; j < questionPool.length; j++) {
            if (askedInRound.indexOf(j) === -1) pool.push({ idx: j, q: questionPool[j] });
        }
    }
    if (pool.length === 0) return null;
    var picked = pickRandom(pool);
    askedInRound.push(picked.idx);
    return picked.q;
}

/** 显示一道题 */
function showOneQuestion() {
    try {
        currentQ = pickQuestion();
        if (!currentQ) {
            console.log('[DEBUG] 当前无可用题目，尝试推进...');
            advancePhase();
            return;
        }
        questionCount++;
        setQuestionNumber(questionCount);

        var eraIdx = curRound;
        var subj = currentQ.subject || '';
        setSubjectLabel(ERA_EMOJI[eraIdx] + ' ' + subj + ' · ' + ERA_NAMES[eraIdx]);

        // 生成每题的场景叙述
        var sceneText = currentQ._sceneContext || '';
        var sceneHtml = sceneText ? '<div style="padding:12px 16px;margin-bottom:14px;background:linear-gradient(135deg,rgba(255,210,0,0.06),rgba(255,210,0,0.02));border-left:3px solid rgba(255,210,0,0.35);border-radius:0 10px 10px 0;font-size:0.88rem;color:#c8cfe0;line-height:1.85;text-shadow:0 1px 2px rgba(0,0,0,0.3);">' +
          '<span style="color:#ffd200;font-weight:700;">▎</span> ' + sceneText + '</div>' : '';

        // 动态显示题型标签（不修改题库数据）
        var qTypeName = getQType(currentQ);
        var displayText = currentQ.text;
        if (qTypeName === '不定项' || qTypeName === '多选') {
            displayText = displayText.replace(/【.*?】/, '【' + qTypeName + '】');
        }
        setQuestionText(sceneHtml + displayText);
        document.getElementById('question-feedback').innerHTML = '';

        if (isFillQ(currentQ)) {
            renderFill(currentQ);
        } else {
            renderChoices(currentQ);
        }
        console.log('[DEBUG] 题目已渲染, 第' + questionCount + '题');
    } catch(e) {
        console.error('[ERROR] showOneQuestion 错误:', e.message, e.stack);
    }
}

/** 推进阶段（每时代5题） */
function advancePhase() {
    try {
        phase++;
        console.log('[DEBUG] advancePhase: phase=' + phase + ', curRound=' + curRound);
        if (phase === 0) {
            askedInRound = [];
            showSceneIntro(ERA_KEYS[curRound], curRound);
        } else if (phase >= 1 && phase <= 5) {
            showOneQuestion();
        } else if (phase === 6) {
            curRound++;
            if (curRound >= ERA_KEYS.length) {
                showEnding();
                return;
            }
            phase = -1;
            advancePhase();
        }
    } catch(e) {
        console.error('[ERROR] advancePhase 错误:', e.message, e.stack);
    }
}

/** 结局结算 */
function showEnding() {
    var maxScore = ERA_KEYS.length * 5 * 10; // 3时代×5题×10分=150分
    var ratio = GameState.score / Math.max(maxScore, 1);
    var finalLevel = (typeof getLevel === 'function') ? getLevel(GameState.score) : Math.floor(GameState.score/50)+1;

    var endingTitle, endingText;
    if (ratio >= 0.7) {
        endingTitle = '🏆 明日基石 · ' + CareerCfg.name + '大师';
        endingText = '你凭借扎实的专业知识，穿越' + ERA_KEYS.length + '个时代，在每个时代都筑下坚实基石。从过去到未来，知识铺就通往赛博朋克之路——你就是照亮明日的那块基石！';
    } else if (ratio >= 0.4) {
        endingTitle = '📚 明日基石 · 合格的' + CareerCfg.name;
        endingText = '虽然有些题目答得不够完美，但每一道题都是一块基础砖石。今日的积累，终将成为明日的高台。继续学习，未来可期！';
    } else {
        endingTitle = '🌱 明日基石 · 初出茅庐的' + CareerCfg.name;
        endingText = '面对各时代的专业问题，你还有些生疏。但别忘了——万丈高楼平地起，每一块基石都从第一铲开始。再接再厉，未来等你构筑！';
    }

    document.getElementById('result-career').innerHTML =
        '<span class="result-icon">' + CareerCfg.icon + '</span>' +
        '<span>' + CareerCfg.name + '</span>';
    document.getElementById('result-stats').innerHTML =
        '<div style="text-align:center;margin-bottom:10px;">' +
        '<div style="font-size:1.4rem;color:#ffd200;font-weight:700;margin-bottom:8px;">' + endingTitle + '</div>' +
        '<p style="color:#b0b8c8;font-size:0.9rem;line-height:1.7;margin-bottom:16px;">' + endingText + '</p>' +
        '<p>最终等级：<strong style="font-size:1.3rem;">Lv.' + finalLevel + '</strong></p>' +
        '<p>最终得分：<strong style="font-size:1.3rem;">' + GameState.score + ' 分</strong></p>' +
        '<p style="color:#8892b0;">共答 ' + questionCount + ' 题</p>' +
        '</div>';

    showResult(CareerCfg.name, finalLevel, GameState.score);
}

/** 加载当前职业的全部题目（扁平化） */
function loadQuestionPool() {
    questionPool = [];
    var bank = QUESTIONS[CareerKey];
    if (!bank) return;
    // 确保年级标注已初始化
    if (typeof initAllGrades === 'function') initAllGrades();
    // selectedGrade 来自 run-only-logic2.html 中的全局变量
    var maxGrade = (typeof selectedGrade !== 'undefined' && selectedGrade > 0) ? selectedGrade : 3;
    for (var i = 0; i < ERA_KEYS.length; i++) {
        var eraKey = ERA_KEYS[i];
        var arr = bank[eraKey];
        if (!arr) continue;
        for (var j = 0; j < arr.length; j++) {
            var q = arr[j];
            var qGrade = q.grade || '高三'; // 默认高三（未标注则属于全部）
            var qGradeNum = (qGrade === '高一') ? 1 : (qGrade === '高二') ? 2 : 3;
            if (qGradeNum <= maxGrade) {
                q.era = eraKey;
                questionPool.push(q);
            }
        }
    }
}


/* ============================================================
   第四部分：框架钩子函数实现
   ============================================================ */

function onCareerSelected(careerKey) {
    try {
        CareerKey = careerKey;
        CareerCfg = CAREER_CONFIG[careerKey];
        if (!CareerCfg) {
            console.error('[ERROR] 未找到职业配置:', careerKey);
            alert('未找到职业配置：' + careerKey);
            return;
        }
        console.log('[DEBUG] 职业配置:', CareerCfg.name);
        curRound = 0;
        phase = -1;
        currentQ = null;
        answered = false;
        selected = [];
        questionCount = 0;
        askedInRound = [];
        currentStory = null;
        _storyQIdx = 0;

        console.log('[DEBUG] 构建情景上下文...');
        if (typeof buildQuestionContexts === 'function') buildQuestionContexts();
        console.log('[DEBUG] 加载题库...');
        loadQuestionPool();
        console.log('[DEBUG] 题库加载完成，共 ' + questionPool.length + ' 题');

        if (questionPool.length === 0) {
            console.error('[ERROR] 题库为空！请检查年级筛选设置。');
            alert('当前年级没有可用题目！请选择更高的学段。');
            return;
        }

        console.log('[DEBUG] 推进到第一个阶段...');
        advancePhase();
        console.log('[DEBUG] 阶段推进完成，当前 phase = ' + phase);
    } catch(e) {
        console.error('[ERROR] onCareerSelected 内部错误:', e.message, e.stack);
        alert('游戏启动失败：' + e.message + '\n请打开浏览器控制台(F12)查看详情。');
    }
}

/* ========== 时代时间轴 ========== */
function renderEraTimeline() {
  var el = document.getElementById('era-timeline');
  if (!el) return;
  var html = '';
  var eraCssClasses = ['era-retro','era-modern','era-cyber'];
  for (var i = 0; i < ERA_KEYS.length; i++) {
    if (i > 0) {
      var connClass = i <= curRound ? 'completed' : '';
      html += '<div class="era-connector ' + connClass + '"></div>';
    }
    var eraClass = eraCssClasses[i] || '';
    if (i < curRound) {
      html += '<div class="era-node completed ' + eraClass + '">' +
        '<div class="era-dot"></div>' +
        '<div class="era-year">' + ERA_YEARS[i] + '</div>' +
        '<div class="era-name">✅ ' + ERA_NAMES[i] + '</div>' +
        '</div>';
    } else if (i === curRound) {
      html += '<div class="era-node active ' + eraClass + '">' +
        '<div class="era-dot"></div>' +
        '<div class="era-year">' + ERA_YEARS[i] + '</div>' +
        '<div class="era-name">▶ ' + ERA_NAMES[i] + '</div>' +
        '</div>';
    } else {
      html += '<div class="era-node locked ' + eraClass + '">' +
        '<div class="era-dot"></div>' +
        '<div class="era-year">' + ERA_YEARS[i] + '</div>' +
        '<div class="era-name">🔒 未解锁</div>' +
        '</div>';
    }
  }
  el.innerHTML = html;
}

function onNextQuestion() {
    advancePhase();
}

function onLevelUp(newLevel) {
    // 移除旧弹窗
    var oldOv = document.getElementById('lv-overlay');
    if (oldOv) oldOv.remove();
    // 创建 overlay
    var ov = document.createElement('div');
    ov.id = 'lv-overlay';
    ov.innerHTML =
      '<div id="lv-card">' +
        '<div id="lv-card-inner">' +
          '<span id="lv-star">⭐</span>' +
          '<div id="lv-title">🎉 恭喜升级</div>' +
          '<div id="lv-level">Lv.' + newLevel + '</div>' +
          '<div id="lv-desc">你的知识又提升了！继续加油，向着更高等级前进！</div>' +
          '<button id="lv-btn">太棒了！</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    // 撒纸屑
    var colors = ['#ffd200','#ff6b6b','#4ade80','#60a5fa','#f472b6','#fb923c','#22d3ee'];
    for (var i = 0; i < 40; i++) {
      var p = document.createElement('div');
      p.className = 'lv-particle';
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.top = '-10px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.width = (4 + Math.random() * 8) + 'px';
      p.style.height = p.style.width;
      p.style.animationDelay = (Math.random() * 1.5) + 's';
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(p);
      // 自动清理
      (function(p2) { setTimeout(function() { if (p2.parentNode) p2.remove(); }, 3500); })(p);
    }
    // 点击按钮关闭
    document.getElementById('lv-btn').addEventListener('click', function() {
      ov.remove();
      var parts = document.querySelectorAll('.lv-particle');
      for (var j = 0; j < parts.length; j++) parts[j].remove();
    });
}

function onRestart() {
    curRound = 0;
    phase = -1;
    currentQ = null;
    answered = false;
    selected = [];
    questionCount = 0;
    askedInRound = [];
    currentStory = null;
    _storyQIdx = 0;
}
