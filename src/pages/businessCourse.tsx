import BusinessCoureVideo from '@/components/molecules/businessCoure/businessCourseVideo';
import BusinessCourseSection from '@/components/molecules/businessCoure/businessCourseSection';

export default function BusinessCoursePage() {
    return (
        <div className="min-h-screen ">
            <div className=" w-full h-[560] justify-center">
                <BusinessCoureVideo />
            </div>
            <BusinessCourseSection />
        </div>
    );
}
