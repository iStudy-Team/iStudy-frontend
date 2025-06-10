import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Youtube, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Logo and Description Column */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <div className="text-3xl font-bold text-blue-900 mb-4">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                    className="inline-block mr-2"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Hệ thống giáo dục và đào tạo Anh ngữ hàng đầu
                                Việt Nam với chương trình giảng dạy cùng các
                                dịch vụ giáo dục theo tiêu chuẩn quốc tế.
                            </p>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mb-6">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600 hover:text-red-500"
                            >
                                <Youtube className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600 hover:text-blue-600"
                            >
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-600 hover:text-pink-500"
                            >
                                <Instagram className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Certification Badges */}
                        <div className="space-y-2">
                            <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold inline-block">
                                DMCA PROTECTED
                            </div>
                            <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold inline-block">
                                ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG
                            </div>
                        </div>
                    </div>

                    {/* Advanced English Column */}
                    <div className="lg:col-span-1">
                        <h3 className="font-bold text-gray-900 mb-4">
                            Tiếng Anh cao cấp
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Tiếng Anh Mầm non (3-6 tuổi)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Tiếng Anh Tiểu học (6-11 tuổi)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Tiếng Anh Trung học (11-16 tuổi)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Tiếng Anh Chuyên ngành (cho người đi làm)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Tiếng Anh STEAM – IMATHS (4-10 tuổi)
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Standard English & Test Prep Column */}
                    <div className="lg:col-span-1">
                        <h3 className="font-bold text-gray-900 mb-4">
                            Tiếng Anh tiêu chuẩn
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600 mb-6">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Tiếng Anh OLA (3-16 tuổi)
                                </a>
                            </li>
                        </ul>

                        <h3 className="font-bold text-gray-900 mb-4">
                            Luyện thi
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600 mb-6">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Luyện thi IELTS và SAT
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Learn More Column */}
                    <div className="lg:col-span-1">
                        <h3 className="font-bold text-gray-900 mb-4">
                            Tìm hiểu thêm
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Giới thiệu iStudy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Trung tâm đào tạo
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    ILAVerse
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Liên hệ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Chính sách dữ liệu
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Signup Column */}
                    <div className="lg:col-span-1">
                        <h3 className="font-bold text-gray-900 mb-4">
                            Nhận ngay ưu đãi mới nhất tại iStudy
                        </h3>
                        <div className="flex">
                            <Input
                                type="email"
                                placeholder="Nhập email để nhận thông tin từ iStudy"
                                className="rounded-r-none border-r-0 text-sm"
                            />
                            <Button
                                type="submit"
                                className="rounded-l-none bg-red-500 hover:bg-red-600 px-3"
                            >
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
