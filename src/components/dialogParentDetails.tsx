import { Parent, ParentStatus } from '@/api/parent';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    User,
    Phone,
    Mail,
    MapPin,
    Users,
    Hash,
    MessageCircle,
    UserCheck,
} from 'lucide-react';

interface DialogParentDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    parent: Parent | null;
}

export const DialogParentDetails = ({
    isOpen,
    onClose,
    parent,
}: DialogParentDetailsProps) => {
    if (!parent) return null;

    const getStatusColor = (status: ParentStatus) => {
        switch (status) {
            case ParentStatus.ACTIVE:
                return 'bg-green-100 text-green-700 border-green-200';
            case ParentStatus.INACTIVE:
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusText = (status: ParentStatus) => {
        switch (status) {
            case ParentStatus.ACTIVE:
                return 'Đang hoạt động';
            case ParentStatus.INACTIVE:
                return 'Ngừng hoạt động';
            default:
                return 'Không xác định';
        }
    };

    const getRelationshipText = (relationship: string | null) => {
        if (!relationship) return 'Chưa xác định';
        switch (relationship.toLowerCase()) {
            case 'father':
                return 'Bố';
            case 'mother':
                return 'Mẹ';
            case 'guardian':
                return 'Người giám hộ';
            default:
                return relationship;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="max-w-4xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 p-4 pr-2"
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-orange-600" />
                        </div>
                        Chi tiết phụ huynh: {parent.full_name || 'Không có tên'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pr-2">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Thông tin cơ bản
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Họ và tên
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {parent.full_name ||
                                                'Chưa cập nhật'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Mối quan hệ
                                        </label>
                                        <p className="text-gray-900">
                                            {getRelationshipText(
                                                parent.relationship
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Trạng thái
                                        </label>
                                        <Badge
                                            className={getStatusColor(
                                                parent.status
                                            )}
                                        >
                                            {getStatusText(parent.status)}
                                        </Badge>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Mã ID người dùng
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Hash className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900 font-mono text-sm">
                                                {parent.user_id ||
                                                    'Chưa xác định'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                Thông tin liên hệ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {parent.phone ||
                            parent.email ||
                            parent.zalo_id ||
                            parent.facebook_id ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Số điện thoại
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {parent.phone ||
                                                    'Chưa cập nhật'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Email
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {parent.email ||
                                                    'Chưa cập nhật'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Zalo ID
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <MessageCircle className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {parent.zalo_id ||
                                                    'Chưa cập nhật'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">
                                            Facebook ID
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <UserCheck className="w-4 h-4 text-gray-500" />
                                            <p className="text-gray-900">
                                                {parent.facebook_id ||
                                                    'Chưa cập nhật'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Phone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">
                                        Chưa có thông tin liên hệ
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Address Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Thông tin địa chỉ
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {parent.address ? (
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-gray-900">
                                        {parent.address}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">
                                        Chưa có thông tin địa chỉ
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Hash className="w-5 h-5" />
                                Thông tin hệ thống
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Mã phụ huynh
                                    </label>
                                    <p className="text-gray-900 font-mono text-sm">
                                        {parent.id}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">
                                        Mã người dùng liên kết
                                    </label>
                                    <p className="text-gray-900 font-mono text-sm">
                                        {parent.user_id}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Separator />

                    {/* Actions */}
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
