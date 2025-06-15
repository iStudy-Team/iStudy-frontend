'use client';



export default function TeacherSection() {
    return (
        <div className="py-8 md:py-0 bg-gray-50">
            <div className="w-full mx-auto">
                

                {/* Section 2: Xây dựng nền tảng giáo dục sẵn sàng cho tương lai*/}
                <div
                    className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:min-h-[700px]
              bg-[url(https://ila.edu.vn/wp-content/uploads/2023/10/doi-ngu-giao-vien-ban-xu.png)]
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
                                text-black "
                            >
                                Bệ phóng khám phá sức mạnh tri thức
                            </h2>

                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 lg:mb-8
                                text-black "
                            >
                                Tại ILA, đội ngũ đào tạo, giáo viên và trợ giảng của chúng tôi cố gắng hỗ trợ mọi học sinh phát huy hết khả năng của mình. Hơn 2.000 giáo viên đến từ các quốc gia nói tiếng Anh trên thế giới đều có trình độ chuyên môn cao và bằng cấp sư phạm đang làm việc tại hơn 73 trung tâm Anh ngữ trên cả nước.
                            </p>
                            <p
                                className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8
                                text-black  hidden sm:block"
                            >
                                ILA tự hào về chương trình đào tạo và hỗ trợ mà chúng tôi cung cấp cho các giáo viên, mang đến cho họ cơ hội phát triển kỹ năng giảng dạy và thăng tiến trong sự nghiệp.
                            </p>
                        </div>
                    </div>
                </div>


                </div>



        </div>
    );
}