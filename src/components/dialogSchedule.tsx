import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode, useState, useEffect } from 'react';
import { useClassStore } from '@/store/useClassStore';
import { useScheduleStore } from '@/store/useScheduleStore';
import { Schedule } from '@/api/schedule';

interface DialogScheduleProps {
    children: ReactNode;
    editData?: Schedule | null;
    onSuccess?: () => void;
}

export function DialogSchedule({
    children,
    editData,
    onSuccess,
}: DialogScheduleProps) {
    const { classes, getAllClasses } = useClassStore();
    const { createSchedule, updateSchedule, loading } = useScheduleStore();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        class_id: '',
        day: '',
        start_time: '',
        end_time: '',
    });

    // Fetch classes when component mounts
    useEffect(() => {
        getAllClasses();
    }, [getAllClasses]);

    // Set form data when editData changes
    useEffect(() => {
        if (editData) {
            setFormData({
                class_id: editData.class_id,
                day: editData.day
                    ? new Date(editData.day).toISOString().split('T')[0]
                    : '',
                start_time: editData.start_time
                    ? typeof editData.start_time === 'string'
                        ? editData.start_time
                        : new Date(editData.start_time)
                              .toISOString()
                              .substring(11, 16)
                    : '',
                end_time: editData.end_time
                    ? typeof editData.end_time === 'string'
                        ? editData.end_time
                        : new Date(editData.end_time)
                              .toISOString()
                              .substring(11, 16)
                    : '',
            });
        } else {
            setFormData({
                class_id: '',
                day: '',
                start_time: '',
                end_time: '',
            });
        }
    }, [editData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const scheduleData = {
            class_id: formData.class_id,
            day: formData.day ? new Date(formData.day) : undefined,
            start_time:
                formData.day && formData.start_time
                    ? new Date(`${formData.day}T${formData.start_time}:00Z`)
                    : undefined,
            end_time:
                formData.day && formData.end_time
                    ? new Date(`${formData.day}T${formData.end_time}:00Z`)
                    : undefined,
        };

        try {
            if (editData) {
                // Update existing schedule
                await updateSchedule(editData.id, scheduleData);
            } else {
                // Create new schedule
                await createSchedule(scheduleData);
            }

            // Close dialog and trigger success callback
            setOpen(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error saving schedule:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {editData ? 'Chỉnh Sửa Lịch Học' : 'Tạo Lịch Học Mới'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl px-1 w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-auto mb-4">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Lớp học *
                                </label>
                                <select
                                    required
                                    value={formData.class_id}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            class_id: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                >
                                    <option value="">Chọn lớp học</option>
                                    {classes.map((classItem) => (
                                        <option
                                            key={classItem.id}
                                            value={classItem.id}
                                        >
                                            {classItem.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày học *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.day}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            day: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giờ bắt đầu *
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.start_time}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                start_time: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giờ kết thúc *
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.end_time}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                end_time: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>
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
                            disabled={loading}
                        >
                            {editData ? 'Cập Nhật' : 'Tạo Mới'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
