export interface User
{
    id: string;
    avatarUrl?: string;
    email: string;
    username: string;
    nickname: string;
    phoneNumberCountryCode?: string;
    phoneNumber?: string;
    gender: 0 | 1 | 2; // 0=未知，1=男，2=女
    birthday?: string; // YYYY-MM-DD
    bio?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Address
{
    id: string;
    userId: string;
    name: string;
    phoneNumber: string;
    province: string;
    city: string;
    district: string;
    street: string;
    isDefault: boolean;
    label?: string; // 家、公司等标签
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest
{
    username: string;
    password: string;
}

export interface RegisterRequest
{
    avatarUrl?: string;
    email: string;
    username: string;
    password: string;
    nickname: string;
    phoneNumberCountryCode?: string;
    phoneNumber?: string;
    gender: 0 | 1 | 2;
    birthday?: number; // 毫秒级时间戳
    bio?: string;
}

export interface LoginStateTokenInfo
{
    accessToken: string;
    refreshToken: string;
    expirationInSeconds: number;
}

export interface ServiceResponse<TData>
{
    code: number;
    success: boolean;
    data: TData;
    message: string;
}

export interface PaginatedData<T>
{
    data: T[];
    pageSize?: number;
    pageCount?: number;
    total: number;
    current: number;
}

// 分页请求基础接口
export interface PaginationRequest
{
    current: number;
    pageSize: number;
}

export enum RowOperationType
{
    Add,
    Edit,
    Delete,
}