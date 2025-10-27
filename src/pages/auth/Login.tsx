import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginRequest, LoginStateTokenInfo, ServiceResponse } from '@/types';
import { login } from '@/apis/auth';
import AuthKeys from '@/constants/AuthConstants';

const { Title, Text } = Typography;

// 登录页面组件
const Login: React.FC = () =>
{
    // 状态管理：控制登录按钮的加载状态
    const [loading, setLoading] = useState(false);
    // 路由导航钩子，用于页面跳转
    const navigate = useNavigate();

    // 表单提交处理函数
    const onFinish = async (values: LoginRequest) =>
    {
        // 设置加载状态为true，显示加载动画
        setLoading(true);
        try
        {
            // 调用登录API接口
            const loginStateTokenInfoResponse: ServiceResponse<LoginStateTokenInfo> = await login(values);

            // 检查API响应是否成功
            if (loginStateTokenInfoResponse.success !== true)
            {
                // 如果登录失败，显示错误消息
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

            // 登录成功后跳转到个人资料页面
            navigate('/profile');
        }
        // 捕获网络或其他异常错误
        catch (error)
        {
            message.error('登录失败，请检查用户名和密码');
        }
        // 无论成功或失败，最后都要关闭加载状态
        finally
        {
            setLoading(false);
        }
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