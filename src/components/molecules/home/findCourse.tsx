'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, X, User, BookOpen } from 'lucide-react';
import { Img } from 'react-image';

interface CourseFinderProps {
    onFilterChange?: (age: string, program: string) => void;
}

export default function CourseFinder({ onFilterChange }: CourseFinderProps) {
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');

    const ageOptions = [
        { value: '3-6', label: '3-6 tuổi (Mầm non)' },
        { value: '6-11', label: '6-11 tuổi (Tiểu học)' },
        { value: '11-16', label: '11-16 tuổi (Trung học)' },
        { value: '16-22', label: '16-22 tuổi (Nâng cao)' },
        { value: '18+', label: '18+ tuổi (Người lớn)' },
    ];

    const programOptions = [
        { value: 'jumpstart', label: 'Jumpstart - Mầm non' },
        { value: 'super-juniors', label: 'Super Juniors - Tiểu học' },
        { value: 'smart-teens', label: 'Smart Teens - Trung học' },
        { value: 'young-adults', label: 'Young Adults - Nâng cao' },
        { value: 'business', label: 'Business - Thương mại' },
        { value: 'global-skills', label: 'Global Skills - Kỹ năng toàn cầu' },
    ];

    const handleAgeChange = (value: string) => {
        setSelectedAge(value);
        onFilterChange?.(value, selectedProgram);
    };

    const handleProgramChange = (value: string) => {
        setSelectedProgram(value);
        onFilterChange?.(selectedAge, value);
    };

    return (
        <div className="relative w-full">
            {/* Course Finder Section */}
            <div className="bg-blue-800 py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Left Content */}
                        <div className="flex-1 lg:max-w-md">
                            <h3 className="text-yellow-400 text-xl md:text-2xl font-bold mb-4 leading-tight">
                                Tìm các khóa học phù hợp với bạn và giúp con
                                đường học vấn của bạn thành công
                            </h3>
                        </div>

                        {/* Filter Controls */}
                        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
                            {/* Age Selector */}
                            <Select
                                value={selectedAge}
                                onValueChange={handleAgeChange}
                            >
                                <SelectTrigger className="w-full sm:w-64 bg-white text-gray-800 border-0 rounded-full h-12">
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-500" />
                                        <SelectValue placeholder="Độ tuổi" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {ageOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Program Selector */}
                            <Select
                                value={selectedProgram}
                                onValueChange={handleProgramChange}
                            >
                                <SelectTrigger className="w-full sm:w-64 bg-white text-gray-800 border-0 rounded-full h-12">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-gray-500" />
                                        <SelectValue placeholder="Chương trình học" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {programOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* See More Button */}
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 whitespace-nowrap">
                                Xem thêm
                                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full" />
                            </Button>
                        </div>

                        {/* Right Image */}
                        <div className="hidden lg:block">
                            <div className="w-32 h-32 relative">
                                <Img
                                    src="/placeholder.svg?height=128&width=128"
                                    alt="Students"
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
