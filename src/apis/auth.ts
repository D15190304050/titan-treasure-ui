import { ServiceResponse, UserInfo } from '@/types';
import qs from "qs";
import axiosWithInterceptor from "@/apis/axios.ts";

const viteEnv = import.meta.env;

export async function getAvatarUploadUrl(fileName: string): Promise<ServiceResponse<any>>
{
    const response = await axiosWithInterceptor.get('/api/avatar/upload-url', {
        params: { fileName },
        paramsSerializer: params => qs.stringify(params)
    });
    return response.data;
}

export async function validateToken(token: string): Promise<ServiceResponse<UserInfo>>
{
    // const response = await axiosWithInterceptor.post(viteEnv.VITE_IAM_BASE_URL + '/sso/validate-token', { token }, {
    const response = await axiosWithInterceptor.post('/auth/sso/validate-token', { token }, {
        headers: {
            "Authorization": token
        }
    });
    return response.data;
}

export async function getCurrentUser(): Promise<ServiceResponse<any>>
{
    const response = await axiosWithInterceptor.get('/api/me');
    return response.data;
}

export async function updateUserInfo(userData: any): Promise<ServiceResponse<any>>
{
    const response = await axiosWithInterceptor.put('/api/me', userData);
    return response.data;
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/change-password', { oldPassword, newPassword });
    return response.data;
}

export async function changePhoneNumber(newPhoneNumber: string, code: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/change-phone', { newPhoneNumber, code });
    return response.data;
}

export async function changeEmail(newEmail: string, code: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/change-email', { newEmail, code });
    return response.data;
}
