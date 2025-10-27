import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import
    {
        Layout,
        Menu,
        Typography,
        theme,
        Button,
    } from 'antd';
import
    {
        UserOutlined,
        SettingOutlined,
        EnvironmentOutlined,
        LockOutlined,
        EyeInvisibleOutlined,
        LogoutOutlined,
    } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import AuthKeys from '@/constants/AuthConstants';
import Authenticated from '@/components/Authenticated';

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const MainLayout: React.FC = () =>
{
    const [collapsed, setCollapsed] = useState(false);
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

    const handleMenuClick = ({ key }: { key: string }) =>
    {
        navigate(key);
    };

    const handleLogout = () =>
    {
        // TODO: 实现登出逻辑
        localStorage.removeItem(AuthKeys.AccessToken);
        navigate('/login');
    };

    const siderContent = (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <Title level={4} style={{ textAlign: 'center' }} className="text-center text-blue-600 mb-0">
                    我的账号
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
        <Authenticated>
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

                {/* 主内容区域 - 添加左侧间距避免被侧边栏遮挡 */}
                <Layout className="lg:ml-60 min-h-screen">
                    <Header
                        style={{
                            background: colorBgContainer,
                            padding: '0 16px',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            height: '64px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Button 
                            type="text" 
                            icon={<LogoutOutlined />} 
                            onClick={handleLogout}
                            size="large"
                        >
                            注销登录
                        </Button>
                    </Header>
                    <Content
                        style={{
                            margin: '16px',
                            padding: '24px',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            overflow: 'auto',
                            height: 'calc(100vh - 64px - 64px)', // 减去header高度和自身margin
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Authenticated>
    );
};

export default MainLayout;