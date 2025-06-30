import React from 'react';
import {
    Home,
    CalendarCheck,
    GraduationCap,
    User,
    Users,
    School,
    UserPlus,
    DollarSign,
    Wallet,
} from 'lucide-react';
import Account from '../../components/molecules/account';
import { Link, useLocation } from '@tanstack/react-router';

interface MenuItemType {
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    path: string;
}

interface MenuItemProps {
    item: MenuItemType;
    isActive: boolean;
}

const MenuItem = ({ item, isActive }: MenuItemProps) => (
    <div
        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
            isActive
                ? 'bg-white shadow-xs text-gray-700'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
        }`}
    >
        <div
            className={`flex items-center justify-center h-[30px] w-[30px] ${isActive ? 'bg-[#4fd1c5] rounded-[12px]' : item.color}`}
        >
            <item.icon
                size={20}
                className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`}
            />
        </div>
        <span className="font-medium text-sm">{item.name}</span>
    </div>
);

export default function SidebarAdmin() {
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems: MenuItemType[] = [
        {
            name: 'Dashboard',
            icon: Home,
            color: 'text-teal-400',
            path: '/admin',
        },

        {
            name: 'Quản Lý Học Vụ',
            icon: GraduationCap,
            color: 'text-teal-400',
            path: '/admin/academic-management',
        },
        {
            name: 'Quản Lý Lớp Học',
            icon: School,
            color: 'text-teal-400',
            path: '/admin/class-management',
        },
        {
            name: 'Quản Lý Lịch Học',
            icon: CalendarCheck,
            color: 'text-teal-400',
            path: '/admin/schedule-management',
        },
        {
            name: 'Quản Lý Giáo Viên',
            icon: User,
            color: 'text-teal-400',
            path: '/admin/teacher-management',
        },
        {
            name: 'Quản Lý Phụ Huynh',
            icon: Users,
            color: 'text-teal-400',
            path: '/admin/parent-management',
        },
        {
            name: 'Quản Lý Học Sinh',
            icon: UserPlus,
            color: 'text-teal-400',
            path: '/admin/student-management',
        },
        {
            name: 'Quản Lý Học Phí',
            icon: DollarSign,
            color: 'text-teal-400',
            path: '/admin/fee-management',
        },
        {
            name: 'Tài Khoản Ngân Hàng',
            icon: Wallet,
            color: 'text-teal-400',
            path: '/admin/bank-account',
        },
    ];

    return (
        <div className="">
            <div className="px-6 pt-6">
                <div className="flex items-center space-x-3">
                    <p className="text-xl font-bold text-gray-800">
                        ADMIN DASHBOARD
                    </p>
                </div>
            </div>

            <div className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = currentPath === item.path;
                    return (
                        <Link to={item.path} key={item.name}>
                            <MenuItem item={item} isActive={isActive} />
                        </Link>
                    );
                })}
            </div>
            <Account />
        </div>
    );
}
