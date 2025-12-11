import { AudienceData, TrendCategory, DiagnosisMetric, ChartDataPoint, Role, ManagedUser, PermissionNode } from './types';

export const BRANDS = ["L'Oréal Paris", "Lancôme", "YSL Beauty", "Kiehl's", "La Roche-Posay", "SkinCeuticals"];

export const INITIAL_AUDIENCE_DATA: AudienceData = {
  crm: [
    { id: 'membership', name: 'Membership Tier', tags: ['General Member', 'Silver Card', 'Gold Card', 'Platinum Card'] },
    { id: 'lifecycle', name: 'User Lifecycle', tags: ['New Customer', 'Active VIP', 'Dormant (30+ days)', 'Churn Risk'] },
    { id: 'demographics', name: 'Demographics', tags: ['Gen Z (18-25)', 'Young Professional (26-35)', 'Mature (36+)', 'Tier 1 City'] },
    { id: 'spending', name: 'Spending Power', tags: ['High Spender', 'Promotion Sensitive', 'Luxury Buyer'] }
  ],
  wecom: [
    { id: 'skin', name: 'Skin Type', tags: ['Normal Skin', 'Dry Skin', 'Oily Skin', 'Combination Skin', 'Sensitive Skin'] },
    { id: 'role', name: 'Occupation', tags: ['Student', 'Office Worker', 'Freelancer', 'Mom'] },
    { id: 'concerns', name: 'Skin Concerns', tags: ['Acne', 'Wrinkles', 'Dullness', 'Dehydration'] }
  ]
};

export const KB_FOLDERS = [
  "Brand Guidelines 2025",
  "Campaign Assets Q1",
  "Scientific Communication",
  "KOL Briefs"
];

export const MOCK_PRODUCTS = [
  { 
    id: 'p1', 
    name: 'Revitalift Filler Eye Cream (Purple Iron)', 
    data: {
      ingredients: 'Pro-Xylane Pro + Hyaluronic Acid',
      benefits: 'Fade Lines + Plump & Moisturize',
      usage: 'Massage around eyes + nasolabial folds'
    }
  },
  { 
    id: 'p2', 
    name: 'Youth Code Serum', 
    data: {
      ingredients: 'Bifida Ferment Lysate + Papain',
      benefits: 'Strengthen Barrier + Boost Absorption',
      usage: 'Use after cleansing, before toner'
    }
  },
  { 
    id: 'p3', 
    name: 'Glycolic Bright Serum', 
    data: {
      ingredients: 'Glycolic Acid + Niacinamide',
      benefits: 'Instant Glow + Reduce Dark Spots',
      usage: 'Daily morning/night usage'
    }
  }
];

const COMMON_DETAILS = {
  overview: "该趋势主要集中在将高科技成分与日常美妆习惯相结合，通过创新的配方技术提升产品功效。消费者越来越关注产品的科学背书与实际效果，而非单纯的品牌营销。",
  points: [
    {
      title: "配方与成分创新",
      items: [
        "采用微胶囊包裹技术，提升活性成分稳定性",
        "复配多种植物萃取精华，舒缓敏感肌肤",
        "引入医美级成分（如重组胶原蛋白）进入日化产品"
      ]
    },
    {
      title: "消费者体验升级",
      items: [
        "注重质地的感官体验，追求轻盈不粘腻",
        "包装设计结合人体工学，提升使用便捷性",
        "数字化工具辅助选品，提供个性化护肤方案"
      ]
    },
    {
      title: "市场营销策略",
      items: [
        "利用KOL/KOC进行成分党向的深度科普",
        "线上线下联动，打造沉浸式快闪体验店"
      ]
    }
  ],
  tags: ["成分党", "科技护肤", "体验升级", "精准营销"]
};

