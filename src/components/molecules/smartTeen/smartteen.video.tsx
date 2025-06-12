import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

export default function SmartTeenVideo() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    return (
        <div className="relative overflow-hidden p-0  h-[620px] w-[1300px] object-cover rounded-[35px] ">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500   ">
                <div className="absolute inset-0 ">
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
                        <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600" />
                        Video không thể tải
                    </video>

                    {/* Overlay làm tối video */}
                    <div className="absolute inset-0 bg-black/30" />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col pt-15 h-full px-8 md:px-16 lg:px-24 p-0 ">
                <div className="max-w-4xl">
                    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg text-shadow-[2px_5px_5px_rgb(0_0_0_/_1)]">
                        TIẾNG ANH TRUNG HỌC
                    </h2>

                    {/* Vietnamese Title */}
                    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                        SMART TEENS (11-16 TUỔI)
                    </h2>

                    {/* Subtitle */}

                    {/* Video Button */}
                    <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                        <DialogTrigger asChild>
                            <Button
                                size="lg"
                                className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
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
                                {/* Hiệu ứng sóng đỏ */}
                                <span className="w-48 h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>

                                {/* Nội dung nút + hiệu ứng chữ */}
                                <span className="relative flex items-center gap-3 group-hover:text-white">
                                    <Play className="w-6 h-6 fill-current" />
                                    XEM VIDEO
                                </span>
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="  p-0 bg-black justify-center w-full ">
                            <div className="relative w-full aspect-video  w-[872px] h-[490px]">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                                    onClick={() => setIsVideoOpen(false)}
                                >
                                    <X className="w-6 h-6" />
                                </Button>

                                {/* Video Iframe */}
                                <div className="aspect-video">
                                    <iframe
                                        src="https://www.youtube.com/embed/X6TQTuglWoM?si=tHeablWRXvnw5ikq"
                                        className="w-full h-full"
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
