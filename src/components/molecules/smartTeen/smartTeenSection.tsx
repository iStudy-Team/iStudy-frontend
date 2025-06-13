'use client';
import { Button } from '@/components/ui/button';

export default function ResponsiveSmartTeenSection() {
    return (
        <div className="py-8 md:py-16 bg-gray-50">
            <div className="w-full mx-auto">
                {/* Section 1: Xuất sắc kỹ năng */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
              bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/khoa-hoc-tieng-anh-cho-thieu-nien-11-16-tuoi-smart-teens.png)]
              bg-no-repeat bg-center bg-cover
              flex items-center justify-center lg:justify-end "
                >
                    {/* Mobile overlay */}
                    <div className="absolute inset-0 bg-black/40 lg:hidden" />

                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                w-full lg:max-w-lg px-4 sm:px-6 lg:p-6
                text-center lg:text-left relative z-10"
                    >
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl
                                font-bold mb-4 md:mb-6 leading-tight
                                text-white lg:text-black"
                            >
                                Xuất sắc kỹ năng
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-white lg:text-gray-700"
                            >
                                Thấu hiểu giá trị quan trọng của giáo dục như
                                tấm hộ chiếu cho tương lai, khóa học tiếng Anh
                                thiếu niên iStudy Smart Teens (11-16 tuổi) được
                                thiết kế đặc biệt cho lứa tuổi thanh thiếu niên
                                với 7 cấp độ học và chương trình giảng dạy tích
                                hợp chuẩn quốc tế tiên tiến nhất
                            </p>
                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8
                                text-white lg:text-gray-700 hidden sm:block"
                            >
                                Học sinh sẽ được trang bị khả năng Anh ngữ xuất
                                sắc, thuần thục cả 4 kỹ năng nghe – nói – đọc –
                                viết, từ đó tự tin chinh phục các chứng chỉ Anh
                                ngữ quốc tế, chuẩn bị cho hành trang du học và
                                chinh phục các nghề nghiệp "hot" trong tương
                                lai.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Môi trường học tập thế kỷ 21 */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
              bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/moi-truong-hoc-tap-the-ky-21-ila-smart-teens.png)]
              bg-no-repeat bg-center bg-cover
              flex items-center justify-center lg:justify-start mb-6 md:mb-8"
                >
                    {/* Mobile overlay */}
                    <div className="absolute inset-0 bg-black/30 lg:hidden" />

                    <div className="flex flex-col justify-center space-y-4 md:space-y-6 h-full w-full lg:max-w-3xl px-4 sm:px-6 lg:p-6 text-center lg:text-left relative z-10 lg:pb-90">
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl
                                font-bold mb-4 md:mb-6
                                text-white lg:text-black"
                            >
                                Môi trường học tập thế kỷ 21 tại iStudy
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-white lg:text-gray-700 lg:mr-20"
                            >
                                Trải nghiệm thay đổi cuộc đời sẽ bắt đầu từ môi
                                trường học tập tiên tiến tại iStudy: công nghệ
                                tích hợp, giáo viên chuyên nghiệp cùng chương
                                trình và phương pháp học được cập nhật theo xu
                                hướng quốc tế, mang đến nhận thức toàn cầu và
                                các kỹ năng vàng thế kỷ 21.
                            </p>
                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8
                                text-white lg:text-gray-700 hidden sm:block"
                            >
                                iStudy đạt chứng nhận đạt chuẩn Trung tâm tiếng
                                Anh trẻ em do NEAS cấp
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 3: Giáo viên Grid */}
                <div className="px-4 sm:px-6 lg:px-0">
                    <div className="max-w-full lg:max-w-[1246px] lg:mx-auto mb-6 md:mb-8">
                        <div
                            className="flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl lg:rounded-[35px]
                  overflow-hidden shadow-xl h-auto lg:h-[515px]"
                        >
                            {/* Phần bên trái - Nội dung chữ */}
                            <div className="lg:w-1/2 bg-[#b0e5cf] p-6 sm:p-8 md:p-12 flex items-center lg:items-start">
                                <div className="w-full lg:max-w-lg">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight pb-2">
                                        GIÁO VIÊN
                                    </h2>

                                    <p className="text-base sm:text-lg leading-relaxed italic pb-2">
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
                                            quốc tế như CELTA, TESOL, DELTA… với
                                            kinh nghiệm tối thiểu 120 giờ đào
                                            tạo
                                        </li>
                                        <li>
                                            Tận tâm, yêu trẻ, có khả năng vỗ về
                                            và khích lệ tinh thần học sinh. Theo
                                            dõi và cập nhật thường xuyên kết quả
                                            học tập của các em đến phụ huynh.
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
                                    src="https://ila.edu.vn/wp-content/uploads/2023/05/giao-vien-tieng-anh-smart-teens.png"
                                    alt="Cơ sở vật chất iStudy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Cơ sở vật chất */}
                <div className="px-4 sm:px-6 lg:px-0">
                    <div className="max-w-full lg:max-w-[1246px] lg:mx-auto mb-6 md:mb-8">
                        <div
                            className="relative h-[400px] sm:h-[500px] lg:h-[515px]
                  bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/co-so-vat-chat-khoa-hoc-smart-teen.png)]
                  bg-no-repeat bg-center bg-cover rounded-2xl sm:rounded-3xl lg:rounded-[35px]
                  flex items-center justify-center lg:justify-end"
                        >
                            <div className="absolute inset-0 bg-black/40 rounded-2xl sm:rounded-3xl lg:rounded-[35px]" />

                            <div className="flex flex-col justify-center space-y-4 md:space-y-6 h-full w-full lg:max-w-lg px-4 sm:px-6 lg:mr-10 lg:mt-[40px] text-center lg:text-left relative z-10">
                                <div>
                                    <h2
                                        className="text-xl sm:text-2xl md:text-3xl lg:text-3xl
                                    font-bold mb-4 md:mb-6 leading-tight text-white"
                                    >
                                        CƠ SỞ VẬT CHẤT
                                    </h2>

                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-white">
                                        Ở cấp độ này, con cần không gian rộng
                                        rãi để vận động, học theo nhóm nên ILA
                                        bố trí phòng học với tiêu chuẩn 2,5m2
                                        cho mỗi em. Đồng thời ILA còn tập trung
                                        vào hệ thống chiếu sáng ngăn ngừa mỏi
                                        mắt, dán film cách nhiệt và chống tia UV
                                        ở các khung cửa kính để tận dụng ánh
                                        sáng tự nhiên, bảo vệ mắt và giúp em
                                        tiếp thu bài giảng tốt hơn.
                                    </p>

                                    <div className="flex justify-center lg:justify-start lg:ml-4">
                                        <Button
                                            className="relative inline-flex items-center justify-center
                                        px-4 sm:px-6 py-2 sm:py-3 h-10 sm:h-11
                                        overflow-hidden font-medium transition-all
                                        bg-blue-600 rounded-full hover:bg-white group
                                        w-auto text-sm sm:text-base"
                                        >
                                            <span
                                                className="w-32 h-32 sm:w-48 sm:h-48 rounded rotate-[-40deg] bg-red-600
                                            absolute bottom-0 left-0 -translate-x-full ease-out duration-500
                                            transition-all translate-y-full
                                            mb-6 ml-6 sm:mb-9 sm:ml-9
                                            group-hover:ml-0 group-hover:mb-24 sm:group-hover:mb-32
                                            group-hover:translate-x-0"
                                            />
                                            <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                                                Xem Thêm
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 5: Vững vàng bản lĩnh */}
                <div
                    className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:min-h-[700px]
              bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/vung-vang-ban-linh-cung-khoa-hoc-ila-smart-teens.png)]
              bg-no-repeat bg-center bg-cover
              flex items-center justify-center lg:justify-end"
                >
                    {/* Mobile overlay */}
                    <div className="absolute inset-0 bg-black/40 lg:hidden" />

                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                w-full lg:max-w-lg px-4 sm:px-6 lg:p-6 lg:mt-8 lg:mr-[60px]
                text-center lg:text-left relative z-10"
                    >
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                                font-bold mb-4 md:mb-6 leading-tight
                                text-white lg:text-black"
                            >
                                Vững vàng bản lĩnh
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-white lg:text-gray-700"
                            >
                                Chương trình tiếng Anh thiếu niên ILA Smart
                                Teens cam kết cùng học sinh và phụ huynh theo
                                đuổi mục tiêu học tập dài hạn, xen kẽ các buổi
                                thi thử miễn phí để các em làm quen với các bài
                                thi lớn như IELTS, SAT…
                            </p>
                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8
                                text-white lg:text-gray-700 hidden sm:block"
                            >
                                Ngoài giờ học chính, các hoạt động khác trong và
                                ngoài lớp học đều được đầu tư như một trải
                                nghiệm trọn vẹn, giúp học sinh tôi luyện 6 kỹ
                                năng thế kỷ 21, chinh phục các kỳ thi quan trọng
                                như IELTS, SAT… với điểm cao, sẵn sàng cho việc
                                du học và tham gia các cuộc thi quốc tế.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
