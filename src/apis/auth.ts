import { ServiceResponse, LoginRequest, LoginResponse, RegisterRequest } from '@/types';
import { OssPresignedUrlResponse } from '@/types/registration';
import axios from 'axios';
import qs from "qs";

export async function getAvatarUploadUrl(fileName: string): Promise<ServiceResponse<OssPresignedUrlResponse>> {
  const response = await axios.get('/api/profile/avatar/upload-url', { 
    params: {fileName},
    paramsSerializer: params => qs.stringify(params) 
  });
  return response.data;
}

// 登录
export async function login(request: LoginRequest): Promise<ServiceResponse<LoginResponse>> {
  const response = await axios.post('/api/profile/login', request);
  return response.data;
}

// 注册
export async function register(request: RegisterRequest): Promise<ServiceResponse<boolean>> {
  const response = await axios.post('/api/profile/profile/register', request);
  return response.data;
}

// 发送验证码
export async function sendVerificationCode(email: string): Promise<ServiceResponse<boolean>> {
  const response = await axios.post('/api/profile/send-code', { email });
  return response.data;
}

// 验证验证码
export async function verifyCode(email: string, code: string): Promise<ServiceResponse<boolean>> {
  const response = await axios.post('/api/profile/verify-code', { email, code });
  return response.data;
}

// 重置密码
export async function resetPassword(email: string, newPassword: string): Promise<ServiceResponse<boolean>> {
  const response = await axios.post('/api/profile/reset-password', { email, newPassword });
  return response.data;
}

// 获取当前用户信息
export async function getCurrentUser(): Promise<ServiceResponse<any>> {
  const response = await axios.get('/api/profile/me');
  return response.data;
}

// 更新用户信息
export async function updateUserInfo(userData: any): Promise<ServiceResponse<any>> {
  const response = await axios.put('/api/profile/me', userData);
  return response.data;
}

// 修改密码
export async function changePassword(oldPassword: string, newPassword: string): Promise<ServiceResponse<boolean>> {
  const response = await axios.post('/api/profile/change-password', { oldPassword, newPassword });
  return response.data;
}

// 修改手机号
export async function changePhoneNumber(newPhoneNumber: string, code: string): Promise<ServiceResponse<boolean>> {
  const response = await axios.post('/api/profile/change-phone', { newPhoneNumber, code });
  return response.data;
}

// 修改邮箱
export async function changeEmail(newEmail: string, code: string): Promise<ServiceResponse<boolean>> {
  const response = await axios.post('/api/profile/change-email', { newEmail, code });
  return response.data;
}
