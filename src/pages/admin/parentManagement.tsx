import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Trash2,
    User,
    Mail,
    Phone,
    Eye,
    AlertCircle,
    Users,
    MapPin,
    UserCheck,
    Loader2,
} from 'lucide-react';
import { useParentStore } from '@/store/useParentStore';
import { Parent, ParentStatus } from '@/api/parent';

interface ParentCardProps {
    parent: Parent;
    onEdit: (parent: Parent) => void;
    onDelete: (parentId: string) => void;
    onViewDetails: (parent: Parent) => void;
}

const ParentCard = ({
    parent,
    onEdit,
    onDelete,
    onViewDetails,
}: ParentCardProps) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const getStatusColor = (status: ParentStatus) => {
        switch (status) {
            case ParentStatus.ACTIVE:
                return 'bg-green-100 text-green-700';
            case ParentStatus.INACTIVE:
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusText = (status: ParentStatus) => {
        switch (status) {
            case ParentStatus.ACTIVE:
                return 'Hoạt động';
            case ParentStatus.INACTIVE:
                return 'Không hoạt động';
            default:
                return 'Không xác định';
        }
    };

    const getRelationshipText = (relationship?: string) => {
        if (!relationship) return 'Không xác định';
        const relationshipLower = relationship.toLowerCase();
        if (
            relationshipLower.includes('father') ||
            relationshipLower.includes('bố') ||
            relationshipLower.includes('cha')
        ) {
            return 'Bố';
        }
        if (
            relationshipLower.includes('mother') ||
            relationshipLower.includes('mẹ') ||
            relationshipLower.includes('má')
        ) {
            return 'Mẹ';
        }
        if (
            relationshipLower.includes('guardian') ||
            relationshipLower.includes('giám hộ')
        ) {
            return 'Người giám hộ';
        }
        return relationship;
    };

    const getRelationshipColor = (relationship?: string) => {
        if (!relationship) return 'bg-gray-100 text-gray-700';
        const relationshipLower = relationship.toLowerCase();
        if (
            relationshipLower.includes('father') ||
            relationshipLower.includes('bố') ||
            relationshipLower.includes('cha')
        ) {
            return 'bg-blue-100 text-blue-700';
        }
        if (
            relationshipLower.includes('mother') ||
            relationshipLower.includes('mẹ') ||
            relationshipLower.includes('má')
        ) {
            return 'bg-pink-100 text-pink-700';
        }
        if (
            relationshipLower.includes('guardian') ||
            relationshipLower.includes('giám hộ')
        ) {
            return 'bg-purple-100 text-purple-700';
        }
        return 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            parent.status === ParentStatus.ACTIVE
                                ? 'bg-green-100'
                                : 'bg-gray-100'
                        }`}
                    >
                        <User
                            className={`w-6 h-6 ${
                                parent.status === ParentStatus.ACTIVE
                                    ? 'text-green-600'
                                    : 'text-gray-400'
                            }`}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            {parent.full_name}
                        </h3>
                        <p className="text-sm text-gray-500">ID: {parent.id}</p>
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
                {parent.relationship && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{getRelationshipText(parent.relationship)}</span>
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

            {(parent.zalo_id || parent.facebook_id) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="space-y-2">
                        {parent.zalo_id && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>Zalo: {parent.zalo_id}</span>
                            </div>
                        )}
                        {parent.facebook_id && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <User className="w-4 h-4" />
                                <span>Facebook: {parent.facebook_id}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function ParentManagement() {
    const { parents, loading, getAllParents, deleteParent } = useParentStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRelationship, setFilterRelationship] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Fetch parents when component mounts
    useEffect(() => {
        getAllParents();
    }, [getAllParents]);

    const handleEdit = (parent: Parent) => {
        console.log('Edit parent:', parent);
        // Note: Edit functionality disabled per requirements, but API/store still supports it
    };

    const handleDelete = (parentId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phụ huynh này?')) {
            deleteParent(parentId);
        }
    };

    const handleViewDetails = (parent: Parent) => {
        console.log('View parent details:', parent);
    };

    const filteredParents = parents.filter((parent) => {
        const matchesSearch =
            parent.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (parent.email &&
                parent.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())) ||
            (parent.phone && parent.phone.includes(searchTerm));

        const matchesRelationship =
            filterRelationship === 'all' ||
            (parent.relationship &&
                parent.relationship.toLowerCase().includes(filterRelationship));

        const matchesStatus =
            filterStatus === 'all' ||
            (filterStatus === 'active' &&
                parent.status === ParentStatus.ACTIVE) ||
            (filterStatus === 'inactive' &&
                parent.status === ParentStatus.INACTIVE);

        return matchesSearch && matchesRelationship && matchesStatus;
    });

    const stats = {
        total: parents.length,
        active: parents.filter((p) => p.status === ParentStatus.ACTIVE).length,
        inactive: parents.filter((p) => p.status === ParentStatus.INACTIVE)
            .length,
        fathers: parents.filter(
            (p) =>
                p.relationship &&
                p.relationship.toLowerCase().includes('father')
        ).length,
        mothers: parents.filter(
            (p) =>
                p.relationship &&
                p.relationship.toLowerCase().includes('mother')
        ).length,
        guardians: parents.filter(
            (p) =>
                p.relationship &&
                p.relationship.toLowerCase().includes('guardian')
        ).length,
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
                                    Không hoạt động
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {stats.inactive}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-600" />
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
                {loading ? (
                    <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                        <div className="flex justify-center items-center">
                            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                            <span className="ml-2 text-gray-600">
                                Đang tải dữ liệu...
                            </span>
                        </div>
                    </div>
                ) : filteredParents.length > 0 ? (
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
                                    onClick={() =>
                                        console.log(
                                            'Create parent feature not implemented'
                                        )
                                    }
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