export const MOCK_TRENDS_DATA: TrendCategory[] = [
  {
    id: 't1',
    hashtag: '#美学与妆容趋势',
    category: '美学与妆容趋势',
    description: '该技术领域属于美妆趋势，包含 66 个创新事件',
    count: 66,
    items: [
      { 
        id: 'i1', rank: 1, title: '骨相清透学妆容', description: '聚焦高光、修容技法，强调产品如何打造自然轮廓感与高级妆效，适合塑造专业形象。', date: '2025/11/17', heat: 89,
        region: '中国', sourceCount: 5,
        details: {
          overview: "“骨相化妆”成为2025年美妆界的新宠，强调利用光影改变面部折叠度，而非单纯的色彩堆叠。这种妆容风格更符合亚洲人面部特征，追求自然、立体的高级感。",
          points: [
            {
              title: "底妆技术革新",
              items: ["采用分区上妆法，面中提亮，轮廓收缩", "使用哑光高光替代珠光，打造原生骨骼感"]
            },
            {
              title: "产品需求变化",
              items: ["低饱和度修容盘销量激增", "对遮瑕产品的滋润度与扒脸能力要求更高"]
            }
          ],
          tags: ["骨相美学", "立体轮廓", "原生感", "亚洲妆容"]
        }
      },
      { id: 'i2', rank: 2, title: '帕斯蒂尔/低饱和水彩色系妆容', description: '围绕柔和粉彩、莫兰迪色系眼影/腮红，传递温柔、高级的春季氛围，易于在朋友圈制造话题。', date: '2025/11/19', heat: 76, region: '全球', sourceCount: 3, details: COMMON_DETAILS },
      { id: 'i3', rank: 3, title: '亚裔妆（抖音热榜）', description: '解析混血感、立体度的打造技巧，凸显底妆和轮廓产品的专业性，适合针对审美进阶的客户。', date: '2025/11/15', heat: 45, region: '中国', sourceCount: 8, details: COMMON_DETAILS },
      { id: 'i4', rank: 4, title: '伪素颜妆（抖音爆款）', description: '强调产品“妆养合一”特性，突出护肤功效和自然妆感，是企微1v1建立信任的经典话题。', date: '2025/11/18', heat: 32, region: '中国', sourceCount: 4, details: COMMON_DETAILS },
      { id: 'i5', rank: 5, title: 'IP影视剧同款仿妆', description: '结合热门剧集角色妆容，推荐同款色号产品，利用IP热度激发兴趣，实现圈层精准触达。', date: '2025/11/16', heat: 28, region: '亚太', sourceCount: 6, details: COMMON_DETAILS }
    ]
  },
  {
    id: 't2',
    hashtag: '#品类与产品创新',
    category: '品类与产品创新',
    description: '该技术领域属于产品创新，包含 9 个创新事件',
    count: 9,
    items: [
      { id: 'i1', rank: 1, title: '高端液态精华/次抛精华', description: '突出其高活性、保鲜、精准用量的优势，作为抗老、修护的明星品类进行深度种草。', date: '2025/11/15', heat: 92, region: '全球', sourceCount: 12, details: COMMON_DETAILS },
      { id: 'i2', rank: 2, title: '面部护理油/精华油', description: '强调以油养肤的修护、抗老功效，传授独家按摩手法，适合在1v1沟通中提供定制化指导。', date: '2025/11/18', heat: 67, region: '欧美', sourceCount: 7, details: COMMON_DETAILS },
      { id: 'i3', rank: 3, title: '多功能彩妆“劳模单品”', description: '推广唇颊霜、综合盘等一物多用的产品，满足消费者对精简化妆包和便携的需求。', date: '2025/11/16', heat: 55, region: '亚太', sourceCount: 3, details: COMMON_DETAILS },
      { id: 'i4', rank: 4, title: '定制化与个性化产品', description: '宣传定制粉底液色号、个性化香氛等服务，满足高端客户对专属感和掌控感的追求。', date: '2025/11/20', heat: 41, region: '全球', sourceCount: 5, details: COMMON_DETAILS },
      { id: 'i5', rank: 5, title: '精致化美妆工具', description: '搭配推荐分区粉扑、专业刷具、磁吸假睫毛等，提升妆效的专业度，体现品牌的细节关怀。', date: '2025/11/17', heat: 30, region: '中国', sourceCount: 2, details: COMMON_DETAILS }
    ]
  },
  {
    id: 't3',
    hashtag: '#护肤科技与功效',
    category: '护肤科技与功效',
    description: '该技术领域属于智能护肤，包含 14 个创新事件',
    count: 14,
    items: [
      { id: 'i1', rank: 1, title: '“妆养一体”功效彩妆', description: '深入解读抗老口红、养肤粉底等产品的成分科技，满足消费者对“美丽+修护”的双重期待。', date: '2025/11/18', heat: 81, region: '全球', sourceCount: 9, details: COMMON_DETAILS },
      { id: 'i2', rank: 2, title: '科技护肤（细胞级修护）', description: '沟通专利成分、细胞科技、临床数据，是建立高端品牌专业壁垒、吸引“成分党”的核心内容。', date: '2025/11/19', heat: 64, region: '欧美', sourceCount: 6, details: COMMON_DETAILS },
      { id: 'i3', rank: 3, title: '分阶式医美术后护理', description: '针对光电、微针等项目，提供术前准备、术后修复（如防反黑）全流程产品方案，体现专业关怀。', date: '2025/11/18', heat: 59, region: '亚太', sourceCount: 4, details: COMMON_DETAILS },
      { id: 'i4', rank: 4, title: '情绪护肤与五感疗愈', description: '结合香氛、触感、仪式感，将护肤与解压、助眠场景结合，满足“质享奢护家”的情感价值需求。', date: '2025/11/20', heat: 45, region: '全球', sourceCount: 3, details: COMMON_DETAILS },
      { id: 'i5', rank: 5, title: '分区精准护理', description: '针对颈部、眼周、法令纹等局部问题，提供高功效精华或安瓶解决方案，展现产品线的专业性。', date: '2025/11/17', heat: 38, region: '中国', sourceCount: 5, details: COMMON_DETAILS }
    ]
  },
  {
    id: 't4',
    hashtag: '#人群与圈层沟通',
    category: '人群与圈层沟通',
    description: '该技术领域属于消费者洞察，包含 43 个创新事件',
    count: 43,
    items: [
      { id: 'i1', rank: 1, title: '男士进阶护肤与妆备', description: '从基础清洁拓展到精华、防晒、素颜霜，沟通专业且不“油腻”的男士理容方案。', date: '2025/11/20', heat: 72, region: '亚太', sourceCount: 6, details: COMMON_DETAILS },
      { id: 'i2', rank: 2, title: '“气质中和”无界妆容', description: '打破性别刻板印象，打造力量感女性妆容或精致感男士妆容，与追求个性表达的客户共鸣。', date: '2025/11/17', heat: 68, region: '欧美', sourceCount: 8, details: COMMON_DETAILS },
      { id: 'i3', rank: 3, title: '“品质银发族”抗衰方案', description: '提供针对熟龄肌的抗皱、紧致产品组合及温和仪器搭配建议，切入高潜力市场。', date: '2025/11/19', heat: 44, region: '全球', sourceCount: 5, details: COMMON_DETAILS },
      { id: 'i4', rank: 4, title: '“都市精护派”的户外防护', description: '针对热衷户外的高线都市人群，强调整体防晒、抗光老化和运动后修护的一体化方案。', date: '2025/11/16', heat: 35, region: '中国', sourceCount: 4, details: COMMON_DETAILS },
      { id: 'i5', rank: 5, title: '“Gen Z”的职场第一套妆护', description: '为初入职场的Z世代，推荐得体妆容、高效护肤入门套装，建立长期品牌认知。', date: '2025/11/15', heat: 29, region: '中国', sourceCount: 3, details: COMMON_DETAILS }
    ]
  },
  {
    id: 't5',
    hashtag: '#营销与内容形式',
    category: '营销与内容形式',
    description: '该技术领域属于内容策略，包含 23 个创新事件',
    count: 23,
    items: [
      { id: 'i1', rank: 1, title: '中长视频深度教程', description: '通过3-5分钟的视频，详细讲解产品成分、上妆手法和解决特定问题，适合在私域社群传播。', date: '2025/11/18', heat: 85, region: '中国', sourceCount: 10, details: COMMON_DETAILS },
      { id: 'i2', rank: 2, title: '“科学种草”与成分叙事', description: '用通俗语言解读复杂成分（如多肽、稀有植萃）的作用机理，建立品牌可信度。', date: '2025/11/16', heat: 62, region: '全球', sourceCount: 7, details: COMMON_DETAILS },
      { id: 'i3', rank: 3, title: '“沉浸式”产品体验与开箱', description: '通过ASMR、Room Tour等形式，展示产品质感、使用场景，营造高端、治愈的氛围。', date: '2025/11/20', heat: 35, region: '欧美', sourceCount: 4, details: COMMON_DETAILS },
      { id: 'i4', rank: 4, title: '溯源与品牌故事短剧', description: '以微短剧或纪录片形式，讲述成分发现、研发故事或工艺传承，赋予品牌深厚情感价值。', date: '2025/11/19', heat: 30, region: '中国', sourceCount: 3, details: COMMON_DETAILS },
      { id: 'i5', rank: 5, title: 'AIGC生成个性化内容', description: '利用AI技术，根据客户肤质、场景快速生成定制化护肤或妆容建议，展现科技感与服务前瞻性。', date: '2025/11/17', heat: 25, region: '全球', sourceCount: 6, details: COMMON_DETAILS }
    ]
  },
  {
    id: 't6',
    hashtag: '#场景与生活方式',
    category: '场景与生活方式',
    description: '该技术领域属于场景营销，包含 7 个创新事件',
    count: 7,
    items: [
      { id: 'i1', rank: 1, title: '“碎片化变美”场景方案', description: '为通勤、差旅、午间补妆等场景，推荐便捷、多效合一的产品（如气垫、综合盘），解决具体痛点。', date: '2025/11/19', heat: 77, region: '全球', sourceCount: 5, details: COMMON_DETAILS },
      { id: 'i2', rank: 2, title: '“高感沉浸”式体验', description: '打造沙龙护肤、家居SPA、DIY调香等内容，将产品融入高端生活仪式，强化品牌质感与客户粘性。', date: '2025/11/17', heat: 65, region: '中国', sourceCount: 4, details: COMMON_DETAILS },
      { id: 'i3', rank: 3, title: '“共美无间”关系建设', description: '策划闺蜜礼盒、情侣香氛、亲子护肤话题，将美妆作为情感纽带，拓展送礼和共同消费场景。', date: '2025/11/18', heat: 58, region: '亚太', sourceCount: 3, details: COMMON_DETAILS },
      { id: 'i4', rank: 4, title: '“自我仪式”疗愈时刻', description: '围绕夜间修护、周末焕肤等自我关爱仪式，推荐全套产品组合，提升客单价与客户忠诚度。', date: '2025/11/20', heat: 42, region: '欧美', sourceCount: 2, details: COMMON_DETAILS },
      { id: 'i5', rank: 5, title: '季节性护肤与香氛切换', description: '根据季节变化，提供护肤品更替、香调推荐（如秋冬木质调）的专业建议，体现持续关怀。', date: '2025/11/15', heat: 36, region: '全球', sourceCount: 3, details: COMMON_DETAILS }
    ]
  }
];

