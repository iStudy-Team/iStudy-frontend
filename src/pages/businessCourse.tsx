import BusinessCoureVideo from '@/components/molecules/businessCoure/businessCourseVideo';
import BusinessCourseSection from '@/components/molecules/businessCoure/businessCourseSection';
import RegisterForm from '@/components/molecules/registerForm';

export default function BusinessCoursePage() {
    return (
        <div className="min-h-screen ">
            <div className=" w-full h-[560] justify-center pl-[120px] pt-[30px]">
                <BusinessCoureVideo />
            </div>
            <BusinessCourseSection />
            <RegisterForm />
        </div>
    );
}
