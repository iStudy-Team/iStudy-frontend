import { MoreVertical, Eye, Edit3, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Grade } from '@/api/grade';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const GradeCard = ({
    Grade,
    onEdit,
    onViewDetails,
}: {
    Grade: Grade;
    onEdit: (Grade: Grade) => void;
    onViewDetails: (Grade: Grade) => void;
    onDelete: (id: string) => void;
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const itemsDropdown = [
        {
            label: 'Xem chi tiết',
            icon: <Eye className="w-4 h-4" />,
            action: () => onViewDetails(Grade),
            disabled: false,
        },
        {
            label: 'Chỉnh sửa',
            icon: <Edit3 className="w-4 h-4" />,
            action: () => onEdit(Grade),
            disabled: false,
        },
    ];

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-y-">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div>
                            <h3 className="font-semibold text-gray-800">
                                {Grade.name}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
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
                </div>
                <div className="flex items-center space-x-2">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                    <p>Năm học: {Grade.academic_year?.school_year}</p>
                </div>
            </div>

            {Grade.description && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {Grade.description}
                    </p>
                </div>
            )}
        </div>
    );
};
