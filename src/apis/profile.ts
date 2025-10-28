import { ServiceResponse } from '@/types';
import axiosWithInterceptor from './axios';
import { FullUserProfileInfo } from '@/types/profile';

export async function getProfileInfo(): Promise<ServiceResponse<FullUserProfileInfo>>
{
    const response = await axiosWithInterceptor.get('/api/profile/profile/info');
    return response.data;
}