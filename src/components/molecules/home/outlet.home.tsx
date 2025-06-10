'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';

interface HeroSlide {
    id: number;
    titleEn: string;
    titleVi: string;
    subtitle: string;
    videoUrl: string;
    backgroundVideo: string;
}

export default function OutletHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    // 3 slide với video khác nhau - bạn có thể thay thế các URL này
    const slides: HeroSlide[] = [
        {
            id: 1,
            titleEn: 'GREATER YOU EVERYDAY',
            titleVi: 'TRƯỞNG THÀNH HƠN MỖI NGÀY',
            subtitle:
                'Đồng hành cùng mọi học viên để khơi dậy tiềm năng và đam mê trên hành trình học tập trọn đời',
            videoUrl:
                'https://www.youtube.com/embed/RPFXq1fBJFM?si=1mNCE3uuZhPlXSrr', // Video 1
            backgroundVideo:
                'https://ila.edu.vn/wp-content/uploads/2023/05/homepage-greater-video.mp4',
        },
        {
            id: 2,
            titleEn: 'ACHIEVE YOUR DREAMS',
            titleVi: 'THỰC HIỆN ƯỚC MƠ CỦA BẠN',
            subtitle:
                'Cùng nhau xây dựng tương lai tươi sáng với những kiến thức và kỹ năng vững chắc',
            videoUrl:
                'https://www.youtube.com/embed/So3ISERLZrw?si=efBy64V-GhHFNWW6', // Video 2
            backgroundVideo:
                'https://ila.edu.vn/wp-content/uploads/2023/06/ILO-trailer-website.mp4',
        },
        {
            id: 3,
            titleEn: 'SUCCESS STARTS HERE',
            titleVi: 'THÀNH CÔNG BẮT ĐẦU TỪ ĐÂY',
            subtitle:
                'Khám phá tiềm năng bản thân và phát triển toàn diện cùng đội ngũ giảng viên chuyên nghiệp',
            videoUrl:
                'https://www.youtube.com/embed/JP886JMsDHI?si=D58YjuhYaZ-eeF1W', // Video 3
            backgroundVideo:
                'https://ila.edu.vn/wp-content/uploads/2024/01/OSC-summer-trailer.mp4',
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const currentSlideData = slides[currentSlide];

    return (
        <div className="relative w-full h-[600px]   overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500">
                <div className="absolute inset-0">
                    <video
                        key={currentSlideData.id} // Force re-render when slide changes
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source
                            src={currentSlideData.backgroundVideo}
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

            {/* Navigation Arrows */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 w-12 h-12"
                onClick={prevSlide}
            >
                <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 w-12 h-12"
                onClick={nextSlide}
            >
                <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col pt-15 h-full px-8 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                    {/* English Title */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-lg text-shadow-[2px_5px_5px_rgba(0,0,0,1)]">
                        {currentSlideData.titleEn}
                    </h2>

                    {/* Vietnamese Title */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                        {currentSlideData.titleVi}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed drop-shadow-md text-shadow-[2px_5px_5px_RGBA(0,0,0,1)]">
                        {currentSlideData.subtitle}
                    </p>

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
                                            // Thêm autoplay vào URL iframe
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

                        <DialogContent className="  p-0 bg-black justify-center ">
                            <div className="relative w-[872px] h-[490px]">
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
                                        src={currentSlideData.videoUrl}
                                        title={`Video ${currentSlide + 1}`}
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

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>

            {/* Auto-advance indicator */}
            <div className="absolute bottom-4 right-4 z-20">
                <div className="text-white/70 text-sm">
                    {currentSlide + 1} / {slides.length}
                </div>
            </div>
        </div>
    );
}
