'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, BookOpen, Globe } from 'lucide-react';

export default function ILAAboutSection() {
    return (
        <div className="py-16 px-4 md:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Main About Section */}
                <div className="relative h-full  lg:min-h-[600px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/khoa-hoc-tieng-anh-mam-non-cho-tre-3-6-tuoi-jumpstart.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-end mb-8">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-lg right-0 p-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Nắm bắt độ tuổi vàng
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                3-6 tuổi là thời kỳ “vàng” để con bắt đầu học
                                một ngôn ngữ mới. Cơ hội này chỉ đến một lần
                                trong cuộc đời, bỏ lỡ giai đoạn then chốt này,
                                con sẽ khó đạt tới độ phát triển ngôn ngữ tối ưu
                                và toàn diện.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                Khóa học tiếng Anh cho các bé 3-6 tuổi ILA
                                Jumpstart đem đến môi trường ngôn ngữ chuẩn quốc
                                tế, phương pháp Học qua chơi với 100% giáo viên
                                nước ngoài cho con niềm vui học tập. Chương
                                trình tập trung đặc biệt vào khả năng nghe –
                                nói, giúp con phản xạ nhanh với ngôn ngữ và phát
                                âm chuẩn bản xứ từ nhỏ.
                            </p>
                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg group"
                            >
                                Đọc thêm
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Đội ngũ chuyên nghiệp
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Giáo viên bản ngữ và Việt Nam có trình độ cao
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Chương trình đa dạng
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Từ mầm non đến người lớn, IELTS, TOEIC
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Chất lượng hàng đầu
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Được công nhận bởi các tổ chức giáo dục quốc tế
                        </p>
                    </div>

                    <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Globe className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Mạng lưới rộng khắp
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Hơn 50 cơ sở trên toàn quốc
                        </p>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold mb-4">
                            ILA trong con số
                        </h3>
                        <p className="text-blue-100 text-lg">
                            Những thành tựu đáng tự hào của chúng tôi
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                30+
                            </div>
                            <div className="text-blue-100">Năm kinh nghiệm</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                50+
                            </div>
                            <div className="text-blue-100">Cơ sở đào tạo</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                100K+
                            </div>
                            <div className="text-blue-100">
                                Học viên đã đào tạo
                            </div>
                        </div>
                        <div className="text-center group">
                            <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                95%
                            </div>
                            <div className="text-blue-100">Tỷ lệ hài lòng</div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-bold text-blue-800 mb-4">
                            Sứ mệnh
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            Mang đến cho học viên những trải nghiệm học tập tốt
                            nhất, giúp họ phát triển toàn diện các kỹ năng tiếng
                            Anh và chuẩn bị tốt nhất cho tương lai.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-bold text-blue-800 mb-4">
                            Tầm nhìn
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            Trở thành trung tâm đào tạo tiếng Anh hàng đầu Việt
                            Nam, được công nhận quốc tế về chất lượng giáo dục
                            và phương pháp giảng dạy hiện đại.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
