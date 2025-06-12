import Video from '@/components/molecules/jumpStartCourse/video';
import JumpStartSection from '@/components/molecules/jumpStartCourse/jumpStartSection';

import OutstandingStudentsShowcase from '@/components/outstandingStudentsShowcase';

export default function JumpStartPage() {
    return (
        <div className="min-h-screen ">
            <div className=" w-full h-[560] justify-center">
                <Video />
            </div>
            <JumpStartSection />
            <OutstandingStudentsShowcase />
        </div>
    );
}
