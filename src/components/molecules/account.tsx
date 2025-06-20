import { Link, useLocation, useMatch } from '@tanstack/react-router';
import { Home, BarChart3, CreditCard, Wrench } from 'lucide-react';

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
            className={`flex items-center justify-center h-[30px] w-[30px] ${
                isActive ? 'bg-[#4fd1c5] rounded-[12px]' : item.color
            }`}
        >
            <item.icon
                size={20}
                className={`h-5 w-5 ${isActive ? 'text-white' : item.color} `}
            />
        </div>
        <span className="font-medium text-sm">{item.name}</span>
    </div>
);
export default function Account() {
    const location = useLocation();
    const currentPath = location.pathname;
    const menuItems: MenuItemType[] = [
        {
            name: 'Hồ Sơ',
            icon: Wrench,
            color: 'text-teal-400',
            path: '/admin/profile',
        },
        {
            name: 'Đăng Xuất',
            icon: Wrench,
            color: 'text-teal-400',
            path: '/admin/bank-account-manage',
        },
    ];
    return (
        <div className="">
            {/* Header */}
            <div className="px-6 pt-6 ">
                <div className="flex items-center space-x-3">
                    <p className="text-sm font-bold text-gray-800">
                        ACCOUNT PAGES
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
        </div>
    );
}
