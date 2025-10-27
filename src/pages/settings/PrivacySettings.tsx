import React, { useState } from 'react';
import
    {
        Card,
        Typography,
        Switch,
        List,
        message
    } from 'antd';
import
    {
        EyeInvisibleOutlined,
        EyeOutlined,
        NotificationOutlined,
        GlobalOutlined,
        MobileOutlined,
        MailOutlined,
        UserOutlined,
        DatabaseOutlined
    } from '@ant-design/icons';

const { Title, Text } = Typography;

const PrivacySettings: React.FC = () =>
{
    const [settings, setSettings] = useState({
        profileVisible: true,
        phoneVisible: false,
        emailVisible: false,
        allowNotifications: true,
        allowPersonalization: true,
        allowDataCollection: false
    });

    const handleSettingChange = (key: keyof typeof settings, value: boolean) =>
    {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));

        // 模拟保存设置
        setTimeout(() =>
        {
            message.success('设置已保存');
        }, 500);
    };

    const privacyItems = [
        {
            key: 'profileVisible',
            icon: <EyeOutlined />,
            title: '个人资料可见性',
            description: '允许其他用户查看我的个人资料',
            checked: settings.profileVisible
        },
        {
            key: 'phoneVisible',
            icon: <MobileOutlined />,
            title: '手机号可见性',
            description: '允许其他用户查看我的手机号',
            checked: settings.phoneVisible
        },
        {
            key: 'emailVisible',
            icon: <MailOutlined />,
            title: '邮箱可见性',
            description: '允许其他用户查看我的邮箱',
            checked: settings.emailVisible
        }
    ];

    const notificationItems = [
        {
            key: 'allowNotifications',
            icon: <NotificationOutlined />,
            title: '消息通知',
            description: '接收系统消息和通知',
            checked: settings.allowNotifications
        },
        {
            key: 'allowPersonalization',
            icon: <UserOutlined />,
            title: '个性化推荐',
            description: '根据我的兴趣推荐内容',
            checked: settings.allowPersonalization
        },
        {
            key: 'allowDataCollection',
            icon: <DatabaseOutlined />,
            title: '数据收集',
            description: '允许收集使用数据以改进产品',
            checked: settings.allowDataCollection
        }
    ];

    return (
        <div className="space-y-6">
            <Card>
                <Title level={3} className="mb-6">隐私设置</Title>

                <div className="mb-8">
                    <Title level={4} className="mb-4">
                        <EyeInvisibleOutlined className="mr-2" />
                        个人资料隐私
                    </Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={privacyItems}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Switch
                                        key="switch"
                                        checked={item.checked}
                                        onChange={checked => handleSettingChange(item.key as keyof typeof settings, checked)}
                                    />
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={item.icon}
                                    title={item.title}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </div>

                <div>
                    <Title level={4} className="mb-4">
                        <GlobalOutlined className="mr-2" />
                        通知与数据
                    </Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={notificationItems}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Switch
                                        key="switch"
                                        checked={item.checked}
                                        onChange={checked => handleSettingChange(item.key as keyof typeof settings, checked)}
                                    />
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={item.icon}
                                    title={item.title}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
        </div>
    );
};

export default PrivacySettings;