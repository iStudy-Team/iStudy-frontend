import {
    Bell,
    Mail,
    Send,
    Plus,
    Search,
    Filter,
    Eye,
    EyeOff,
    Trash2,
    Edit,
    Users,
    Calendar,
    Clock,
    AlertCircle,
    Info,
    CheckCircle,
    X,
    Star,
    Archive,
    Paperclip,
    Send as SendIcon,
} from 'lucide-react';
import { useState } from 'react';

const NotificationCenter = () => {
    const [activeTab, setActiveTab] = useState('inbox');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showCompose, setShowCompose] = useState(false);
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const [showNotificationDetail, setShowNotificationDetail] = useState(null);

    // Compose form state
    const [composeForm, setComposeForm] = useState({
        title: '',
        content: '',
        recipients: 'all',
        type: 'info',
        priority: 'normal',
        sendTime: 'now',
        scheduledDate: '',
        attachments: [],
    });

    // Sample notifications data with more fields
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: 'Họp phụ huynh cuối học kỳ I',
            content:
                'Trường tổ chức họp phụ huynh cuối học kỳ I vào ngày 20/10/2023 lúc 18:00 tại hội trường chính. Kính mời quý phụ huynh tham dự đầy đủ.',
            fullContent:
                'Kính gửi quý phụ huynh học sinh,\n\nTrường THCS ABC trân trọng thông báo về cuộc họp phụ huynh cuối học kỳ I:\n\n- Thời gian: 18:00 ngày 20/10/2023\n- Địa điểm: Hội trường chính\n- Nội dung: Tổng kết học tập, rèn luyện học kỳ I; Kế hoạch học kỳ II\n\nKính mời quý phụ huynh sắp xếp thời gian tham dự.\n\nTrân trọng!',
            date: '15/10/2023',
            time: '09:30',
            read: false,
            type: 'meeting',
            priority: 'high',
            sender: 'Ban Giám hiệu',
            recipients: 'Tất cả phụ huynh',
            starred: true,
            tags: ['họp phụ huynh', 'quan trọng'],
        },
        {
            id: '2',
            title: 'Nhắc nhở nộp học phí tháng 10',
            content:
                'Kính nhắc quý phụ huynh nộp học phí tháng 10 trước ngày 25/10/2023.',
            fullContent:
                'Kính gửi quý phụ huynh,\n\nTrường thông báo về việc nộp học phí:\n\n- Hạn cuối: 25/10/2023\n- Số tiền: 500.000 VNĐ\n- Hình thức: Chuyển khoản hoặc nộp trực tiếp\n\nQuý phụ huynh vui lòng nộp đúng hạn để tránh ảnh hưởng đến việc học của con em.\n\nXin cảm ơn!',
            date: '10/10/2023',
            time: '14:20',
            read: true,
            type: 'payment',
            priority: 'normal',
            sender: 'Phòng Tài chính',
            recipients: 'Phụ huynh lớp 6A, 6B',
            starred: false,
            tags: ['học phí', 'thanh toán'],
        },
        {
            id: '3',
            title: 'Thông báo nghỉ học do thời tiết',
            content:
                'Do ảnh hưởng của bão số 8, trường thông báo nghỉ học ngày 18/10/2023.',
            fullContent:
                'Kính gửi quý phụ huynh và các em học sinh,\n\nDo ảnh hưởng của bão số 8, Ban Giám hiệu quyết định:\n\n- Nghỉ học ngày 18/10/2023\n- Học bù vào thứ 7 tuần sau\n- Các em ở xa hãy ở nhà an toàn\n\nMọi thắc mắc liên hệ hotline: 0123456789\n\nChúc mọi người bình an!',
            date: '17/10/2023',
            time: '16:45',
            read: false,
            type: 'urgent',
            priority: 'high',
            sender: 'Ban Giám hiệu',
            recipients: 'Toàn trường',
            starred: false,
            tags: ['khẩn cấp', 'thời tiết', 'nghỉ học'],
        },
        {
            id: '4',
            title: 'Kết quả thi học kỳ I',
            content:
                'Công bố kết quả thi cuối học kỳ I. Phụ huynh có thể xem điểm trên hệ thống.',
            fullContent:
                'Kính gửi quý phụ huynh,\n\nKết quả thi cuối học kỳ I đã được công bố:\n\n- Xem điểm: Đăng nhập hệ thống từ 19/10/2023\n- Nhận bảng điểm: 25/10/2023\n- Họp phụ huynh: 30/10/2023\n\nMọi thắc mắc vui lòng liên hệ giáo viên chủ nhiệm.\n\nTrân trọng!',
            date: '18/10/2023',
            time: '08:00',
            read: true,
            type: 'academic',
            priority: 'normal',
            sender: 'Phòng Đào tạo',
            recipients: 'Tất cả phụ huynh',
            starred: true,
            tags: ['học tập', 'kết quả thi'],
        },
    ]);

    const [sentNotifications, setSentNotifications] = useState([
        {
            id: 's1',
            title: 'Thông báo lịch thi cuối kỳ',
            content: 'Lịch thi cuối học kỳ I năm học 2023-2024',
            date: '05/10/2023',
            time: '10:00',
            recipients: 'Lớp 6A',
            status: 'sent',
            readCount: 18,
            totalRecipients: 25,
        },
    ]);

    // Filter notifications
    const filteredNotifications = notifications.filter((notif) => {
        const matchesSearch =
            notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notif.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || notif.type === filterType;
        return matchesSearch && matchesFilter;
    });

    // Notification type icons and colors
    const getTypeIcon = (type) => {
        switch (type) {
            case 'meeting':
                return <Users className="w-4 h-4" />;
            case 'payment':
                return <AlertCircle className="w-4 h-4" />;
            case 'urgent':
                return <Bell className="w-4 h-4" />;
            case 'academic':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <Info className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'meeting':
                return 'text-blue-600 bg-blue-50';
            case 'payment':
                return 'text-orange-600 bg-orange-50';
            case 'urgent':
                return 'text-red-600 bg-red-50';
            case 'academic':
                return 'text-green-600 bg-green-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'border-l-red-500 bg-red-50';
            case 'normal':
                return 'border-l-blue-500 bg-blue-50';
            case 'low':
                return 'border-l-gray-500 bg-gray-50';
            default:
                return 'border-l-gray-500 bg-gray-50';
        }
    };

    // Mark as read/unread
    const toggleRead = (id) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: !notif.read } : notif
            )
        );
    };

    // Toggle star
    const toggleStar = (id) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, starred: !notif.starred } : notif
            )
        );
    };

    // Delete notification
    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        setSelectedNotifications((prev) =>
            prev.filter((selectedId) => selectedId !== id)
        );
    };

    // Send notification
    const sendNotification = () => {
        if (composeForm.title && composeForm.content) {
            const newNotification = {
                id: 's' + (sentNotifications.length + 1),
                ...composeForm,
                date: new Date().toLocaleDateString('vi-VN'),
                time: new Date().toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                status: 'sent',
                readCount: 0,
                totalRecipients: composeForm.recipients === 'all' ? 150 : 25,
            };

            setSentNotifications((prev) => [newNotification, ...prev]);
            setComposeForm({
                title: '',
                content: '',
                recipients: 'all',
                type: 'info',
                priority: 'normal',
                sendTime: 'now',
                scheduledDate: '',
                attachments: [],
            });
            setShowCompose(false);
            alert('Thông báo đã được gửi thành công!');
        }
    };

    // Compose Modal
    if (showCompose) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold flex items-center">
                                    <Edit className="w-6 h-6 mr-3" />
                                    Soạn thông báo mới
                                </h1>
                                <button
                                    onClick={() => setShowCompose(false)}
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tiêu đề *
                                        </label>
                                        <input
                                            type="text"
                                            value={composeForm.title}
                                            onChange={(e) =>
                                                setComposeForm((prev) => ({
                                                    ...prev,
                                                    title: e.target.value,
                                                }))
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Nhập tiêu đề thông báo..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nội dung *
                                        </label>
                                        <textarea
                                            value={composeForm.content}
                                            onChange={(e) =>
                                                setComposeForm((prev) => ({
                                                    ...prev,
                                                    content: e.target.value,
                                                }))
                                            }
                                            rows={10}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Nhập nội dung thông báo..."
                                        />
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                            <Paperclip className="w-4 h-4 mr-2" />
                                            Đính kèm
                                        </button>
                                        <span className="text-sm text-gray-500">
                                            Không có file đính kèm
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Người nhận
                                        </label>
                                        <select
                                            value={composeForm.recipients}
                                            onChange={(e) =>
                                                setComposeForm((prev) => ({
                                                    ...prev,
                                                    recipients: e.target.value,
                                                }))
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">
                                                Tất cả phụ huynh
                                            </option>
                                            <option value="class6a">
                                                Lớp 6A
                                            </option>
                                            <option value="class6b">
                                                Lớp 6B
                                            </option>
                                            <option value="class7a">
                                                Lớp 7A
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Loại thông báo
                                        </label>
                                        <select
                                            value={composeForm.type}
                                            onChange={(e) =>
                                                setComposeForm((prev) => ({
                                                    ...prev,
                                                    type: e.target.value,
                                                }))
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="info">
                                                Thông tin chung
                                            </option>
                                            <option value="meeting">
                                                Họp phụ huynh
                                            </option>
                                            <option value="payment">
                                                Thanh toán
                                            </option>
                                            <option value="academic">
                                                Học tập
                                            </option>
                                            <option value="urgent">
                                                Khẩn cấp
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mức độ ưu tiên
                                        </label>
                                        <select
                                            value={composeForm.priority}
                                            onChange={(e) =>
                                                setComposeForm((prev) => ({
                                                    ...prev,
                                                    priority: e.target.value,
                                                }))
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="low">Thấp</option>
                                            <option value="normal">
                                                Bình thường
                                            </option>
                                            <option value="high">Cao</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Thời gian gửi
                                        </label>
                                        <select
                                            value={composeForm.sendTime}
                                            onChange={(e) =>
                                                setComposeForm((prev) => ({
                                                    ...prev,
                                                    sendTime: e.target.value,
                                                }))
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="now">
                                                Gửi ngay
                                            </option>
                                            <option value="schedule">
                                                Lên lịch gửi
                                            </option>
                                        </select>
                                    </div>

                                    {composeForm.sendTime === 'schedule' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ngày giờ gửi
                                            </label>
                                            <input
                                                type="datetime-local"
                                                value={
                                                    composeForm.scheduledDate
                                                }
                                                onChange={(e) =>
                                                    setComposeForm((prev) => ({
                                                        ...prev,
                                                        scheduledDate:
                                                            e.target.value,
                                                    }))
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => setShowCompose(false)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={sendNotification}
                                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <SendIcon className="w-4 h-4 mr-2" />
                                    Gửi thông báo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Notification Detail Modal
    if (showNotificationDetail) {
        const notification = notifications.find(
            (n) => n.id === showNotificationDetail
        );

        return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold flex items-center">
                                    <Mail className="w-6 h-6 mr-3" />
                                    Chi tiết thông báo
                                </h1>
                                <button
                                    onClick={() =>
                                        setShowNotificationDetail(null)
                                    }
                                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {notification.title}
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}
                                        >
                                            {getTypeIcon(notification.type)}
                                            <span className="ml-1">
                                                {notification.type === 'meeting'
                                                    ? 'Họp phụ huynh'
                                                    : notification.type ===
                                                        'payment'
                                                      ? 'Thanh toán'
                                                      : notification.type ===
                                                          'urgent'
                                                        ? 'Khẩn cấp'
                                                        : notification.type ===
                                                            'academic'
                                                          ? 'Học tập'
                                                          : 'Thông tin'}
                                            </span>
                                        </span>
                                        {notification.priority === 'high' && (
                                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                                Ưu tiên cao
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-600 space-x-4 mb-6">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {notification.date} lúc{' '}
                                        {notification.time}
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {notification.sender}
                                    </div>
                                </div>

                                <div className="prose max-w-none">
                                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                                        {notification.fullContent}
                                    </div>
                                </div>

                                {notification.tags && (
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-600">
                                                Tags:
                                            </span>
                                            {notification.tags.map(
                                                (tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() =>
                                            toggleStar(notification.id)
                                        }
                                        className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                                            notification.starred
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        <Star
                                            className={`w-4 h-4 mr-1 ${notification.starred ? 'fill-current' : ''}`}
                                        />
                                        {notification.starred
                                            ? 'Bỏ đánh dấu'
                                            : 'Đánh dấu'}
                                    </button>
                                    <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                        <Archive className="w-4 h-4 mr-1" />
                                        Lưu trữ
                                    </button>
                                </div>
                                <button
                                    onClick={() =>
                                        setShowNotificationDetail(null)
                                    }
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4">
            <div className="max-w-full mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold flex items-center">
                                    <Bell className="w-8 h-8 mr-3" />
                                    Hệ thống quản lý thông báo
                                </h1>
                                <p className="mt-2 opacity-90">
                                    Gửi và quản lý thông báo đến phụ huynh học
                                    sinh
                                </p>
                            </div>
                            <button
                                onClick={() => setShowCompose(true)}
                                className="flex items-center px-6 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors font-medium"
                            >
                                <Plus className="w-5 h-5 mr-2 text-black" />
                                <p className="text-black"> Soạn thông báo</p>
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 mb-8">
                            <button
                                className={`px-6 py-3 font-medium transition-colors ${
                                    activeTab === 'inbox'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                                onClick={() => setActiveTab('inbox')}
                            >
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Hộp thư đến
                                    <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                                        {
                                            notifications.filter((n) => !n.read)
                                                .length
                                        }
                                    </span>
                                </div>
                            </button>
                            <button
                                className={`px-6 py-3 font-medium transition-colors ${
                                    activeTab === 'sent'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                                onClick={() => setActiveTab('sent')}
                            >
                                <div className="flex items-center">
                                    <Send className="w-5 h-5 mr-2" />
                                    Đã gửi
                                    <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                                        {sentNotifications.length}
                                    </span>
                                </div>
                            </button>
                            <button
                                className={`px-6 py-3 font-medium transition-colors ${
                                    activeTab === 'starred'
                                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                                onClick={() => setActiveTab('starred')}
                            >
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 mr-2" />
                                    Đã đánh dấu
                                    <span className="ml-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                                        {
                                            notifications.filter(
                                                (n) => n.starred
                                            ).length
                                        }
                                    </span>
                                </div>
                            </button>
                        </div>

                        {activeTab === 'inbox' && (
                            <div>
                                {/* Search and Filter */}
                                <div className="flex flex-col md:flex-row gap-4 mb-6">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm thông báo..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Filter className="w 5 h-5 text-gray-500" />
                                        <select
                                            value={filterType}
                                            onChange={(e) =>
                                                setFilterType(e.target.value)
                                            }
                                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="all">Tất cả</option>
                                            <option value="meeting">
                                                Họp phụ huynh
                                            </option>
                                            <option value="payment">
                                                Thanh toán
                                            </option>
                                            <option value="academic">
                                                Học tập
                                            </option>
                                            <option value="urgent">
                                                Khẩn cấp
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                {/* Notification List */}
                                <div className="space-y-4">
                                    {filteredNotifications.length > 0 ? (
                                        filteredNotifications.map(
                                            (notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`border rounded-xl overflow-hidden transition-all ${
                                                        notification.read
                                                            ? 'bg-white border-gray-200'
                                                            : 'bg-blue-50 border-blue-200'
                                                    } ${getPriorityColor(
                                                        notification.priority
                                                    )} border-l-4`}
                                                >
                                                    <div className="p-6">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center space-x-3 mb-2">
                                                                    <div
                                                                        className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}
                                                                    >
                                                                        {getTypeIcon(
                                                                            notification.type
                                                                        )}
                                                                    </div>
                                                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                                        {
                                                                            notification.title
                                                                        }
                                                                    </h3>
                                                                </div>
                                                                <p className="text-gray-600 mb-3 line-clamp-2">
                                                                    {
                                                                        notification.content
                                                                    }
                                                                </p>
                                                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                                                    <span className="flex items-center">
                                                                        <Calendar className="w-4 h-4 mr-1" />
                                                                        {
                                                                            notification.date
                                                                        }
                                                                    </span>
                                                                    <span className="flex items-center">
                                                                        <Clock className="w-4 h-4 mr-1" />
                                                                        {
                                                                            notification.time
                                                                        }
                                                                    </span>
                                                                    <span className="flex items-center">
                                                                        <Users className="w-4 h-4 mr-1" />
                                                                        {
                                                                            notification.sender
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2 ml-4">
                                                                <button
                                                                    onClick={() =>
                                                                        toggleStar(
                                                                            notification.id
                                                                        )
                                                                    }
                                                                    className={`p-2 rounded-lg ${
                                                                        notification.starred
                                                                            ? 'text-yellow-500 hover:bg-yellow-50'
                                                                            : 'text-gray-400 hover:bg-gray-100'
                                                                    }`}
                                                                >
                                                                    <Star
                                                                        className={`w-5 h-5 ${
                                                                            notification.starred
                                                                                ? 'fill-current'
                                                                                : ''
                                                                        }`}
                                                                    />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        deleteNotification(
                                                                            notification.id
                                                                        )
                                                                    }
                                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                                            <button
                                                                onClick={() =>
                                                                    toggleRead(
                                                                        notification.id
                                                                    )
                                                                }
                                                                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                                                            >
                                                                {notification.read ? (
                                                                    <>
                                                                        <EyeOff className="w-4 h-4 mr-1" />
                                                                        Đánh dấu
                                                                        là chưa
                                                                        đọc
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Eye className="w-4 h-4 mr-1" />
                                                                        Đánh dấu
                                                                        là đã
                                                                        đọc
                                                                    </>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    setShowNotificationDetail(
                                                                        notification.id
                                                                    )
                                                                }
                                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                                            >
                                                                Xem chi tiết
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <Bell className="w-10 h-10 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                Không tìm thấy thông báo
                                            </h3>
                                            <p className="text-gray-500">
                                                Không có thông báo nào phù hợp
                                                với tiêu chí tìm kiếm của bạn.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'sent' && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Thông báo đã gửi (
                                        {sentNotifications.length})
                                    </h3>
                                    <p className="text-gray-600">
                                        Danh sách các thông báo bạn đã gửi đến
                                        phụ huynh học sinh
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {sentNotifications.length > 0 ? (
                                        sentNotifications.map(
                                            (notification) => (
                                                <div
                                                    key={notification.id}
                                                    className="bg-white border border-gray-200 rounded-xl p-6"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                                {
                                                                    notification.title
                                                                }
                                                            </h3>
                                                            <p className="text-gray-600 mb-3 line-clamp-2">
                                                                {
                                                                    notification.content
                                                                }
                                                            </p>
                                                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                                                                <span className="flex items-center">
                                                                    <Calendar className="w-4 h-4 mr-1" />
                                                                    {
                                                                        notification.date
                                                                    }
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <Clock className="w-4 h-4 mr-1" />
                                                                    {
                                                                        notification.time
                                                                    }
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <Users className="w-4 h-4 mr-1" />
                                                                    {
                                                                        notification.recipients
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2 ml-4">
                                                            <span
                                                                className={`px-2 py-1 text-xs rounded-full ${
                                                                    notification.status ===
                                                                    'sent'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-yellow-100 text-yellow-800'
                                                                }`}
                                                            >
                                                                {notification.status ===
                                                                'sent'
                                                                    ? 'Đã gửi'
                                                                    : 'Đang chờ'}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    deleteNotification(
                                                                        notification.id
                                                                    )
                                                                }
                                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                                        <div className="text-sm text-gray-600">
                                                            <span className="font-medium">
                                                                {
                                                                    notification.readCount
                                                                }
                                                            </span>{' '}
                                                            /{' '}
                                                            {
                                                                notification.totalRecipients
                                                            }{' '}
                                                            phụ huynh đã đọc
                                                        </div>
                                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                                            Xem chi tiết
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <Send className="w-10 h-10 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                Bạn chưa gửi thông báo nào
                                            </h3>
                                            <p className="text-gray-500">
                                                Nhấn vào nút "Soạn thông báo" để
                                                gửi thông báo đầu tiên.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'starred' && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Thông báo đã đánh dấu (
                                        {
                                            notifications.filter(
                                                (n) => n.starred
                                            ).length
                                        }
                                        )
                                    </h3>
                                    <p className="text-gray-600">
                                        Danh sách các thông báo quan trọng bạn
                                        đã đánh dấu
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    {notifications.filter((n) => n.starred)
                                        .length > 0 ? (
                                        notifications
                                            .filter((n) => n.starred)
                                            .map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                                                >
                                                    <div className="p-6">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center space-x-3 mb-2">
                                                                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                                        {
                                                                            notification.title
                                                                        }
                                                                    </h3>
                                                                </div>
                                                                <p className="text-gray-600 mb-3 line-clamp-2">
                                                                    {
                                                                        notification.content
                                                                    }
                                                                </p>
                                                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                                                    <span className="flex items-center">
                                                                        <Calendar className="w-4 h-4 mr-1" />
                                                                        {
                                                                            notification.date
                                                                        }
                                                                    </span>
                                                                    <span className="flex items-center">
                                                                        <Clock className="w-4 h-4 mr-1" />
                                                                        {
                                                                            notification.time
                                                                        }
                                                                    </span>
                                                                    <span className="flex items-center">
                                                                        <Users className="w-4 h-4 mr-1" />
                                                                        {
                                                                            notification.sender
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2 ml-4">
                                                                <button
                                                                    onClick={() =>
                                                                        toggleStar(
                                                                            notification.id
                                                                        )
                                                                    }
                                                                    className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg"
                                                                >
                                                                    <Star className="w-5 h-5 fill-current" />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        deleteNotification(
                                                                            notification.id
                                                                        )
                                                                    }
                                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end items-center mt-4 pt-4 border-t border-gray-200">
                                                            <button
                                                                onClick={() =>
                                                                    setShowNotificationDetail(
                                                                        notification.id
                                                                    )
                                                                }
                                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                                            >
                                                                Xem chi tiết
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                <Star className="w-10 h-10 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                                Bạn chưa đánh dấu thông báo nào
                                            </h3>
                                            <p className="text-gray-500">
                                                Nhấn vào biểu tượng ngôi sao
                                                trên thông báo để đánh dấu quan
                                                trọng.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationCenter;
