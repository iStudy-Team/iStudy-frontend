'use client';

import { Button } from '@/components/ui/button';
import { Users, Award, BookOpen, Globe } from 'lucide-react';

export default function ResponsiveJumpStartSection() {
    return (
        <div className="py-8 md:py-16 bg-gray-50">
            <div className="w-full mx-auto">
                {/* Section 1: Nắm bắt độ tuổi vàng */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
                        bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/khoa-hoc-tieng-anh-mam-non-cho-tre-3-6-tuoi-jumpstart.png)]
                        bg-no-repeat bg-center bg-cover rounded-lg sm:rounded-xl lg:rounded-none
                        flex items-center justify-center lg:justify-end "
                >
                    <div className="absolute inset-0 bg-black/20 rounded-lg sm:rounded-xl lg:rounded-none lg:hidden" />
                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                            w-full lg:max-w-lg px-4 sm:px-6 lg:pr-8 lg:p-0
                            text-center lg:text-left relative z-10"
                    >
                        <div>
                            <h2
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl
                                font-bold mb-4 md:mb-6 leading-tight text-white lg:text-black"
                            >
                                Nắm bắt độ tuổi vàng
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-white lg:text-gray-700"
                            >
                                3-6 tuổi là thời kỳ "vàng" để con bắt đầu học
                                một ngôn ngữ mới. Cơ hội này chỉ đến một lần
                                trong cuộc đời, bỏ lỡ giai đoạn then chốt này,
                                con sẽ khó đạt tới độ phát triển ngôn ngữ tối ưu
                                và toàn diện.
                            </p>
                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-white lg:text-gray-700 hidden sm:block"
                            >
                                Khóa học tiếng Anh cho các bé 3-6 tuổi iStudy
                                Jumpstart đem đến môi trường ngôn ngữ chuẩn quốc
                                tế, phương pháp Học qua chơi với 100% giáo viên
                                nước ngoài cho con niềm vui học tập.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Môi trường học tập thế kỷ 21 */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
                        bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/moi-truong-hoc-tap-the-ky-21-ila-jumpstart.png)]
                        bg-no-repeat bg-center bg-cover rounded-lg sm:rounded-xl lg:rounded-none
                        flex items-center justify-center lg:justify-start mb-6 md:mb-8"
                >
                    <div className="absolute inset-0 bg-black/40 rounded-lg sm:rounded-xl lg:rounded-none" />
                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                            w-full lg:max-w-3xl px-4 sm:px-6 lg:p-8
                            text-center lg:text-left relative z-10 lg:pb-80"
                    >
                        <div>
                            <h2
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl
                                font-bold mb-4 md:mb-6 leading-tight text-white"
                            >
                                Môi trường học tập thế kỷ 21 tại iStudy
                            </h2>

                            <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8 text-white">
                                Với tầm nhìn giáo dục hiện đại, iStudy mang đến
                                những lớp học của "hạnh phúc" dành cho các bé ở
                                độ tuổi mầm non với cơ sở vật chất thiết kế phù
                                hợp.
                            </p>
                            <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8 text-white hidden sm:block">
                                iStudy đạt chứng nhận đạt chuẩn Trung tâm tiếng
                                Anh trẻ em do NEAS cấp
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 3: Giáo viên */}
                <div className="px-4 sm:px-6 lg:px-0">
                    <div className="max-w-7xl mx-auto mb-6 md:mb-8">
                        <div
                            className="flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl
                            h-auto lg:h-[515px]"
                        >
                            {/* Phần bên trái - Nội dung chữ */}
                            <div className="lg:w-1/2 bg-[#e0bcc4] p-6 sm:p-8 md:p-12 flex items-center lg:items-start">
                                <div className="w-full">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight pb-2">
                                        GIÁO VIÊN
                                    </h2>

                                    <p className="text-base sm:text-lg leading-relaxed italic pb-4">
                                        100% giáo viên nước ngoài có trình độ sư
                                        phạm quốc tế
                                    </p>

                                    <p className="text-lg sm:text-xl leading-relaxed font-bold mb-2">
                                        TRÌNH ĐỘ
                                    </p>
                                    <ul className="list-disc ml-5 text-sm sm:text-base md:text-lg mb-4 space-y-1">
                                        <li>
                                            Có bằng đại học hoặc sau đại học.
                                        </li>
                                        <li className="hidden sm:list-item">
                                            Có chứng chỉ giảng dạy tiếng Anh
                                            quốc tế như CELTA, TESOL, DELTA…
                                        </li>
                                        <li>
                                            Tận tâm, yêu trẻ, có khả năng vỗ về
                                            và khích lệ tinh thần học sinh.
                                        </li>
                                    </ul>

                                    <p className="text-lg sm:text-xl leading-relaxed font-bold mb-2">
                                        SỐ LƯỢNG
                                    </p>
                                    <p className="text-sm sm:text-base md:text-lg">
                                        Một lớp gồm 1 giáo viên nước ngoài và 2
                                        trợ giảng chuyên nghiệp.
                                    </p>
                                </div>
                            </div>

                            {/* Phần bên phải - Hình ảnh */}
                            <div className="lg:w-1/2 h-[300px] sm:h-[400px] lg:h-full">
                                <img
                                    src="https://ila.edu.vn/wp-content/uploads/2023/05/giao-vien-tieng-anh-jumpstart.png"
                                    alt="Giáo viên iStudy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Cơ sở vật chất */}
                <div className="px-4 sm:px-6 lg:px-0">
                    <div className="max-w-7xl mx-auto mb-6 md:mb-8">
                        <div
                            className="relative h-[400px] sm:h-[500px] lg:h-[515px]
                            bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/co-so-vat-chat-jumpstart.png)]
                            bg-no-repeat bg-center bg-cover rounded-2xl sm:rounded-3xl lg:rounded-none
                            flex items-center justify-center lg:justify-end"
                        >
                            <div className="absolute inset-0 bg-black/30 rounded-2xl sm:rounded-3xl lg:rounded-none" />
                            <div
                                className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                                w-full lg:max-w-lg px-4 sm:px-6 lg:p-8
                                text-center lg:text-left relative z-10"
                            >
                                <div>
                                    <h2
                                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
                                    font-bold mb-4 md:mb-6 leading-tight text-white"
                                    >
                                        CƠ SỞ VẬT CHẤT
                                    </h2>

                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 text-white">
                                        iStudy đặc biệt đầu tư vào cơ sở vật
                                        chất cho từng độ tuổi để tăng tối đa
                                        trải nghiệm cho học sinh.
                                    </p>
                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 text-white hidden sm:block">
                                        Lớp 3-6 tuổi với thảm và bàn ghế gỗ bo
                                        tròn các cạnh an toàn cùng không gian dễ
                                        dàng tùy chỉnh.
                                    </p>

                                    <Button
                                        className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-medium
                                        px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 group
                                        text-sm sm:text-base w-auto"
                                    >
                                        <span className="w-32 h-32 sm:w-48 sm:h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-6 ml-6 sm:mb-9 sm:ml-9 group-hover:ml-0 group-hover:mb-24 sm:group-hover:mb-32 group-hover:translate-x-0"></span>
                                        <span className="relative text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                                            Xem Thêm
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 5: Mở khóa kho tàng ngôn ngữ */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
                        bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/don-dau-tuong-lai-cung-khoa-hoc-ila-jumpstart.png)]
                        bg-no-repeat bg-center bg-cover rounded-lg sm:rounded-xl lg:rounded-none
                        flex items-center justify-center lg:justify-start mb-6 md:mb-8"
                >
                    <div className="absolute inset-0 bg-black/20 rounded-lg sm:rounded-xl lg:rounded-none lg:hidden " />
                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                            w-full lg:max-w-3xl px-4 sm:px-6 lg:p-8 lg:ml-8
                            text-center lg:text-left relative z-10 lg:mt-50 "
                    >
                        <div>
                            <h2
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
                                font-bold leading-tight text-white lg:text-black lg:mr-70"
                            >
                                Mở khóa "kho tàng" ngôn ngữ
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-white lg:text-gray-700 lg:mr-60"
                            >
                                Lớp Jumpstart sẽ giúp mở khóa "kho tàng" ngôn
                                ngữ trong con bằng cách tạo cho con nền tảng
                                phát âm chuẩn bản xứ, có vốn từ vựng phong phú
                                đồng thời dạn dĩ hơn trong giao tiếp.
                            </p>
                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-white lg:text-gray-700 hidden sm:block lg:mr-60"
                            >
                                Không chỉ vậy, con còn được phát triển 6 kỹ năng
                                quan trọng của thế kỷ 21, có tư duy toàn cầu
                                cùng nền tảng tiếng Anh vững chắc.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 md:mb-16">
                        <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                                Đội ngũ chuyên nghiệp
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Giáo viên bản ngữ và Việt Nam có trình độ cao
                            </p>
                        </div>

                        <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                                Chương trình đa dạng
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Từ mầm non đến người lớn, IELTS, TOEIC
                            </p>
                        </div>

                        <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                                Chất lượng hàng đầu
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Được công nhận bởi các tổ chức giáo dục quốc tế
                            </p>
                        </div>

                        <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                                Mạng lưới rộng khắp
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Hơn 50 cơ sở trên toàn quốc
                            </p>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white mb-8 md:mb-16">
                        <div className="text-center mb-6 sm:mb-8">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                                iStudy trong con số
                            </h3>
                            <p className="text-blue-100 text-base sm:text-lg">
                                Những thành tựu đáng tự hào của chúng tôi
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            <div className="text-center group">
                                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                    30+
                                </div>
                                <div className="text-blue-100 text-sm sm:text-base">
                                    Năm kinh nghiệm
                                </div>
                            </div>
                            <div className="text-center group">
                                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                    50+
                                </div>
                                <div className="text-blue-100 text-sm sm:text-base">
                                    Cơ sở đào tạo
                                </div>
                            </div>
                            <div className="text-center group">
                                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                    100K+
                                </div>
                                <div className="text-blue-100 text-sm sm:text-base">
                                    Học viên đã đào tạo
                                </div>
                            </div>
                            <div className="text-center group">
                                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                    95%
                                </div>
                                <div className="text-blue-100 text-sm sm:text-base">
                                    Tỷ lệ hài lòng
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4">
                                Sứ mệnh
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                Mang đến cho học viên những trải nghiệm học tập
                                tốt nhất, giúp họ phát triển toàn diện các kỹ
                                năng tiếng Anh và chuẩn bị tốt nhất cho tương
                                lai.
                            </p>
                        </div>

                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4">
                                Tầm nhìn
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                Trở thành trung tâm đào tạo tiếng Anh hàng đầu
                                Việt Nam, được công nhận quốc tế về chất lượng
                                giáo dục và phương pháp giảng dạy hiện đại.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
