import { useState, ChangeEvent, FocusEvent } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Phone } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '@/store/useAuthStore';

// Interfaces
interface FormData {
    loginId: string; // Combined field for username/email/phone
    password: string;
}

interface Errors {
    loginId: string;
    password: string;
}

interface Touched {
    loginId: boolean;
    password: boolean;
}

type FieldName = keyof FormData;

export default function LoginInterface() {
    const [formData, setFormData] = useState<FormData>({
        loginId: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({
        loginId: '',
        password: '',
    });
    const [touched, setTouched] = useState<Touched>({
        loginId: false,
        password: false,
    });
    const [inputType, setInputType] = useState<'text' | 'email' | 'tel'>(
        'text'
    );
    const { login } = useAuthStore();

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        const regex = /^[0-9]{10,11}$/;
        return regex.test(phone);
    };

    const validateUsername = (username: string): boolean => {
        return username.length >= 3 && username.length <= 20;
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 6;
    };

    const detectInputType = (value: string): 'text' | 'email' | 'tel' => {
        if (value.includes('@')) return 'email';
        if (/^\d+$/.test(value)) return 'tel';
        return 'text';
    };

    const validateLoginId = (value: string): string => {
        if (!value.trim()) {
            return 'Vui lòng nhập username, email hoặc số điện thoại';
        }

        const type = detectInputType(value);

        if (type === 'email' && !validateEmail(value)) {
            return 'Email không đúng định dạng';
        }

        if (type === 'tel' && !validatePhone(value)) {
            return 'Số điện thoại phải có 10-11 chữ số';
        }

        if (type === 'text' && !validateUsername(value)) {
            return 'Username phải từ 3 đến 20 ký tự';
        }

        return '';
    };

    const validateField = (name: FieldName, value: string): string => {
        if (name === 'loginId') {
            return validateLoginId(value);
        } else if (name === 'password') {
            if (!value.trim()) {
                return 'Mật khẩu không được để trống';
            } else if (!validatePassword(value)) {
                return 'Mật khẩu phải có ít nhất 6 ký tự';
            }
        }
        return '';
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        const fieldName = name as FieldName;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));

        // Detect input type for loginId field
        if (fieldName === 'loginId') {
            setInputType(detectInputType(value));
        }

        // Clear error when user starts typing
        if (touched[fieldName]) {
            const error = validateField(fieldName, value);
            setErrors((prev) => ({
                ...prev,
                [fieldName]: error,
            }));
        }
    };

    const handleInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        const fieldName = name as FieldName;

        setTouched((prev) => ({
            ...prev,
            [fieldName]: true,
        }));

        const error = validateField(fieldName, value);
        setErrors((prev) => ({
            ...prev,
            [fieldName]: error,
        }));
    };

    const handleSubmit = async (): Promise<void> => {
        // Validate all fields
        const loginIdError = validateField('loginId', formData.loginId);
        const passwordError = validateField('password', formData.password);

        setErrors({
            loginId: loginIdError,
            password: passwordError,
        });

        setTouched({
            loginId: true,
            password: true,
        });

        // If there are errors, don't submit
        if (loginIdError || passwordError) {
            return;
        }

        setIsLoading(true);

        await login({
            credential: formData.loginId,
            password: formData.password,
        });
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    const getLoginIcon = () => {
        if (inputType === 'email')
            return <Mail className="h-5 w-5 text-gray-400" />;
        if (inputType === 'tel')
            return <Phone className="h-5 w-5 text-gray-400" />;
        return <User className="h-5 w-5 text-gray-400" />;
    };

    const getLoginPlaceholder = () => {
        if (inputType === 'email') return 'your@email.com';
        if (inputType === 'tel') return '0987654321';
        return 'Tên người dùng';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400 to-pink-500 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main login card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 transform hover:scale-105 transition-all duration-300">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-35 h-16  rounded-2xl  ">
                            <img src="/logo.png" alt="" />
                        </div>
                        <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent -mt-8">
                            Chào mừng trở lại
                        </p>
                        <p className="text-gray-500 mt-2">
                            Đăng nhập để tiếp tục
                        </p>
                    </div>

                    {/* Login form */}
                    <div className="space-y-6">
                        {/* Combined login field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Username / Email / Số điện thoại
                            </label>
                            {errors.loginId && touched.loginId && (
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
                                    {errors.loginId}
                                </p>
                            )}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    {getLoginIcon()}
                                </div>
                                <input
                                    type={inputType}
                                    name="loginId"
                                    value={formData.loginId}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50 ${
                                        errors.loginId && touched.loginId
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-200 focus:ring-blue-500'
                                    }`}
                                    placeholder={getLoginPlaceholder()}
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Mật khẩu
                            </label>
                            {errors.password && touched.password && (
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
                                    {errors.password}
                                </p>
                            )}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50 ${
                                        errors.password && touched.password
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-200 focus:ring-blue-500'
                                    }`}
                                    placeholder="••••••••"
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

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Nhớ đăng nhập
                                </span>
                            </label>
                            <Link
                                to="/forgot-password"
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        {/* Submit button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Đang đăng nhập...
                                </div>
                            ) : (
                                'Đăng nhập'
                            )}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-4 text-sm text-gray-500">hoặc</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Social login buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">
                                Google
                            </span>
                        </button>
                        <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="#1877F2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">
                                Facebook
                            </span>
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="text-center text-sm text-gray-600 mt-8">
                        Chưa có tài khoản?{' '}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
