import { create } from 'zustand';
import { UserInfo } from '@/types';
import AuthKeys from '@/constants/AuthConstants';

interface UserSession
{
    user: UserInfo | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: UserInfo | null) => void;
    setToken: (token: string | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    logout: () => void;
}

export const useUserSessionStore = create<UserSession>((set) => ({
    user: null,
    token: localStorage.getItem(AuthKeys.AccessToken),
    isAuthenticated: false,
    setUser: (user) => set({ user }),
    setToken: (token) =>
    {
        if (token)
        {
            localStorage.setItem(AuthKeys.AccessToken, token);
        }
        else
        {
            localStorage.removeItem(AuthKeys.AccessToken);
        }
        set({ token });
    },
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    logout: () =>
    {
        localStorage.removeItem(AuthKeys.AccessToken);
        set({ user: null, token: null, isAuthenticated: false });
    },
}));