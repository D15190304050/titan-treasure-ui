import React, { useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthKeys from '@/constants/AuthConstants';
import { useUserSessionStore } from '@/stores/userStore';

const OAuth2Callback: React.FC = () =>
{
    const navigate = useNavigate();

    useEffect(() =>
    {
        // 获取当前 URL 中的参数
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');
        const username = urlParams.get('username');

        // console.log("Received parameters:");
        // console.log("token = ", token);
        // console.log("email = ", email);
        // console.log("username = ", username);
        
        // 检查opener是否存在
        if (!window.opener) {
            console.error("No window opener found");
            window.close();
            return;
        }
        
        // 情况1: 已注册用户，后端返回了token
        if (token)
        {
            // 将 Token 发送给主页面
            window.opener?.postMessage({ type: 'AUTH_SUCCESS', token }, '*');
            window.close(); // 关闭弹窗
        }
        // 情况2: 新用户，后端返回了email和username
        else if (email && username)
        {
            // 弹出确认对话框询问用户是否要注册
            const shouldRegister = confirm(`Detected that you are a new user with email: ${email} and username: ${username}. Do you want to register?`);
            
            if (shouldRegister)
            {
                // 跳转到注册页面，并将用户名和邮箱作为URL参数传递
                window.opener?.postMessage({ 
                    type: 'REDIRECT_TO_REGISTER', 
                    email, 
                    username 
                }, '*');
                window.close(); // 关闭弹窗
            }
            else
            {
                // 用户选择不注册，关闭窗口并返回到登录页面
                window.opener?.postMessage({ type: 'AUTH_CANCEL' }, '*');
                window.close();
            }
        }
        else
        {
            // 其他错误情况
            window.opener?.postMessage({ type: 'AUTH_ERROR', message: 'No valid parameters received' }, '*');
            window.close();
        }
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Processing login...</h2>
            <p>Please wait, do not close this window.</p>
        </div>
    );
};

export default OAuth2Callback;