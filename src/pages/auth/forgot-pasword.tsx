import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { Mail, ArrowLeft, Key, EyeOff, Eye } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { toast } from 'sonner';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from '@tanstack/react-router';

interface FormData {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

interface Errors {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

interface Touched {
    email: boolean;
    otp: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
}

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: '',
    });
    const { forgotPassword, resetPassword } = useAuthStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [step, setStep] = useState<1 | 2>(1); // 1: Email, 2: OTP + New Password
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [touched, setTouched] = useState<Touched>({
        email: false,
        otp: false,
        newPassword: false,
        confirmPassword: false,
    });

    const validateEmail = (email: string): string => {
        if (!email.trim()) return 'Email không được để trống';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return 'Email không đúng định dạng';
        return '';
    };

    const validateOTP = (otp: string): string => {
        if (!otp.trim()) return 'Mã OTP không được để trống';
        if (!/^\d{6}$/.test(otp)) return 'Mã OTP phải có 6 chữ số';
        return '';
    };

    const validatePassword = (password: string): string => {
        if (!password.trim()) return 'Mật khẩu không được để trống';
        if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
        return '';
    };

    const validateConfirmPassword = (confirmPassword: string): string => {
        if (!confirmPassword.trim()) return 'Vui lòng xác nhận mật khẩu';
        if (confirmPassword !== formData.newPassword)
            return 'Mật khẩu không khớp';
        return '';
    };

    const handleOTPChange = (newValue: string) => {
        setFormData((prev) => ({
            ...prev,
            otp: newValue,
        }));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        const fieldName = name as keyof FormData;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));

        if (touched[fieldName]) {
            const error =
                fieldName === 'email'
                    ? validateEmail(value)
                    : fieldName === 'otp'
                      ? validateOTP(value)
                      : fieldName === 'newPassword'
                        ? validatePassword(value)
                        : validateConfirmPassword(value);

            setErrors((prev) => ({
                ...prev,
                [fieldName]: error,
            }));
        }
    };

    const handleInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        const fieldName = name as keyof FormData;

        setTouched((prev) => ({
            ...prev,
            [fieldName]: true,
        }));

        const error =
            fieldName === 'email'
                ? validateEmail(value)
                : fieldName === 'otp'
                  ? validateOTP(value)
                  : fieldName === 'newPassword'
                    ? validatePassword(value)
                    : validateConfirmPassword(value);

        setErrors((prev) => ({
            ...prev,
            [fieldName]: error,
        }));
    };

    const handleSendOTP = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const emailError = validateEmail(formData.email);
        setErrors({
            email: emailError,
            otp: '',
            newPassword: '',
            confirmPassword: '',
        });
        setTouched({
            email: true,
            otp: false,
            newPassword: false,
            confirmPassword: false,
        });

        if (emailError) return;

        setIsLoading(true);

        try {
            await forgotPassword({ email: formData.email });
            setIsLoading(false);

            setStep(2);
            setFormData((prev) => ({
                ...prev,
                otp: '',
                newPassword: '',
                confirmPassword: '',
            }));
            setErrors({
                email: '',
                otp: '',
                newPassword: '',
                confirmPassword: '',
            });
            setTouched({
                email: false,
                otp: false,
                newPassword: false,
                confirmPassword: false,
            });
        } catch (error) {
            setIsLoading(false);
            toast.error((error as Error).message || 'Gửi mã OTP thất bại');
            return;
        }
    };

    const handleResetPassword = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const otpError = validateOTP(formData.otp);
        const passwordError = validatePassword(formData.newPassword);
        const confirmPasswordError = validateConfirmPassword(
            formData.confirmPassword
        );

        setErrors({
            email: '',
            otp: otpError,
            newPassword: passwordError,
            confirmPassword: confirmPasswordError,
        });
        setTouched({
            email: false,
            otp: true,
            newPassword: true,
            confirmPassword: true,
        });

        if (otpError || passwordError || confirmPasswordError) return;

        setIsLoading(true);

        try {
            await resetPassword({
                email: formData.email,
                otp: formData.otp,
                password: formData.newPassword,
            });
            setIsLoading(false);

            setStep(1);
            setFormData({
                email: '',
                otp: '',
                newPassword: '',
                confirmPassword: '',
            });
            setErrors({
                email: '',
                otp: '',
                newPassword: '',
                confirmPassword: '',
            });
            setTouched({
                email: false,
                otp: false,
                newPassword: false,
                confirmPassword: false,
            });
            navigate({ to: '/login' });
        } catch (error) {
            setIsLoading(false);
            toast.error(
                (error as Error).message || 'Đặt lại mật khẩu thất bại'
            );
            return;
        }
    };

    const handleBack = (): void => {
        if (step === 2) {
            setStep(1);
            setErrors({
                email: '',
                otp: '',
                newPassword: '',
                confirmPassword: '',
            });
            setTouched({
                email: false,
                otp: false,
                newPassword: false,
                confirmPassword: false,
            });
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = (): void => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400 to-pink-500 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 transform hover:scale-105 transition-all duration-300">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-35 h-16 rounded-2xl">
                            <img src="/logo.png" alt="" />
                        </div>
                        <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent -mt-8">
                            {step === 1 ? 'Quên mật khẩu' : 'Đặt lại mật khẩu'}
                        </p>
                        <p className="text-gray-500 mt-2">
                            {step === 1
                                ? 'Nhập email để nhận mã xác nhận'
                                : 'Nhập mã OTP và mật khẩu mới'}
                        </p>
                    </div>

                    {/* Form */}
                    {step === 1 ? (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                            {/* Email field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Email{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                {errors.email && touched.email && (
                                    <p className="text-red-500 text-sm flex items-center bg-red-50 p-2 rounded-lg border border-red-200">
                                        <svg
                                            className="w-4 h-4 mr-2 flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.email}
                                    </p>
                                )}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50 ${
                                            errors.email && touched.email
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-gray-200 focus:ring-blue-500'
                                        }`}
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 mt-6 ${
                                    isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Đang gửi mã...
                                    </div>
                                ) : (
                                    'Gửi mã OTP'
                                )}
                            </button>
                        </form>
                    ) : (
                        <form
                            onSubmit={handleResetPassword}
                            className="space-y-4"
                        >
                            {/* Back button */}
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Quay lại nhập email
                            </button>

                            {/* OTP field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Mã OTP{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                {errors.otp && touched.otp && (
                                    <p className="text-red-500 text-sm flex items-center bg-red-50 p-2 rounded-lg border border-red-200">
                                        <svg
                                            className="w-4 h-4 mr-2 flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.otp}
                                    </p>
                                )}
                                <div className="relative w-full mx-auto ">
                                    <InputOTP
                                        maxLength={6}
                                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                        className="w-full mx-auto"
                                        value={formData.otp}
                                        onChange={handleOTPChange}
                                        onBlur={handleInputBlur}
                                    >
                                        <InputOTPGroup className="w-full flex items-center justify-center">
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Mã OTP đã được gửi đến {formData.email}
                                </p>
                            </div>

                            {/* New Password field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Mật khẩu mới{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                {errors.newPassword && touched.newPassword && (
                                    <p className="text-red-500 text-sm flex items-center bg-red-50 p-2 rounded-lg border border-red-200">
                                        <svg
                                            className="w-4 h-4 mr-2 flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {errors.newPassword}
                                    </p>
                                )}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Key className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50 ${
                                            errors.newPassword &&
                                            touched.newPassword
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-gray-200 focus:ring-blue-500'
                                        }`}
                                        placeholder="Mật khẩu mới"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Xác nhận mật khẩu{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                        <p className="text-red-500 text-sm flex items-center bg-red-50 p-2 rounded-lg border border-red-200">
                                            <svg
                                                className="w-4 h-4 mr-2 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Key className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        onBlur={handleInputBlur}
                                        className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50 ${
                                            errors.confirmPassword &&
                                            touched.confirmPassword
                                                ? 'border-red-300 focus:ring-red-500'
                                                : 'border-gray-200 focus:ring-blue-500'
                                        }`}
                                        placeholder="Xác nhận mật khẩu"
                                    />
                                    <button
                                        type="button"
                                        onClick={
                                            toggleConfirmPasswordVisibility
                                        }
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 mt-6 ${
                                    isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Đang đặt lại...
                                    </div>
                                ) : (
                                    'Đặt lại mật khẩu'
                                )}
                            </button>
                        </form>
                    )}

                    {/* Back to login link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Quay lại đăng nhập
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