export const DICTIONARY = {
  zh: {
    appName: "L'Oréal Eureka",
    nav: { generation: "智能创作", knowledge: "知识中枢", diagnosis: "全域诊断", analysis: "选题分析", management: "系统配置" },
    gen: {
      title: "智能文案创作",
      sections: { brand: "品牌基因", strategy: "内容策略", audience: "动态人群", kb: "知识库调用", config: "生成配置" },
      fields: { 
        brand: "所属品牌", baPersona: "BA 属性", scenario: "沟通场景", style: "沟通风格", 
        mimicry: "AI 风格仿写", sellingPoints: "核心卖点", 
        knowledgeSelector: "点击选择 CRM / 企微标签...",
        kbFolder: "品牌资产文件夹", kbProduct: "关联产品",
        length: "篇幅", extras: "附加元素", compliance: "合规与边界"
      },
      actions: { generate: "立即生成", generating: "Eureka 运算中...", refine: "迭代优化", debug: "API 调试" },
      placeholders: {
        customTag: "自定义标签 (回车添加)...",
        sellingPoints: "输入产品功效、活动机制或营销主题...",
        mimicry: "粘贴优秀话术让 AI 模仿风格...",
        refine: "输入修改意见 (如: 更活泼一点)..."
      }
    }
  },
  en: {
    appName: "L'Oréal Eureka",
    nav: { generation: "Eureka Create", knowledge: "Knowledge Base", diagnosis: "Diagnosis", analysis: "Trend Analysis", management: "Settings" },
    gen: {
      title: "Smart Copywriting",
      sections: { brand: "Brand DNA", strategy: "Content Strategy", audience: "Dynamic Audience", kb: "Knowledge Base", config: "Config" },
      fields: { 
        brand: "Brand", baPersona: "BA Persona", scenario: "Scenario", style: "Style", 
        mimicry: "AI Style Mimicry", sellingPoints: "Core Selling Points", 
        knowledgeSelector: "Select CRM / WeCom tags...",
        kbFolder: "Asset Folder", kbProduct: "Link Product",
        length: "Length", extras: "Extras", compliance: "Compliance"
      },
      actions: { generate: "Generate", generating: "Processing...", refine: "Refine", debug: "Debug API" },
      placeholders: {
        customTag: "Custom tags (Enter to add)...",
        sellingPoints: "Enter benefits, campaign theme...",
        mimicry: "Paste text to mimic style...",
        refine: "Enter feedback..."
      }
    }
  }
};

