export interface User {
    id: number;
    username: string;
    email: string;
    timezone: string;
}
export interface AuthTokens {
    access: string;
    refresh: string;
}
export interface LoginCredentials {
    username: string;
    password: string;
}
export interface RegisterData {
    username: string;
    email: string;
    password: string;
    password2: string;
    timezone: string;
}
export interface Reminder{
    id: number;
    title:string;
    description: string;
    reminder_datetime: string;
    is_sent: boolean;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}