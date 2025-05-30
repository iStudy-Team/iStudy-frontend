import { Outlet } from '@tanstack/react-router';

export default function ClientLayout() {
    return (
        <div className="p-2 container mx-auto">
            {/* Header */}
            <header className="mb-4">
                <div className="flex items-center justify-between fixed top-2 px-2">
                    <div className="text-2xl font-bold">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="inline-block mr-2"
                            loading="lazy"
                        />
                    </div>

                    <div className="flex items-center gap-x-3"></div>
                </div>
            </header>
            <Outlet />
        </div>
    );
}
