import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUserSessionStore } from '@/stores/userStore';
import AuthKeys from '@/constants/AuthConstants';

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isAuthenticated, loadStoredToken, setToken } = useUserSessionStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            // 1. Check for token in URL (SSO login)
            const ssoToken = searchParams.get(AuthKeys.AccessToken);
            if (ssoToken) {
                setToken(ssoToken);
                // Remove token from URL to preserve clean history
                searchParams.delete(AuthKeys.AccessToken);
                setSearchParams(searchParams);
            }

            // 2. Load token from storage if not already authenticated
            if (!isAuthenticated) {
                loadStoredToken();
            }

            setIsLoading(false);
        };

        initAuth();
    }, [searchParams, setSearchParams, setToken, isAuthenticated, loadStoredToken]);

    useEffect(() => {
        if (!isLoading) {
            const currentToken = useUserSessionStore.getState().token;
            if (!currentToken) {
                // Determine current URL for redirection
                const currentUrl = window.location.href;
                // Redirect to login page with callback URL
                const loginUrl = new URL(AuthKeys.LoginUrl);
                loginUrl.searchParams.set(AuthKeys.RedirectUrl, currentUrl);
                window.location.href = loginUrl.toString();
            }
        }
    }, [isLoading, isAuthenticated]);

    if (isLoading) {
        // You might want to show a loading spinner here
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    // Only render children if authenticated
    return useUserSessionStore.getState().token ? <>{children}</> : null;
};

export default AuthGuard;
