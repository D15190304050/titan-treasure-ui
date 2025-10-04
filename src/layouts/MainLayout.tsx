import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Typography,
  theme,
  Drawer,
  Button,
  Avatar,
  Dropdown,
} from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  LogoutOutlined,
  EnvironmentOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems: MenuItem[] = [
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: '/address',
      icon: <EnvironmentOutlined />,
      label: '地址管理',
    },
    {
      key: 'settings-group',
      icon: <SettingOutlined />,
      label: '设置',
      children: [
        {
          key: '/settings/security',
          icon: <LockOutlined />,
          label: '账号安全',
        },
        {
          key: '/settings/privacy',
          icon: <EyeInvisibleOutlined />,
          label: '隐私设置',
        },
      ],
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/')) {
      navigate(key);
      setMobileDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    // TODO: 实现登出逻辑
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人资料',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      label: '设置',
      icon: <SettingOutlined />,
      onClick: () => navigate('/settings/security'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const siderContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Title level={4} className="text-center text-blue-600 mb-0">
          用户管理系统
        </Title>
      </div>
      <div className="flex-1 overflow-auto">
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['settings-group']}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none"
        />
      </div>
    </div>
  );

  return (
    <Layout className="min-h-screen">
      {/* 桌面端侧边栏 - 固定在左侧 */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="hidden lg:block shadow-lg fixed left-0 top-0 h-screen"
        width={240}
        style={{
          background: colorBgContainer,
        }}
      >
        {siderContent}
      </Sider>

      {/* 移动端抽屉 */}
      <Drawer
        title="用户管理系统"
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        className="lg:hidden"
        width={240}
        styles={{
          body: { padding: 0 },
        }}
      >
        {siderContent}
      </Drawer>

      {/* 主内容区域 - 添加左侧间距避免被侧边栏遮挡 */}
      <Layout className="lg:ml-60 min-h-screen">
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          className="flex items-center justify-between sticky top-0 z-10"
        >
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden"
          />
          <div className="flex-1" />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="cursor-pointer bg-blue-500"
            />
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: '16px',
            padding: '24px',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
            height: 'calc(100vh - 64px)', // 减去header高度
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;