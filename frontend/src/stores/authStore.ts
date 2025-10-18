import { authAPI } from '@/services/api';
import { LoginCredentials, RegisterData, User } from '@/types';
import {create} from 'zustand';

interface AuthState {
    // state
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    // action
    login: (credentials: LoginCredentials)=> Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    fetchCurrentUser: () => Promise<void>;
    initAuth: () => Promise<void>;
}
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    isAuthenticated: false,
  
    initAuth: async () => {
        const token = localStorage.getItem('access_token');
        console.log('Init auth, token exists:', !!token); 
        if(token){
            try{
                const response = await authAPI.getCurrentUser();
                console.log('User loaded:', response.data);
                set({ user: response.data, isAuthenticated: true, loading: false });
            }
            catch(error){
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                set({user:null, isAuthenticated:false, loading: false});
            }
        }else{
            set({loading: false});
        }
      
    },
    fetchCurrentUser: async ()=>{
        try{
            const response = await authAPI.getCurrentUser();
            set({user:response.data, isAuthenticated:true})
        }catch(error){
            console.error('Failed to fetch user:', error);
        }
    },
    login: async (credentials) =>{
        const response = await authAPI.login(credentials);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        await useAuthStore.getState().fetchCurrentUser();
    },
    register: async (data)=>{
        await authAPI.register(data);
        await useAuthStore.getState().login({
            username: data.username,
            password:data.password
        });

    },
    logout: async ()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({user:null, isAuthenticated:false});

    }
}));