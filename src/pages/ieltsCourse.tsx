import IeltsCourseSection from '@/components/molecules/ieltsCourse/ieltsCourseSection';
import RegisterForm from '@/components/molecules/registerForm';
import OutstandingStudentsShowcase from '@/components/outstandingStudentsShowcase';

export default function IeltsCourseCoursePage() {
    return (
        <div className="min-h-screen ">
            <IeltsCourseSection />
            <OutstandingStudentsShowcase />
        </div>
    );
}
