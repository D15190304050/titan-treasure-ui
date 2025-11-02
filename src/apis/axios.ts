import axios, { AxiosInstance } from "axios";

import AuthKeys from "../constants/AuthConstants";
import { useUserSessionStore } from "@/stores/userStore";

// const isDev: boolean = import.meta.env.VITE_IS_DEV;
// console.log("isDev:", isDev);

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

        const { user } = useUserSessionStore.getState();
        if (user)
        {
            config.headers[AuthKeys.HeaderUserId] = user.id;
            config.headers[AuthKeys.HeaderUserName] = user.username;
            config.headers[AuthKeys.HeaderUserNickname] = user.nickname;
        }

        // if (isDev)
        // {
        //     config.headers["Host"] = import.meta.env.VITE_API_URL;
        //     console.log("Request:", config);
        // }

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
