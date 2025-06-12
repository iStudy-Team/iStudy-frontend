'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Student {
    id: number;
    name: string;
    center: string;
    image: string;
    testimonial: string;
    age?: string;
    course?: string;
}

export default function ResponsiveOutstandingStudentsShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const students: Student[] = [
        {
            id: 1,
            name: 'Nguyễn Minh Khang',
            center: 'iStudy Nguyễn Văn Cừ',
            image: 'https://ila.edu.vn/wp-content/uploads/2023/08/Tien-Duc-Mac-Dinh-Chi-1.png',
            testimonial:
                'Con rất thích học tiếng Anh tại ILA. Các cô giáo rất dễ thương và giúp con học rất nhiều!',
            age: '8 tuổi',
            course: 'Super Juniors',
        },
        {
            id: 2,
            name: 'Lê Phương Bảo Anh',
            center: 'iStudy Phan Xích Long',
            image: 'https://ila.edu.vn/wp-content/uploads/2023/03/le-phuong-bao-anh.jpg',
            testimonial:
                'Con luôn nhận được sự quan tâm của giáo viên và thấy có trò giảng. Con rất yêu quý thầy cô của mình!',
            age: '6 tuổi',
            course: 'Jumpstart',
        },
        {
            id: 3,
            name: 'Trần Đức Minh',
            center: 'iStuday Lê Văn Việt',
            image: 'https://ila.edu.vn/wp-content/uploads/2023/03/pham-dang-duong.jpg',
            testimonial:
                'Học tại iStudy giúp con tự tin giao tiếp tiếng Anh và kết bạn với nhiều bạn mới!',
            age: '9 tuổi',
            course: 'Super Juniors',
        },
        {
            id: 4,
            name: 'Phạm Thu Hà',
            center: 'iStudy Quận 7',
            image: 'https://ila.edu.vn/wp-content/uploads/2023/06/ong-thuy-sy-ila-go-vap.png',
            testimonial:
                'Con thích các hoạt động vui chơi trong giờ học. Học tiếng Anh không hề khó khăn!',
            age: '7 tuổi',
            course: 'Jumpstart',
        },
        {
            id: 5,
            name: 'Lý Hoàng Nam',
            center: 'iStudy Phạm Văn Đồng',
            image: 'https://ila.edu.vn/wp-content/uploads/2023/06/truong-duc-trong-ila-thu-dau-mot.png',
            testimonial:
                'Thầy cô dạy rất hay và con đã tiến bộ rất nhiều trong việc nói tiếng Anh!',
            age: '10 tuổi',
            course: 'Smart Teens',
        },
        {
            id: 6,
            name: 'Võ Minh Anh',
            center: 'iStudy Quận 1',
            image: 'https://ila.edu.vn/wp-content/uploads/2023/06/nguyen-phuc-duyen-ila-bien-hoa.png',
            testimonial:
                'Con rất vui khi được học cùng các bạn và thầy cô tại iStudy. Mọi người đều rất thân thiện!',
            age: '8 tuổi',
            course: 'Super Juniors',
        },
    ];

    // Responsive visible count: 1 for mobile, 2 for tablet, 3 for desktop
    const getVisibleCount = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 1; // Mobile
            if (window.innerWidth < 1024) return 2; // Tablet
            return 3; // Desktop
        }
        return 3; // Default for SSR
    };

    const [visibleCount, setVisibleCount] = useState(getVisibleCount());
    const maxIndex = students.length - 1;

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getVisibleCount());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextStudent();
        }, 2000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, currentIndex]);

    const nextStudent = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % students.length);

        setTimeout(() => setIsTransitioning(false), 600);
    };

    const prevStudent = () => {
        if (isTransitioning) return;

        setIsAutoPlaying(false);
        setIsTransitioning(true);
        setCurrentIndex(
            (prev) => (prev - 1 + students.length) % students.length
        );

        setTimeout(() => setIsTransitioning(false), 600);
    };

    const goToStudent = (index: number) => {
        if (isTransitioning || index === currentIndex) return;

        setIsAutoPlaying(false);
        setIsTransitioning(true);
        setCurrentIndex(index);

        setTimeout(() => setIsTransitioning(false), 600);
    };

    // Create visible students array (sliding window)
    const getVisibleStudents = () => {
        const result = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % students.length;
            result.push({ ...students[index], position: i });
        }
        return result;
    };

    const visibleStudents = getVisibleStudents();

    // Touch handling for mobile
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            nextStudent(); // Swipe left
        }
        if (touchStart - touchEnd < -50) {
            prevStudent(); // Swipe right
        }
    };

    return (
        <div className="py-8 sm:py-12 md:py-16 px-4 md:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800 mb-4 sm:mb-0">
                        GƯƠNG MẶT XUẤT SẮC
                    </h2>
                    <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 font-semibold text-base sm:text-lg group cursor-pointer hover:underline underline-offset-2"
                    >
                        Xem tất cả
                        <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </div>

                {/* Students Showcase */}
                <div
                    className="relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Navigation Arrows - Hidden on mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800
                                   w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full shadow-lg backdrop-blur-sm
                                   -translate-x-2 sm:-translate-x-4 lg:-translate-x-6 disabled:opacity-50
                                   hidden sm:flex"
                        onClick={prevStudent}
                        disabled={isTransitioning}
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800
                                   w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full shadow-lg backdrop-blur-sm
                                   translate-x-2 sm:translate-x-4 lg:translate-x-6 disabled:opacity-50
                                   hidden sm:flex"
                        onClick={nextStudent}
                        disabled={isTransitioning}
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </Button>

                    {/* Students Container */}
                    <div className="flex items-center justify-center w-full overflow-hidden">
                        <div
                            className={`flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 px-2 sm:px-4 lg:px-8`}
                        >
                            {visibleStudents.map((student, index) => (
                                <div
                                    key={`${currentIndex}-${student.id}`}
                                    className={`transition-all duration-600 ease-in-out ${
                                        isTransitioning
                                            ? 'opacity-80 scale-95'
                                            : 'opacity-100 scale-100'
                                    } group cursor-pointer flex-shrink-0`}
                                >
                                    <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 relative">
                                        {/* Student Photo */}
                                        <div
                                            className="relative bg-gray-200 overflow-hidden
                                                        w-[280px] h-[400px]
                                                        sm:w-[300px] sm:h-[450px]
                                                        lg:w-[320px] lg:h-[530px]"
                                        >
                                            <img
                                                src={
                                                    student.image ||
                                                    '/placeholder.svg'
                                                }
                                                alt={student.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />

                                            {/* Mobile: Always visible overlay, Desktop: Hover overlay */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                                                            flex flex-col justify-end p-4 sm:p-6 transition-all duration-300
                                                            sm:opacity-0 sm:group-hover:opacity-100 opacity-100`}
                                            >
                                                <h3
                                                    className={`text-white text-lg sm:text-xl font-bold mb-2
                                                               sm:transform sm:translate-y-4 sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300`}
                                                >
                                                    {student.name}
                                                </h3>
                                                <p
                                                    className={`text-white/90 text-sm mb-3
                                                              sm:transform sm:translate-y-4 sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300 sm:delay-75`}
                                                >
                                                    {student.center}
                                                </p>
                                                <blockquote
                                                    className={`text-white/95 text-sm italic leading-relaxed
                                                                       sm:transform sm:translate-y-4 sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300 sm:delay-150`}
                                                >
                                                    "{student.testimonial}"
                                                </blockquote>
                                                {student.age &&
                                                    student.course && (
                                                        <div
                                                            className={`flex justify-between items-center mt-3 pt-3 border-t border-white/30
                                                                    sm:transform sm:translate-y-4 sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300 sm:delay-200`}
                                                        >
                                                            <span className="text-white/80 text-xs">
                                                                {student.age}
                                                            </span>
                                                            <span className="text-white/80 text-xs">
                                                                {student.course}
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Buttons */}
                <div className="flex justify-center gap-4 mt-6 sm:hidden">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={prevStudent}
                        disabled={isTransitioning}
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Trước
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={nextStudent}
                        disabled={isTransitioning}
                        className="flex items-center gap-2"
                    >
                        Sau
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-8 sm:mt-12 gap-1 sm:gap-2">
                    {students.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToStudent(index)}
                            disabled={isTransitioning}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                                index === currentIndex
                                    ? 'bg-blue-600 scale-125 shadow-lg'
                                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                            }`}
                            aria-label={`Go to student ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Statistics */}
                <div className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white">
                    <div className="text-center mb-6 sm:mb-8">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                            Thành tích học viên iStudy
                        </h3>
                        <p className="text-blue-100 text-sm sm:text-base">
                            Những con số ấn tượng từ các em học viên
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        <div className="text-center group">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                1000+
                            </div>
                            <div className="text-blue-100 text-xs sm:text-sm">
                                Học viên xuất sắc
                            </div>
                        </div>
                        <div className="text-center group">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                95%
                            </div>
                            <div className="text-blue-100 text-xs sm:text-sm">
                                Tỷ lệ hài lòng
                            </div>
                        </div>
                        <div className="text-center group">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                50+
                            </div>
                            <div className="text-blue-100 text-xs sm:text-sm">
                                Giải thưởng
                            </div>
                        </div>
                        <div className="text-center group">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                100%
                            </div>
                            <div className="text-blue-100 text-xs sm:text-sm">
                                Tiến bộ rõ rệt
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
