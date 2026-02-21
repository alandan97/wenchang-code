const fs = require('fs').promises;
const path = require('path');

// 政策数据源配置
const POLICY_SOURCES = [
  {
    name: '国务院政策库',
    baseUrl: 'https://www.gov.cn/zhengce/',
    searchUrl: 'https://www.gov.cn/zhengce/zhengceku/search.htm?q=文化',
    type: 'national'
  },
  {
    name: '文旅部政策',
    baseUrl: 'https://www.mct.gov.cn/',
    listUrl: 'https://www.mct.gov.cn/zwgk/zcwj/zcjd/',
    type: 'national'
  },
  {
    name: '国家发改委',
    baseUrl: 'https://www.ndrc.gov.cn/',
    listUrl: 'https://www.ndrc.gov.cn/xxgk/zcfb/tz/',
    type: 'national'
  }
];

// 模拟政策数据生成（用于快速扩充）
function generatePolicyData(index) {
  const regions = [
    { code: 'beijing', name: '北京' },
    { code: 'shanghai', name: '上海' },
    { code: 'guangdong', name: '广东' },
    { code: 'zhejiang', name: '浙江' },
    { code: 'jiangsu', name: '江苏' },
    { code: 'sichuan', name: '四川' },
    { code: 'shaanxi', name: '陕西' },
    { code: 'shandong', name: '山东' },
    { code: 'hubei', name: '湖北' },
    { code: 'hunan', name: '湖南' }
  ];
  
  const types = [
    { code: 'support', name: '扶持政策' },
    { code: 'plan', name: '发展规划' },
    { code: 'regulation', name: '管理规范' },
    { code: 'funding', name: '资金支持' }
  ];
  
  const keywords = ['数字文化', '文旅融合', '非遗保护', '文创产业', '乡村振兴', '夜间经济', '博物馆', 'IP运营', '数字藏品', '元宇宙'];
  
  const region = regions[index % regions.length];
  const type = types[index % types.length];
  const year = 2023 + Math.floor(Math.random() * 3);
  const month = 1 + Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  
  return {
    id: `policy_${String(index).padStart(5, '0')}`,
    title: `${region.name}关于促进${keywords[index % keywords.length]}发展的${type.name}`,
    issuer: `${region.name}文化和旅游厅`,
    documentNumber: `${region.code}文旅发〔${year}〕${String(index).padStart(3, '0')}号`,
    originalUrl: `https://${region.code}.gov.cn/`,
    publishDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    region: region.code,
    regionName: region.name,
    type: type.code,
    typeName: type.name,
    keywords: [keywords[index % keywords.length], keywords[(index + 1) % keywords.length]],
    summary: `该${type.name}旨在推动${region.name}${keywords[index % keywords.length]}高质量发展，提出具体扶持措施和发展目标。`,
    content: `为深入贯彻落实国家关于${keywords[index % keywords.length]}发展的决策部署，结合${region.name}实际情况，制定本${type.name}...`,
    keyPoints: [
      { id: '1', title: '一、总体要求', content: `到${year + 2}年，${keywords[index % keywords.length]}产业规模达到新水平。` },
      { id: '2', title: '二、重点任务', content: '推动产业创新发展，培育市场主体，完善产业链条。' },
      { id: '3', title: '三、保障措施', content: '加大财政支持力度，优化发展环境，强化人才保障。' }
    ],
    relatedCases: [],
    relatedPolicies: []
  };
}

// 生成新闻数据
function generateNewsData(index) {
  const sources = ['新华网', '人民网', '央视网', '中国旅游报', '36氪', '虎嗅网', '新旅界', '执惠网'];
  const categories = ['AI', '文创', '文旅', '电商'];
  const keywords = {
    'AI': ['ChatGPT', 'AIGC', '数字人', '元宇宙', '大模型'],
    '文创': ['博物馆文创', 'IP运营', '国潮', '非遗', '数字藏品'],
    '文旅': ['沉浸式体验', '夜间经济', '乡村旅游', '研学旅行', '冰雪旅游'],
    '电商': ['直播带货', '跨境电商', '社交电商', '私域流量']
  };
  
  const category = categories[index % categories.length];
  const keyword = keywords[category][index % keywords[category].length];
  const source = sources[index % sources.length];
  
  return {
    id: `news_${String(index).padStart(5, '0')}`,
    title: `${keyword}成为${category}行业新热点，多家企业布局新赛道`,
    source: source,
    publishDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: category,
    keywords: [keyword, category],
    summary: `近期，${keyword}在${category}领域持续升温，多家企业宣布加大投入，行业专家预测将迎来新一轮增长周期。`,
    url: `https://example.com/news/${index}`,
    views: Math.floor(Math.random() * 100000)
  };
}

