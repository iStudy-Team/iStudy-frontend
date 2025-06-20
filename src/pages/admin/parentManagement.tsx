import React, { useState } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Trash2,
    User,
    Mail,
    Phone,
    BookOpen,
    Calendar,
    Eye,
    X,
    AlertCircle,
    Users,
    Award,
    GraduationCap,
    MapPin,
    Heart,
    Briefcase,
    Home,
    UserCheck,
} from 'lucide-react';

interface Parent {
    id: string;
    parentId: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    occupation: string;
    workAddress: string;
    workPhone: string;
    relationship: 'father' | 'mother' | 'guardian';
    emergencyContact: string;
    emergencyPhone: string;
    status: 'active' | 'inactive';
    children: {
        studentId: string;
        name: string;
        class: string;
    }[];
    notes: string;
    photo?: string;
}

const ParentCard = ({ parent, onEdit, onDelete, onViewDetails }: any) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-700';
            case 'inactive':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'Hoạt động';
            case 'inactive':
                return 'Không hoạt động';
            default:
                return 'Không xác định';
        }
    };

    const getRelationshipText = (relationship: string) => {
        switch (relationship) {
            case 'father':
                return 'Bố';
            case 'mother':
                return 'Mẹ';
            case 'guardian':
                return 'Người giám hộ';
            default:
                return 'Không xác định';
        }
    };

    const getRelationshipColor = (relationship: string) => {
        switch (relationship) {
            case 'father':
                return 'bg-blue-100 text-blue-700';
            case 'mother':
                return 'bg-pink-100 text-pink-700';
            case 'guardian':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const calculateAge = (dateOfBirth: string) => {
        if (!dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            parent.status === 'active'
                                ? 'bg-green-100'
                                : 'bg-gray-100'
                        }`}
                    >
                        <User
                            className={`w-6 h-6 ${
                                parent.status === 'active'
                                    ? 'text-green-600'
                                    : 'text-gray-400'
                            }`}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {parent.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Mã PH: {parent.parentId}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRelationshipColor(parent.relationship)}`}
                    >
                        {getRelationshipText(parent.relationship)}
                    </span>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(parent.status)}`}
                    >
                        {getStatusText(parent.status)}
                    </span>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                                <button
                                    onClick={() => {
                                        onViewDetails(parent);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>Xem chi tiết</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onEdit(parent);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Chỉnh sửa</span>
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(parent.id);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Xóa</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {parent.occupation && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{parent.occupation}</span>
                    </div>
                )}
                {parent.dateOfBirth && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{calculateAge(parent.dateOfBirth)} tuổi</span>
                    </div>
                )}
                {parent.email && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{parent.email}</span>
                    </div>
                )}
                {parent.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{parent.phone}</span>
                    </div>
                )}
                {parent.address && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{parent.address}</span>
                    </div>
                )}
            </div>

            {parent.children && parent.children.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 mb-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">
                            Con em ({parent.children.length})
                        </span>
                    </div>
                    <div className="space-y-1">
                        {parent.children.slice(0, 2).map((child, index) => (
                            <div
                                key={index}
                                className="text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded"
                            >
                                {child.name} - Lớp {child.class}
                            </div>
                        ))}
                        {parent.children.length > 2 && (
                            <div className="text-xs text-gray-500">
                                và {parent.children.length - 2} con khác...
                            </div>
                        )}
                    </div>
                </div>
            )}

            {parent.emergencyContact && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-right">
                        <p className="text-xs text-gray-500">
                            Liên hệ khẩn cấp:
                        </p>
                        <p className="text-xs text-gray-600">
                            {parent.emergencyContact}
                        </p>
                        <p className="text-xs text-gray-600">
                            {parent.emergencyPhone}
                        </p>
                    </div>
                </div>
            )}

            {parent.notes && (
                <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs text-yellow-700 font-medium">
                            Có ghi chú
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function ParentManagement() {
    const [parents, setParents] = useState<Parent[]>([
        {
            id: '1',
            parentId: 'PH2024001',
            name: 'Nguyễn Văn Bình',
            email: 'binh.nguyen@gmail.com',
            phone: '0987654321',
            dateOfBirth: '1980-03-15',
            address: '123 Đường Láng, Đống Đa, Hà Nội',
            occupation: 'Kỹ sư IT',
            workAddress: 'Tòa nhà FPT, Cầu Giấy, Hà Nội',
            workPhone: '024-38765432',
            relationship: 'father',
            emergencyContact: 'Nguyễn Thị Lan',
            emergencyPhone: '0912345678',
            status: 'active',
            children: [
                { studentId: 'HS2024001', name: 'Nguyễn Văn An', class: '3A' },
            ],
            notes: 'Phụ huynh tích cực tham gia các hoạt động của trường',
        },
        {
            id: '2',
            parentId: 'PH2024002',
            name: 'Trần Thị Mai',
            email: 'mai.tran@gmail.com',
            phone: '0909123456',
            dateOfBirth: '1985-07-20',
            address: '456 Giải Phóng, Hai Bà Trưng, Hà Nội',
            occupation: 'Giáo viên',
            workAddress: 'Trường THCS Chu Văn An',
            workPhone: '024-38123456',
            relationship: 'mother',
            emergencyContact: 'Trần Văn Cường',
            emergencyPhone: '0923456789',
            status: 'active',
            children: [
                { studentId: 'HS2024002', name: 'Trần Thị Bích', class: '4B' },
            ],
            notes: '',
        },
        {
            id: '3',
            parentId: 'PH2024003',
            name: 'Lê Thị Hoa',
            email: 'hoa.le@gmail.com',
            phone: '0888777666',
            dateOfBirth: '1978-11-10',
            address: '789 Cầu Giấy, Cầu Giấy, Hà Nội',
            occupation: 'Bác sĩ',
            workAddress: 'Bệnh viện Đại học Y Hà Nội',
            workPhone: '024-38521479',
            relationship: 'mother',
            emergencyContact: 'Lê Văn Minh',
            emergencyPhone: '0934567890',
            status: 'active',
            children: [
                { studentId: 'HS2024003', name: 'Lê Minh Đức', class: '5A' },
            ],
            notes: 'Bác sĩ, có thể hỗ trợ tư vấn y tế cho trường',
        },
        {
            id: '4',
            parentId: 'PH2024004',
            name: 'Phạm Văn Minh',
            email: 'minh.pham@gmail.com',
            phone: '0777888999',
            dateOfBirth: '1975-01-25',
            address: '321 Hoàng Hoa Thám, Ba Đình, Hà Nội',
            occupation: 'Doanh nhân',
            workAddress: 'Tòa nhà Keangnam, Mỹ Đình, Hà Nội',
            workPhone: '024-37654321',
            relationship: 'father',
            emergencyContact: 'Phạm Thị Lan',
            emergencyPhone: '0945678901',
            status: 'active',
            children: [
                { studentId: 'HS2023015', name: 'Phạm Thị Lan', class: '6A' },
            ],
            notes: 'Thường xuyên ủng hộ các hoạt động từ thiện của trường',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRelationship, setFilterRelationship] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleEdit = (parent: Parent) => {
        console.log('Edit parent:', parent);
    };

    const handleDelete = (parentId: string) => {
        setParents(parents.filter((p) => p.id !== parentId));
    };

    const handleViewDetails = (parent: Parent) => {
        console.log('View parent details:', parent);
    };

    const filteredParents = parents.filter((parent) => {
        const matchesSearch =
            parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parent.parentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parent.phone.includes(searchTerm);
        const matchesRelationship =
            filterRelationship === 'all' ||
            parent.relationship === filterRelationship;
        const matchesStatus =
            filterStatus === 'all' || parent.status === filterStatus;

        return matchesSearch && matchesRelationship && matchesStatus;
    });

    const stats = {
        total: parents.length,
        active: parents.filter((p) => p.status === 'active').length,
        inactive: parents.filter((p) => p.status === 'inactive').length,
        fathers: parents.filter((p) => p.relationship === 'father').length,
        mothers: parents.filter((p) => p.relationship === 'mother').length,
        guardians: parents.filter((p) => p.relationship === 'guardian').length,
        totalChildren: parents.reduce((sum, p) => sum + p.children.length, 0),
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Quản Lý Phụ Huynh
                    </h1>
                    <p className="text-purple-100">
                        Quản lý thông tin phụ huynh và liên hệ với gia đình
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="max-w-7xl mx-auto px-8 -mt-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Tổng PH
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.total}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Hoạt động
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats.active}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <UserCheck className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Bố
                                </p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats.fathers}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Mẹ
                                </p>
                                <p className="text-2xl font-bold text-pink-600">
                                    {stats.mothers}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-pink-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Giám hộ
                                </p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats.guardians}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Tổng học sinh
                                </p>
                                <p className="text-2xl font-bold text-indigo-600">
                                    {stats.totalChildren}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-indigo-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 pb-12">
                {/* Filters and Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm phụ huynh..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex space-x-3">
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={filterRelationship}
                                onChange={(e) =>
                                    setFilterRelationship(e.target.value)
                                }
                            >
                                <option value="all">Tất cả mối quan hệ</option>
                                <option value="father">Bố</option>
                                <option value="mother">Mẹ</option>
                                <option value="guardian">Người giám hộ</option>
                            </select>

                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(e.target.value)
                                }
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Hoạt động</option>
                                <option value="inactive">
                                    Không hoạt động
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Parents Grid */}
                {filteredParents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredParents.map((parent) => (
                            <ParentCard
                                key={parent.id}
                                parent={parent}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                        <div className="mx-auto max-w-md">
                            <User className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                                Không tìm thấy phụ huynh
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Thử thay đổi bộ lọc hoặc thêm phụ huynh mới
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                                    Thêm phụ huynh mới
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
