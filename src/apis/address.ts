import { ServiceResponse, Address } from '@/types';
import axiosWithInterceptor from "@/apis/axios.ts";

// 获取地址列表
export async function getAddressList(): Promise<ServiceResponse<Address[]>>
{
    const response = await axiosWithInterceptor.get('/api/address/list');
    return response.data;
}

// 获取地址详情
export async function getAddressDetail(id: string): Promise<ServiceResponse<Address>>
{
    const response = await axiosWithInterceptor.get(`/api/address/${id}`);
    return response.data;
}

// 添加地址
export async function addAddress(address: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post('/api/address', address);
    return response.data;
}

// 更新地址
export async function updateAddress(id: string, address: Partial<Address>): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.put(`/api/address/${id}`, address);
    return response.data;
}

// 删除地址
export async function deleteAddress(id: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.delete(`/api/address/${id}`);
    return response.data;
}

// 设置默认地址
export async function setDefaultAddress(id: string): Promise<ServiceResponse<boolean>>
{
    const response = await axiosWithInterceptor.post(`/api/address/${id}/default`);
    return response.data;
}