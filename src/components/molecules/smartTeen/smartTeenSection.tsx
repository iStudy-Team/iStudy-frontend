import { ArrowRight, Star, Users, Award, BookOpen, Globe } from 'lucide-react';
import { Link } from '@tanstack/react-router';
export default function smartTeenSection() {
    return (
        <div className="py-16 bg-gray-50">
            <div className="w-full mx-auto">
                {/* Main About Section */}
                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/khoa-hoc-tieng-anh-cho-thieu-nien-11-16-tuoi-smart-teens.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-end">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-lg right-0 p-6 ">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Xuất sắc kỹ năng
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                Thấu hiểu giá trị quan trọng của giáo dục như
                                tấm hộ chiếu cho tương lai, khóa học tiếng Anh
                                thiếu niên iStudy Smart Teens (11-16 tuổi) được
                                thiết kế đặc biệt cho lứa tuổi thanh thiếu niên
                                với 7 cấp độ học và chương trình giảng dạy tích
                                hợp chuẩn quốc tế tiên tiến nhất
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                Học sinh sẽ được trang bị khả năng Anh ngữ xuất
                                sắc, thuần thục cả 4 kỹ năng nghe – nói – đọc –
                                viết, từ đó tự tin chinh phục các chứng chỉ Anh
                                ngữ quốc tế, chuẩn bị cho hành trang du học và
                                chinh phục các nghề nghiệp “hot” trong tương
                                lai.
                            </p>
                        </div>
                    </div>
                </div>
                {/* anh 2 */}

                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/moi-truong-hoc-tap-the-ky-21-ila-smart-teens.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-start mb-8 ">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-3xl right-0 p-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6  ">
                                Môi trường học tập thế kỷ 21 tại iStudy
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8 ">
                                Trải nghiệm thay đổi cuộc đời sẽ bắt đầu từ môi
                                trường học tập tiên tiến tại ILA: công nghệ tích
                                hợp, giáo viên chuyên nghiệp cùng chương trình
                                và phương pháp học được cập nhật theo xu hướng
                                quốc tế, mang đến nhận thức toàn cầu và các kỹ
                                năng vàng thế kỷ 21.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8  ">
                                iStudy đạt chứng nhận đạt chuẩn Trung tâm tiếng
                                Anh trẻ em do NEAS cấp
                            </p>
                        </div>
                    </div>
                </div>
                {/* grid  */}

                <div className="max-w-[1246px] mx-auto h-[515px] pb-4">
                    <div className="flex flex-col lg:flex-row rounded-[35px] overflow-hidden shadow-xl h-full ">
                        {/* Phần bên trái - Nội dung chữ */}
                        <div className="lg:w-1/2 bg-[#b0e5cf] p-8 md:p-12 flex items-top ">
                            <div className="max-w-lg">
                                <h2 className="text-3xl md:text-4xl font-bold  leading-tight pb-2">
                                    GIÁO VIÊN
                                </h2>

                                <p className=" text-lg leading-relaxed italic pb-2">
                                    100% giáo viên nước ngoài có trình độ sư
                                    phạm quốc tế
                                </p>

                                <p className=" text-xl leading-relaxed  font-bold">
                                    TRÌNH ĐỘ
                                </p>
                                <ul className="list-disc ml-5 text-lg">
                                    <li>Có bằng đại học hoặc sau đại học.</li>
                                    <li>
                                        Có chứng chỉ giảng dạy tiếng Anh quốc tế
                                        như CELTA, TESOL, DELTA… với kinh nghiệm
                                        tối thiểu 120 giờ đào tạo
                                    </li>
                                    <li>
                                        Tận tâm, yêu trẻ, có khả năng vỗ về và
                                        khích lệ tinh thần học sinh. Theo dõi và
                                        cập nhật thường xuyên kết quả học tập
                                        của các em đến phụ huynh.
                                    </li>
                                </ul>
                                <p className=" text-xl leading-relaxed  font-bold">
                                    SỐ LƯỢNG
                                </p>
                                <p className="list-disc ml-5 text-lg">
                                    Một lớp gồm 1 giáo viên nước ngoài và 2 trợ
                                    giảng chuyên nghiệp.
                                </p>
                            </div>
                        </div>

                        {/* Phần bên phải - Hình ảnh */}
                        <div className="lg:w-1/2 h-[400px] h-full ">
                            <img
                                src="https://ila.edu.vn/wp-content/uploads/2023/05/giao-vien-tieng-anh-smart-teens.png"
                                alt="Cơ sở vật chất iStudy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                {/* cơ sở vật chất */}
                <div className="max-w-[1246px] mx-auto h-[515px] mb-4">
                    <div className="relative h-full   bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/co-so-vat-chat-khoa-hoc-smart-teen.png)] bg-no-repeat bg-center bg-cover rounded-[35px] flex justify-end mb-4  ">
                        <div className="absolute inset-0 bg-black/40 rounded-[35px]"></div>
                        <div className="flex flex-col  space-y-6 h-full max-w-lg right-0 mr-10 mt-22  z-10 ">
                            <div>
                                <h2 className="text-2xl md:text-3xl lg:text3xl font-bold mb-6 leading-tight text-white">
                                    CƠ SỞ VẬT CHẤT
                                </h2>

                                <p className="text-gray-700 text-lg leading-relaxed mb-4 text-white">
                                    Ở cấp độ này, con cần không gian rộng rãi để
                                    vận động, học theo nhóm nên ILA bố trí phòng
                                    học với tiêu chuẩn 2,5m2 cho mỗi em. Đồng
                                    thời ILA còn tập trung vào hệ thống chiếu
                                    sáng ngăn ngừa mỏi mắt, dán film cách nhiệt
                                    và chống tia UV ở các khung cửa kính để tận
                                    dụng ánh sáng tự nhiên, bảo vệ mắt và giúp
                                    em tiếp thu bài giảng tốt hơn.
                                </p>

                                <Link
                                    to="/"
                                    className="relative inline-flex items-center justify-start px-6 py-3 h-11 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group w-fit ml-4"
                                >
                                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                    <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                                        Xem Thêm
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* anh 3*/}
                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/vung-vang-ban-linh-cung-khoa-hoc-ila-smart-teens.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-end">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-lg right-0 p-6 mt-8 mr-15 ">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Vững vàng bản lĩnh
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                Chương trình tiếng Anh thiếu niên ILA Smart
                                Teens cam kết cùng học sinh và phụ huynh theo
                                đuổi mục tiêu học tập dài hạn, xen kẽ các buổi
                                thi thử miễn phí để các em làm quen với các bài
                                thi lớn như IELTS, SAT…
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
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
