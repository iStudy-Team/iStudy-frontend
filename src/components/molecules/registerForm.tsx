'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    MapPin,
    Phone,
    Mail,
    User,
    GraduationCap,
    Building,
} from 'lucide-react';

export default function ResponsiveRegisterFormMinimal() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        course: '',
        city: '',
        center: '',
        agreeToTerms: false,
    });

    const courses = [
        { value: 'jumpstart', label: 'Jumpstart (3-6 tuổi)' },
        { value: 'super-juniors', label: 'Super Juniors (6-11 tuổi)' },
        { value: 'smart-teens', label: 'Smart Teens (11-16 tuổi)' },
        { value: 'young-adults', label: 'Young Adults (16-22 tuổi)' },
        { value: 'business', label: 'Business English (18+ tuổi)' },
        { value: 'ielts', label: 'IELTS Preparation' },
    ];

    const cities = [
        { value: 'hanoi', label: 'Hà Nội' },
        { value: 'hcm', label: 'TP. Hồ Chí Minh' },
        { value: 'danang', label: 'Đà Nẵng' },
        { value: 'haiphong', label: 'Hải Phòng' },
        { value: 'cantho', label: 'Cần Thơ' },
        { value: 'other', label: 'Khác' },
    ];

    const centers = [
        { value: 'center1', label: 'ILA Nguyễn Văn Cừ' },
        { value: 'center2', label: 'ILA Lê Văn Việt' },
        { value: 'center3', label: 'ILA Phạm Văn Đồng' },
        { value: 'center4', label: 'ILA Quận 1' },
        { value: 'center5', label: 'ILA Quận 7' },
    ];

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    const handleLevelTest = () => {
        console.log('Level test clicked');
        // Handle level test action
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://ila.edu.vn/wp-content/uploads/2023/02/bg-course-section-6.png"
                    alt="Student learning background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Form Container - Responsive */}
            <div
                className="relative z-10 flex items-center justify-center
                        w-full h-auto min-h-screen p-4
                        md:justify-start md:w-[520px] md:h-[883px] md:p-[58px] md:ml-4
                        lg:w-[520px] lg:h-[883px] lg:p-[58px] lg:ml-4
                        bg-[#FFFFFF99]"
            >
                <div
                    className="w-full max-w-md
                            md:ml-8 lg:ml-16 mr-0 md:mr-10"
                >
                    {/* Form Header */}
                    <div className="text-center mb-6 md:mb-8">
                        <h3 className="font-serif text-xl sm:text-2xl">
                            ĐĂNG KÝ LỚP HỌC THỬ
                            <br />
                            MIỄN PHÍ NGAY BÂY GIỜ!
                        </h3>
                    </div>

                    {/* Registration Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3 md:space-y-4"
                    >
                        {/* Name Field */}
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Họ và tên (*)"
                                value={formData.name}
                                onChange={(e) =>
                                    handleInputChange('name', e.target.value)
                                }
                                className="w-full h-10 md:h-12 px-4 pr-12 rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg placeholder:text-gray-500 text-gray-800 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                required
                            />
                            <User className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        </div>

                        {/* Phone Field */}
                        <div className="relative">
                            <Input
                                type="tel"
                                placeholder="Số điện thoại (*)"
                                value={formData.phone}
                                onChange={(e) =>
                                    handleInputChange('phone', e.target.value)
                                }
                                className="w-full h-10 md:h-12 px-4 pr-12 rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg placeholder:text-gray-500 text-gray-800 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                required
                            />
                            <Phone className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        </div>

                        {/* Email Field */}
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    handleInputChange('email', e.target.value)
                                }
                                className="w-full h-10 md:h-12 px-4 pr-12 rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg placeholder:text-gray-500 text-gray-800 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                            />
                            <Mail className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        </div>

                        {/* Course Selection */}
                        <div className="relative">
                            <Select
                                value={formData.course}
                                onValueChange={(value) =>
                                    handleInputChange('course', value)
                                }
                            >
                                <SelectTrigger className="w-full h-10 md:h-12 px-4 pr-12 rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg text-gray-800 focus:ring-2 focus:ring-blue-500 text-sm md:text-base">
                                    <SelectValue placeholder="Khóa học (*)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem
                                            key={course.value}
                                            value={course.value}
                                        >
                                            {course.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <GraduationCap className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* City Selection */}
                        <div className="relative">
                            <Select
                                value={formData.city}
                                onValueChange={(value) =>
                                    handleInputChange('city', value)
                                }
                            >
                                <SelectTrigger className="w-full h-10 md:h-12 px-4 pr-12 rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg text-gray-800 focus:ring-2 focus:ring-blue-500 text-sm md:text-base">
                                    <SelectValue placeholder="Thành phố (*)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities.map((city) => (
                                        <SelectItem
                                            key={city.value}
                                            value={city.value}
                                        >
                                            {city.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Building className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Center Selection */}
                        <div className="relative">
                            <Select
                                value={formData.center}
                                onValueChange={(value) =>
                                    handleInputChange('center', value)
                                }
                            >
                                <SelectTrigger className="w-full h-10 md:h-12 px-4 pr-12 rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg text-gray-800 focus:ring-2 focus:ring-blue-500 text-sm md:text-base">
                                    <SelectValue placeholder="Tìm trung tâm gần nhất" />
                                </SelectTrigger>
                                <SelectContent>
                                    {centers.map((center) => (
                                        <SelectItem
                                            key={center.value}
                                            value={center.value}
                                        >
                                            {center.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <MapPin className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start space-x-2 md:space-x-3 py-3 md:py-4">
                            <Checkbox
                                id="terms"
                                checked={formData.agreeToTerms}
                                onCheckedChange={(checked) =>
                                    handleInputChange(
                                        'agreeToTerms',
                                        checked as boolean
                                    )
                                }
                                className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-2 w-4 h-4 md:w-5 md:h-5 "
                            />
                            <label
                                htmlFor="terms"
                                className="text-xs md:text-sm text-gray-700 leading-relaxed cursor-pointer "
                            >
                                Bằng việc đăng ký thông tin, bạn đồng ý cho phép
                                iStudy liên lạc thông qua các hình thức: cuộc
                                gọi, tin nhắn, email nhằm mục đích tư vấn các
                                chương trình Anh ngữ & nghiên cứu thị trường.
                                Xem chi tiết điều khoản bảo vệ dữ liệu cá nhân
                                mà iStudy sẽ thực hiện cho khách hàng tại{' '}
                                <a
                                    href="#"
                                    className="text-blue-600 underline hover:text-blue-700"
                                >
                                    đây
                                </a>
                                .
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div
                            className="pt-3 md:pt-4
                    w-full flex justify-center
                    md:w-[204px] md:ml-[80px] md:block"
                        >
                            <Button
                                type="submit"
                                disabled={!formData.agreeToTerms}
                                className="relative inline-flex items-center justify-center
                        w-full md:w-full px-4 py-2 h-9 md:h-10 overflow-hidden font-medium transition-all
                        bg-blue-600 rounded-full hover:bg-white group cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed
                        text-sm md:text-sm"
                            >
                                {/* Hiệu ứng sóng - điều chỉnh để phủ toàn bộ nút khi hover */}
                                <span className="w-[200%] h-[400%] md:h-[435%] rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"></span>

                                {/* Nội dung nút */}
                                <span className="relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-black z-10">
                                    ĐĂNG KÝ
                                </span>
                            </Button>
                        </div>
                    </form>

                    {/* Additional Info */}
                    <div className="text-center mt-4 md:mt-6">
                        <p className="text-xs md:text-sm text-gray-600">
                            Có câu hỏi? Gọi ngay{' '}
                            <a
                                href="tel:1900636929"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                1900 636 929
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Floating Elements - Only visible on large screens */}
            <div className="absolute top-10 right-10 w-12 h-12 md:w-16 md:h-16 bg-yellow-400/20 rounded-full animate-bounce hidden lg:block" />
            <div className="absolute bottom-20 right-20 w-6 h-6 md:w-8 md:h-8 bg-blue-400/20 rounded-full animate-pulse hidden lg:block" />
            <div className="absolute top-1/3 right-1/4 w-3 h-3 md:w-4 md:h-4 bg-green-400/20 rounded-full animate-ping hidden lg:block" />
        </div>
    );
}
