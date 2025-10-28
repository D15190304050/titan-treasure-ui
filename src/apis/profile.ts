import { ServiceResponse } from '@/types';
import axiosWithInterceptor from './axios';

export async function getProfileInfo(): Promise<ServiceResponse<any>>
{
    const response = await axiosWithInterceptor.get('/api/profile/info');
    return response.data;
}