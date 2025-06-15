import HorizontalTeacherShowcase from "@/components/molecules/home/teacherShowcase";
import TeacherSection from "@/components/molecules/teacher/teacherSetion";
import TeacherVideo from "@/components/molecules/teacher/teacherVideo";



export default function TeacherPage() {
    return (
        <div className="min-h-screen ">
            <div className=" w-full h-[560] justify-center">
                <TeacherVideo />
            </div>
            <TeacherSection/>
            <HorizontalTeacherShowcase />
        </div>
    );
}
