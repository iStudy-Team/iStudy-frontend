import { api } from './api.ts';
import { IUser, USER_ROLE } from '@/types/user.ts';

export interface CredentialsLogin {
    credential: string; // can be email or username or phone
    password: string;
}

export interface CredentialsSignup {
    username: string;
    password: string;
    email?: string;
    phone?: string;
    avatar?: string;
    role?: USER_ROLE;
}

export interface LoginResponse {
    token?: string;
    user?: IUser;
    message: string;
}

export interface SignupResponse {
    message: string;
}

export interface ForgotPassWordCredentials {
    email: string;
}

export interface ForgotPassWordResponse {
    message: string;
}

export interface ResetPasswordCredentials {
    email: string;
    otp: string;
    password: string;
}

export interface ResetPasswordResponse {
    message: string;
}

export const loginApi = async (
    credentials: CredentialsLogin
): Promise<LoginResponse> => {
    const response = await api.post('api/v1/auth/login', credentials);
    return response.data;
};

export const signupApi = async (
    credentials: CredentialsSignup
): Promise<SignupResponse> => {
    const response = await api.post('api/v1/auth/register', credentials);
    return response.data;
};

export const forgotPasswordApi = async (
    credentials: ForgotPassWordCredentials
): Promise<ForgotPassWordResponse> => {
    const response = await api.post('api/v1/auth/forgot-password', credentials);
    return response.data;
};

export const resetPasswordApi = async (
    credentials: ResetPasswordCredentials
): Promise<ResetPasswordResponse> => {
    const response = await api.post('api/v1/auth/verify-otp', credentials);
    return response.data;
};
