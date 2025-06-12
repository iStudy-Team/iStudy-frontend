import SmartTeenVideo from '@/components/molecules/smartTeen/smartteen.video';
import SmartTeenSection from '@/components/molecules/smartTeen/smartTeenSection';
import RegisterForm from '@/components/molecules/registerForm';
import OutstandingStudentsShowcase from '@/components/outstandingStudentsShowcase';

export default function SmartTeenPage() {
    return (
        <div className="min-h-screen ">
            <div className=" w-full h-[560] justify-center pl-[120px] pt-[30px]">
                <SmartTeenVideo />
            </div>
            <SmartTeenSection />
            <OutstandingStudentsShowcase />
            <RegisterForm />
        </div>
    );
}
