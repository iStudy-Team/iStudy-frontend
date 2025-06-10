import Video from '@/components/molecules/jumpStartCourse/video';
import ILAAboutSection from '@/components/molecules/jumpStartCourse/iLAAboutSection';

export default function JumpStartPage() {
    console.log('Layout rendered');
    return (
        <div className="min-h-screen ">
            <div className=" w-full h-[560] justify-center pl-[120px] pt-[30px]">
                <Video />
            </div>
            <ILAAboutSection />
        </div>
    );
}
