'use client';

import { Button } from '@/components/ui/button';

export default function AboutSection() {
    return (
        <div className="py-8 md:py-0 bg-gray-50">
            <div className="w-full mx-auto">
                {/* Section 1:  */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
                        bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/banner-about-us-update.png)]
                        bg-no-repeat bg-center bg-cover rounded-lg lg:rounded-none
                        flex items-center justify-center lg:justify-center "
                >
                    <div className="absolute inset-0 bg-black/30 rounded-lg lg:rounded-none lg:hidden" />

                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                            w-full lg:max-w-4xl px-4 sm:px-6 lg:pl-[350px] lg:ml-100
                            text-center lg:text-left relative z-10"
                    >
                        <div>
                            <h2
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight
                                text-white lg:text-[#001a72]"
                            >
                                iStudy – GIÁO DỤC THAY ĐỔI CUỘC ĐỜI
                            </h2>



                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                ttext-white lg:text-[#001a72]"
                            >
                                Trung tâm Anh ngữ ILA có hơn 30 năm kinh nghiệm đào tạo tiếng Anh cao cấp tại Việt Nam. Chúng tôi chú trọng tới sự phát triển toàn diện của học sinh thông qua tối ưu hóa lộ trình học tập và trau dồi đồng thời các kỹ năng quan trọng của thời đại. Ngày nay, ILA Việt Nam tự hào là đơn vị hàng đầu cả nước về đào tạo Anh ngữ cũng như các giải pháp và dịch vụ giáo dục mở rộng khác.


                            </p>


                        </div>
                    </div>
                </div>
                
                {/* Section 2: Xây dựng nền tảng giáo dục sẵn sàng cho tương lai*/}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
              bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/ceo-tran-xuan-dzu.png)]
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
                                text-white "
                            >
                                Xây dựng nền tảng giáo dục sẵn sàng cho tương lai
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-white "
                            >
                                “Phương pháp giáo dục của ILA là khuyến khích sự tự tin, tự nhiên phát triển. Những gì các em làm tốt, chúng tôi khuyến khích các em làm tốt hơn. Rất nhiều học sinh ILA đã được dạy để hiểu rõ giá trị bản thân, trưởng thành, ra trường và góp phần thay đổi thế giới”.
                            </p>
                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8
                                text-white  hidden sm:block"
                            >
                                Trần Xuân Dzu – CEO của ILA
                            </p>
                        </div>
                    </div>
                </div>
                <section className="bg-white py-12 px-4 md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* TẦM NHÌN */}
                        <div className="bg-[#ffe9c9] p-6 rounded-lg shadow-md relative flex flex-col">
                            <div className="absolute top-0 left-0 w-20 h-20 bg-[#f5845f] rounded-br-full" />
                            <h3 className="text-xl font-bold text-black mb-4 relative z-10">TẦM NHÌN</h3>
                            <p className="text-black mb-6 relative z-10">
                                Đào tạo một thế hệ không chỉ có khả năng thích ứng với thế giới đang thay đổi mà còn góp phần thay đổi thế giới.
                            </p>
                            <div className='mt-auto'>
                                <img
                                    src="https://ila.edu.vn/wp-content/uploads/2023/06/about-us-vision-update.png"
                                    alt="Tầm nhìn"
                                    className="w-full h-auto object-cover rounded-md"
                                />
                            </div>
                        </div>

                        {/* SỨ MỆNH */}
                        <div className="bg-[#ffe9c9] p-6 rounded-lg shadow-md relative flex flex-col">
                            <div className="absolute top-0 left-0 w-20 h-20 bg-[#f5845f] rounded-br-full" />
                            <h3 className="text-xl font-bold text-black mb-4 relative z-10">SỨ MỆNH</h3>
                            <p className="text-black mb-6 relative z-10">
                                Cam kết xây dựng một nền tảng giáo dục sẵn sàng cho tương lai và gắn chặt với môi trường làm việc hiện đại,
                                cũng như phát triển các giá trị của một công dân địa phương – toàn cầu.
                            </p>
                            <div className='mt-auto'>
                                <img
                                    src="https://ila.edu.vn/wp-content/uploads/2023/06/about_us_misson_update.png"
                                    alt="Sứ mệnh"
                                    className="w-full h-auto object-cover rounded-md"
                                />
                            </div>
                        </div>

                        {/* GIÁ TRỊ CỐT LÕI */}
                        <div className="bg-[#ffe9c9] p-6 rounded-lg shadow-md relative">
                            <div className="absolute top-0 left-0 w-20 h-20 bg-[#f5845f] rounded-br-full" />
                            <h3 className="text-xl font-bold text-black mb-4 relative z-10">GIÁ TRỊ CỐT LÕI</h3>
                            <ol className="list-decimal list-inside text-black space-y-2 relative z-10 mb-6">
                                <li>ILA đặt phát triển con người là giá trị cốt lõi cho mọi hoạt động.</li>
                                <li>ILA cam kết luôn đổi mới.</li>
                                <li>ILA hoạt động dựa trên tính minh bạch và hiệu quả.</li>
                                <li>ILA tạo ra những ảnh hưởng tích cực cho cộng đồng.</li>
                            </ol>
                            <img
                                src="https://ila.edu.vn/wp-content/uploads/2023/06/about-us-core-value-update.png"
                                alt="Giá trị cốt lõi"
                                className="w-full h-auto object-cover rounded-md"
                            />
                        </div>
                    </div>
                </section>


            </div>



        </div>
    );
}