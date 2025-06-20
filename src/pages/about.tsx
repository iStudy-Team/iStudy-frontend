import AboutSection from '@/components/molecules/about/aboutSection';

import OutstandingStudentsShowcase from '@/components/outstandingStudentsShowcase';

export default function AboutPage() {
    return (
        <div className="min-h-screen ">
            <AboutSection />
            
            <OutstandingStudentsShowcase />
        </div>
    );
}