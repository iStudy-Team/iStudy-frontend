'use client';

import { Button } from '@/components/ui/button';

export default function ResponsiveIeltsCourseSection() {
    return (
        <div className="py-8 md:py-16 bg-gray-50">
            <div className="w-full mx-auto">
                {/* Section 1: Chương trình luyện thi IELTS – SAT */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
                        bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/khoa-luyen-thi-ielts-danh-cho-tat-ca-hoc-vien-tu-14-tuoi-tro-len.png)]
                        bg-no-repeat bg-center bg-cover rounded-lg lg:rounded-none
                        flex items-center justify-center lg:justify-center "
                >
                    <div className="absolute inset-0 bg-black/30 rounded-lg lg:rounded-none lg:hidden" />

                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                            w-full lg:max-w-4xl px-4 sm:px-6 lg:pl-[250px] lg:ml-100
                            text-center lg:text-left relative z-10"
                    >
                        <div>
                            <h2
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
                                font-bold mb-4 md:mb-6 leading-tight
                                text-white lg:text-black"
                            >
                                Chương trình luyện thi IELTS – SAT (The
                                Princeton Review)
                            </h2>

                            <h2
                                className="text-xl sm:text-2xl md:text-3xl lg:text-3xl
                                font-bold mb-4 md:mb-6 leading-tight
                                text-white lg:text-black"
                            >
                                Sẵn sàng chinh phục – Mở lối tương lai
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-white lg:text-gray-700"
                            >
                                IELTS và SAT là hai chứng chỉ quan trọng để mở
                                ra cơ hội du học cho học sinh trên toàn thế
                                giới. Chương trình luyện thi IELTS Success và
                                SAT (The Princeton Review) độc quyền tại ILA
                                giúp học viên có lộ trình học rõ ràng và cam kết
                                đầu ra với điểm số cao.
                            </p>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8
                                text-white lg:text-gray-700 hidden sm:block"
                            >
                                Cùng đội ngũ giáo viên tinh tuyển và ngân hàng
                                bài thi phong phú, học viên từng bước chinh phục
                                mục tiêu điểm số để từ đó chủ động mở lối tương
                                lai, vươn mình ra thế giới.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: ILA IELTS Success */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
                        bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/trai-nghiem-hoc-tap-xuyen-suot-cho-ket-qua-vuot-troi-1.png)]
                        bg-no-repeat bg-center bg-cover rounded-lg lg:rounded-none
                        flex items-center justify-center lg:justify-start "
                >
                    <div className="absolute inset-0 bg-black/40 rounded-lg lg:rounded-none" />

                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                            w-full lg:max-w-3xl px-4 sm:px-6 lg:mt-2 lg:ml-5 lg:pb-80
                            text-center lg:text-left relative z-10"
                    >
                        <div>
                            <h2
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
                                font-bold mb-4 md:mb-6 text-white"
                            >
                                ILA IELTS Success
                            </h2>

                            <h2
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
                                font-bold mb-4 md:mb-6 text-white lg:mr-40"
                            >
                                Trải nghiệm học tập xuyên suốt Cho kết quả vượt
                                trội
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Section 3: Chương trình luyện thi độc quyền */}
                <div
                    className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:min-h-[600px]
                        bg-[url(https://ila.edu.vn/wp-content/uploads/2023/06/luyen-thi-sat-tpr-ila-3.jpg)]
                        bg-no-repeat bg-center bg-cover rounded-lg lg:rounded-none
                        flex items-center justify-center lg:justify-start"
                >
                    <div className="absolute inset-0 rounded-lg lg:rounded-none" />

                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                            w-full lg:max-w-3xl px-4 sm:px-6 lg:mt-10 lg:ml-20
                            text-center lg:text-left relative z-10"
                    >
                        <div>
                            {/* Logo và tiêu đề */}
                            <div className="flex flex-col lg:flex-row items-center lg:items-start mb-4 lg:mb-2">
                                <img
                                    className="w-[100px] h-[55px] sm:w-[120px] sm:h-[66px] lg:w-[133px] lg:h-[73px] mb-2 lg:mb-0"
                                    src="https://ila.edu.vn/wp-content/uploads/2023/05/image-ila-courses-4.png"
                                    alt="Princeton Review Logo"
                                />
                                <div className="flex flex-col lg:ml-2">
                                    <h2
                                        className="text-lg sm:text-xl md:text-2xl lg:text-4xl
                                        font-bold mb-1 text-white lg:text-black"
                                    >
                                        Chương trình luyện thi độc
                                    </h2>
                                    <h2
                                        className="text-lg sm:text-xl md:text-2xl lg:text-4xl
                                        font-bold mb-2 text-white lg:text-black"
                                    >
                                        quyền của iStudy và The
                                    </h2>
                                </div>
                            </div>

                            <h2
                                className="text-lg sm:text-xl md:text-2xl lg:text-4xl
                                font-bold mb-4 md:mb-6 text-white lg:text-black"
                            >
                                Princeton Review
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 italic
                                text-white lg:text-gray-700"
                            >
                                (*) The Princeton Review được thành lập từ năm
                                1981, là tổ chức giáo dục quốc tế chuyên về
                                luyện thi SAT có trụ sở tại New York, Hoa Kỳ.
                            </p>

                            <div className="flex justify-center lg:justify-start">
                                <Button
                                    className="relative inline-flex items-center justify-center
                                        px-4 sm:px-6 py-2 sm:py-3 h-10 sm:h-12 lg:h-12
                                        w-auto lg:w-[190px]
                                        overflow-hidden font-medium transition-all
                                        bg-blue-700 rounded-full hover:bg-white group
                                        text-sm sm:text-base lg:text-xl"
                                >
                                    <span
                                        className="w-32 h-32 sm:w-48 sm:h-48 rounded rotate-[-40deg] bg-red-600
                                        absolute bottom-0 left-0 -translate-x-full ease-out duration-500
                                        transition-all translate-y-full
                                        mb-6 ml-6 sm:mb-9 sm:ml-9
                                        group-hover:ml-0 group-hover:mb-24 sm:group-hover:mb-32
                                        group-hover:translate-x-0"
                                    />
                                    <span className="relative w-full text-center lg:text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black lg:ml-4">
                                        Xem Thêm
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Cam kết từ tổ chức đào tạo */}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
                        bg-[url(https://ila.edu.vn/wp-content/uploads/2023/05/cam-ket-tu-to-chuc-dao-tao-anh-ngu-hang-dau-voi-hon-25-nam-kinh-nghiem.png)]
                        bg-no-repeat bg-center bg-cover rounded-lg lg:rounded-none
                        flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-black/30 rounded-lg lg:rounded-none lg:hidden" />

                    <div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 h-full
                            w-full lg:max-w-5xl px-4 sm:px-6  lg:mt-20 lg:ml-[190px]
                            text-center lg:text-left relative z-10 lg:pl-110 lg:pb-50"
                    >
                        <div>
                            <h2
                                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
                                font-bold mb-4 md:mb-6 leading-tight
                                text-white lg:text-black"
                            >
                                Cam kết từ tổ chức đào tạo Anh ngữ hàng đầu với
                                hơn 25 năm kinh nghiệm
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8
                                text-white lg:text-gray-700"
                            >
                                Là tổ chức đào tạo Anh ngữ hàng đầu Việt Nam với
                                hơn 25 năm kinh nghiệm, khóa luyện thi IELTS
                                Success và SAT (The Princeton Review) của ILA sẽ
                                tư vấn cho học viên lộ trình học tập khoa học
                                nhằm tối ưu hóa điểm số IELTS, SAT để chạm tới
                                các mục tiêu du học, thi tuyển vào đại học hàng
                                đầu, xa hơn là phát triển và thăng tiến trong sự
                                nghiệp.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
