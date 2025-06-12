import { Outlet } from '@tanstack/react-router';
import { NavigationMenuDemo } from '@/components/molecules/menu';
import Footer from '@/components/molecules/footer';
import RegisterForm from '@/components/molecules/registerForm';

export default function ClientLayout() {
    return (
        <div className=" w-full ">
            <header className="sticky w-ful top-0 shadow-lg p-0 z-50 bg-white ">
                <NavigationMenuDemo />
            </header>
            <div className="min-h-screen">
                <Outlet />
                <RegisterForm />
            </div>
            <div className="w-full bg-[#f5f5f7]">
                <Footer />
            </div>
        </div>
    );
}