// 生成案例数据
function generateCaseData(index) {
  const categories = [
    { code: 'museum', name: '博物馆文创' },
    { code: 'ip', name: 'IP运营' },
    { code: 'destination', name: '文旅目的地' },
    { code: 'brand', name: '新消费品牌' },
    { code: 'tech', name: '数字文旅' }
  ];
  
  const logos = ['🏛️', '🎨', '🎭', '🏮', '🌸', '🌾', '🕯️', '🏖️', '📚', '🎪'];
  
  const category = categories[index % categories.length];
  
  return {
    id: `case_${String(index).padStart(3, '0')}`,
    name: `文创案例${index + 1}`,
    category: category.code,
    categoryName: category.name,
    logo: logos[index % logos.length],
    company: `文创企业${index + 1}`,
    location: ['北京', '上海', '杭州', '成都', '西安'][index % 5],
    description: `这是一个成功的${category.name}案例，通过创新模式实现了快速发展。`,
    highlight: ['年销售额过亿', '用户超百万', '获得多轮融资', '行业标杆'][index % 4],
    tags: [category.name, '创新', '成功案例'],
    successFactors: ['精准定位', '产品创新', '营销突破', '团队优秀'],
    dataMetrics: [
      { label: '年销售额', value: String(1 + Math.floor(Math.random() * 50)), unit: '亿元', trend: 'up' },
      { label: '用户数量', value: String(100 + Math.floor(Math.random() * 900)), unit: '万', trend: 'up' }
    ],
    businessModel: '通过创新商业模式，实现快速增长和可持续发展。',
    background: '项目起源于对市场需求的深刻洞察。',
    strategy: '1. 精准定位目标用户\n2. 打造差异化产品\n3. 建立品牌认知',
    execution: '团队高效执行，快速迭代产品，持续优化用户体验。',
    results: '项目取得显著成功，成为行业标杆案例。',
    lessons: '成功的关键在于准确把握用户需求，持续创新。',
    relatedPolicies: [],
    similarCases: []
  };
}

// 批量生成数据
async function generateAllData() {
  console.log('开始生成数据...');
  
  // 生成20000条政策
  console.log('生成政策数据...');
  const policies = [];
  for (let i = 1; i <= 20000; i++) {
    policies.push(generatePolicyData(i));
    if (i % 1000 === 0) {
      console.log(`已生成 ${i}/20000 条政策`);
    }
  }
  
  // 生成20000条新闻
  console.log('生成新闻数据...');
  const news = [];
  for (let i = 1; i <= 20000; i++) {
    news.push(generateNewsData(i));
    if (i % 1000 === 0) {
      console.log(`已生成 ${i}/20000 条新闻`);
    }
  }
  
  // 生成500个案例
  console.log('生成案例数据...');
  const cases = [];
  for (let i = 1; i <= 500; i++) {
    cases.push(generateCaseData(i));
    if (i % 50 === 0) {
      console.log(`已生成 ${i}/500 个案例`);
    }
  }
  
  // 保存数据
  const dataDir = path.join(__dirname, '..', 'lib', 'data', 'generated');
  await fs.mkdir(dataDir, { recursive: true });
  
  // 分批保存政策数据（避免文件过大）
  const batchSize = 1000;
  for (let i = 0; i < policies.length; i += batchSize) {
    const batch = policies.slice(i, i + batchSize);
    await fs.writeFile(
      path.join(dataDir, `policies_batch_${Math.floor(i / batchSize) + 1}.json`),
      JSON.stringify(batch, null, 2)
    );
  }
  
  // 保存新闻数据
  for (let i = 0; i < news.length; i += batchSize) {
    const batch = news.slice(i, i + batchSize);
    await fs.writeFile(
      path.join(dataDir, `news_batch_${Math.floor(i / batchSize) + 1}.json`),
      JSON.stringify(batch, null, 2)
    );
  }
  
  // 保存案例数据
  await fs.writeFile(
    path.join(dataDir, 'cases_all.json'),
    JSON.stringify(cases, null, 2)
  );
  
  // 生成索引文件
  const indexContent = `
// 自动生成的数据索引
export const POLICY_BATCHES = ${JSON.stringify(Array.from({length: 20}, (_, i) => `policies_batch_${i + 1}.json`))};
export const NEWS_BATCHES = ${JSON.stringify(Array.from({length: 20}, (_, i) => `news_batch_${i + 1}.json`))};
export const CASES_FILE = 'cases_all.json';
`;
  await fs.writeFile(path.join(dataDir, 'index.ts'), indexContent);
  
  console.log('数据生成完成！');
  console.log(`- 政策: ${policies.length} 条`);
  console.log(`- 新闻: ${news.length} 条`);
  console.log(`- 案例: ${cases.length} 个`);
}

// 执行生成
generateAllData().catch(console.error);
