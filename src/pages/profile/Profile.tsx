import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import
    {
        Card,
        Avatar,
        Typography,
        Descriptions,
        Button,
        message,
        Spin
    } from 'antd';
import
    {
        EditOutlined,
        ManOutlined,
        WomanOutlined,
        QuestionCircleOutlined,
        MailOutlined,
        PhoneOutlined,
        CalendarOutlined,
        UserOutlined
    } from '@ant-design/icons';
import { FullUserProfileInfo } from '@/types/profile';
import { getProfileInfo } from '@/apis/profile';


const { Title, Text } = Typography;

const Profile: React.FC = () =>
{
    const [user, setUser] = useState<FullUserProfileInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() =>
    {
        const fetchProfileInfo = async () =>
        {
            try
            {
                const response = await getProfileInfo();
                if (response.success)
                {
                    const userProfileData: FullUserProfileInfo = response.data;

                    // 将 FullUserProfileInfo 转换为 User 类型，并处理日期字符串转换
                    const userProfile: FullUserProfileInfo = {
                        id: userProfileData.id,
                        avatarUrl: userProfileData.avatarUrl,
                        email: userProfileData.email,
                        username: userProfileData.username,
                        nickname: userProfileData.nickname,
                        phoneNumberCountryCode: userProfileData.phoneNumberCountryCode,
                        phoneNumber: userProfileData.phoneNumber,
                        gender: userProfileData.gender as 0 | 1 | 2,
                        birthday: typeof userProfileData.birthday === 'string' 
                            ? new Date(userProfileData.birthday) 
                            : userProfileData.birthday,
                        bio: userProfileData.bio,
                        creationTime: typeof userProfileData.creationTime === 'string' 
                            ? new Date(userProfileData.creationTime) 
                            : userProfileData.creationTime,
                    };
                    setUser(userProfile);
                }
                else
                {
                    message.error('获取用户信息失败: ' + response.message);
                }
            }
            catch (error)
            {
                message.error('获取用户信息失败');
                console.error('Failed to fetch profile info:', error);
            }
            finally
            {
                setLoading(false);
            }
        };

        fetchProfileInfo();
    }, []);

    const handleEditProfile = () =>
    {
        // navigate('/profile/edit');
    };

    const getGenderText = (gender: 0 | 1 | 2) =>
    {
        switch (gender)
        {
            case 1: return <><ManOutlined /> 男</>;
            case 2: return <><WomanOutlined /> 女</>;
            default: return <><QuestionCircleOutlined /> 未知</>;
        }
    };

    const formatDate = (dateInput: Date | string) =>
    {
        try {
            // 如果是字符串，则转换为Date对象
            const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
            
            // 检查日期是否有效
            if (!(date instanceof Date) || isNaN(date.getTime())) {
                console.warn('Invalid date input:', dateInput);
                return '无效日期';
            }
            
            return date.toLocaleDateString('zh-CN');
        } catch (error) {
            console.error('Error formatting date:', error);
            return '日期格式化失败';
        }
    };

    if (loading)
    {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        );
    }

    if (!user)
    {
        return (
            <Card>
                <Text>无法加载用户信息</Text>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <Avatar
                        size={120}
                        src={user.avatarUrl}
                        icon={<UserOutlined />}
                        className="flex-shrink-0"
                    />
                    <div className="flex-1 text-center md:text-left">
                        <Title level={3} className="mb-2">{user.nickname}</Title>
                        <Text type="secondary" className="block mb-4">@{user.username}</Text>
                        <Text className="block mb-4">{user.bio || '暂无个人简介'}</Text>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={handleEditProfile}
                        >
                            编辑资料
                        </Button>
                    </div>
                </div>
            </Card>

            <Card title="基本信息">
                <Descriptions column={1} layout="vertical" size="middle">
                    <Descriptions.Item label="邮箱">
                        <div className="flex items-center">
                            <MailOutlined className="mr-2" />
                            {user.email}
                        </div>
                    </Descriptions.Item>

                    <Descriptions.Item label="手机号">
                        <div className="flex items-center">
                            <PhoneOutlined className="mr-2" />
                            {user.phoneNumberCountryCode} {user.phoneNumber}
                        </div>
                    </Descriptions.Item>

                    <Descriptions.Item label="性别">
                        <div className="flex items-center">
                            {getGenderText(user.gender)}
                        </div>
                    </Descriptions.Item>

                    <Descriptions.Item label="生日">
                        <div className="flex items-center">
                            <CalendarOutlined className="mr-2" />
                            {user.birthday ? formatDate(user.birthday) : '未设置'}
                        </div>
                    </Descriptions.Item>

                    <Descriptions.Item label="注册时间">
                        {formatDate(user.creationTime)}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default Profile;