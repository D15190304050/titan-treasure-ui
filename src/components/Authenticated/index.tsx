import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
    const { token, isAuthenticated, loadStoredToken } = useUserSessionStore();
    const hasValidatedToken = useRef<boolean>(false);

    useEffect(() =>
    {
        const storedToken = localStorage.getItem(AuthKeys.AccessToken);
        if (storedToken && !token)
        {
            loadStoredToken();
        }
    }, [token]);

    useEffect(() =>
    {
        console.log("Authenticated useEffect, isAuthenticated: ", isAuthenticated, " token: ", token + ".");

        if (hasValidatedToken.current) {
            return;
        }

        if (!isAuthenticated)
        {
            const currentUrl = window.location.href;
            const loginUrl: string = `${AuthKeys.LoginUrl}?redirectUrl=${encodeURIComponent(currentUrl)}`;

            if (!token)
            {
                console.log("No token found, redirect to login.");
                const currentUrl = window.location.href;
                const loginUrl = `${AuthKeys.LoginUrl}?redirectUrl=${encodeURIComponent(currentUrl)}`;
                // window.location.href = loginUrl;
                
                console.log("loginUrl: ", loginUrl);
                return;
            }

            console.log("Token found, validating token.");
            hasValidatedToken.current = true;
            
            validateToken(token)
                .then(response =>
                {
                    console.log("Token validation response: ", response);
                    if (response.success)
                    {
                        useUserSessionStore.setState({ isAuthenticated: true });
                        useUserSessionStore.setState({ user: response.data });
                    }
                    else
                    {
                        console.log("Invalid token, redirect to login, message: ", response.message);
                        const currentUrl = window.location.href;
                        const loginUrl = `${AuthKeys.LoginUrl}?redirectUrl=${encodeURIComponent(currentUrl)}`;
                        // window.location.href = loginUrl;

                        console.log("Simulate redirect to login.");
                    }
                })
                .catch(error =>
                {
                    console.log("Error validating token, redirect to login, error: ", error);
                    const currentUrl = window.location.href;
                    const loginUrl = `${AuthKeys.LoginUrl}?redirectUrl=${encodeURIComponent(currentUrl)}`;
                    // window.location.href = loginUrl;

                    console.log("Simulate redirect to login.");
                });
        }
    }, [isAuthenticated, location.pathname, token]);

    return isAuthenticated ? <>{children}</> : null;
};

export default Authenticated;