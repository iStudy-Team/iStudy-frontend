import { useState } from 'react';
import {
    Plus,
    Image,
    Film,
    X,
    Save,
    Calendar,
    Clock,
    DollarSign,
    Users,
    BookOpen,
} from 'lucide-react';

const NewClassPromotionAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [currentPromo, setCurrentPromo] = useState({
        title: '',
        description: '',
        image: null,
        startDate: '',
        endDate: '',
        classInfo: {
            name: '',
            subject: '',
            teacher: '',
            schedule: '',
            fee: '',
            capacity: '',
        },
        isActive: true,
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentPromo({ ...currentPromo, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const savePromotion = () => {
        setPromotions([...promotions, currentPromo]);
        setCurrentPromo({
            title: '',
            description: '',
            image: null,
            startDate: '',
            endDate: '',
            classInfo: {
                name: '',
                subject: '',
                teacher: '',
                schedule: '',
                fee: '',
                capacity: '',
            },
            isActive: true,
        });
        setIsOpen(false);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Quản lý quảng cáo lớp mới
                </h1>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Thêm quảng cáo mới
                </button>
            </div>

            {/* Danh sách quảng cáo hiện có */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions.map((promo, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                    >
                        {promo.image && (
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={promo.image}
                                    alt={promo.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">
                                {promo.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {promo.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                        promo.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {promo.isActive
                                        ? 'Đang hiển thị'
                                        : 'Đã tắt'}
                                </span>
                                <button className="text-red-600 hover:text-red-800">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal thêm quảng cáo mới */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">
                                    Thêm quảng cáo lớp mới
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Thông tin quảng cáo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tiêu đề quảng cáo*
                                    </label>
                                    <input
                                        type="text"
                                        value={currentPromo.title}
                                        onChange={(e) =>
                                            setCurrentPromo({
                                                ...currentPromo,
                                                title: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Ví dụ: Khai giảng lớp Toán 6 - Giáo viên kinh nghiệm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mô tả ngắn*
                                    </label>
                                    <textarea
                                        value={currentPromo.description}
                                        onChange={(e) =>
                                            setCurrentPromo({
                                                ...currentPromo,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Mô tả hấp dẫn về lớp học mới..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Hình ảnh quảng cáo*
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        {currentPromo.image ? (
                                            <div className="relative">
                                                <img
                                                    src={currentPromo.image}
                                                    alt="Preview"
                                                    className="h-32 rounded-lg object-cover"
                                                />
                                                <button
                                                    onClick={() =>
                                                        setCurrentPromo({
                                                            ...currentPromo,
                                                            image: null,
                                                        })
                                                    }
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Image className="w-8 h-8 text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-500">
                                                        Tải lên hình ảnh
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* Thông tin lớp học */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-medium text-lg mb-4 flex items-center">
                                        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                                        Thông tin lớp học
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tên lớp*
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    currentPromo.classInfo.name
                                                }
                                                onChange={(e) =>
                                                    setCurrentPromo({
                                                        ...currentPromo,
                                                        classInfo: {
                                                            ...currentPromo.classInfo,
                                                            name: e.target
                                                                .value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Ví dụ: Toán nâng cao 6"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Môn học*
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    currentPromo.classInfo
                                                        .subject
                                                }
                                                onChange={(e) =>
                                                    setCurrentPromo({
                                                        ...currentPromo,
                                                        classInfo: {
                                                            ...currentPromo.classInfo,
                                                            subject:
                                                                e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Ví dụ: Toán học"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Giáo viên*
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    currentPromo.classInfo
                                                        .teacher
                                                }
                                                onChange={(e) =>
                                                    setCurrentPromo({
                                                        ...currentPromo,
                                                        classInfo: {
                                                            ...currentPromo.classInfo,
                                                            teacher:
                                                                e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Ví dụ: Cô Nguyễn Thị A"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Lịch học*
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    currentPromo.classInfo
                                                        .schedule
                                                }
                                                onChange={(e) =>
                                                    setCurrentPromo({
                                                        ...currentPromo,
                                                        classInfo: {
                                                            ...currentPromo.classInfo,
                                                            schedule:
                                                                e.target.value,
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                placeholder="Ví dụ: Thứ 3,5,7 từ 18h-19h30"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Học phí*
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={
                                                        currentPromo.classInfo
                                                            .fee
                                                    }
                                                    onChange={(e) =>
                                                        setCurrentPromo({
                                                            ...currentPromo,
                                                            classInfo: {
                                                                ...currentPromo.classInfo,
                                                                fee: e.target
                                                                    .value,
                                                            },
                                                        })
                                                    }
                                                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg"
                                                    placeholder="Ví dụ: 500,000 VNĐ/tháng"
                                                />
                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sĩ số tối đa*
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={
                                                        currentPromo.classInfo
                                                            .capacity
                                                    }
                                                    onChange={(e) =>
                                                        setCurrentPromo({
                                                            ...currentPromo,
                                                            classInfo: {
                                                                ...currentPromo.classInfo,
                                                                capacity:
                                                                    e.target
                                                                        .value,
                                                            },
                                                        })
                                                    }
                                                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg"
                                                    placeholder="Ví dụ: 20 học sinh"
                                                />
                                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Thời gian hiển thị */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-medium text-lg mb-4 flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                        Thời gian hiển thị
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ngày bắt đầu*
                                            </label>
                                            <input
                                                type="date"
                                                value={currentPromo.startDate}
                                                onChange={(e) =>
                                                    setCurrentPromo({
                                                        ...currentPromo,
                                                        startDate:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ngày kết thúc*
                                            </label>
                                            <input
                                                type="date"
                                                value={currentPromo.endDate}
                                                onChange={(e) =>
                                                    setCurrentPromo({
                                                        ...currentPromo,
                                                        endDate: e.target.value,
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Hủy bỏ
                                    </button>
                                    <button
                                        onClick={savePromotion}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        <Save className="w-5 h-5 mr-2" />
                                        Lưu quảng cáo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewClassPromotionAdmin;
