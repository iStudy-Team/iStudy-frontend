import { UserPen, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '../ui/button';
import { useNavigate } from '@tanstack/react-router';

interface MenuItemType {
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    value: string;
}

interface MenuItemProps {
    item: MenuItemType;
}

const MenuItem = ({ item }: MenuItemProps) => (
    <div
        className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
    >
        <div
            className={`flex items-center justify-center h-[30px] w-[30px] ${
                item.color
            }`}
        >
            <item.icon size={20} className={`h-5 w-5 ${item.color} `} />
        </div>
        <span className="font-medium text-sm">{item.name}</span>
    </div>
);

export default function Account() {
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    const allMenuItems: MenuItemType[] = [
        {
            name: 'Hồ Sơ',
            icon: UserPen,
            color: 'text-teal-400',
            value: 'profile',
        },
        {
            name: 'Đăng Xuất',
            icon: LogOut,
            color: 'text-teal-400',
            value: 'logout',
        },
    ];

    // Filter menu items based on user role
    const menuItems = allMenuItems.filter((item) => {
        if (item.value === 'profile' && user?.role === 4) {
            return false; // Hide profile for admin
        }
        return true;
    });

    function onClick(value: string) {
        if (value === 'logout') {
            logout();
            navigate({ to: '/' });
        } else {
            const role = user?.role;
            let path;
            switch (role) {
                case 1:
                    path = 'teacher';
                    break;
                case 2:
                    path = 'student';
                    break;
                case 3:
                    path = 'parent';
                    break;
                case 4:
                    path = '';
                    break;
                default:
                    path = '';
                    break;
            }
            if (path && path !== '') {
                navigate({ to: `/${path}/profile` });
            }
        }
    }

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
                    return (
                        <Button
                            key={item.name}
                            onClick={() => onClick(item.value)}
                            variant="ghost"
                            className="w-full justify-start p-0 h-auto"
                        >
                            <MenuItem item={item} />
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}
