import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserSessionStore } from '@/stores/userStore';
import AuthKeys from '@/constants/AuthConstants';
import { validateToken } from '@/apis/auth';

interface AuthenticatedProps
{
    children: React.ReactNode;
}

const Authenticated: React.FC<AuthenticatedProps> = ({ children }) =>
{
    const location = useLocation();
    const navigate = useNavigate();
    const { token, isAuthenticated } = useUserSessionStore();

    useEffect(() =>
    {
        if (!isAuthenticated)
        {
            // 检查是否有token
            if (!token)
            {
                // 没有token，重定向到登录页
                navigate(AuthKeys.LoginUrl, { replace: true });
                return;
            }

            // Validate token.
            validateToken(token)
                .then(response =>
                {
                    if (response.success)
                    {
                        // Token 有效，更新认证状态
                        useUserSessionStore.setState({ isAuthenticated: true });
                        // 保存用户信息
                        useUserSessionStore.setState({ user: response.data });
                    }
                    else
                    {
                        // Token 无效，重定向到登录页
                        navigate(AuthKeys.LoginUrl, { replace: true });
                    }
                })
                .catch(() =>
                {
                    // 网络错误或其他异常，重定向到登录页
                    navigate(AuthKeys.LoginUrl, { replace: true });
                });
        }
    }, [isAuthenticated, location.pathname, navigate]);

    // 只有认证通过才渲染子组件
    return isAuthenticated ? <>{children}</> : null;
};

export default Authenticated;