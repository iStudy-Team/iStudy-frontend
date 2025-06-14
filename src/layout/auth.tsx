import { Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';

export default function AuthLayout() {
    return (
        <div className=" w-full ">
            <div className="min-h-screen">
                <Outlet />
                <Toaster richColors />
            </div>
        </div>
    );
}
