import { useState } from 'react';
import { Camera } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
// import { UploadImage } from '@/components/upload-img';

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface Conversation {
    id: string;
    name: string;
    message: string;
    avatar: string;
    time: string;
}

export default function ProfileAdmin() {
    const [profileData, setProfileData] = useState({
        fullName: 'Esther Jackson',
        email: 'esther@somewhere.com',
        mobile: '+84 123 456 789',
        location: 'United States',
    });

    const projects: Project[] = [
        {
            id: '1',
            title: 'Modern',
            description: 'As Uber works through a huge amount of internal...',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
        },
        {
            id: '2',
            title: 'Scandinavian',
            description:
                'Music is something that every person has his or her own...',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=250&fit=crop',
        },
        {
            id: '3',
            title: 'Minimalist',
            description:
                'Different people have different taste, and various...',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop',
        },
    ];

    const conversations: Conversation[] = [
        {
            id: '1',
            name: 'Esther Jackson',
            message: 'Hi! I need more informations...',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50&h=50&fit=crop&crop=face',
            time: 'REPLY',
        },
        {
            id: '2',
            name: 'Esther Jackson',
            message: 'Awesome work, can you change...',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
            time: 'REPLY',
        },
        {
            id: '3',
            name: 'Esther Jackson',
            message: 'Have a great afternoon...',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face',
            time: 'REPLY',
        },
        {
            id: '4',
            name: 'Esther Jackson',
            message: 'About files I can...',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
            time: 'REPLY',
        },
    ];

    const handleInputChange = (field: string, value: string) => {
        setProfileData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div>
            {/* Main Content */}
            <div className="flex-1 overflow-auto relative">
                {/* Background Header */}
                <div className="w-full h-[300px]  bg-[#4FD1C5] relative rounded-[15px] relative">
                    <img
                        src="/269ddd76462c42c51f8a480781f4ba1c4090e43d.png"
                        className="filter brightness-0 invert w-full h-full "
                    />
                </div>
                {/* Profile Header */}
                <div className="px-8 py-6 bg-white mx-8 mt-[-5%] rounded-xl shadow-sm opacity-95">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src={'/image.png'}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-xl object-cover"
                                />
                                {/* <UploadImage>
                                    <button className="absolute -bottom-2 -right-2 bg-teal-400 text-white p-2 rounded-full hover:bg-teal-500 transition-colors shadow-lg">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </UploadImage> */}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {profileData.fullName}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {profileData.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Platform Settings */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">
                            Platform Settings
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-3">
                                    ACCOUNT
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="emailfollow" />
                                        <Label htmlFor="airplane-mode">
                                            Email me when someone follows me
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch id="emailanswer" />
                                        <Label htmlFor="airplane-mode">
                                            Email me when someone answers on my
                                            post
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch id="emailmention" />
                                        <Label htmlFor="airplane-mode">
                                            Email me when someone mentions me
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-3">
                                    APPLICATION
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="" />
                                        <Label htmlFor="airplane-mode">
                                            New launches and projects
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch id="" />
                                        <Label htmlFor="airplane-mode">
                                            Monthly product updates
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch id="" />
                                        <Label htmlFor="airplane-mode">
                                            Subscribe to newsletter
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">
                            Profile Information
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Hi, I'm Alec Thompson, Decisions: If you can't
                            decide, the answer is no. If two equally difficult
                            paths, choose the one more painful in the short term
                            (pain avoidance is creating an illusion of
                            equality).
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name:
                                </label>
                                <input
                                    type="text"
                                    value={profileData.fullName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'fullName',
                                            e.target.value
                                        )
                                    }
                                    className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile:
                                </label>
                                <input
                                    type="text"
                                    value={profileData.mobile}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'mobile',
                                            e.target.value
                                        )
                                    }
                                    className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'email',
                                            e.target.value
                                        )
                                    }
                                    className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location:
                                </label>
                                <input
                                    type="text"
                                    value={profileData.location}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'location',
                                            e.target.value
                                        )
                                    }
                                    className="w-full text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-700">
                                    Social Media:
                                </span>
                                <div className="flex space-x-2">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                            f
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                            t
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                            i
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conversations */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">
                            Conversations
                        </h3>
                        <div className="space-y-4">
                            {conversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={conversation.avatar}
                                            alt={conversation.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm">
                                                {conversation.name}
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                {conversation.message}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="text-teal-400 text-xs font-medium hover:text-teal-500">
                                        {conversation.time}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="px-8 pb-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Projects
                            </h3>
                            <p className="text-sm text-gray-500">
                                Architects design houses
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">
                                            {project.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Create New Project Card */}
                            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 hover:border-teal-400 transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl text-teal-400">
                                        +
                                    </span>
                                </div>
                                <h4 className="font-semibold text-gray-700">
                                    Create a New Project
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
