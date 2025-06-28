import { Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import SidebarAdmin from '@/pages/admin/siderbarAdmin';
import Header from '@/components/molecules/header';

export default function AdminLayout() {
    return (
        <div className=" flex h-screen bg-gray-50 flex-1 overflow-auto ">
            <div className="w-64 bg-white shadow-lg h-screen flex flex-col ">
                <SidebarAdmin />
            </div>
            <div className="min-h-screen flex-1 overflow-auto">
                <div className="mb-15 bg-white w-full">
                    <Header />
                </div>
                <Outlet />
                <Toaster richColors />
            </div>
        </div>
    );
}
