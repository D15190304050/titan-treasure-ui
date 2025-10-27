import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, Card, message, Steps } from 'antd';
import { MailOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { LoginStateTokenInfo } from '@/types';

const { Title, Text } = Typography;
const { Step } = Steps;

const ForgotPassword: React.FC = () =>
{
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = async (values: { email: string }) =>
    {
        setLoading(true);
        try
        {
            // TODO: 调用发送验证码API
            // const response = await sendVerificationCode(values.email);
            // 模拟API调用
            setTimeout(() =>
            {
                setEmail(values.email);
                setCurrentStep(1);
                message.success('验证码已发送至您的邮箱');
            }, 1000);
        } catch (error)
        {
            message.error('发送验证码失败，请稍后重试');
        } finally
        {
            setLoading(false);
        }
    };

    const handleCodeSubmit = async (values: { code: string }) =>
    {
        setLoading(true);
        try
        {
            // TODO: 验证验证码
            // const response = await verifyCode(email, values.code);
            // 模拟API调用
            setTimeout(() =>
            {
                setCurrentStep(2);
                message.success('验证码验证成功');
            }, 1000);
        } catch (error)
        {
            message.error('验证码错误，请重新输入');
        } finally
        {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (values: { password: string; confirmPassword: string }) =>
    {
        if (values.password !== values.confirmPassword)
        {
            message.error('两次输入的密码不一致');
            return;
        }

        setLoading(true);
        try
        {
            // TODO: 重置密码
            // const response = await resetPassword(email, values.password);
            // 模拟API调用
            setTimeout(() =>
            {
                message.success('密码重置成功');
                navigate('/login');
            }, 1000);
        } catch (error)
        {
            message.error('密码重置失败，请稍后重试');
        } finally
        {
            setLoading(false);
        }
    };

    const renderStepContent = () =>
    {
        switch (currentStep)
        {
            case 0:
                return (
                    <Form
                        name="forgot_password_email"
                        onFinish={handleEmailSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: '请输入邮箱!' },
                                { type: 'email', message: '请输入有效的邮箱地址!' }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined className="text-gray-400" />}
                                placeholder="请输入注册邮箱"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                size="large"
                                loading={loading}
                            >
                                发送验证码
                            </Button>
                        </Form.Item>
                    </Form>
                );
            case 1:
                return (
                    <Form
                        name="forgot_password_code"
                        onFinish={handleCodeSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '请输入验证码!' }]}
                        >
                            <Input
                                prefix={<SafetyCertificateOutlined className="text-gray-400" />}
                                placeholder="请输入邮箱验证码"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                size="large"
                                loading={loading}
                            >
                                验证
                            </Button>
                        </Form.Item>
                    </Form>
                );
            case 2:
                return (
                    <Form
                        name="forgot_password_reset"
                        onFinish={handlePasswordSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: '请输入新密码!' },
                                { min: 8, message: '密码至少8个字符!' },
                                { max: 20, message: '密码最多20个字符!' }
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="请输入新密码"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                { required: true, message: '请确认新密码!' },
                                { min: 8, message: '密码至少8个字符!' },
                                { max: 20, message: '密码最多20个字符!' }
                            ]}
                            hasFeedback
                            dependencies={['password']}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="请再次输入新密码"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                                size="large"
                                loading={loading}
                            >
                                重置密码
                            </Button>
                        </Form.Item>
                    </Form>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md shadow-lg">
                <div className="text-center mb-6">
                    <Title level={2}>找回密码</Title>
                    <Text type="secondary">请按照以下步骤重置您的密码</Text>
                </div>

                <Steps
                    current={currentStep}
                    items={[
                        { title: '验证邮箱' },
                        { title: '验证身份' },
                        { title: '重置密码' },
                    ]}
                    className="mb-6"
                />

                {renderStepContent()}

                <div className="text-center mt-4">
                    <Link to="/login">返回登录</Link>
                </div>
            </Card>
        </div>
    );
};

export default ForgotPassword;