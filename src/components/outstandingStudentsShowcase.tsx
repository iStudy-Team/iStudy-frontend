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

export default function OutstandingStudentsShowcase() {
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

    const visibleCount = 3; // Hiển thị 3 học viên cùng lúc
    const maxIndex = students.length - 1;

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextStudent();
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, currentIndex]);

    const nextStudent = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % students.length); // Chỉ tăng 1 học viên

        setTimeout(() => setIsTransitioning(false), 600);
    };

    const prevStudent = () => {
        if (isTransitioning) return;

        setIsAutoPlaying(false);
        setIsTransitioning(true);
        setCurrentIndex(
            (prev) => (prev - 1 + students.length) % students.length
        ); // Chỉ giảm 1 học viên

        setTimeout(() => setIsTransitioning(false), 600);
    };

    const goToStudent = (index: number) => {
        if (isTransitioning || index === currentIndex) return;

        setIsAutoPlaying(false);
        setIsTransitioning(true);
        setCurrentIndex(index);

        setTimeout(() => setIsTransitioning(false), 600);
    };

    // Tạo mảng 3 học viên hiển thị (sliding window)
    const getVisibleStudents = () => {
        const result = [];
        for (let i = 0; i < visibleCount; i++) {
            const index = (currentIndex + i) % students.length;
            result.push({ ...students[index], position: i });
        }
        return result;
    };

    const visibleStudents = getVisibleStudents();
    const centerStudent = visibleStudents[1]; // Học viên ở giữa

    return (
        <div className="py-16 px-4 md:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex justify-between justify-start items-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-800">
                        GƯƠNG MẶT XUẤT SẮC
                    </h2>
                    <Button
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 font-semibold text-lg group ml-8 cursor-pointer hover:underline underline-offset-2"
                    >
                        Xem tất cả
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </div>

                {/* Students Showcase */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm -translate-x-6 disabled:opacity-50"
                        onClick={prevStudent}
                        disabled={isTransitioning}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 w-12 h-12 rounded-full shadow-lg backdrop-blur-sm translate-x-6 disabled:opacity-50"
                        onClick={nextStudent}
                        disabled={isTransitioning}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </Button>

                    {/* Students Container */}
                    <div className="flex  items-center gap-6 px-8  justify-center w-full">
                        {visibleStudents.map((student, index) => (
                            <div
                                key={`${currentIndex}-${student.id}`}
                                className={`transition-all duration-600 ease-in-out ${
                                    isTransitioning
                                        ? 'opacity-80 scale-95'
                                        : 'opacity-100 scale-100'
                                } group cursor-pointer`}
                            >
                                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 max-w-sm relative">
                                    {/* Student Photo */}
                                    <div className="relative h-80 bg-gray-200 overflow-hidden w-[320px] h-[530px]">
                                        <img
                                            src={
                                                student.image ||
                                                '/placeholder.svg'
                                            }
                                            alt={student.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                            <h3 className="text-white text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                {student.name}
                                            </h3>
                                            <p className="text-white/90 text-sm mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                                {student.center}
                                            </p>
                                            <blockquote className="text-white/95 text-sm italic leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                                                "{student.testimonial}"
                                            </blockquote>
                                            {student.age && student.course && (
                                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
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

                {/* Pagination Dots */}
                <div className="flex justify-center mt-12 gap-2">
                    {students.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToStudent(index)}
                            disabled={isTransitioning}
                            className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                                index === currentIndex
                                    ? 'bg-blue-600 scale-125 shadow-lg'
                                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                            }`}
                            aria-label={`Go to student ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
