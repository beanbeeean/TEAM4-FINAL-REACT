import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from './';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return axiosInstance.get("/auth/");
}

export function login(loginRequest) {
    return axiosInstance.post("/auth/signin", loginRequest, {
        withCredentials: true
    });
}

export function logout(loginRequest) {
    return axiosInstance.post("/auth/signout", loginRequest);
}

export function signup(signupRequest) {
    return axiosInstance.post("/auth/signup", signupRequest);
}