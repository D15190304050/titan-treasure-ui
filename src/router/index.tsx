import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

// Auth pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';

// Profile pages
import Profile from '@/pages/profile/Profile';
import EditProfile from '@/pages/profile/EditProfile';

// Address pages
import AddressList from '@/pages/address/AddressList';
import AddAddress from '@/pages/address/AddAddress';
import EditAddress from '@/pages/address/EditAddress';

// Settings pages
import AccountSecurity from '@/pages/settings/AccountSecurity';
import PrivacySettings from '@/pages/settings/PrivacySettings';
import OAuth2Callback from '@/pages/auth/OAuth2Callback';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/profile" replace />,
            },
            // Auth routes
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />,
            },
            {
                path: 'oauth2/callback',
                element: <OAuth2Callback />,
            },
            // Profile routes
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'profile/edit',
                element: <EditProfile />,
            },
            // Address routes
            {
                path: 'address',
                element: <AddressList />,
            },
            {
                path: 'address/add',
                element: <AddAddress />,
            },
            {
                path: 'address/edit/:id',
                element: <EditAddress />,
            },
            // Settings routes
            {
                path: 'settings/security',
                element: <AccountSecurity />,
            },
            {
                path: 'settings/privacy',
                element: <PrivacySettings />,
            },
        ],
    },
]);
