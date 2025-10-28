import { useState, useEffect } from 'react';
import { useUserSessionStore } from '@/stores/userStore';
import { validateToken } from '@/apis/auth';

// 自定义Hook用于处理认证状态
export const useAuth = () =>
{
    const { user, token, isAuthenticated, setIsAuthenticated, setToken } = useUserSessionStore();
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        // 如果已经认证，直接结束loading
        if (isAuthenticated) {
            setLoading(false);
            return;
        }

        // 检查本地存储中的认证状态
        if (token)
        {
            // 验证token有效性
            validateToken(token)
                .then(response => {
                    if (response.success) {
                        // Token有效，更新认证状态和用户信息
                        setIsAuthenticated(true);
                        useUserSessionStore.setState({ user: response.data });
                    } else {
                        // Token无效，清除认证状态
                        setIsAuthenticated(false);
                        setToken(null);
                    }
                })
                .catch(error => {
                    // 验证失败，清除认证状态
                    console.error('Token validation failed:', error);
                    setIsAuthenticated(false);
                    setToken(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [token, isAuthenticated, setIsAuthenticated, setToken]);

    return {
        user,
        isAuthenticated,
        loading
    };
};