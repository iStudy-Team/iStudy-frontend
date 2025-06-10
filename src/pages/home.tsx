import OutletHome from '@/components/molecules/home/outlet.home';
import CourseCardsGrid from '@/components/molecules/home/corseList';
import CourseFinder from '@/components/molecules/home/findCourse';
import FacilityShowcase from '@/components/molecules/home/facilityShowcase';
import HorizontalTeacherShowcase from '@/components/molecules/home/teacherShowcase';

export default function HomePage() {
    return (
        <div>
            <OutletHome />
            <CourseFinder />
            <CourseCardsGrid />
            <HorizontalTeacherShowcase />
            <FacilityShowcase />
        </div>
    );
}
