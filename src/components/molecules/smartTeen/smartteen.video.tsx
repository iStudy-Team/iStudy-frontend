'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, X } from 'lucide-react';
import { useState } from 'react';

export default function ResponsiveVideo() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <div
            className="relative overflow-hidden p-0
            h-[300px] w-full sm:h-[400px] md:h-[500px] lg:h-[620px]
            sm:w-full md:w-full lg:w-[1300px]
            object-cover rounded-[15px] sm:rounded-[20px] md:rounded-[25px] lg:rounded-[35px]
            mx-auto"
        >
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500">
                <div className="absolute inset-0">
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source
                            src="https://ila.edu.vn/wp-content/uploads/2023/05/video-course-smart-teen.mp4"
                            type="video/mp4"
                        />
                        {/* Fallback for browsers that don't support video */}
                        <div className="w-full h-full " />
                        Video không thể tải
                    </video>
                </div>
            </div>

            {/* Content Overlay */}
            <div
                className="relative z-10 flex flex-col justify-center h-full
                px-4 sm:px-6 md:px-8 lg:px-16 xl:px-16 lg:pb-80 pb-30"
            >
                <div className="max-w-4xl">
                    {/* Tiêu đề responsive */}
                    <h2
                        className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl
                        font-bold text-white mb-1 sm:mb-2 leading-tight drop-shadow-lg
                        text-shadow-[2px_5px_5px_rgba(0,0,0,1)]"
                    >
                        TIẾNG ANH TRUNG HỌC
                    </h2>

                    {/* Vietnamese Title */}
                    <h2
                        className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl
                        font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-lg"
                    >
                        SMART TEENS (11-16 TUỔI)
                    </h2>

                    {/* Video Button - Responsive */}
                    <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                        <DialogTrigger asChild>
                            <Button
                                size="lg"
                                className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold
                                    px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4
                                    rounded-full flex items-center gap-2 sm:gap-3
                                    text-sm sm:text-base md:text-lg
                                    shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer
                                    w-auto max-w-fit"
                                onClick={() => {
                                    setIsVideoOpen(true);
                                    // Thêm timeout để đảm bảo iframe đã được render
                                    setTimeout(() => {
                                        const iframe =
                                            document.querySelector('iframe');
                                        if (iframe) {
                                            const src = iframe.src;
                                            if (!src.includes('autoplay=1')) {
                                                iframe.src = src.includes('?')
                                                    ? `${src}&autoplay=1`
                                                    : `${src}?autoplay=1`;
                                            }
                                        }
                                    }, 100);
                                }}
                            >
                                {/* Hiệu ứng sóng đỏ - Responsive */}
                                <span
                                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
                                    rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0
                                    -translate-x-full ease-out duration-500 transition-all translate-y-full
                                    mb-6 ml-6 sm:mb-7 sm:ml-7 md:mb-9 md:ml-9
                                    group-hover:ml-0 group-hover:mb-24 sm:group-hover:mb-28 md:group-hover:mb-32
                                    group-hover:translate-x-0"
                                ></span>

                                {/* Nội dung nút + hiệu ứng chữ */}
                                <span className="relative flex items-center gap-2 sm:gap-3 group-hover:text-white">
                                    <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current" />
                                    <span className="hidden sm:inline">
                                        XEM VIDEO
                                    </span>
                                    <span className="sm:hidden">VIDEO</span>
                                </span>
                            </Button>
                        </DialogTrigger>

                        {/* Dialog Content - Responsive */}
                        <DialogContent
                            className="p-0 bg-black justify-center w-full max-w-none
                            h-auto max-h-[90vh]
                            sm:max-w-[90vw] sm:w-auto
                            md:max-w-[80vw]
                            lg:w-[872px] lg:h-[490px]"
                        >
                            <div
                                className="relative w-full
                                aspect-video
                                max-w-[95vw] max-h-[50vh]
                                sm:max-w-[85vw] sm:max-h-[60vh]
                                md:max-w-[75vw] md:max-h-[70vh]
                                lg:w-[872px] lg:h-[490px] lg:max-w-none lg:max-h-none"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10
                                        text-white hover:bg-white/20
                                        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                                    onClick={() => setIsVideoOpen(false)}
                                >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                </Button>

                                {/* Video Iframe */}
                                <div className="aspect-video w-full h-full">
                                    <iframe
                                        src="https://www.youtube.com/embed/X6TQTuglWoM?si=K_K7vvos7xltRUi9"
                                        className="w-full h-full rounded-lg"
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
