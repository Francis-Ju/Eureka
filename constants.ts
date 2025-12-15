import { AudienceData, TrendCategory, DiagnosisKPI, DiagnosisChannelData, FAQItem, ModelHealthMetric, Role, ManagedUser, PermissionNode, FileItem, ServiceRecord, ChatRecord, TagCategory } from './types';

export const BRANDS = ["L'Oréal Paris", "Lancôme", "YSL Beauty", "Kiehl's", "La Roche-Posay", "SkinCeuticals"];

// Audience Library Data (Translated to Chinese)
export const INITIAL_AUDIENCE_DATA: AudienceData = {
  crm: [
    { id: 'membership', name: '会员等级', tags: ['普通会员', '银卡会员', '金卡会员', '白金会员'] },
    { id: 'lifecycle', name: '用户生命周期', tags: ['新客', '活跃VIP', '沉睡(30天+)', '流失风险'] },
    { id: 'demographics', name: '人口统计', tags: ['Z世代 (18-25)', '精致白领 (26-35)', '熟龄肌 (36+)', '一线城市'] },
    { id: 'spending', name: '消费力', tags: ['高消费力', '价格敏感', '奢华买家'] }
  ],
  wecom: [
    { id: 'skin', name: '肤质', tags: ['中性肌', '干皮', '油皮', '混合肌', '敏感肌'] },
    { id: 'role', name: '职业', tags: ['学生党', '上班族', '自由职业', '宝妈'] },
    { id: 'concerns', name: '肌肤困扰', tags: ['痘痘肌', '抗老淡纹', '暗沉提亮', '屏障修护'] }
  ]
};

export const CONSUMER_PREFERENCES: TagCategory[] = [
  { id: 'prod_pref', name: 'Product Preferences', tags: ['Natural Ingredients', 'High Efficacy', 'Fragrance-free', 'Sustainable Packaging'] },
  { id: 'channel_pref', name: 'Channel Preferences', tags: ['Online Consultation', 'Offline Experience', 'Live Stream Shopping'] },
  { id: 'content_pref', name: 'Content Preferences', tags: ['Scientific Proof', 'Influencer Reviews', 'Tutorial Videos', 'Before/After'] }
];

export const MOCK_SERVICE_HISTORY: ServiceRecord[] = [
  { id: 's1', customerName: 'Alice Wang', date: '2023-10-25', type: 'Skin Consultation', summary: 'Recommended Revitalift series for fine lines.', status: 'Completed' },
  { id: 's2', customerName: 'Bob Chen', date: '2023-11-02', type: 'After-sales', summary: 'Inquired about usage order of serums.', status: 'Completed' },
  { id: 's3', customerName: 'Carol Zhang', date: '2023-11-05', type: 'Complaint', summary: 'Shipping delay feedback.', status: 'Pending' },
];

export const MOCK_CHAT_HISTORY: ChatRecord[] = [
  { id: 'c1', customerName: 'Alice Wang', date: '2023-10-25 14:30', topic: 'Product Inquiry', snippet: 'Is the purple eye cream suitable for sensitive skin?', channel: 'WeCom' },
  { id: 'c2', customerName: 'David Liu', date: '2023-11-01 09:15', topic: 'Promotion', snippet: 'When does the Double 11 presale start?', channel: 'Tmall' },
];

// Knowledge Base Data
export const KB_FOLDERS = [
  "2025 品牌视觉规范 (Brand Guidelines)",
  "Q1 营销活动资产 (Campaign Assets)",
  "科学传播资料 (Scientific Comm)",
  "KOL 投放简报 (Briefs)"
];

export const BRAND_KB_FILES: FileItem[] = [
  { id: 'f1', name: 'Brand_Values_2025.pdf', type: 'pdf', size: '2.4 MB', date: '2023-10-01' },
  { id: 'f2', name: 'Logo_Pack_HighRes.zip', type: 'folder', size: '150 MB', date: '2023-09-15' },
  { id: 'f3', name: 'Brand_Story_Deck.pptx', type: 'folder', size: '12 MB', date: '2023-10-10' },
];

export const PRODUCT_KB_FILES: FileItem[] = [
  { id: 'pf1', name: 'Revitalift_Ingredients.pdf', type: 'pdf', size: '5.1 MB', date: '2023-10-05' },
  { id: 'pf2', name: 'Training_Video_Series', type: 'folder', size: '450 MB', date: '2023-10-20' },
  { id: 'pf3', name: 'FAQ_Sensitive_Skin.docx', type: 'docx', size: '1.2 MB', date: '2023-11-01' },
];

