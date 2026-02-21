# 文创指南助手 - 数据导入系统

## 数据源清单

### 1. 政策数据源

| 来源 | 网址 | 更新频率 | 数据量 |
|------|------|---------|--------|
| 文化和旅游部 | https://www.mct.gov.cn/ | 实时 | 500+ |
| 国家发改委 | https://www.ndrc.gov.cn/ | 实时 | 300+ |
| 各省文旅厅 | 各省官网 | 每周 | 1000+ |
| 国务院政策库 | https://www.gov.cn/zhengce/ | 实时 | 2000+ |

### 2. 案例数据源

| 来源 | 类型 | 数据量 |
|------|------|--------|
| 故宫文创 | 博物馆文创 | 1 |
| 敦煌文创 | 博物馆文创 | 1 |
| 泡泡玛特 | IP运营 | 1 |
| 大唐不夜城 | 文旅目的地 | 1 |
| 花西子 | 新消费品牌 | 1 |
| 只有河南 | 文旅目的地 | 1 |
| 观夏 | 新消费品牌 | 1 |
| 阿那亚 | 文旅目的地 | 1 |
| 小红书文创榜单 | 综合 | 100+ |
| 新旅界报道 | 文旅项目 | 200+ |
| 执惠网 | 文旅项目 | 200+ |

### 3. 关键词/趋势数据源

- 百度指数
- 微信指数
- 抖音热榜
- 小红书热搜

---

## 数据字段规范

### 政策数据
```json
{
  "id": "policy_001",
  "title": "政策标题",
  "issuer": "发布机构",
  "documentNumber": "文号",
  "originalUrl": "原文链接",
  "publishDate": "2025-01-15",
  "effectiveDate": "2025-02-01",
  "region": "national|beijing|shanghai...",
  "regionName": "国家级|北京|上海...",
  "type": "support|plan|regulation|funding",
  "typeName": "扶持政策|发展规划|管理规范|资金支持",
  "keywords": ["数字文化", "高质量发展"],
  "summary": "AI生成的摘要",
  "content": "政策正文",
  "keyPoints": [
    {"id": "1", "title": "条款标题", "content": "条款内容"}
  ],
  "relatedCases": ["case_001", "case_002"],
  "relatedPolicies": ["policy_002"]
}
```

### 案例数据
```json
{
  "id": "case_001",
  "name": "案例名称",
  "category": "museum|ip|destination|brand|tech",
  "categoryName": "博物馆文创|IP运营|文旅目的地|新消费品牌|数字文旅",
  "logo": "🏛️",
  "company": "所属公司",
  "location": "所在地区",
  "foundedYear": "2010",
  "description": "一句话描述",
  "highlight": "核心亮点数据",
  "tags": ["标签1", "标签2"],
  "images": ["/cases/xxx.jpg"],
  "successFactors": ["成功要素1", "成功要素2"],
  "dataMetrics": [
    {"label": "年销售额", "value": "15", "unit": "亿元", "trend": "up"}
  ],
  "businessModel": "商业模式",
  "background": "项目背景",
  "strategy": "策略打法",
  "execution": "执行过程",
  "results": "成果展示",
  "lessons": "经验总结",
  "relatedPolicies": ["policy_001"],
  "similarCases": ["case_002"]
}
```

---

## 数据导入脚本

### 1. 政策爬虫脚本
```python
# scripts/crawl_policies.py
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

def crawl_mct_policies():
    """爬取文旅部政策"""
    url = "https://www.mct.gov.cn/zwgk/zcwj/zcjd/"
    # 实现爬取逻辑
    pass

def crawl_ndrc_policies():
    """爬取发改委政策"""
    url = "https://www.ndrc.gov.cn/xxgk/zcfb/tz/"
    # 实现爬取逻辑
    pass
```

### 2. 案例数据导入
```python
# scripts/import_cases.py
import json

def import_cases_from_excel(file_path):
    """从Excel导入案例数据"""
    import pandas as pd
    df = pd.read_excel(file_path)
    cases = []
    for _, row in df.iterrows():
        case = {
            "id": f"case_{row['id']}",
            "name": row['名称'],
            "category": row['类型'],
            # ...
        }
        cases.append(case)
    return cases
```

### 3. 关键词趋势更新
```python
# scripts/update_keywords.py
def fetch_baidu_index(keyword):
    """获取百度指数"""
    pass

def fetch_wechat_index(keyword):
    """获取微信指数"""
    pass
```

---

## 自动化更新流程

```
定时任务（每天凌晨2点）
    ↓
运行数据爬取脚本
    ↓
数据清洗和格式化
    ↓
生成JSON数据文件
    ↓
构建静态站点
    ↓
部署到CDN
```

---

## 数据质量检查

- [ ] 政策数据完整性检查
- [ ] 案例数据准确性核实
- [ ] 链接有效性检测
- [ ] 重复数据清理
- [ ] 数据更新频率监控
