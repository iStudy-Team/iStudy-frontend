import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { ReactNode, useState } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

interface CreateClassProps {
    children: ReactNode;
}

export function DialogCreateClass({ children }: CreateClassProps) {
    const [formData, setFormData] = useState({
        name: '',
        grade: 3,
        year: new Date().getFullYear(),
        teacher: '',
        studentCount: 0,
        status: 'active' as const,
        startDate: '',
        endDate: '',
        description: '',
        schedule: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormData({
            name: '',
            grade: 3,
            year: new Date().getFullYear(),
            teacher: '',
            studentCount: 0,
            status: 'active',
            startDate: '',
            endDate: '',
            description: '',
            schedule: '',
        });
    };
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Tạo Lớp Học</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white rounded-xl px-1 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto mx-auto">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tên Lớp *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                            placeholder="VD: Lớp 3A"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Khối Lớp *
                                        </label>
                                        <Select
                                            required
                                            value={formData.grade.toString()}
                                            onValueChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    grade: parseInt(value),
                                                })
                                            }
                                        >
                                            <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 h-auto">
                                                <SelectValue placeholder="Chọn khối lớp" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {[
                                                        1, 2, 3, 4, 5, 6, 7, 8,
                                                        9, 10, 11, 12,
                                                    ].map((grade) => (
                                                        <SelectItem
                                                            key={grade}
                                                            value={grade.toString()}
                                                        >
                                                            Lớp {grade}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Năm Học *
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="2015"
                                            max="2030"
                                            value={formData.year}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    year: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Giáo Viên *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.teacher}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    teacher: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                            placeholder="Tên giáo viên"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ngày Bắt Đầu *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.startDate}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    startDate: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ngày Kết Thúc *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.endDate}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    endDate: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Lịch Học
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.schedule}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                schedule: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="VD: Thứ 2, 4, 6 - 8:00-9:30"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mô Tả
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        placeholder="Mô tả về lớp học..."
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                >
                                    Hủy
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="bg-[#00c2ad] cursor-pointer"
                            >
                                Tạo Lớp Học
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </form>
        </Dialog>
    );
}
