import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Award, BookOpen, Globe } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function JumpStartSection() {
    return (
        <div className="py-16 bg-gray-50">
            <div className="w-full mx-auto">
                {/* Main About Section */}
                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/khoa-hoc-tieng-anh-mam-non-cho-tre-3-6-tuoi-jumpstart.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-end">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-lg right-0 p-6 ">
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
                                Khóa học tiếng Anh cho các bé 3-6 tuổi iStudy
                                Jumpstart đem đến môi trường ngôn ngữ chuẩn quốc
                                tế, phương pháp Học qua chơi với 100% giáo viên
                                nước ngoài cho con niềm vui học tập. Chương
                                trình tập trung đặc biệt vào khả năng nghe –
                                nói, giúp con phản xạ nhanh với ngôn ngữ và phát
                                âm chuẩn bản xứ từ nhỏ.
                            </p>
                        </div>
                    </div>
                </div>
                {/* anh 2 */}

                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/moi-truong-hoc-tap-the-ky-21-ila-jumpstart.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-start mb-8">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-3xl right-0 p-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                                Môi trường học tập thế kỷ 21 tại iStudy
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8 text-white">
                                Với tầm nhìn giáo dục hiện đại, iStudy mang đến
                                những lớp học của “hạnh phúc” dành cho các bé ở
                                độ tuổi mầm non với cơ sở vật chất thiết kế phù
                                hợp, phương pháp học vui nhộn và đội ngũ giáo
                                viên tận tâm chăm sóc. Đây chính là nơi sẽ gieo
                                trong con tình yêu học tập trọn đời.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8 text-white ">
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
                        <div className="lg:w-1/2 bg-[#e0bcc4] p-8 md:p-12 flex items-top ">
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
                                src="https://ila.edu.vn/wp-content/uploads/2023/05/giao-vien-tieng-anh-jumpstart.png"
                                alt="Cơ sở vật chất iStudy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* cơ sở vật chất */}
                <div className="max-w-[1246px] mx-auto h-[515px] mb-4">
                    <div className="relative h-full   bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/co-so-vat-chat-jumpstart.png)] bg-no-repeat bg-center bg-cover rounded-[35px] flex justify-end mb-4  ">
                        <div className="absolute inset-0 bg-black/20 rounded-[35px]"></div>
                        <div className="flex flex-col justify-center space-y-6 h-full max-w-lg right-0 p-6 mt-12 z-10 ">
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text3xl font-bold mb-6 leading-tight text-white">
                                    CƠ SỞ VẬT CHẤT
                                </h2>

                                <p className="text-gray-700 text-lg leading-relaxed mb-4 text-white">
                                    iStudy đặc biệt đầu tư vào cơ sở vật chất
                                    cho từng độ tuổi để tăng tối đa trải nghiệm
                                    cho học sinh.
                                </p>
                                <p className="text-gray-700 text-lg leading-relaxed mb-8 text-white">
                                    Lớp 3-6 tuổi với thảm và bàn ghế gỗ bo tròn
                                    các cạnh an toàn cùng không gian dễ dàng tùy
                                    chỉnh nhằm tối ưu hóa trải nghiệm vui chơi,
                                    tương tác của con.
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
                {/* ảnh 4*/}
                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/don-dau-tuong-lai-cung-khoa-hoc-ila-jumpstart.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-start mb-8">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-3xl right-0 p-6 ml-8 p-20 mt-65 ">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold  leading-tight ">
                                Mở khóa “kho tàng”
                            </h2>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 leading-tight ">
                                ngôn ngữ
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8 pr-30">
                                Lớp Jumpstart sẽ giúp mở khóa “kho tàng” ngôn
                                ngữ trong con bằng cách tạo cho con nền tảng
                                phát âm chuẩn bản xứ, có vốn từ vựng phong phú
                                đồng thời dạn dĩ hơn trong giao tiếp.
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8 pr-30 ">
                                Không chỉ vậy, con còn được phát triển 6 kỹ năng
                                quan trọng của thế kỷ 21, có tư duy toàn cầu
                                cùng nền tảng tiếng Anh vững chắc để khẳng định
                                bản thân, góp phần tạo nên thành công trong cuộc
                                sống sau này.
                            </p>
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
                            iStudy trong con số
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
