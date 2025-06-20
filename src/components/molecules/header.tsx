import { Link, useRouter, useLocation } from '@tanstack/react-router';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { useMemo, useState } from 'react';
import { Bell, ChevronDown, Search, Settings, User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface BreadcrumbItem {
    href: string;
    label: string;
}

const Header = () => {
    const router = useRouter();
    const location = useLocation(); // Sử dụng useLocation để theo dõi thay đổi route
    const pathname = location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);

    const breadcrumbItems = useMemo(() => {
        const items = [];
        let accumulatedPath = '';

        for (const segment of pathSegments) {
            accumulatedPath += `/${segment}`;
            const label =
                segment.charAt(0).toUpperCase() +
                segment.slice(1).replace(/-/g, ' ');
            items.push({ href: accumulatedPath, label });
        }

        return items;
    }, [pathSegments]); // pathSegments thay đổi khi pathname thay đổi

    if (pathSegments.length === 0) {
        return null;
    }

    const isRouteActive = (href: string) => {
        return pathname === href;
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    return (
        <div className="max-w-full bg-opacity-1">
            <div className="flex h-16 -mb-[55px]">
                {/* Left side - Breadcrumb and Title */}
                <div className="mt-2">
                    <Breadcrumb>
                        <BreadcrumbList className="flex flex-col items-start">
                            {/* Dòng đầu tiên chỉ chứa Home */}
                            <BreadcrumbItem className="flex-shrink-0 ">
                                <BreadcrumbLink asChild>
                                    <Link
                                        to="/"
                                        className="text-xs opacity-90 whitespace-nowrap"
                                        activeProps={{
                                            className:
                                                'font-medium text-primary',
                                        }}
                                    >
                                        Home
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            {/* Dòng thứ hai chứa các item còn lại */}
                            <div className="flex flex-nowrap items-center">
                                {breadcrumbItems.length > 3 ? (
                                    <>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem className="flex-shrink-0">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="flex items-center gap-1 whitespace-nowrap">
                                                    <BreadcrumbEllipsis className="size-4" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    {breadcrumbItems
                                                        .slice(0, -2)
                                                        .map((item, index) => (
                                                            <DropdownMenuItem
                                                                key={index}
                                                            >
                                                                <Link
                                                                    to={
                                                                        item.href
                                                                    }
                                                                    className="w-full"
                                                                    activeProps={{
                                                                        className:
                                                                            'font-medium text-primary',
                                                                    }}
                                                                >
                                                                    {item.label}
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </BreadcrumbItem>

                                        {breadcrumbItems
                                            .slice(-2)
                                            .map((item, index) => (
                                                <BreadcrumbItem
                                                    key={`last-${index}`}
                                                    className="flex-shrink-0"
                                                >
                                                    <BreadcrumbSeparator />
                                                    {isRouteActive(
                                                        item.href
                                                    ) ? (
                                                        <BreadcrumbPage className="text-sm font-semibold whitespace-nowrap">
                                                            {item.label}
                                                        </BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink asChild>
                                                            <Link
                                                                to={item.href}
                                                                className="text-xs opacity-90 whitespace-nowrap"
                                                                activeProps={{
                                                                    className:
                                                                        'font-medium text-primary',
                                                                }}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        </BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            ))}
                                    </>
                                ) : (
                                    breadcrumbItems.map((item, index) => (
                                        <BreadcrumbItem
                                            key={index}
                                            className="flex-shrink-0"
                                        >
                                            <BreadcrumbSeparator />
                                            {isRouteActive(item.href) ? (
                                                <BreadcrumbPage className="text-sm font-semibold whitespace-nowrap">
                                                    {item.label}
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink asChild>
                                                    <Link
                                                        to={item.href}
                                                        className="text-xs opacity-90 whitespace-nowrap"
                                                        activeProps={{
                                                            className:
                                                                'font-medium text-primary',
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                    ))
                                )}
                            </div>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {/* Right side - Search, Notifications, Profile */}
                <div className="flex items-center space-x-4 mb-[10px] pl-150">
                    {/* Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Type here..."
                            className="block w-64 pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Settings */}
                    <button className="p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200">
                        <Settings className="h-5 w-5" />
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setIsProfileDropdownOpen(!isProfileDropdownOpen)
                            }
                            className="flex items-center space-x-2 p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
                        >
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                            </div>
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        John Doe
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        john@example.com
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    View Profile
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Account Settings
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Help & Support
                                </a>
                                <div className="border-t border-gray-200 dark:border-gray-700 mt-2">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Sign Out
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
