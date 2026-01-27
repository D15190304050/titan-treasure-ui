import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
    loadStoredToken: () => void;
}

export const useUserSessionStore = create<UserSession>()(
    persist(
        (set) => ({
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
            loadStoredToken: () =>
            {
                const storedToken = localStorage.getItem(AuthKeys.AccessToken);
                if (storedToken)
                {
                    set({ token: storedToken, isAuthenticated: true });
                }
            },
        }),
        {
            name: 'user-session-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);