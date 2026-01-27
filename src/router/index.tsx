import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

import Profile from '@/pages/profile/Profile';
import EditProfile from '@/pages/profile/EditProfile';

import AddressList from '@/pages/address/AddressList';
import AddAddress from '@/pages/address/AddAddress';
import EditAddress from '@/pages/address/EditAddress';

import AccountSecurity from '@/pages/settings/AccountSecurity';
import PrivacySettings from '@/pages/settings/PrivacySettings';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/profile" replace />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'profile/edit',
                element: <EditProfile />,
            },
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
