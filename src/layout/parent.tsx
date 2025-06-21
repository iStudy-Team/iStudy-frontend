import { Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/molecules/header';
import SidebarParent from '@/pages/parent/siderbarParent';

export default function ParentLayout() {
    return (
        <div className=" flex h-screen overflow-auto bg-[#f8f9fa]">
            <div className="w-64  h-screen flex flex-col ">
                <SidebarParent />
            </div>
            <div className="min-h-screen flex-1 overflow-auto">
                <div className="mb-15 bg-white">
                    <Header />
                </div>
                <Outlet />
                <Toaster richColors />
            </div>
        </div>
    );
}
