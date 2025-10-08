import axios, { AxiosInstance } from "axios";

import AuthKeys from "../constants/AuthConstants";

const axiosWithInterceptor: AxiosInstance = axios.create({
    timeout: 1000 * 60 * 5,
    withCredentials: true,
    headers:
    {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
    }
});

axiosWithInterceptor.interceptors.request.use(
    config =>
    {
        const token: string | null = localStorage.getItem(AuthKeys.AccessToken);
        if (token)
            config.headers["Authorization"] = token;

        return config;
    },
    error =>
    {
        return Promise.reject(error);
    }
);

export default axiosWithInterceptor;

export const jsonHeader = {
    'Content-Type': 'application/json',
}

export const formHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
}
