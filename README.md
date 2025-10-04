# 用户Profile管理系统

一个基于React 18+、TypeScript、Ant Design 5.x和Vite 4+的现代化用户Profile管理系统。

## 功能特性

### 核心功能模块

1. **用户认证系统**
   - 用户注册（包含完整的表单验证）
   - 用户登录
   - 密码找回

2. **个人信息管理**
   - 完整的用户资料编辑
   - 头像上传管理

3. **地址管理**
   - 多地址CRUD操作
   - 省市区三级级联选择器
   - 默认地址设置
   - 地址标签功能

4. **扩展功能**
   - 账号安全设置
   - 隐私设置
   - 实名认证

## 技术栈

- **前端框架**: React 18+
- **语言**: TypeScript
- **UI库**: Ant Design 5.x
- **构建工具**: Vite 4+
- **状态管理**: Zustand
- **路由**: React Router v6
- **HTTP客户端**: Axios
- **图标库**: @ant-design/icons
- **样式**: Tailwind CSS

## 项目结构

```
src/
├── apis/              # API接口定义
├── components/        # 公共组件
├── hooks/             # 自定义Hooks
├── layouts/           # 页面布局
├── pages/             # 页面组件
│   ├── auth/          # 认证相关页面
│   ├── profile/       # 个人资料页面
│   ├── address/       # 地址管理页面
│   └── settings/      # 设置页面
├── router/            # 路由配置
├── services/          # 业务逻辑服务
├── stores/            # 状态管理
├── styles/            # 全局样式
├── types/             # TypeScript类型定义
└── utils/             # 工具函数
```

## 安装与运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
```

或使用yarn:

```bash
yarn install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 代码质量保证

- 使用TypeScript严格模式
- ESLint代码检查
- Prettier代码格式化
- 组件单元测试（待实现）
- Git提交规范

## 响应式设计

- 支持移动端、平板和桌面端
- 使用Ant Design的响应式组件
- 自适应布局

## 国际化支持

- 中英文支持（待实现）
- 使用Ant Design的国际化方案

## API接口模拟

- 使用Mock Service Worker (MSW)进行API模拟（待实现）

## 路由结构

- `/login` - 用户登录
- `/register` - 用户注册
- `/forgot-password` - 忘记密码
- `/profile` - 个人资料
- `/profile/edit` - 编辑个人资料
- `/address` - 地址管理
- `/address/add` - 添加地址
- `/address/edit/:id` - 编辑地址
- `/settings/security` - 账号安全
- `/settings/privacy` - 隐私设置

## 开发规范

### 代码规范

- 遵循Airbnb JavaScript编码规范
- 使用TypeScript严格模式
- 组件使用函数式组件和Hooks
- 使用CSS Modules或Tailwind CSS进行样式管理

### Git提交规范

- 使用Angular提交规范
- 提交信息格式：`<type>(<scope>): <subject>`

### 项目配置

- 使用Vite进行构建
- 使用ESLint进行代码检查
- 使用Prettier进行代码格式化
- 使用Tailwind CSS进行样式开发

## 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

项目维护者：[你的名字] - [你的邮箱]

项目链接：[https://github.com/yourusername/user-profile-management-system](https://github.com/yourusername/user-profile-management-system)