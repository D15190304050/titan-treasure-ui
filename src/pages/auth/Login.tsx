import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, Card, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import { LoginRequest, LoginStateTokenInfo, ServiceResponse } from '@/types';
import { login } from '@/apis/auth';
import AuthKeys from '@/constants/AuthConstants';
import { useUserSessionStore } from '@/stores/userStore';

const { Title, Text } = Typography;
const env = import.meta.env;

// 登录页面组件
const Login: React.FC = () =>
{
    // 状态管理：控制登录按钮的加载状态
    const [loading, setLoading] = useState(false);
    const [githubLoading, setGithubLoading] = useState(false);
    // 路由导航钩子，用于页面跳转
    const navigate = useNavigate();

    // 表单提交处理函数
    const onFinish = async (values: LoginRequest) =>
    {
        // 设置加载状态为true，显示加载动画
        setLoading(true);
        try
        {
            // Clear previous login state.
            localStorage.removeItem(AuthKeys.AccessToken);
            const { setToken, setIsAuthenticated } = useUserSessionStore.getState();
            setToken(null);
            setIsAuthenticated(false);

            // 调用登录API接口
            const loginStateTokenInfoResponse: ServiceResponse<LoginStateTokenInfo> = await login(values);

            // 检查API响应是否成功
            if (loginStateTokenInfoResponse.success !== true)
            {
                // 如果登录失败，显示错误消息
                message.error(loginStateTokenInfoResponse.message || 'Login failed, please check your username and password');
                return;
            }

            // 登录成功后，将accessToken存储到localStorage
            // 注意：在实际应用中，accessToken应该被存储在HTTP-only Cookie中，而不是localStorage中
            // 这是为了防止XSS攻击，因为HTTP-only Cookie不能被JavaScript访问
            // 同时，也可以防止CSRF攻击，因为HTTP-only Cookie不能被跨站脚本攻击利用
            const loginStateTokenInfo: LoginStateTokenInfo = loginStateTokenInfoResponse.data;
            localStorage.setItem(AuthKeys.AccessToken, loginStateTokenInfo.accessToken);
            setToken(loginStateTokenInfo.accessToken);

            // Jump to /profile page directly, the <Authenticated> component will validate the token.
            // 登录成功后跳转到个人资料页面
            navigate('/profile');
        }
        catch (error)
        {
            // 捕获网络或其他异常错误
            message.error('Login failed, please check your username and password');
        }
        finally
        {
            // 无论成功或失败，最后都要关闭加载状态
            setLoading(false);
        }
    };

    // GitHub OAuth2登录处理函数
    const handleGithubLogin = () =>
    {
        // 设置加载状态为true，显示加载动画
        setGithubLoading(true);
        
        // 在新标签页中打开GitHub OAuth2登录页面
        const authWindow = window.open(
            // env.VITE_IAM_BASE_URL + '/oauth2/authorization/github',
            // env.VITE_IAM_BASE_URL + '/debug/oauth2/login-success',
            env.VITE_IAM_BASE_URL + '/debug/oauth2/login-not-registered',
            '_blank'
        );

        // 监听消息
        const handleMessage = (event: MessageEvent) => {
            console.log("event = ", event);

            // 安全检查：检查origin是否匹配IAM服务地址
            const iamBaseUrl = env.VITE_IAM_BASE_URL;
            if (event.origin !== window.location.origin && event.origin !== iamBaseUrl) {
                console.log(`Origin mismatch. Expected ${window.location.origin} or ${iamBaseUrl}, but got ${event.origin}`);
                return;
            }

            if (event.data.type === 'AUTH_SUCCESS') {
                const token: string = event.data.token;
                localStorage.setItem(AuthKeys.AccessToken, token);
                
                // 同时更新zustand store中的认证状态
                // Set isAuthenticated to false, because the token is not valid yet.
                // The token will be validated in the <Authenticated> component.
                const { setToken, setIsAuthenticated } = useUserSessionStore.getState();
                setToken(token);
                setIsAuthenticated(false);
                
                // 关闭加载状态
                setGithubLoading(false);
                
                // 登录成功后跳转到个人资料页面
                navigate('/profile');
                
                // 关闭授权窗口
                authWindow?.close();
                
                // 移除事件监听器
                window.removeEventListener('message', handleMessage);
            } else if (event.data.type === 'REDIRECT_TO_REGISTER') {
                // 新用户需要注册，跳转到注册页面并传递用户名和邮箱
                const { email, username } = event.data;
                
                // 关闭加载状态
                setGithubLoading(false);
                
                // 关闭授权窗口
                authWindow?.close();
                
                // 移除事件监听器
                window.removeEventListener('message', handleMessage);
                
                // 跳转到注册页面，并将用户名和邮箱作为URL参数传递
                navigate(`/register?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`);
            } else if (event.data.type === 'AUTH_CANCEL') {
                // 用户取消注册，关闭加载状态
                setGithubLoading(false);
                
                // 关闭授权窗口
                authWindow?.close();
                
                // 移除事件监听器
                window.removeEventListener('message', handleMessage);
            } else if (event.data.type === 'AUTH_ERROR') {
                message.error('Login failed: ' + event.data.message);
                setGithubLoading(false);
                authWindow?.close();
                window.removeEventListener('message', handleMessage);
            }
        };

        window.addEventListener('message', handleMessage);

        // 防止多次监听
        authWindow?.focus();

        // 设置超时关闭弹窗
        setTimeout(() => {
            if (!localStorage.getItem(AuthKeys.AccessToken)) {
                authWindow?.close();
                if (githubLoading) {
                    message.error('登录超时，请重试');
                    setGithubLoading(false);
                }
            }
            // 移除事件监听器
            window.removeEventListener('message', handleMessage);
        }, 120 * 1000); // 120秒超时
    };



    // 渲染登录表单UI
    return (
        // 页面容器，使用Flex布局居中显示
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            {/* 登录卡片容器 */}
            <Card className="w-full max-w-md shadow-lg">
                {/* 卡片头部标题区域 */}
                <div className="text-center mb-6">
                    <Title level={2}>用户登录</Title>
                    <Text type="secondary">欢迎回来，请输入您的账号信息</Text>
                </div>

                {/* 登录表单 */}
                <Form
                    name="login"
                    initialValues={{ remember: true }} // 初始值设置
                    onFinish={onFinish} // 表单提交回调函数
                    layout="vertical" // 垂直布局
                >
                    {/* 用户名输入字段 */}
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]} // 验证规则
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />} // 输入框前缀图标
                            placeholder="用户名"
                            size="large" // 大尺寸输入框
                        />
                    </Form.Item>

                    {/* 密码输入字段 */}
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]} // 验证规则
                    >
                        <Input
                            prefix={<LockOutlined className="text-gray-400" />} // 输入框前缀图标
                            type="password" // 密码类型输入框
                            placeholder="密码"
                            size="large" // 大尺寸输入框
                        />
                    </Form.Item>

                    {/* 忘记密码链接 */}
                    <Form.Item>
                        <a className="float-right" href="">
                            忘记密码?
                        </a>
                    </Form.Item>

                    {/* 登录按钮 */}
                    <Form.Item>
                        <Button
                            type="primary" // 主要按钮样式
                            htmlType="submit" // 提交类型按钮
                            className="w-full" // 宽度占满容器
                            size="large" // 大尺寸按钮
                            loading={loading} // 绑定加载状态
                        >
                            登录
                        </Button>
                    </Form.Item>
                    
                    {/* GitHub OAuth2登录按钮 */}
                    <Form.Item>
                        <Divider plain>或</Divider>
                        <Button
                            icon={<GithubOutlined />}
                            onClick={handleGithubLogin}
                            className="w-full"
                            size="large"
                            loading={githubLoading}
                        >
                            使用 GitHub 登录
                        </Button>
                    </Form.Item>
                </Form>

                {/* 注册链接区域 */}
                <div className="text-center">
                    <Text type="secondary">还没有账号? </Text>
                    <Link to="/register">立即注册</Link> {/* 使用React Router的Link组件进行页面跳转 */}
                </div>
            </Card>
        </div>
    );
};

export default Login;