// Diagnosis Mock Data
export const MOCK_DIAGNOSIS_DATA = {
  metrics: [
    { label: "Token 总调用量", value: "852,490", change: 12.5, trend: "up" },
    { label: "Token 余额", value: "147,510", change: -5.2, trend: "down" },
    { label: "累计生成文案", value: "3,450", change: 8.4, trend: "up" },
    { label: "活跃 BA 数量", value: "892", change: 2.1, trend: "up" },
  ] as DiagnosisMetric[],
  
  genChart: [
    { label: "Mon", valueA: 45, valueB: 30 },
    { label: "Tue", valueA: 52, valueB: 35 },
    { label: "Wed", valueA: 49, valueB: 42 },
    { label: "Thu", valueA: 62, valueB: 45 },
    { label: "Fri", valueA: 78, valueB: 50 },
    { label: "Sat", valueA: 85, valueB: 65 },
    { label: "Sun", valueA: 60, valueB: 40 },
  ] as ChartDataPoint[], // A: WeCom, B: RedBook

  topRegions: [
    { name: "Shanghai", value: 92 },
    { name: "Beijing", value: 85 },
    { name: "Chengdu", value: 78 },
    { name: "Guangzhou", value: 72 },
    { name: "Hangzhou", value: 65 },
  ],

  interaction: [
    { label: "私域消息点击率", value: "18.5%", change: 1.2, trend: "up" },
    { label: "文案收藏率", value: "8.2%", change: 0.5, trend: "up" },
    { label: "内容采用率", value: "65%", change: 3.1, trend: "up" },
    { label: "平均迭代次数", value: "1.4", change: -0.2, trend: "down" } // Lower is better
  ]
};

