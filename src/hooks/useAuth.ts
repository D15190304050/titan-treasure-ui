import { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';

// 自定义Hook用于处理认证状态
export const useAuth = () =>
{
    const { user, token, isAuthenticated, setIsAuthenticated } = useUserStore();
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        // 检查本地存储中的认证状态
        if (token)
        {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [token, setIsAuthenticated]);

    return {
        user,
        isAuthenticated,
        loading
    };
};