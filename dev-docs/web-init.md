# Web 端技术架构说明

## 1. 开发环境与核心框架

*   **环境管理**: [Volta](https://volta.sh/)
    *   **描述**: 零负担的 JavaScript 工具管理器。
    *   **优势**: 自动锁定并切换 Node.js 和包管理器（npm/yarn/pnpm）版本，确保团队开发环境一致性。

*   **构建工具**: [Vite](https://vitejs.dev/)
    *   **描述**: 下一代前端构建工具，提供极速的冷启动和热模块替换 (HMR)。
    *   **优势**: 基于原生 ES Modules，开发环境下无需打包，显著提升开发效率。

*   **前端框架**: [Vue 3](https://vuejs.org/)
    *   **描述**: 渐进式 JavaScript 框架的最新版本。
    *   **优势**: 引入 Composition API（组合式 API），提供更好的逻辑复用、类型推导和代码组织能力；虚拟 DOM 重写带来更优的性能。

*   **开发语言**: [TypeScript](https://www.typescriptlang.org/)
    *   **描述**: JavaScript 的超集，添加了静态类型系统。
    *   **优势**: 增强代码的可维护性和可读性，提供强大的 IDE 智能提示，在编译阶段捕获错误。

## 2. UI 与样式

*   **UI 组件库**: [Element Plus](https://element-plus.org/)
    *   **描述**: 基于 Vue 3 的桌面端组件库。
    *   **优势**: 组件丰富、设计规范统一，社区活跃度高，非常适合快速构建中后台管理系统。

*   **CSS 预处理器**: [Less](https://lesscss.org/)
    *   **描述**: 向后兼容的 CSS 扩展语言。
    *   **优势**: 支持变量、混合 (Mixins)、嵌套规则等特性，使 CSS 更易维护和扩展。

*   **页面适配**: [PostCSS](https://postcss.org/)
    *   **描述**: 使用 JS 插件转换 CSS 的工具。
    *   **策略**: 采用混合适配方案。
        *   **大于 1280px**: 使用 `postcss-px-to-viewport` 进行整体缩放，保持布局比例。
        *   **小于 1280px**: 禁用缩放，设置最小宽度，通过 CSS 媒体查询启用横向滚动条，保证内容不拥挤变形。

*   **富文本编辑器**: [WangEditor](https://www.wangeditor.com/)
    *   **描述**: 轻量级 web 富文本编辑器。
    *   **优势**: 配置简单，使用方便，对国产化环境友好，适合快速集成。

## 3. 网络与通用工具

*   **HTTP 请求**: [Axios](https://axios-http.com/)
    *   **描述**: 基于 Promise 的 HTTP 客户端。
    *   **优势**: 支持拦截请求和响应、转换数据、取消请求等，是 Vue 项目中标配的请求库。

*   **图表库**: [ECharts](https://echarts.apache.org/)
    *   **描述**: 一个基于 JavaScript 的开源可视化图表库。
    *   **优势**: 图表类型丰富（折线图、柱状图、饼图、地图等），交互性强，能够流畅运行在 PC 和移动设备上。

*   **时间处理**: [Moment.js](https://momentjs.com/)
    *   **描述**: 用于解析、验证、操作和格式化日期的 JavaScript 库。
    *   **优势**: API 丰富且直观，能够轻松处理复杂的日期计算和多语言格式化需求。

## 4. 代码规范与工程化

*   **代码校验**: [ESLint](https://eslint.org/)
    *   **描述**: 识别并报告 JavaScript/TypeScript 代码中的模式。
    *   **作用**: 强制执行代码质量规则，避免低级错误。

*   **代码格式化**: [Prettier](https://prettier.io/)
    *   **描述**: 固执己见的代码格式化工具。
    *   **作用**: 统一代码风格（缩进、引号、分号等）。

*   **自动化配置**:
    *   配置 IDE（如 VS Code）在 **保存时自动格式化** (Format On Save)，结合 `.eslintrc` 和 `.prettierrc` 配置文件，实现“写完即规范”的高效工作流。

## 5. 项目目录结构规范

```
src/
├── api/                # HTTP 请求管理
│   ├── index.ts        # Axios 实例封装与拦截器配置
│   └── modules/        # 按业务模块划分的接口定义
├── assets/             # 静态资源 (图片, 字体等)
├── components/         # 通用组件目录 (全局共享组件)
│   ├── BaseButton/     # 例如：基础按钮封装
│   └── Layout/         # 布局组件
├── hooks/              # 组合式 API (Composables)
├── router/             # 路由配置
├── store/              # 状态管理 (Pinia)
├── styles/             # 全局样式
│   ├── variables.less  # 全局 Less 变量
│   └── mixins.less     # 全局 Mixins
├── utils/              # 通用工具函数
│   ├── date.ts         # 日期处理工具
│   ├── validate.ts     # 校验工具
│   └── index.ts        # 工具导出入口
├── views/              # 页面组件 (按路由划分)
├── App.vue             # 根组件
└── main.ts             # 应用入口
```

## 6. 环境变量与多环境配置

项目基于 Vite 的环境变量机制，支持不同环境（开发、测试、生产）使用不同的后端服务地址。

### 6.1 环境文件说明

在项目根目录下创建以下文件：

*   `.env`: 所有环境默认加载的通用配置。
*   `.env.development`: 开发环境配置（`npm run dev` 默认加载）。
*   `.env.test`: 测试环境配置。
*   `.env.production`: 生产环境配置（`npm run build` 默认加载）。

### 6.2 配置示例

**`.env.development`** (开发环境)
```properties
# 页面标题
VITE_APP_TITLE = 科学院科技成果转化平台 (Dev)

# 后端接口地址
VITE_API_BASE_URL = http://localhost:3000/api
```

**`.env.production`** (生产环境)
```properties
VITE_APP_TITLE = 科学院科技成果转化平台

# 后端接口地址 (线上真实地址)
VITE_API_BASE_URL = https://api.science-transfer.com/v1
```

### 6.3 脚本配置 (`package.json`)

通过 `--mode` 参数指定环境模式：

```json
{
  "scripts": {
    "dev": "vite",                          // 默认 mode 为 development
    "build:test": "vite build --mode test", // 构建测试环境
    "build:prod": "vite build"              // 默认 mode 为 production
  }
}
```

### 6.4 代码中使用

在代码中通过 `import.meta.env` 访问以 `VITE_` 开头的变量：

```typescript
// src/api/index.ts
import axios from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 自动根据当前环境获取对应地址
  timeout: 5000
});
```

## 7. 依赖版本概览 (建议)

| 依赖项 | 建议版本 | 说明 |
| :--- | :--- | :--- |
| `node` (via Volta) | LTS (v20.x) | 运行时环境 |
| `vite` | ^5.x | 构建工具核心 |
| `vue` | ^3.x | 核心框架 |
| `typescript` | ^5.x | 类型支持 |
| `axios` | ^1.x | HTTP 请求 |
| `element-plus` | ^2.x | UI 组件库 |
| `wangeditor` | ^5.x | 富文本编辑器 |
| `echarts` | ^5.x | 可视化库 |
| `less` | ^4.x | 样式预处理 |
| `postcss` | ^8.x | 样式转换与适配 |
| `moment` | ^2.x | 时间处理 |
| `eslint` | ^8.x | 代码校验 |
| `prettier` | ^3.x | 代码格式化 |
