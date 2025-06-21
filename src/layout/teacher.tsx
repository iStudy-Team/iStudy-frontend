import { Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/molecules/header';
import SidebarTeacher from '@/pages/teacher/siderbarTeacher';

export default function TeacherLayout() {
    return (
        <div className=" flex h-screen overflow-auto bg-[#f8f9fa]">
            <div className="w-64  h-screen flex flex-col ">
                <SidebarTeacher />
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
