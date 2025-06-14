import { create } from 'zustand';
import { IUser } from '@/types/user';
import {
    loginApi,
    signupApi,
    forgotPasswordApi,
    resetPasswordApi,
} from '@/api/auth';
import { LOCALSTORAGE_KEY } from '@/types/localstorage';
import {
    CredentialsLogin,
    CredentialsSignup,
    ForgotPassWordCredentials,
    ResetPasswordCredentials,
} from '@/api/auth';
import { toast } from 'sonner';

interface AuthState {
    user: IUser | null;
    isAuthenticated: boolean;
    login: (credentials: CredentialsLogin) => Promise<void>;
    signup: (credentials: CredentialsSignup) => Promise<void>;
    forgotPassword: (credentials: ForgotPassWordCredentials) => Promise<void>;
    resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    login: async (credentials) => {
        try {
            const response = await loginApi(credentials);
            if (response.token && response.user) {
                localStorage.setItem(
                    LOCALSTORAGE_KEY.ACCESS_TOKEN,
                    JSON.stringify(response.token)
                );
                set({ user: response.user, isAuthenticated: true });
                toast.success('Login successful');
            } else {
                toast.error(response.message || 'Login failed');
                throw new Error(response.message || 'Login failed');
            }
        } catch (error) {
            toast.error((error as Error).message || 'Login error');
            console.error('Login error:', error);
            throw error;
        }
    },

    signup: async (credentials) => {
        try {
            const response = await signupApi(credentials);
            if (response.message) {
                toast.success(response.message);
                set({ user: null, isAuthenticated: false });
            } else {
                toast.error('Signup failed');
                throw new Error('Signup failed');
            }
        } catch (error) {
            toast.error((error as Error).message || 'Signup error');
            console.error('Signup error:', error);
            throw error;
        }
    },

    forgotPassword: async (credentials) => {
        try {
            const response = await forgotPasswordApi(credentials);
            if (response.message) {
                toast.success(response.message);
            } else {
                toast.error('Forgot password failed');
                throw new Error('Forgot password failed');
            }
        } catch (error) {
            toast.error((error as Error).message || 'Forgot password error');
            console.error('Forgot password error:', error);
            throw error;
        }
    },

    resetPassword: async (credentials) => {
        try {
            const response = await resetPasswordApi(credentials);
            if (response.message) {
                toast.success(response.message);
            } else {
                toast.error('Reset password failed');
                throw new Error('Reset password failed');
            }
        } catch (error) {
            toast.error((error as Error).message || 'Reset password error');
            console.error('Reset password error:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
        set({ user: null, isAuthenticated: false });
    },
}));
