import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Avatar, 
  Typography, 
  Descriptions, 
  Button, 
  Tag, 
  Divider,
  message,
  Spin
} from 'antd';
import { 
  EditOutlined, 
  ManOutlined, 
  WomanOutlined, 
  QuestionCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  UserOutlined
} from '@ant-design/icons';
import { User } from '@/types';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: 从API获取用户信息
    // 模拟API调用
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        avatarUrl: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
        email: 'user@example.com',
        username: 'john_doe',
        nickname: 'John',
        phoneNumberCountryCode: '+86',
        phoneNumber: '13800138000',
        gender: 1,
        birthday: '1990-01-01',
        bio: '这是一个用户的个人简介，用来描述用户的个人信息和兴趣爱好。',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z'
      };
      setUser(mockUser);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const getGenderText = (gender: 0 | 1 | 2) => {
    switch (gender) {
      case 1: return <><ManOutlined /> 男</>;
      case 2: return <><WomanOutlined /> 女</>;
      default: return <><QuestionCircleOutlined /> 未知</>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
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
            {formatDate(user.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile;