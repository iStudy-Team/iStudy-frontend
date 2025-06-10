'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Teacher {
    id: number;
    name: string;
    title: string;
    image: string;
    experience?: string;
    specialization?: string;
}

export default function HorizontalTeacherShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    const teachers: Teacher[] = [
        {
            id: 1,
            name: 'Cô Nguyễn Thị An Quyên',
            title: 'Giáo viên IELTS Fulltime trung tâm ngoại ngữ ECE',
            image: '/placeholder.svg?height=200&width=200&text=Teacher+1',
            experience: '5+ năm kinh nghiệm',
            specialization: 'IELTS Speaking & Writing',
        },
        {
            id: 2,
            name: 'Cô Hoàng Thị Hồng Hạnh',
            title: 'Giáo viên IELTS Fulltime trung tâm ngoại ngữ ECE',
            image: '/placeholder.svg?height=200&width=200&text=Teacher+2',
            experience: '7+ năm kinh nghiệm',
            specialization: 'IELTS Reading & Listening',
        },
        {
            id: 3,
            name: 'Thầy Nguyễn Phan Hải',
            title: 'Giáo viên IELTS Fulltime trung tâm ngoại ngữ ECE',
            image: '/placeholder.svg?height=200&width=200&text=Teacher+3',
            experience: '6+ năm kinh nghiệm',
            specialization: 'IELTS General & Academic',
        },
        {
            id: 4,
            name: 'Cô Cần Thu Hà',
            title: 'Giáo viên IELTS Fulltime trung tâm ngoại ngữ ECE',
            image: '/placeholder.svg?height=200&width=200&text=Teacher+4',
            experience: '4+ năm kinh nghiệm',
            specialization: 'IELTS Foundation',
        },
        {
            id: 5,
            name: 'Thầy Trần Minh Đức',
            title: 'Giáo viên IELTS Fulltime trung tâm ngoại ngữ ECE',
            image: '/placeholder.svg?height=200&width=200&text=Teacher+5',
            experience: '8+ năm kinh nghiệm',
            specialization: 'IELTS Advanced',
        },
        {
            id: 6,
            name: 'Cô Lê Thị Mai',
            title: 'Giáo viên IELTS Fulltime trung tâm ngoại ngữ ECE',
            image: '/placeholder.svg?height=200&width=200&text=Teacher+6',
            experience: '3+ năm kinh nghiệm',
            specialization: 'IELTS Beginner',
        },
        {
            id: 7,
            name: 'Thầy Phạm Văn Nam',
            title: 'Giáo viên IELTS Fulltime trung tâm ngoại ngữ ECE',
            image: '/placeholder.svg?height=200&width=200&text=Teacher+7',
            experience: '9+ năm kinh nghiệm',
            specialization: 'IELTS Expert',
        },
        {
            id: 8,
            name: 'Cô Ngô Thị Lan',
            title: 'Giáo viên IELTS Fulltime trung tâm ngoại ngữ ECE',
            image: '/placeholder.svg?height=200&width=200&text=Teacher+8',
            experience: '5+ năm kinh nghiệm',
            specialization: 'IELTS Intensive',
        },
    ];

    // Số giáo viên hiển thị cùng lúc
    const visibleCount = 4;
    const maxIndex = teachers.length - visibleCount;

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, currentIndex]);

    const nextSlide = () => {
        if (isTransitioning || currentIndex >= maxIndex) return;

        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);

        setTimeout(() => setIsTransitioning(false), 500);
    };

    const prevSlide = () => {
        if (isTransitioning || currentIndex <= 0) return;

        setIsAutoPlaying(false);
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);

        setTimeout(() => setIsTransitioning(false), 500);
    };

    const goToSlide = (index: number) => {
        if (
            isTransitioning ||
            index === currentIndex ||
            index < 0 ||
            index > maxIndex
        )
            return;

        setIsAutoPlaying(false);
        setIsTransitioning(true);
        setCurrentIndex(index);

        setTimeout(() => setIsTransitioning(false), 500);
    };

    return (
        <div className="relative py-16 px-4 md:px-8 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, white 2px, transparent 2px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Đội ngũ giáo viên tại iStudy
                    </h2>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                        Đội ngũ giáo viên giàu kinh nghiệm, tận tâm và chuyên
                        nghiệp
                    </p>
                </div>

                {/* Teachers Carousel Container */}
                <div className="relative">
                    {/* Navigation Arrows */}

                    {/* Horizontal Carousel */}
                    <div className="overflow-hidden px-8">
                        <div
                            ref={carouselRef}
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * 25}%)`,
                            }}
                        >
                            {teachers.map((teacher) => (
                                <div
                                    key={teacher.id}
                                    className={`flex-shrink-0 w-1/4 px-3 transition-all duration-500 ${
                                        isTransitioning
                                            ? 'opacity-90 scale-95'
                                            : 'opacity-100'
                                    }`}
                                >
                                    <div className="bg-white rounded-2xl p-6 shadow-xl h-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                        {/* Teacher Photo */}
                                        <div className="relative mb-6">
                                            <div className="w-24 h-24 mx-auto bg-yellow-400 rounded-full p-1 transition-transform duration-300 hover:rotate-6">
                                                <img
                                                    src={
                                                        teacher.image ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={teacher.name}
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Teacher Info */}
                                        <div className="text-center">
                                            <h3 className="text-xl font-bold text-blue-800 mb-2 transition-colors duration-300 hover:text-blue-600">
                                                {teacher.name}
                                            </h3>
                                            <p className="text-blue-600 text-sm leading-relaxed mb-3">
                                                {teacher.title}
                                            </p>

                                            {/* Additional Info */}
                                            {teacher.experience && (
                                                <div className="text-xs text-gray-600 mb-1 flex items-center justify-center gap-1">
                                                    <span>📚</span>{' '}
                                                    {teacher.experience}
                                                </div>
                                            )}
                                            {teacher.specialization && (
                                                <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                                                    <span>🎯</span>{' '}
                                                    {teacher.specialization}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-12 gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            disabled={isTransitioning}
                            className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                                index === currentIndex
                                    ? 'bg-yellow-400 scale-125 shadow-lg'
                                    : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="flex justify-center mt-4">
                    <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-yellow-400 transition-all duration-500 ease-out"
                            style={{
                                width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Statistics */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center group">
                        <div className="text-3xl font-bold text-yellow-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                            {teachers.length}+
                        </div>
                        <div className="text-white/80 text-sm">
                            Giáo viên chuyên nghiệp
                        </div>
                    </div>
                    <div className="text-center group">
                        <div className="text-3xl font-bold text-yellow-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                            50+
                        </div>
                        <div className="text-white/80 text-sm">
                            Năm kinh nghiệm tổng
                        </div>
                    </div>
                    <div className="text-center group">
                        <div className="text-3xl font-bold text-yellow-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                            1000+
                        </div>
                        <div className="text-white/80 text-sm">
                            Học viên đã đào tạo
                        </div>
                    </div>
                    <div className="text-center group">
                        <div className="text-3xl font-bold text-yellow-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                            95%
                        </div>
                        <div className="text-white/80 text-sm">
                            Tỷ lệ hài lòng
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
