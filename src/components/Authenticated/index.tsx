import React, { useEffect, useRef } from 'react';
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
    const hasValidatedToken = useRef(false);

    // 定义不需要认证的公共路径
    const publicPaths = ['/login', '/register', '/forgot-password', '/oauth2/**'];

    useEffect(() =>
    {
        // 防止在React Strict Mode下重复调用API
        // if (hasValidatedToken.current) {
        //     return;
        // }
        
        // 检查当前路径是否为公共路径
        console.log("Current pathname: ", location.pathname);
        const isPublicPath = publicPaths.includes(location.pathname);
        
        // 如果是公共路径，直接渲染子组件，不进行认证检查
        if (isPublicPath) {
            return;
        }

        if (!isAuthenticated)
        {
            // 检查是否有token
            if (!token)
            {
                // 没有token，重定向到登录页
                navigate(AuthKeys.LoginUrl, { replace: true });
                return;
            }

            // 标记token验证已开始
            hasValidatedToken.current = true;
            
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
                        console.log("Invalid token, redirect to login, message: ", response.message);
                        navigate(AuthKeys.LoginUrl, { replace: true });
                    }
                })
                .catch(error =>
                {
                    // 网络错误或其他异常，重定向到登录页
                    console.log("Error validating token, redirect to login, error: ", error);
                    navigate(AuthKeys.LoginUrl, { replace: true });
                });
        }
    }, [isAuthenticated, location.pathname]);

    // 对于公共路径或者已认证的用户，渲染子组件
    return isAuthenticated || publicPaths.includes(location.pathname) ? <>{children}</> : null;
};

export default Authenticated;