'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Img } from 'react-image';

interface CourseCard {
    id: number;
    title: string;
    subtitle: string;
    ageRange: string;
    imageUrl: string;
    color: string;
}

export default function CourseCardsGrid() {
    const courses: CourseCard[] = [
        {
            id: 1,
            title: 'JUMPSTART',
            subtitle: 'Tiếng Anh Mầm non',
            ageRange: '(3-6 tuổi)',
            imageUrl:
                'https://ila.edu.vn/wp-content/uploads/2023/02/tieng-anh-mam-non-3-6-tuoi.png',
            color: 'bg-sky-200',
        },
        {
            id: 2,
            title: 'SUPER JUNIORS',
            subtitle: 'Tiếng Anh Tiểu học',
            ageRange: '(6-11 tuổi)',
            imageUrl:
                'https://ila.edu.vn/wp-content/uploads/2023/02/tieng-anh-tieu-hoc-6-11-tuoi.png',
            color: 'bg-sky-200',
        },
        {
            id: 3,
            title: 'SMART TEENS',
            subtitle: 'Tiếng Anh Trung học',
            ageRange: '(11-16 tuổi)',
            imageUrl:
                'https://ila.edu.vn/wp-content/uploads/2023/02/tieng-anh-trung-hoc-11-16-tuoi.png',
            color: 'bg-sky-200',
        },
        {
            id: 4,
            title: 'BUSINESS ENGLISH',
            subtitle: 'Tiếng Anh Chuyên ngành ',
            ageRange: '(cho người đi làm)',
            imageUrl:
                'https://ila.edu.vn/wp-content/uploads/2023/02/tieng-anh-chuyen-nganh.png',
            color: 'bg-indigo-200',
        },
        {
            id: 5,
            title: 'STEAM – IMATHS',
            subtitle: 'Tiếng Anh STEAM – IMATHS ',
            ageRange: '(4-10 tuổi)',
            imageUrl:
                'https://ila.edu.vn/wp-content/uploads/2023/05/kien-thiet-tu-duy-bang-toan-hoc-thong-minh-mobile.png',
            color: 'bg-indigo-200',
        },
        {
            id: 6,
            title: 'EXAM ENGLISH',
            subtitle: 'Khóa học luyện thi ',
            ageRange: 'IELTS và SAT',
            imageUrl:
                'https://ila.edu.vn/wp-content/uploads/2023/02/luyen-thi-sat-ielts.png',
            color: 'bg-indigo-200',
        },
    ];

    return (
        <div className="py-12 px-4 md:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Các khóa học của chúng tôi
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 w-full overflow-hidden ">
                                <Img
                                    src={course.imageUrl}
                                    alt={course.title}
                                    loader={
                                        <div className="h-64 w-full bg-gray-200 animate-pulse"></div>
                                    } // Placeholder khi loading
                                    className="object-cover h-64 w-full"
                                />
                                {/* Course Title Overlay */}
                                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full">
                                    <div
                                        className={`inline-block px-4 py-2 rounded-lg ${course.color} text-blue-800 font-bold mb-2 cursor-pointer`}
                                    >
                                        {course.title}
                                    </div>

                                    <Button
                                        variant="default"
                                        className="absolute bottom-4 right-4 bg-blue-800 hover:bg-blue-900 text-white rounded-full px-6 cursor-pointer"
                                    >
                                        Khám phá{' '}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className={`${course.color} p-6`}>
                                <h3 className="text-2xl font-bold text-gray-800 mb-1 cursor-pointer">
                                    {course.subtitle}
                                </h3>
                                <p className="text-xl font-semibold text-gray-700 cursor-pointer">
                                    {course.ageRange}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
