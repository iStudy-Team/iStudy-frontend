'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FacilitySlide {
    id: number;
    image: string;

    description?: string;
}

export default function FacilityShowcase() {
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
                        Khám phá không gian học tập được thiết kế theo tiêu
                        chuẩn quốc tế, tạo môi trường lý tưởng cho sự phát triển
                        toàn diện của học viên
                    </p>
                </div>

                {/* Image Carousel */}
                <div className="relative ">
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
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentSlide
                                        ? 'bg-red-500 scale-125 shadow-lg'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
