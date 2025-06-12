import { ArrowRight, Star, Users, Award, BookOpen, Globe } from 'lucide-react';
import { Link } from '@tanstack/react-router';
export default function BusinessCourseSection() {
    return (
        <div className="py-16 bg-gray-50">
            <div className="w-full mx-auto">
                {/* Main About Section */}
                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/vung-vang-thanh-cong-cung-khoa-hoc-tieng-anh-danh-cho-nguoi-di-lam.jpg)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-end">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-lg right-0 p-6 ">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                Nâng tầm sự nghiệp
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8">
                                Chương trình tiếng Anh cho người đi làm bao gồm
                                tiếng Anh giao tiếp quốc tế và tiếng Anh dành
                                cho doanh nghiệp. Với các khóa học từ cơ bản đến
                                chuyên sâu phục vụ cho từng nhóm ngành nghề và
                                các bộ kỹ năng chuyên biệt, iStudy đem đến các
                                giáo án được thiết kế riêng nhằm tối ưu hóa năng
                                lực tiếng Anh cho bất cứ lĩnh vực nào mà bạn
                                quan tâm (từ marketing, dược, kỹ thuật, tài
                                chính – ngân hàng… đến các ngành nghề mới và các
                                cấp bậc cao hơn).
                            </p>
                        </div>
                    </div>
                </div>
                {/* anh 2 */}

                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/moi-truong-tich-cuc-theo-chuan-quoc-te-tai-ila.png)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-start mb-8  ">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-3xl right-0 pl-30 pt-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6  ">
                                Các khóa học tiếng Anh
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mr-50 ">
                                Tại iStudy, chúng tôi tin rằng cùng với những cơ
                                hội rộng mở mà Anh ngữ doanh nghiệp mang lại,
                                bạn sẽ có thêm kỹ năng để từng ngày phát triển
                                bản thân, cống hiến hết mình trong công việc,
                                đồng thời tạo nên những ảnh hưởng lớn trong
                                tương lai, thông qua các khóa học dưới đây
                            </p>
                        </div>
                    </div>
                </div>
                {/* cơ sở vật chất */}
                <div className="max-w-[1246px] mx-auto h-[515px] mb-4">
                    <div className="relative h-full   bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/co-so-vat-chat-khoa-hoc-tieng-anh-danh-cho-nguoi-di-lam.png)] bg-no-repeat bg-center bg-cover rounded-[35px] flex justify-end mb-4  ">
                        <div className="absolute inset-0 bg-black/40 rounded-[35px]"></div>
                        <div className="flex flex-col  space-y-6 h-full max-w-lg right-0 mr-10 mt-22  z-10 ">
                            <div>
                                <h2 className="text-2xl md:text-3xl lg:text3xl font-bold mb-6 leading-tight text-white">
                                    CƠ SỞ VẬT CHẤT
                                </h2>

                                <p className="text-gray-700 text-lg leading-relaxed mb-4 text-white">
                                    Môi trường học tràn đầy cảm hứng với màu
                                    xanh dương và vàng chủ đạo, nâu gỗ ấm áp
                                    giúp học viên tập trung tốt hơn. Bên cạnh
                                    đó, bảng viết 360 độ hay màn hình tương tác
                                    65 inch, wifi tốc độ cao… giúp các bạn ghi
                                    lại các ý tưởng mới nảy sinh ngay tức khắc.
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
                {/* anh 3 */}

                <div className="relative h-full  lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/business-english.jpg)] bg-no-repeat bg-center bg-cover rounded-lg flex justify-start mb-8 pb-4">
                    <div className="flex flex-col justify-center space-y-6 h-full max-w-3xl right-0 pt-20 pl-20">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 text-white">
                                Vững bước thành công
                            </h2>

                            <p className="text-gray-700 text-lg leading-relaxed mb-8 text-white mr-20">
                                Chương trình tiếng Anh dành cho doanh nghiệp có
                                hệ thống giáo trình được tùy chỉnh theo mục tiêu
                                đào tạo và đội ngũ giảng viên cao cấp, giúp học
                                viên nắm vững các từ vựng chuyên ngành, nâng cao
                                trình độ chuyên môn, bồi đắp khả năng giao tiếp
                                Anh ngữ theo đúng mục đích và tình huống giao
                                tiếp thực tế
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed mb-8 text-white mr-20">
                                Từ đó, học viên có thêm tự tin với năng lực của
                                bản thân để chủ động kết nối, hội nhập và vươn
                                tầm thế giới.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
