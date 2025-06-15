
import FacilityVideo from '@/components/molecules/facility/facilityVideo';
import FacilitySection from '@/components/molecules/facility/facilitySection';

export default function FacilityPage() {
    return (
        <div className="min-h-screen ">
            <div className=" w-full h-[560] justify-center">
                <FacilityVideo />
            </div>
            <FacilitySection />
        </div>
    );
}


