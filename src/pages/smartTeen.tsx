import SmartTeenVideo from '@/components/molecules/smartTeen/smartteen.video';
import SmartTeenSection from '@/components/molecules/smartTeen/smartTeenSection';

import OutstandingStudentsShowcase from '@/components/outstandingStudentsShowcase';

export default function SmartTeenPage() {
    return (
        <div className="min-h-screen ">
            <div className=" w-full h-[560] justify-center">
                <SmartTeenVideo />
            </div>
            <SmartTeenSection />
            <OutstandingStudentsShowcase />
        </div>
    );
}
