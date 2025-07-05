import { create } from 'zustand';
import { IUser } from '@/types/user';
import {
    loginApi,
    signupApi,
    forgotPasswordApi,
    resetPasswordApi,
} from '@/api/auth';
import { updateUserApi, UpdateUserDto } from '@/api/user';
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
    login: (
        credentials: CredentialsLogin
    ) => Promise<{ user: IUser; token: string }>;
    signup: (credentials: CredentialsSignup) => Promise<void>;
    forgotPassword: (credentials: ForgotPassWordCredentials) => Promise<void>;
    resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
    getInfoMe: () => Promise<IUser>;
    updateUser: (dto: UpdateUserDto) => Promise<IUser | null>;
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
                localStorage.setItem(
                    LOCALSTORAGE_KEY.USER,
                    JSON.stringify(response.user)
                );
                set({ user: response.user, isAuthenticated: true });
                toast.success('Login successful');
                return { user: response.user, token: response.token };
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

    getInfoMe: async () => {
        try {
            const user = JSON.parse(
                localStorage.getItem(LOCALSTORAGE_KEY.USER) || 'null'
            );
            console.log('Retrieved user from local storage:', user);
            if (user && typeof user === 'object' && Object.keys(user).length > 0) {
                set({ user, isAuthenticated: true });
                return user;
            } else {
                throw new Error('User not found in local storage');
            }
        } catch (error) {
            toast.error((error as Error).message || 'Get user info error');
            console.error('Get user info error:', error);
            throw error;
        }
    },

    updateUser: async (dto) => {
        try {
            const { user } = useAuthStore.getState();
            if (!user?.id) {
                throw new Error('User not found');
            }

            const updatedUser = await updateUserApi(user.id.toString(), dto);

            // Update localStorage and state
            localStorage.setItem(
                LOCALSTORAGE_KEY.USER,
                JSON.stringify(updatedUser)
            );
            set({ user: updatedUser });

            toast.success('User information updated successfully');
            return updatedUser;
        } catch (error) {
            toast.error((error as Error).message || 'Failed to update user');
            console.error('Update user error:', error);
            return null;
        }
    },

    logout: () => {
        localStorage.removeItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
        localStorage.removeItem(LOCALSTORAGE_KEY.USER);
        set({ user: null, isAuthenticated: false });
    },
}));
