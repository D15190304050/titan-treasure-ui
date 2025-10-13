# Titan Treasure UI

Titan Treasure UI 是一个基于 React 和 TypeScript 的现代化用户管理系统前端应用。该系统提供了完整的用户认证、个人信息管理、地址管理和账户设置等功能。

## 项目概述

这是一个功能齐全的用户管理系统前端界面，包含以下主要功能模块：
- 用户认证（登录、注册、忘记密码）
- 个人资料管理
- 地址管理
- 账户安全设置
- 隐私设置

## 技术栈

- **React 18** - 用于构建用户界面的核心库
- **TypeScript** - 提供静态类型检查
- **React Router v6** - 声明式路由管理
- **Ant Design (Antd)** - UI 组件库
- **Zustand** - 状态管理
- **Axios** - HTTP 客户端
- **Vite** - 构建工具和开发服务器
- **ESLint** - 代码质量检查工具

## 功能模块

### 1. 认证模块
- 用户登录
- 用户注册
- 忘记密码
- 验证码发送与验证

### 2. 个人资料模块
- 查看个人资料
- 编辑个人资料
- 头像上传
- 基本信息管理（昵称、性别、生日等）

### 3. 地址管理模块
- 地址列表展示
- 添加新地址
- 编辑地址
- 设置默认地址
- 删除地址

### 4. 设置模块
- 账号安全设置
  - 修改密码
  - 修改绑定手机
  - 修改绑定邮箱
- 隐私设置

## 项目结构

```
src/
├── apis/              # API 接口定义
├── components/        # 公共组件
├── constants/         # 常量定义
├── hooks/             # 自定义 Hooks
├── layouts/           # 页面布局
├── pages/             # 页面组件
│   ├── address/       # 地址管理页面
│   ├── auth/          # 认证相关页面
│   ├── profile/       # 个人资料页面
│   └── settings/      # 设置页面
├── router/            # 路由配置
├── stores/            # 状态管理
├── types/             # TypeScript 类型定义
└── utils/             # 工具函数
```

## 环境配置

项目支持多种环境配置：
- 开发环境 (development)
- 测试环境 (staging)

环境变量文件位于 `/env` 目录下：
- `.env.development` - 开发环境配置
- `.env.staging` - 测试环境配置

## 安装与运行

### 前置要求
- Node.js >= 16.0.0
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
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

## 开发规范

### 代码风格
- 使用 ESLint 进行代码检查
- 遵循 Airbnb JavaScript 风格指南
- 使用 Prettier 格式化代码

### Git 提交规范
- 使用 conventional commits 规范
- 提交前确保通过所有测试和 lint 检查

## API 接口

项目使用 RESTful API 设计风格，主要接口包括：

### 认证相关
- `POST /api/iam/login` - 用户登录
- `POST /api/profile/profile/register` - 用户注册

### 用户相关
- `GET /api/profile/me` - 获取当前用户信息
- `PUT /api/profile/me` - 更新用户信息
- `POST /api/profile/change-password` - 修改密码

### 地址相关
- `GET /api/address/list` - 获取地址列表
- `POST /api/address/create` - 创建地址
- `PUT /api/address/update/{id}` - 更新地址
- `DELETE /api/address/delete/{id}` - 删除地址

## 状态管理

使用 Zustand 进行全局状态管理，主要包括：
- 用户信息状态
- 认证状态
- 地址列表状态

## 路由结构

```
/                          # 根路径，重定向到 /profile
/login                     # 登录页面
/register                  # 注册页面
/forgot-password           # 忘记密码页面
/profile                   # 个人资料页面
/profile/edit              # 编辑个人资料页面
/address                   # 地址列表页面
/address/add               # 添加地址页面
/address/edit/:id          # 编辑地址页面
/settings/security         # 账号安全设置页面
/settings/privacy          # 隐私设置页面
```

## 部署

### 构建
```bash
npm run build
```

构建后的文件位于 `dist/` 目录下，可部署到任何静态文件服务器。

### 环境变量
部署时需要根据目标环境设置相应的环境变量。

## 常见问题

### 开发环境代理配置
开发环境下，API 请求会自动代理到 `VITE_API_URL` 指定的地址。

### 跨域问题
生产环境中，需要在服务端正确配置 CORS 策略。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

该项目仅供内部使用，保留所有权利。