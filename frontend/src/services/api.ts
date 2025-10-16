import axios from "axios";
import type { AuthTokens, LoginCredentials, RegisterData, User, Reminder } from '@/types';

const API_BASE_URL = 'http://localhost:8000/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('access_token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

// Auth API
export const authAPI ={
    register: (data: RegisterData)=>
        api.post<User>('/users/register/', data),

    login: (credential: LoginCredentials)=>
        api.post<AuthTokens>('/users/login/', credential),

    refreshToken: (refresh:string)=>
        api.post<{access:string}>('/users/token/refresh', {refresh}),

    getCurrentUser: ()=>
        api.get<User>('/users/me'),
    
};

// Reminders API
export const remindersAPI = {
    getAll:() =>
        api.get<Reminder>('/reminders'),

    getOne: (id: number)=>
        api.get<Reminder>(`/reminders/${id}`),

    create: (data: Partial<Reminder>)=>
        api.post<Reminder>('/reminders/', data),

    update: (id:number, data: Partial<Reminder>)=>
        api.put<Reminder>(`/reminder/${id}/`, data),

    delete: (id: number)=>
        api.delete(`/reminders/${id}/`)
    
}
export default api;