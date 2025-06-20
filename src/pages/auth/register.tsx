import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAuthStore } from '@/store/useAuthStore';

// Interfaces
interface FormData {
    username: string;
    password: string;
    email: string;
    phone: string;
    role: USER_ROLE;
}

interface Errors {
    username: string;
    password: string;
    email: string;
    phone: string;
    role: string;
}

interface Touched {
    username: boolean;
    password: boolean;
    email: boolean;
    phone: boolean;
    role: boolean;
}

type FieldName = keyof FormData;

// Role enum matching the API
export enum USER_ROLE {
    USER = 0,
    TEACHER = 1,
    STUDENT = 2,
    PARENT = 3,
    ADMIN = 4,
}

export default function RegisterForm() {
    const navigate = useNavigate();
    const { signup } = useAuthStore();

    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        email: '',
        phone: '',
        role: USER_ROLE.STUDENT, // Default to Student
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({
        username: '',
        password: '',
        email: '',
        phone: '',
        role: '',
    });

    const [touched, setTouched] = useState<Touched>({
        username: false,
        password: false,
        email: false,
        phone: false,
        role: false,
    });

    const validateUsername = (username: string): string => {
        if (!username.trim()) return 'Tên người dùng không được để trống';
        if (username.length < 3)
            return 'Tên người dùng phải có ít nhất 3 ký tự';
        if (username.length > 20) return 'Tên người dùng không quá 20 ký tự';
        return '';
    };

    const validatePassword = (password: string): string => {
        if (!password.trim()) return 'Mật khẩu không được để trống';
        if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
        return '';
    };

    const validateEmail = (email: string): string => {
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return 'Email không đúng định dạng';
        }
        return '';
    };

    const validatePhone = (phone: string): string => {
        if (phone && !/^[0-9]{10,11}$/.test(phone)) {
            return 'Số điện thoại phải có 10-11 chữ số';
        }
        return '';
    };

    const validateField = (name: FieldName, value: string | number): string => {
        switch (name) {
            case 'username':
                return validateUsername(value as string);
            case 'password':
                return validatePassword(value as string);
            case 'email':
                return validateEmail(value as string);
            case 'phone':
                return validatePhone(value as string);
            case 'role':
                return !value ? 'Vui lòng chọn vai trò' : '';
            default:
                return '';
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        const { name, value } = e.target;
        const fieldName = name as FieldName;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));

        if (touched[fieldName]) {
            const error = validateField(fieldName, value);
            setErrors((prev) => ({
                ...prev,
                [fieldName]: error,
            }));
        }
    };

    const handleInputBlur = (
        e: FocusEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
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

    const handleRoleChange = (value: string): void => {
        const roleValue = parseInt(value) as USER_ROLE;
        setFormData((prev) => ({
            ...prev,
            role: roleValue,
        }));

        if (touched.role) {
            const error = validateField('role', roleValue);
            setErrors((prev) => ({
                ...prev,
                role: error,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        // Validate all fields
        const newErrors: Errors = {
            username: validateField('username', formData.username),
            password: validateField('password', formData.password),
            email: validateField('email', formData.email),
            phone: validateField('phone', formData.phone),
            role: validateField('role', formData.role),
        };

        setErrors(newErrors);
        setTouched({
            username: true,
            password: true,
            email: true,
            phone: true,
            role: true,
        });

        // Check if there are any errors
        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        setIsLoading(true);

        try {
            // Prepare credentials for API call
            const credentials = {
                username: formData.username,
                password: formData.password,
                email: formData.email || undefined,
                phone: formData.phone || undefined,
                role: formData.role,
            };

            await signup(credentials);

            // Navigate to login page after successful registration
            navigate({ to: '/login' });
        } catch (error) {
            console.error('Registration failed:', error);
            // Error is already handled by the store (toast notification)
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    const getRoleDisplayName = (role: USER_ROLE): string => {
        switch (role) {
            case USER_ROLE.TEACHER:
                return 'Giáo Viên';
            case USER_ROLE.STUDENT:
                return 'Học Sinh';
            case USER_ROLE.PARENT:
                return 'Phụ Huynh';
            default:
                return 'Học Sinh';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400 to-pink-500 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main registration card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 transform transition-all duration-300">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-35 h-16 rounded-2xl">
                            <img src="/logo.png" alt="" />
                        </div>
                        <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent -mt-8">
                            Tạo tài khoản mới
                        </p>
                        <p className="text-gray-500 mt-2">
                            Điền thông tin để đăng ký
                        </p>
                    </div>

                    {/* Registration form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Tên người dùng{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            {errors.username && touched.username && (
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
                                    {errors.username}
                                </p>
                            )}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50 ${
                                        errors.username && touched.username
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-200 focus:ring-blue-500'
                                    }`}
                                    placeholder="Tên người dùng (3-20 ký tự)"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Mật khẩu <span className="text-red-500">*</span>
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

                        {/* Email field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Email
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

                        {/* Phone field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Số điện thoại
                            </label>
                            {errors.phone && touched.phone && (
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
                                    {errors.phone}
                                </p>
                            )}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50 ${
                                        errors.phone && touched.phone
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-200 focus:ring-blue-500'
                                    }`}
                                    placeholder="0987654321"
                                />
                            </div>
                        </div>

                        {/* Role field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Bạn là ? <span className="text-red-500">*</span>
                            </label>
                            {errors.role && touched.role && (
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
                                    {errors.role}
                                </p>
                            )}
                            <div className="relative">
                                <Select
                                    defaultValue={USER_ROLE.STUDENT.toString()}
                                    onValueChange={handleRoleChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem
                                                value={USER_ROLE.STUDENT.toString()}
                                            >
                                                Học Sinh
                                            </SelectItem>
                                            <SelectItem
                                                value={USER_ROLE.PARENT.toString()}
                                            >
                                                Phụ Huynh
                                            </SelectItem>
                                            <SelectItem
                                                value={USER_ROLE.TEACHER.toString()}
                                            >
                                                Giáo Viên
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
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
                                    Đang đăng ký...
                                </div>
                            ) : (
                                'Đăng ký'
                            )}
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Đã có tài khoản?{' '}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
