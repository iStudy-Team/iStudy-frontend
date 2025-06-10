'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, X } from 'lucide-react';

export default function Test() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // Thay thế URL này bằng video của bạn
    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Placeholder video URL

    return (
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/hero-background.png')",
                }}
            >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
                <div className="max-w-2xl">
                    {/* Main Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                        GREATER YOU EVERYDAY
                    </h1>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
                        TRƯỞNG THÀNH HƠN MỖI NGÀY
                    </h2>

                    {/* Video Button */}
                    <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="bg-white/90 hover:bg-white text-gray-800 font-semibold px-6 py-3 rounded-full flex items-center gap-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Play className="w-6 h-6 fill-current" />
                                Xem video
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-4xl w-full p-0 bg-black">
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                                    onClick={() => setIsVideoOpen(false)}
                                >
                                    <X className="w-6 h-6" />
                                </Button>

                                {/* Video Iframe - Thay thế videoUrl bằng link video của bạn */}
                                <div className="aspect-video">
                                    <iframe
                                        src={videoUrl}
                                        title="Tiếng Anh Mầm Non Jumpstart"
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
