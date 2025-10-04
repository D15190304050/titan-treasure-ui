import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Typography, 
  Card, 
  message, 
  Select, 
  DatePicker, 
  Upload, 
  Row, 
  Col 
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  UploadOutlined,
  ManOutlined,
  WomanOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { RegisterRequest } from '@/types';

const { Title, Text } = Typography;
const { Option } = Select;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterRequest) => {
    setLoading(true);
    try {
      // TODO: 调用注册API
      // const response = await register(values);
      // 模拟API调用
      setTimeout(() => {
        message.success('注册成功');
        navigate('/login');
      }, 1000);
    } catch (error) {
      message.error('注册失败，请稍后重试');
    } finally {
      setLoading(false);
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <div className="text-center mb-6">
          <Title level={2}>用户注册</Title>
          <Text type="secondary">请填写以下信息完成注册</Text>
        </div>

        <Form
          form={form}
          name="register"
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
                hasFeedback
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="4-20个字符"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="password"
                label="密码"
                rules={[
                  { required: true, message: '请输入密码!' },
                  { min: 8, message: '密码至少8个字符!' },
                  { max: 20, message: '密码最多20个字符!' }
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="8-20个字符"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
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
            <Col xs={24} sm={12}>
              <Form.Item
                name="phoneNumber"
                label="手机号"
                rules={[{ required: true, message: '请输入手机号!' }]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="手机号"
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
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
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('请先阅读并同意用户协议!')),
              },
            ]}
          >
            <div className="flex items-center">
              <input type="checkbox" id="agreement" />
              <label htmlFor="agreement" className="ml-2">
                我已阅读并同意 <a href="">用户协议</a> 和 <a href="">隐私政策</a>
              </label>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={loading}
            >
              注册
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Text type="secondary">已有账号? </Text>
          <Link to="/login">立即登录</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;