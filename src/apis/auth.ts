import { ServiceResponse, LoginRequest, LoginStateTokenInfo, RegisterRequest, UserInfo } from '@/types';
import { OssPresignedUrlResponse } from '@/types/registration';
import qs from "qs";
import axiosWithInterceptor from "@/apis/axios.ts";

const viteEnv = import.meta.env;

export async function getAvatarUploadUrl(fileName: string): Promise<ServiceResponse<OssPresignedUrlResponse>>
{
    const response = await axiosWithInterceptor.get('/api/avatar/upload-url', {
        params: { fileName },
        paramsSerializer: params => qs.stringify(params)
    });
    return response.data;
}

// 登录
export async function login(request: LoginRequest): Promise<ServiceResponse<LoginStateTokenInfo>>
{
    const response = await axiosWithInterceptor.post(viteEnv.VITE_IAM_BASE_URL + '/login', request);
    return response.data;
}

// Validate token, if valid, return UserInfo, else return null.
export async function validateToken(token: string): Promise<ServiceResponse<UserInfo>>
{
    const response = await axiosWithInterceptor.post(viteEnv.VITE_IAM_BASE_URL + '/sso/validate-token', { token }, {
        headers: {
            "Authorization": token
        }
    });
    return response.data;
}

// 注册
export async function register(request: RegisterRequest): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/profile/register', request);
    return response.data;
}

// 发送验证码
export async function sendVerificationCode(email: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/send-code', { email });
    return response.data;
}

// 验证验证码
export async function verifyCode(email: string, code: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/verify-code', { email, code });
    return response.data;
}

// 重置密码
export async function resetPassword(email: string, newPassword: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/reset-password', { email, newPassword });
    return response.data;
}

// 获取当前用户信息
export async function getCurrentUser(): Promise<ServiceResponse<any>>
{
    const response = await axiosWithInterceptor.get('/api/me');
    return response.data;
}

// 更新用户信息
export async function updateUserInfo(userData: any): Promise<ServiceResponse<any>>
{
    const response = await axiosWithInterceptor.put('/api/me', userData);
    return response.data;
}

// 修改密码
export async function changePassword(oldPassword: string, newPassword: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/change-password', { oldPassword, newPassword });
    return response.data;
}

// 修改手机号
export async function changePhoneNumber(newPhoneNumber: string, code: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/change-phone', { newPhoneNumber, code });
    return response.data;
}

// 修改邮箱
export async function changeEmail(newEmail: string, code: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/change-email', { newEmail, code });
    return response.data;
}
