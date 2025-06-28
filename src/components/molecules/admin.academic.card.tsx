import { Academic } from '@/api/academic';
import {
    Edit3,
    Eye,
    GraduationCap,
    MoreVertical,
    Unlock,
    Lock,
} from 'lucide-react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAcademicStore } from '@/store/useAcademicStore';
import { ACADEMIC_YEAR_STATUS } from '@/types/study';

export const AcademicCard = ({
    Academic,
    onEdit,
    onViewDetails,
}: {
    Academic: Academic;
    onEdit: (Academic: Academic) => void;
    onViewDetails: (Academic: Academic) => void;
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { updateAcademicYearStatus } = useAcademicStore();

    const itemsDropdown = [
        {
            label: 'Xem chi tiết',
            icon: <Eye className="w-4 h-4" />,
            disabled: false,
            action: () => onViewDetails(Academic),
        },
        {
            label: 'Chỉnh sửa',
            icon: <Edit3 className="w-4 h-4" />,
            disabled: false,
            action: () => onEdit(Academic),
        },
        {
            label: Academic.status === 1 ? 'Vô hiệu hóa' : 'Kích hoạt',
            icon:
                Academic.status === 1 ? (
                    <Lock className="w-4 h-4" />
                ) : (
                    <Unlock className="w-4 h-4" />
                ),
            disabled: false,
            action: async () => {
                const newStatus =
                    Academic.status === ACADEMIC_YEAR_STATUS.ACTIVE
                        ? ACADEMIC_YEAR_STATUS.INACTIVE
                        : ACADEMIC_YEAR_STATUS.ACTIVE;
                await updateAcademicYearStatus(Academic.id, {
                    status: newStatus,
                });

                setShowDropdown(false);
            },
        },
        {
            label:
                Academic.status !== ACADEMIC_YEAR_STATUS.COMPLETED
                    ? 'Hoàn thành năm học'
                    : 'Đã hoàn thành',
            icon: <GraduationCap className="w-4 h-4" />,
            disabled: Academic.status === ACADEMIC_YEAR_STATUS.COMPLETED,
            action: async () => {
                await updateAcademicYearStatus(Academic.id, {
                    status: ACADEMIC_YEAR_STATUS.COMPLETED,
                });

                setShowDropdown(false);
            },
        },
    ];

    const getStatusColor = (status: number) => {
        switch (status) {
            case 1:
                return 'bg-green-100 text-green-700';
            case 0:
                return 'bg-gray-100 text-gray-600';
            case 2:
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusText = (status: number) => {
        switch (status) {
            case 1:
                return 'Đang diễn ra';
            case 0:
                return 'Không hoạt động';
            case 2:
                return 'Đã hoàn thành';
            default:
                return 'Không xác định';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex flex-col gap-y-2 w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-x-2">
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {Academic?.school_year}
                                </h3>
                            </div>

                            <div
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(Academic.status)}`}
                            >
                                {getStatusText(Academic.status)}
                            </div>
                        </div>

                        <div className="relative">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        onClick={() =>
                                            setShowDropdown(!showDropdown)
                                        }
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <MoreVertical className="w-4 h-4 text-gray-500" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {itemsDropdown.map((item) => (
                                        <DropdownMenuItem key={item.label}>
                                            <button
                                                onClick={() => {
                                                    item.action();
                                                    setShowDropdown(false);
                                                }}
                                                className={`w-full flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-50 ${item.disabled ? 'cursor-not-allowed' : ' cursor-pointer'}`}
                                                disabled={item.disabled}
                                            >
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </button>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        {Academic.start_date && formatDate(Academic.start_date)}{' '}
                        - {Academic.end_date && formatDate(Academic.end_date)}
                    </div>
                </div>
            </div>
        </div>
    );
};