// Management Mock Data
export const ALL_PERMISSIONS: PermissionNode[] = [
  { id: 'gen_write', label: 'Create Content', category: 'Generation' },
  { id: 'gen_read', label: 'View History', category: 'Generation' },
  { id: 'kb_write', label: 'Manage Assets', category: 'Knowledge' },
  { id: 'kb_read', label: 'View Knowledge Base', category: 'Knowledge' },
  { id: 'dia_view', label: 'View Diagnosis', category: 'Diagnosis' },
  { id: 'ana_view', label: 'View Trends', category: 'Analysis' },
  { id: 'sys_manage', label: 'Manage Users/Roles', category: 'System' },
];

export const MOCK_ROLES: Role[] = [
  { id: 'admin', name: 'Brand Admin', description: 'Full access to tenant configuration and users', permissions: ['gen_write', 'gen_read', 'kb_write', 'kb_read', 'dia_view', 'ana_view', 'sys_manage'] },
  { id: 'manager', name: 'Marketing Manager', description: 'Can manage assets and view all analytics', permissions: ['gen_write', 'gen_read', 'kb_write', 'kb_read', 'dia_view', 'ana_view'] },
  { id: 'writer', name: 'Copywriter', description: 'Content generation focus', permissions: ['gen_write', 'gen_read', 'kb_read', 'ana_view'] },
];

export const MOCK_MANAGED_USERS: ManagedUser[] = [
  { id: 'u1', name: 'Jane Doe', email: 'jane.doe@loreal.com', roleId: 'admin', status: 'active', lastLogin: 'Just now', avatar: 'JD' },
  { id: 'u2', name: 'John Smith', email: 'john.smith@loreal.com', roleId: 'manager', status: 'active', lastLogin: '2 hours ago', avatar: 'JS' },
  { id: 'u3', name: 'Sarah Lee', email: 'sarah.lee@loreal.com', roleId: 'writer', status: 'inactive', lastLogin: '3 days ago', avatar: 'SL' },
  { id: 'u4', name: 'David Kim', email: 'david.kim@loreal.com', roleId: 'writer', status: 'active', lastLogin: '1 day ago', avatar: 'DK' },
];