export const MOCK_PRODUCTS = [
  { 
    id: 'p1', 
    name: '紫熨斗全脸眼霜 (Revitalift Filler Eye Cream)', 
    data: {
      ingredients: '玻色因PRO + 玻尿酸 (Pro-Xylane + HA)',
      benefits: '淡纹 + 充盈 + 保湿',
      usage: '眼周按摩 + 法令纹提拉'
    }
  },
  { 
    id: 'p2', 
    name: '青春密码黑精华 (Youth Code Serum)', 
    data: {
      ingredients: '二裂酵母 + 酵素 (Bifida + Papain)',
      benefits: '强韧屏障 + 促进吸收',
      usage: '洁面后爽肤水前使用'
    }
  },
  { 
    id: 'p3', 
    name: '注光水乳 (Glycolic Bright)', 
    data: {
      ingredients: '乙醇酸 + 烟酰胺 (Glycolic + Niacinamide)',
      benefits: '即刻焕亮 + 减少暗沉',
      usage: '早晚日常使用'
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
    hashtag: '#可持续与纯净美妆',
    category: '可持续与纯净美妆',
    description: '该技术领域属于社会责任，包含 21 个创新事件',
    count: 21,
    items: [
      { id: 'i1', rank: 1, title: '可替换包装（Refillable）', description: '推广环保替换芯，强调减少塑料浪费，建立品牌环保形象，吸引有责任感的消费者。', date: '2025/11/19', heat: 85, region: '欧美', sourceCount: 10, details: COMMON_DETAILS },
      { id: 'i2', rank: 2, title: '纯净成分（Clean Beauty）', description: '强调无毒、无害、天然成分，符合健康生活方式趋势。', date: '2025/11/18', heat: 79, region: '全球', sourceCount: 8, details: COMMON_DETAILS },
      { id: 'i3', rank: 3, title: '零残忍认证', description: '宣传产品未进行动物测试，吸引关注动物权益的年轻消费群体。', date: '2025/11/20', heat: 60, region: '欧美', sourceCount: 6, details: COMMON_DETAILS }
    ]
  }
];

export const DICTIONARY: Record<string, any> = {
  zh: {
    nav: {
      generation: '内容生成 (Generation)',
      knowledge: '知识库 (Knowledge)',
      analysis: '趋势洞察 (Analysis)',
      diagnosis: '效果诊断 (Diagnosis)',
      management: '系统管理 (Management)'
    }
  },
  en: {
    nav: {
      generation: 'Generation',
      knowledge: 'Knowledge Base',
      analysis: 'Trend Analysis',
      diagnosis: 'Diagnosis',
      management: 'Management'
    }
  }
};

export const DIAGNOSIS_KPIS: DiagnosisKPI[] = [
  { id: 'k1', label: '点击率 (CTR)', value: '4.8%', trend: '+0.5%', trendDirection: 'up', iconType: 'click' },
  { id: 'k2', label: '转化率 (CVR)', value: '2.1%', trend: '+0.2%', trendDirection: 'up', iconType: 'conversion' },
  { id: 'k3', label: '用户满意度', value: '4.9', trend: 'Flat', trendDirection: 'up', iconType: 'like' },
  { id: 'k4', label: '平均响应时间', value: '1.2s', trend: '-0.3s', trendDirection: 'up', iconType: 'time' }
];

export const GENERATION_KPIS = [
  { label: 'Token消耗', value: '1.2M', trend: '+12%', iconType: 'coins' },
  { label: '预估成本', value: '$240', trend: '+8%', iconType: 'wallet' },
  { label: '生成条数', value: '15.4k', trend: '+25%', iconType: 'message' },
  { label: '平均生成速度', value: '2.8s', trend: '-10%', iconType: 'zap' }
];

export const DIAGNOSIS_CHANNEL_DATA: DiagnosisChannelData[] = [
  { channel: '企微 (WeCom)', generated: 12500, used: 8900, clickRate: '5.2%', conversionRate: '3.1%', trend: '+5.2%' },
  { channel: '小红书 (RedBook)', generated: 4500, used: 4100, clickRate: '8.5%', conversionRate: '1.8%', trend: '+12.4%' },
  { channel: '短信 (SMS)', generated: 20000, used: 19500, clickRate: '1.2%', conversionRate: '0.4%', trend: '-2.1%' }
];

export const MOCK_FAQS: FAQItem[] = [
  { id: 'q1', question: '玻色因面霜适合什么肤质？', answer: '适合所有肤质，特别是干皮和混干皮，敏感肌也适用。', frequency: 1240, lastUpdated: '2023-11-01' },
  { id: 'q2', question: '发货时效是多久？', answer: '正常情况下48小时内发货，大促期间72小时内。', frequency: 890, lastUpdated: '2023-10-20' }
];

export const MODEL_HEALTH_METRICS: ModelHealthMetric[] = [
  { name: 'Gemini 3 Pro', status: 'Healthy', latency: '850ms', errorRate: '0.01%' },
  { name: 'Gemini 2.5 Flash', status: 'Healthy', latency: '240ms', errorRate: '0.00%' },
  { name: 'Veo Video', status: 'Degraded', latency: '15s', errorRate: '2.5%' }
];

export const MOCK_MANAGED_USERS: ManagedUser[] = [
  { id: 'u1', name: 'Alice Chen', email: 'alice.chen@loreal.com', roleId: 'admin', status: 'active', lastLogin: '2 mins ago', avatar: 'AC' },
  { id: 'u2', name: 'Bob Smith', email: 'bob.smith@loreal.com', roleId: 'editor', status: 'active', lastLogin: '1 day ago', avatar: 'BS' },
  { id: 'u3', name: 'Carol Wu', email: 'carol.wu@loreal.com', roleId: 'viewer', status: 'inactive', lastLogin: '2 weeks ago', avatar: 'CW' }
];

export const MOCK_ROLES: Role[] = [
  { id: 'admin', name: 'Administrator', description: 'Full access to all modules and settings.', permissions: ['all'] },
  { id: 'editor', name: 'Content Editor', description: 'Can generate content and manage knowledge base.', permissions: ['gen_create', 'kb_read', 'kb_write'] },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access to reports.', permissions: ['report_read'] }
];

export const ALL_PERMISSIONS: PermissionNode[] = [
  { id: 'gen_create', label: 'Create Content', category: 'Generation' },
  { id: 'gen_review', label: 'Review Content', category: 'Generation' },
  { id: 'kb_read', label: 'View Knowledge Base', category: 'Knowledge' },
  { id: 'kb_write', label: 'Edit Knowledge Base', category: 'Knowledge' },
  { id: 'report_read', label: 'View Reports', category: 'Analytics' },
  { id: 'user_manage', label: 'Manage Users', category: 'System' }
];
