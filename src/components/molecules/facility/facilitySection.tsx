'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FacilitySlide {
    id: number;
    image: string;

    description?: string;
}

export default function FacilitySection() {
    const [currentSlide, setCurrentSlide] = useState(1); // Start from slide 2 as shown in image

    const slides: FacilitySlide[] = [
        {
            id: 1,
            image: 'https://ila.edu.vn/wp-content/uploads/2023/03/center-5.png',
        },
        {
            id: 2,
            image: 'https://ila.edu.vn/wp-content/uploads/2023/03/center-6.png',
        },
        {
            id: 3,
            image: 'https://ila.edu.vn/wp-content/uploads/2023/03/center-4.png',
        },
        {
            id: 4,
            image: 'https://ila.edu.vn/wp-content/uploads/2023/03/center-3.png',
        },
        {
            id: 5,
            image: 'https://ila.edu.vn/wp-content/uploads/2023/03/center-2.png',
        },
        {
            id: 6,
            image: 'https://ila.edu.vn/wp-content/uploads/2023/03/center-1.png',
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const currentSlideData = slides[currentSlide];

    return (
        <div className="py-16 px-4 md:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Cơ sở vật chất hiện đại
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Khám phá không gian học tập được thiết kế theo tiêu chuẩn quốc tế, tạo môi trường lý tưởng cho sự phát triển toàn diện của học viên
                    </p>
                </div>

                {/* Image Carousel */}
                <div className="relative">
                    {/* Main Image Container */}
                    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
                        <img
                            src={currentSlideData.image || '/placeholder.svg'}
                            className="w-full h-full object-cover transition-all duration-500"
                        />

                        {/* Navigation Arrows */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm"
                            onClick={prevSlide}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm"
                            onClick={nextSlide}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 gap-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-red-500 scale-125 shadow-lg'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            
            {/* Section: Phong cách thiết kế chia đôi */}
            <div className="px-4 sm:px-6 lg:px-0 mt-16">
                <div className="max-w-full lg:max-w-[1246px] lg:mx-auto mb-6 md:mb-8">
                    <div className="flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl lg:rounded-[35px] overflow-hidden shadow-xl h-auto lg:h-[500px]">

                        {/* BÊN TRÁI: Nền  + nội dung chữ */}
                        <div className="lg:w-1/2 bg-[#ffeed5] p-6 sm:p-8 md:p-12 flex items-center justify-center text-center">
                            <div className="w-full lg:max-w-md">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight pb-4">
                                    Phong cách thiết kế
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                                    Nhằm nâng cao tối đa trải nghiệm học tập cho học sinh, ILA có ngôn ngữ thiết kế tối giản, hiện đại với 3 tông màu chủ đạo: màu vàng mang đến cảm giác vui vẻ và tích cực; màu xanh dương giúp tập trung và học hiệu quả; màu nâu gỗ tạo cảm giác tin cậy và an toàn.
                                </p>
                            </div>
                        </div>

                        {/* BÊN PHẢI: 4 hình ảnh với ảnh 1 và 3 chiếm 2/3 chiều dọc */}
                        <div className="lg:w-1/2 bg-white grid grid-cols-2 grid-rows-3 gap-2 p-4 md:p-1">
                            {/* Ảnh 1 – Chiếm 2 hàng */}
                            <img
                                src="https://ila.edu.vn/wp-content/uploads/2023/05/gallery-1.png"
                                alt="Phong cách 1"
                                className="w-full h-full object-cover rounded-xl shadow-md row-span-2"
                            />

                            {/* Ảnh 2 – Chiếm 1 hàng */}
                            <img
                                src="https://ila.edu.vn/wp-content/uploads/2023/05/gallery-3.png"
                                alt="Phong cách 2"
                                className="w-full h-full object-cover rounded-xl shadow-md"
                            />

                            {/* Ảnh 3 – Chiếm 2 hàng */}
                            <img
                                src="https://ila.edu.vn/wp-content/uploads/2023/05/gallery-2.png"
                                alt="Phong cách 3"
                                className="w-full h-full object-cover rounded-xl shadow-md row-span-2"
                            />

                            {/* Ảnh 4 – Chiếm 1 hàng */}
                            <img
                                src="https://ila.edu.vn/wp-content/uploads/2023/05/gallery-4.png"
                                alt="Phong cách 4"
                                className="w-full h-full object-cover rounded-xl shadow-md"
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
                                    Trang thiết bị và nội thất
                                </h2>

                                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-white">
                                    ILA chú trọng vào trang thiết bị và nội thất chất lượng cao, an toàn, phù hợp cho từng độ tuổi như thảm, bàn ghế gỗ bo tròn các cạnh hay đóng mở để con thoải mái vận động, dễ dàng tham gia các hoạt động nhóm.

                                    Màn hình tương tác 65 inch giúp các em hiểu sâu và rõ bài học. Bảng viết 360 độ bao quanh phòng học hỗ trợ tối đa việc thể hiện ý tưởng của các em.

                                    Bên cạnh hệ thống đèn phòng ngừa mỏi mắt, ILA còn tận dụng ánh sáng tự nhiên, kết hợp cửa kính, tấm film cách nhiệt và tia UV để bảo vệ sức khỏe cho học sinh.
                                </p>

                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}      