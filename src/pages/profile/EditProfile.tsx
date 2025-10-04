import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Select, 
  DatePicker, 
  Upload, 
  Row, 
  Col,
  message,
  Spin
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  UploadOutlined,
  ManOutlined,
  WomanOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { User } from '@/types';

const { Title } = Typography;
const { Option } = Select;

const EditProfile: React.FC = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
      form.setFieldsValue({
        ...mockUser,
        birthday: mockUser.birthday ? new Date(mockUser.birthday) : null
      });
      setLoading(false);
    }, 1000);
  }, [form]);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    try {
      // TODO: 调用更新用户信息API
      // const response = await updateUser(values);
      // 模拟API调用
      setTimeout(() => {
        message.success('资料更新成功');
        navigate('/profile');
      }, 1000);
    } catch (error) {
      message.error('资料更新失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  const uploadProps: UploadProps = {
    name: 'avatar',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  const handleCancel = () => {
    navigate('/profile');
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
        <Typography.Text>无法加载用户信息</Typography.Text>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <Title level={3} className="mb-6">编辑个人资料</Title>
        <Form
          form={form}
          name="edit_profile"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
        >
          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item label="头像">
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>上传头像</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={16}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱!' },
                  { type: 'email', message: '请输入有效的邮箱地址!' }
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="邮箱"
                  size="large"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="username"
                label="用户名"
                rules={[
                  { required: true, message: '请输入用户名!' },
                  { min: 4, message: '用户名至少4个字符!' },
                  { max: 20, message: '用户名最多20个字符!' }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="4-20个字符"
                  size="large"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="nickname"
                label="昵称"
                rules={[
                  { required: true, message: '请输入昵称!' },
                  { min: 2, message: '昵称至少2个字符!' },
                  { max: 20, message: '昵称最多20个字符!' }
                ]}
              >
                <Input
                  placeholder="2-20个字符"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phoneNumber"
                label="手机号"
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="手机号"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="gender"
                label="性别"
              >
                <Select
                  placeholder="请选择性别"
                  size="large"
                  allowClear
                >
                  <Option value={1}><ManOutlined /> 男</Option>
                  <Option value={2}><WomanOutlined /> 女</Option>
                  <Option value={0}><QuestionCircleOutlined /> 未知</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="birthday"
                label="生日"
              >
                <DatePicker
                  placeholder="请选择生日"
                  size="large"
                  className="w-full"
                  disabledDate={(current) => {
                    // 不能选择今天及以后的日期，且必须年满13岁
                    if (!current) return false;
                    const today = new Date();
                    const minDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
                    return current.valueOf() > minDate.getTime() || current.valueOf() > today.getTime();
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="bio"
            label="个人简介"
            rules={[{ max: 200, message: '个人简介最多200个字符!' }]}
          >
            <Input.TextArea
              placeholder="个人简介（最多200个字符）"
              rows={4}
              showCount
              maxLength={200}
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleCancel}
                size="large"
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={submitting}
              >
                保存
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfile;