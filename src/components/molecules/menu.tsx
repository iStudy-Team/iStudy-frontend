import * as React from 'react';
import { Link } from '@tanstack/react-router';
import {
    CircleCheckIcon,
    CircleHelpIcon,
    CircleIcon,
    MenuIcon,
    XIcon,
    ChevronDownIcon,
} from 'lucide-react';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Tiếng Anh Mầm non (3-6 tuổi)',
        href: '/tieng-anh-mam-non-3-6-tuoi',
        description:
            'Khóa học tiếng Anh cho các bé 3-6 tuổi ILA Jumpstart đem đến môi trường ngôn ngữ chuẩn quốc tế, phương pháp Học qua chơi với 100% giáo viên nước ngoài cho con niềm vui học tập. Chương trình tập trung đặc biệt vào khả năng nghe – nói, giúp con phản xạ nhanh với ngôn ngữ và phát âm chuẩn bản xứ từ nhỏ. ',
    },

    {
        title: 'Tiếng Anh Trung học (11-16 tuổi)',
        href: '/tieng-anh-trung-hoc-11-16-tuoi',
        description:
            'Thấu hiểu giá trị quan trọng của giáo dục như tấm hộ chiếu cho tương lai, khóa học tiếng Anh thiếu niên ILA Smart Teens (11-16 tuổi) được thiết kế đặc biệt cho lứa tuổi thanh thiếu niên với 7 cấp độ học và chương trình giảng dạy tích hợp chuẩn quốc tế tiên tiến nhất.',
    },
    {
        title: 'Tiếng Anh Chuyên ngành (cho người đi làm)',
        href: '/tieng-anh-chuyen-nganh-cho-nguoi-di-lam',
        description:
            'Chương trình tiếng Anh cho người đi làm bao gồm tiếng Anh giao tiếp quốc tế và tiếng Anh dành cho doanh nghiệp. Với các khóa học từ cơ bản đến chuyên sâu phục vụ cho từng nhóm ngành nghề và các bộ kỹ năng chuyên biệt, ILA đem đến các giáo án được thiết kế riêng nhằm tối ưu hóa năng lực tiếng Anh cho bất cứ lĩnh vực nào mà bạn quan tâm (từ marketing, dược, kỹ thuật, tài chính – ngân hàng… đến các ngành nghề mới và các cấp bậc cao hơn).',
    },

    {
        title: 'Luyện thi IELTS và SAT',
        href: 'chuong-trinh-luyen-thi-ielts-sat',
        description:
            'IELTS và SAT là hai chứng chỉ quan trọng để mở ra cơ hội du học cho học sinh trên toàn thế giới. Chương trình luyện thi IELTS Success và SAT (The Princeton Review) độc quyền tại ILA giúp học viên có lộ trình học rõ ràng và cam kết đầu ra với điểm số cao.',
    },
];

export function NavigationMenuDemo() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setOpenSubmenu(null);
    };

    const toggleSubmenu = (menu: string) => {
        setOpenSubmenu(openSubmenu === menu ? null : menu);
    };

    return (
        <div className="w-full">
            {/* Desktop and Tablet Navigation */}
            <div className="hidden md:flex items-center justify-center w-full">
                <NavigationMenu viewport={false}>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to="/" className="cursor-pointer">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                    className="inline-block mr-2"
                                    loading="lazy"
                                />
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link
                                to="/"
                                className="font-medium decoration-inherit hover:text-purple-600 transition-colors"
                            >
                                Giới Thiệu
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="hover:text-purple-600">
                                Chương Trình Học
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[300px] gap-2 md:w-[400px] md:grid-cols-2 lg:w-[500px] p-4">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/"
                                className="font-medium decoration-inherit hover:text-purple-600 transition-colors mr-4"
                            >
                                Cơ Sở Vật Chất
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/"
                                className="font-medium decoration-inherit hover:text-purple-600 transition-colors"
                            >
                                Giáo Viên
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="hover:text-purple-600">
                                Trung Tâm
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[200px]  ">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/"
                                                className="block p-2 hover:bg-gray-50 rounded font-medium"
                                            >
                                                Hà Nội
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/"
                                                className="block p-2 hover:bg-gray-50 rounded font-medium"
                                            >
                                                Thành Phố Hồ Chí Minh
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/"
                                                className="block p-2 hover:bg-gray-50 rounded font-medium"
                                            >
                                                Đà Nẵng
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/"
                                className="font-medium decoration-inherit hover:text-purple-600 transition-colors"
                            >
                                Tuyển Dụng
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <Link
                        to="/"
                        className="relative inline-flex items-center justify-start px-6 py-3 h-11 overflow-hidden font-medium transition-all bg-purple-600 rounded-full hover:bg-white group w-fit ml-4"
                    >
                        <span className="w-48 h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                            Đăng Ký Ngay
                        </span>
                    </Link>
                </NavigationMenu>

                {/* Desktop CTA Button */}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4">
                    <div className="font-bold text-xl">Logo</div>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <XIcon className="w-6 h-6" />
                        ) : (
                            <MenuIcon className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 bg-white">
                        {/* Mobile Menu Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <div className="font-bold text-xl">Menu</div>
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mobile Menu Content */}
                        <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
                            {/* Giới Thiệu */}
                            <Link
                                to="/"
                                className="block p-3 hover:bg-gray-50 rounded-lg font-medium"
                                onClick={toggleMobileMenu}
                            >
                                Giới Thiệu
                            </Link>

                            {/* Chương Trình Học */}
                            <div>
                                <button
                                    onClick={() =>
                                        toggleSubmenu('chuong-trinh')
                                    }
                                    className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg font-medium"
                                >
                                    Chương Trình Học
                                    <ChevronDownIcon
                                        className={`w-4 h-4 transition-transform ${
                                            openSubmenu === 'chuong-trinh'
                                                ? 'rotate-180'
                                                : ''
                                        }`}
                                    />
                                </button>
                                {openSubmenu === 'chuong-trinh' && (
                                    <div className="ml-4 mt-2 space-y-2">
                                        {components.map((component) => (
                                            <Link
                                                key={component.title}
                                                to={component.href}
                                                className="block p-2 hover:bg-gray-50 rounded text-sm"
                                                onClick={toggleMobileMenu}
                                            >
                                                <div className="font-medium">
                                                    {component.title}
                                                </div>
                                                <div className="text-gray-600 text-xs line-clamp-2">
                                                    {component.description}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cơ Sở Vật Chất */}
                            <Link
                                to="/"
                                className="block p-3 hover:bg-gray-50 rounded-lg font-medium"
                                onClick={toggleMobileMenu}
                            >
                                Cơ Sở Vật Chất
                            </Link>

                            {/* Giáo Viên */}
                            <div>
                                <button
                                    onClick={() => toggleSubmenu('giao-vien')}
                                    className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg font-medium"
                                >
                                    Giáo Viên
                                </button>
                                {openSubmenu === 'giao-vien' && (
                                    <div className="ml-4 mt-2 space-y-2">
                                        <Link
                                            to="/"
                                            className="block p-2 hover:bg-gray-50 rounded text-sm"
                                            onClick={toggleMobileMenu}
                                        >
                                            <div className="font-medium">
                                                Components
                                            </div>
                                            <div className="text-gray-600 text-xs">
                                                Browse all components in the
                                                library.
                                            </div>
                                        </Link>
                                        <Link
                                            to="/"
                                            className="block p-2 hover:bg-gray-50 rounded text-sm"
                                            onClick={toggleMobileMenu}
                                        >
                                            <div className="font-medium">
                                                Documentation
                                            </div>
                                            <div className="text-gray-600 text-xs">
                                                Learn how to use the library.
                                            </div>
                                        </Link>
                                        <Link
                                            to="/"
                                            className="block p-2 hover:bg-gray-50 rounded text-sm"
                                            onClick={toggleMobileMenu}
                                        >
                                            <div className="font-medium">
                                                Blog
                                            </div>
                                            <div className="text-gray-600 text-xs">
                                                Read our latest blog posts.
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Trung Tâm */}
                            <div>
                                <button
                                    onClick={() => toggleSubmenu('trung-tam')}
                                    className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg font-medium"
                                >
                                    Trung Tâm
                                    <ChevronDownIcon
                                        className={`w-4 h-4 transition-transform ${
                                            openSubmenu === 'trung-tam'
                                                ? 'rotate-180'
                                                : ''
                                        }`}
                                    />
                                </button>
                                {openSubmenu === 'trung-tam' && (
                                    <div className="ml-4 mt-2 ">
                                        <Link
                                            to="/"
                                            className="block p-2 hover:bg-gray-50 rounded text-sm font-medium"
                                            onClick={toggleMobileMenu}
                                        >
                                            Hà Nội
                                        </Link>
                                        <Link
                                            to="/"
                                            className="block p-2 hover:bg-gray-50 rounded text-sm font-medium"
                                            onClick={toggleMobileMenu}
                                        >
                                            Thành Phố Hồ Chí Minh
                                        </Link>
                                        <Link
                                            to="/"
                                            className="block p-2 hover:bg-gray-50 rounded text-sm font-medium"
                                            onClick={toggleMobileMenu}
                                        >
                                            Đà Nẵng
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Tuyển Dụng */}
                            <div>
                                <button
                                    onClick={() => toggleSubmenu('tuyen-dung')}
                                    className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg font-medium"
                                >
                                    Tuyển Dụng
                                </button>
                                {openSubmenu === 'tuyen-dung' && (
                                    <div className="ml-4 mt-2 space-y-2">
                                        <Link
                                            to="/"
                                            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-sm"
                                            onClick={toggleMobileMenu}
                                        >
                                            <CircleHelpIcon className="w-4 h-4" />
                                            Backlog
                                        </Link>
                                        <Link
                                            to="/"
                                            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-sm"
                                            onClick={toggleMobileMenu}
                                        >
                                            <CircleIcon className="w-4 h-4" />
                                            To Do
                                        </Link>
                                        <Link
                                            to="/"
                                            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-sm"
                                            onClick={toggleMobileMenu}
                                        >
                                            <CircleCheckIcon className="w-4 h-4" />
                                            Done
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile CTA Button */}
                            <div className="pt-4 mt-6 border-t">
                                <Link
                                    to="/"
                                    className="relative inline-flex items-center justify-center w-full px-6 py-3 h-12 overflow-hidden font-medium transition-all bg-purple-600 rounded-full hover:bg-white group"
                                    onClick={toggleMobileMenu}
                                >
                                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                    <span className="relative w-full text-center text-white transition-colors duration-300 ease-in-out group-hover:text-black">
                                        Đăng Ký Ngay
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link to={href} className="block p-2 hover:bg-gray-50 rounded">
                    <div className="text-sm leading-5 font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug mt-1">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
}
