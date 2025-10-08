import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginRequest, LoginStateTokenInfo, ServiceResponse } from '@/types';
import { login } from '@/apis/auth';
import AuthKeys from '@/constants/AuthConstants';

const { Title, Text } = Typography;

const Login: React.FC = () =>
{
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: LoginRequest) =>
    {
        setLoading(true);
        try
        {
            const loginStateTokenInfoResponse: ServiceResponse<LoginStateTokenInfo> = await login(values);

            if (loginStateTokenInfoResponse.success !== true)
            {
                message.error(loginStateTokenInfoResponse.message || '登录失败，请检查用户名和密码');
                return;
            }

            // 登录成功后，将accessToken存储到localStorage
            // 注意：在实际应用中，accessToken应该被存储在HTTP-only Cookie中，而不是localStorage中
            // 这是为了防止XSS攻击，因为HTTP-only Cookie不能被JavaScript访问
            // 同时，也可以防止CSRF攻击，因为HTTP-only Cookie不能被跨站脚本攻击利用
            const loginStateTokenInfo: LoginStateTokenInfo = loginStateTokenInfoResponse.data;
            localStorage.setItem(AuthKeys.AccessToken, loginStateTokenInfo.accessToken);
            // localStorage.setItem('refreshToken', loginStateTokenInfo.refreshToken);
            // localStorage.setItem('expirationInSeconds', loginStateTokenInfo.expirationInSeconds.toString());

            navigate('/profile');
        }
        catch (error)
        {
            message.error('登录失败，请检查用户名和密码');
        }
        finally
        {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md shadow-lg">
                <div className="text-center mb-6">
                    <Title level={2}>用户登录</Title>
                    <Text type="secondary">欢迎回来，请输入您的账号信息</Text>
                </div>

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="用户名"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="text-gray-400" />}
                            type="password"
                            placeholder="密码"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <a className="float-right" href="">
                            忘记密码?
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            size="large"
                            loading={loading}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center">
                    <Text type="secondary">还没有账号? </Text>
                    <Link to="/register">立即注册</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;