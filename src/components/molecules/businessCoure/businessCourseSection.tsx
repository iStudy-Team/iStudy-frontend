'use client';
import { Button } from '@/components/ui/button';

export default function ResponsiveBusinessCourseSection() {
    return (
        <div className="py-8 md:py-16 bg-gray-50">
            <div className="w-full mx-auto">
                {/* Section 1: Nâng tầm sự nghiệp */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
      bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/vung-vang-thanh-cong-cung-khoa-hoc-tieng-anh-danh-cho-nguoi-di-lam.jpg)]
      bg-no-repeat bg-center bg-cover rounded-lg lg:rounded-none
      flex items-center justify-center lg:justify-end  "
                >
                    {/* Mobile overlay */}
                    <div className="absolute inset-0 bg-black/40 rounded-lg lg:rounded-none lg:hidden" />

                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
        w-full lg:max-w-lg px-4 sm:px-6 lg:p-6
        text-center lg:text-left relative z-10"
                    >
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                                font-bold mb-4 md:mb-6 leading-tight
                                text-white lg:text-black"
                            >
                                Nâng tầm sự nghiệp
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8
                                text-white lg:text-gray-700"
                            >
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

                {/* Section 2: Các khóa học tiếng Anh */}
                <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/moi-truong-tich-cuc-theo-chuan-quoc-te-tai-ila.png)]  bg-no-repeat bg-center bg-cover rounded-lg lg:rounded-none flex items-center justify-center lg:justify-start mb-6 md:mb-8">
                    {/* Mobile overlay */}
                    <div className="absolute inset-0 bg-black/30 rounded-lg lg:rounded-none lg:hidden" />

                    <div className="flex flex-col justify-center space-y-4 md:space-y-6 h-full w-full lg:max-w-3xl px-4 sm:px-6 lg:pl-[120px] lg:pt-10  text-center lg:text-left relative z-10 lg:pb-100">
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl
                                font-bold mb-4 md:mb-6
                                text-white lg:text-black"
                            >
                                Các khóa học tiếng Anh
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed
                                text-white lg:text-gray-700 lg:mr-[160px] italic"
                            >
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

                {/* Section 3: Cơ sở vật chất */}
                <div className="px-4 sm:px-6 lg:px-0">
                    <div className="max-w-full lg:max-w-[1246px] lg:mx-auto mb-6 md:mb-8">
                        <div className="relative h-[400px] sm:h-[500px] lg:h-[515px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/co-so-vat-chat-khoa-hoc-tieng-anh-danh-cho-nguoi-di-lam.png)] bg-no-repeat bg-center bg-cover rounded-2xl sm:rounded-3xl lg:rounded-none flex items-center justify-center lg:justify-end">
                            <div className="absolute inset-0 bg-black/40 rounded-2xl sm:rounded-3xl lg:rounded-none" />

                            <div
                                className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                                w-full lg:max-w-lg p-4 sm:p-6 lg:mr-10 lg:mt-[40px]
                                text-center lg:text-left relative z-10"
                            >
                                <div>
                                    <h2
                                        className="text-xl sm:text-2xl md:text-3xl lg:text-3xl
                                    font-bold mb-4 md:mb-6 leading-tight text-white"
                                    >
                                        CƠ SỞ VẬT CHẤT
                                    </h2>

                                    <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-white">
                                        Môi trường học tràn đầy cảm hứng với màu
                                        xanh dương và vàng chủ đạo, nâu gỗ ấm áp
                                        giúp học viên tập trung tốt hơn. Bên
                                        cạnh đó, bảng viết 360 độ hay màn hình
                                        tương tác 65 inch, wifi tốc độ cao… giúp
                                        các bạn ghi lại các ý tưởng mới nảy sinh
                                        ngay tức khắc.
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

                {/* Section 4: Vững bước thành công */}
                <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:min-h-[700px] bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/business-english.jpg)] bg-no-repeat bg-center bg-cover rounded-lg lg:rounded-none flex items-center justify-center lg:justify-start mb-6 md:mb-8">
                    <div className="absolute inset-0 bg-black/50 rounded-lg lg:rounded-none" />

                    <div className="flex flex-col justify-center space-y-4 md:space-y-6 h-full w-full lg:max-w-3xl px-4 sm:px-6 lg:pt-20 lg:pl-20 text-center lg:text-left relative z-10 lg:mb-40">
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl
                                font-bold mb-4 md:mb-6 text-white"
                            >
                                Vững bước thành công
                            </h2>

                            <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8 text-white lg:mr-20">
                                Chương trình tiếng Anh dành cho doanh nghiệp có
                                hệ thống giáo trình được tùy chỉnh theo mục tiêu
                                đào tạo và đội ngũ giảng viên cao cấp, giúp học
                                viên nắm vững các từ vựng chuyên ngành, nâng cao
                                trình độ chuyên môn, bồi đắp khả năng giao tiếp
                                Anh ngữ theo đúng mục đích và tình huống giao
                                tiếp thực tế
                            </p>
                            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white lg:mr-20 hidden sm:block">
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
