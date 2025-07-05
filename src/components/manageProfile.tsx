import { useState, useEffect } from 'react';
import { Camera, Save, Edit, Users, BookOpen } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserProfileStore } from '@/store/useUserProfileStore';
import { USER_ROLE } from '@/types/user';
import { GenderEnum, Teacher, Student, Parent } from '@/api/userProfile';
import { UploadImageDialog } from '@/components/UploadImageDialog';
import { toast } from 'sonner';

interface FormData {
    full_name?: string;
    gender?: GenderEnum;
    date_of_birth?: string;
    address?: string;
    phone?: string;
    email?: string;
    // Teacher specific
    qualification?: string;
    hire_date?: string;
    zalo_id?: string;
    facebook_id?: string;
    // Student specific
    enrollment_date?: string;
    discount_percentage?: number;
    discount_reason?: string;
    // Parent specific
    relationship?: string;
}

export default function ManageProfile() {
    const { user, getInfoMe, updateUser } = useAuthStore();
    const {
        currentTeacher,
        currentStudent,
        currentParent,
        relations,
        students,
        parents,
        loading,
        getTeacherById,
        getStudentById,
        getParentById,
        updateTeacher,
        updateStudent,
        updateParent,
        getAllStudents,
        getAllParents,
        createRelation,
        deleteRelation,
        getRelationsByParentId,
    } = useUserProfileStore();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<FormData>({});
    const [selectedStudentId, setSelectedStudentId] = useState<string>('');
    const [selectedParentId, setSelectedParentId] = useState<string>('');
    const [currentAvatar, setCurrentAvatar] = useState<string>('');

    useEffect(() => {
        getInfoMe();
    }, [getInfoMe]);

    // Current profile data based on user role
    const getCurrentProfile = () => {
        switch (user?.role) {
            case USER_ROLE.TEACHER:
                return currentTeacher;
            case USER_ROLE.STUDENT:
                return currentStudent;
            case USER_ROLE.PARENT:
                return currentParent;
            default:
                return null;
        }
    };

    const currentProfile = getCurrentProfile();

    // Load profile data on component mount
    useEffect(() => {
        if (!user?.id) return;

        const loadProfileData = async () => {
            switch (user.role) {
                case USER_ROLE.TEACHER:
                    await getTeacherById(user.id.toString());
                    break;
                case USER_ROLE.STUDENT:
                    await getStudentById(user.id.toString());
                    break;
                case USER_ROLE.PARENT:
                    await getParentById(user.id.toString());
                    // Load all students so parent can select children
                    await getAllStudents();
                    // Load existing relationships for this parent
                    await getRelationsByParentId(user.id.toString());
                    break;
                case USER_ROLE.ADMIN:
                    // Admin can manage relations, load all students and parents
                    await getAllStudents();
                    await getAllParents();
                    break;
            }
        };

        loadProfileData();
    }, [
        user,
        getTeacherById,
        getStudentById,
        getParentById,
        getAllStudents,
        getAllParents,
        getRelationsByParentId,
    ]);

    // Initialize form data when profile loads
    useEffect(() => {
        if (currentProfile) {
            const baseData = {
                full_name: currentProfile.full_name || '',
                address: currentProfile.address || '',
                phone: currentProfile.user?.phone || user?.phone || '',
                email: currentProfile.user?.email || user?.email || '',
            };

            // Set current avatar
            setCurrentAvatar(currentProfile.user?.avatar || user?.avatar || '');

            if (user?.role === USER_ROLE.TEACHER) {
                const teacherProfile = currentProfile as Teacher;
                setFormData({
                    ...baseData,
                    gender: teacherProfile.gender,
                    date_of_birth: teacherProfile.date_of_birth
                        ? typeof teacherProfile.date_of_birth === 'string'
                            ? teacherProfile.date_of_birth.split('T')[0]
                            : new Date(teacherProfile.date_of_birth)
                                  .toISOString()
                                  .split('T')[0]
                        : '',
                    qualification: teacherProfile.qualification || '',
                    hire_date: teacherProfile.hire_date
                        ? typeof teacherProfile.hire_date === 'string'
                            ? teacherProfile.hire_date.split('T')[0]
                            : new Date(teacherProfile.hire_date)
                                  .toISOString()
                                  .split('T')[0]
                        : '',
                    zalo_id: teacherProfile.zalo_id || '',
                    facebook_id: teacherProfile.facebook_id || '',
                });
            } else if (user?.role === USER_ROLE.STUDENT) {
                const studentProfile = currentProfile as Student;
                setFormData({
                    ...baseData,
                    gender: studentProfile.gender,
                    date_of_birth: studentProfile.date_of_birth
                        ? typeof studentProfile.date_of_birth === 'string'
                            ? studentProfile.date_of_birth.split('T')[0]
                            : new Date(studentProfile.date_of_birth)
                                  .toISOString()
                                  .split('T')[0]
                        : '',
                    enrollment_date: studentProfile.enrollment_date
                        ? typeof studentProfile.enrollment_date === 'string'
                            ? studentProfile.enrollment_date.split('T')[0]
                            : new Date(studentProfile.enrollment_date)
                                  .toISOString()
                                  .split('T')[0]
                        : '',
                    discount_percentage:
                        studentProfile.discount_percentage || 0,
                    discount_reason: studentProfile.discount_reason || '',
                });
            } else if (user?.role === USER_ROLE.PARENT) {
                const parentProfile = currentProfile as Parent;
                setFormData({
                    ...baseData,
                    relationship: parentProfile.relationship || '',
                    zalo_id: parentProfile.zalo_id || '',
                    facebook_id: parentProfile.facebook_id || '',
                });
            }
        }
    }, [currentProfile, user]);

    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAvatarUpload = async (url: string) => {
        try {
            await updateUser({ avatar: url });
            setCurrentAvatar(url);
            toast.success('Cập nhật ảnh đại diện thành công');

            // Refresh profile data to get updated user info
            await getInfoMe();
        } catch (error) {
            console.error('Failed to update avatar:', error);
            toast.error('Không thể cập nhật ảnh đại diện');
        }
    };

    const handleSave = async () => {
        if (!user?.id || !currentProfile || !formData.full_name) return;

        try {
            let success = false;

            if (user.role === USER_ROLE.TEACHER) {
                const updateDto = {
                    full_name: formData.full_name,
                    gender: formData.gender,
                    date_of_birth: formData.date_of_birth || undefined,
                    address: formData.address,
                    qualification: formData.qualification,
                    hire_date: formData.hire_date || undefined,
                    zalo_id: formData.zalo_id,
                    facebook_id: formData.facebook_id,
                    status: 1, // Keep active
                };
                success = !!(await updateTeacher(currentProfile.id, updateDto));
            } else if (user.role === USER_ROLE.STUDENT) {
                const updateDto = {
                    full_name: formData.full_name,
                    gender: formData.gender,
                    date_of_birth: formData.date_of_birth || undefined,
                    address: formData.address,
                    enrollment_date: formData.enrollment_date || undefined,
                    discount_percentage: formData.discount_percentage,
                    discount_reason: formData.discount_reason,
                    status: 1, // Keep active
                };
                success = !!(await updateStudent(currentProfile.id, updateDto));
            } else if (user.role === USER_ROLE.PARENT) {
                const updateDto = {
                    full_name: formData.full_name,
                    address: formData.address,
                    relationship: formData.relationship || '',
                    zalo_id: formData.zalo_id,
                    facebook_id: formData.facebook_id,
                    status: 1, // Keep active
                };
                success = !!(await updateParent(currentProfile.id, updateDto));
            }

            if (success) {
                toast.success('Cập nhật hồ sơ thành công');
                setIsEditing(false);
            }
        } catch {
            toast.error('Không thể cập nhật hồ sơ');
        }
    };

    const handleCreateRelation = async () => {
        if (!selectedStudentId || !selectedParentId) {
            toast.error('Vui lòng chọn cả học sinh và phụ huynh');
            return;
        }

        try {
            const result = await createRelation({
                student_id: selectedStudentId,
                parent_id: selectedParentId,
                is_primary: false,
            });

            if (result) {
                toast.success('Tạo mối quan hệ thành công');
                setSelectedStudentId('');
                setSelectedParentId('');
                // Refresh relations list for admin
                if (user?.role === USER_ROLE.ADMIN) {
                    // You might want to add getAllRelations to the store and call it here
                    // For now, we'll leave the existing relations in place
                }
            }
        } catch {
            toast.error('Không thể tạo mối quan hệ');
        }
    };

    const handleAddChild = async () => {
        if (!selectedStudentId || !user?.id) {
            toast.error('Vui lòng chọn một học sinh');
            return;
        }

        try {
            const result = await createRelation({
                student_id: selectedStudentId,
                parent_id: user.id.toString(),
                is_primary: false,
            });

            if (result) {
                toast.success('Thêm con thành công');
                setSelectedStudentId('');
                // Refresh relations for this parent
                await getRelationsByParentId(user.id.toString());
            }
        } catch {
            toast.error('Không thể thêm con');
        }
    };

    const handleRemoveChild = async (relationId: string) => {
        try {
            const success = await deleteRelation(relationId);
            if (success && user?.id) {
                toast.success('Xóa con thành công');
                // Refresh relations for this parent
                await getRelationsByParentId(user.id.toString());
            }
        } catch {
            toast.error('Không thể xóa con');
        }
    };

    const getRoleName = (role: USER_ROLE) => {
        switch (role) {
            case USER_ROLE.TEACHER:
                return 'Giáo viên';
            case USER_ROLE.STUDENT:
                return 'Học sinh';
            case USER_ROLE.PARENT:
                return 'Phụ huynh';
            case USER_ROLE.ADMIN:
                return 'Quản trị viên';
            default:
                return 'Người dùng';
        }
    };

    const getGenderName = (gender: GenderEnum | undefined) => {
        switch (gender) {
            case GenderEnum.MALE:
                return 'Nam';
            case GenderEnum.FEMALE:
                return 'Nữ';
            case GenderEnum.OTHER:
                return 'Khác';
            default:
                return 'Chưa xác định';
        }
    };

    // Helper functions to safely access role-specific properties
    const formatDate = (date: string | Date | null | undefined) => {
        if (!date) return 'Chưa xác định';
        try {
            return new Date(date).toLocaleDateString();
        } catch {
            return 'Ngày không hợp lệ';
        }
    };

    return (
        <div>
            {/* Main Content */}
            <div className="flex-1 overflow-auto relative">
                {/* Background Header */}
                <div className="w-full h-[300px] bg-[#4FD1C5] relative rounded-[15px]"></div>

                {/* Profile Header */}
                <div className="px-8 py-6 bg-white mx-8 mt-[-5%] rounded-xl shadow-sm opacity-95">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src={
                                        currentAvatar ||
                                        currentProfile?.user?.avatar ||
                                        '/image.png'
                                    }
                                    alt="Profile"
                                    className="w-20 h-20 rounded-xl object-cover"
                                />
                                <UploadImageDialog
                                    onUploadSuccess={handleAvatarUpload}
                                    folder="avatars"
                                    title="Cập nhật ảnh đại diện"
                                    description="Chọn ảnh đại diện mới"
                                >
                                    <button className="absolute -bottom-2 -right-2 bg-teal-400 text-white p-2 rounded-full hover:bg-teal-500 transition-colors shadow-lg">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </UploadImageDialog>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {currentProfile?.full_name ||
                                        user?.username ||
                                        'Người dùng'}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {currentProfile?.user?.email || user?.email}
                                </p>
                                <p className="text-xs text-teal-600 font-medium">
                                    {user
                                        ? getRoleName(user.role)
                                        : 'Người dùng'}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {!isEditing ? (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-teal-400 hover:bg-teal-500"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Chỉnh sửa hồ sơ
                                </Button>
                            ) : (
                                <div className="flex space-x-2">
                                    <Button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="bg-green-500 hover:bg-green-600"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Lưu
                                    </Button>
                                    <Button
                                        onClick={() => setIsEditing(false)}
                                        variant="outline"
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Platform Settings */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">
                            Cài đặt nền tảng
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-3">
                                    TÀI KHOẢN
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="emailfollow" />
                                        <Label htmlFor="emailfollow">
                                            Gửi email khi có người theo dõi tôi
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch id="emailanswer" />
                                        <Label htmlFor="emailanswer">
                                            Gửi email khi có người trả lời bài
                                            đăng của tôi
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch id="emailmention" />
                                        <Label htmlFor="emailmention">
                                            Gửi email khi có người nhắc đến tôi
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-3">
                                    ỨNG DỤNG
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="newlaunches" />
                                        <Label htmlFor="newlaunches">
                                            Ra mắt và dự án mới
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch id="monthlyupdates" />
                                        <Label htmlFor="monthlyupdates">
                                            Cập nhật sản phẩm hàng tháng
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch id="newsletter" />
                                        <Label htmlFor="newsletter">
                                            Đăng ký nhận bản tin
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">
                            Thông tin hồ sơ
                        </h3>
                        {currentProfile ? (
                            <div className="space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Họ và tên:
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="text"
                                            value={formData.full_name || ''}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'full_name',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                            {currentProfile.full_name ||
                                                'Chưa xác định'}
                                        </p>
                                    )}
                                </div>

                                {/* Gender */}
                                {(user?.role === USER_ROLE.TEACHER ||
                                    user?.role === USER_ROLE.STUDENT) && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Giới tính:
                                        </label>
                                        {isEditing ? (
                                            <Select
                                                value={
                                                    formData.gender?.toString() ||
                                                    ''
                                                }
                                                onValueChange={(value) =>
                                                    handleInputChange(
                                                        'gender',
                                                        parseInt(value)
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Chọn giới tính" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0">
                                                        Nam
                                                    </SelectItem>
                                                    <SelectItem value="1">
                                                        Nữ
                                                    </SelectItem>
                                                    <SelectItem value="2">
                                                        Khác
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                                {user?.role ===
                                                USER_ROLE.TEACHER
                                                    ? getGenderName(
                                                          (
                                                              currentProfile as Teacher
                                                          ).gender
                                                      )
                                                    : getGenderName(
                                                          (
                                                              currentProfile as Student
                                                          ).gender
                                                      )}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Date of Birth */}
                                {(user?.role === USER_ROLE.TEACHER ||
                                    user?.role === USER_ROLE.STUDENT) && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ngày sinh:
                                        </label>
                                        {isEditing ? (
                                            <Input
                                                type="date"
                                                value={
                                                    formData.date_of_birth || ''
                                                }
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'date_of_birth',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                                {user?.role ===
                                                USER_ROLE.TEACHER
                                                    ? formatDate(
                                                          (
                                                              currentProfile as Teacher
                                                          ).date_of_birth
                                                      )
                                                    : formatDate(
                                                          (
                                                              currentProfile as Student
                                                          ).date_of_birth
                                                      )}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Địa chỉ:
                                    </label>
                                    {isEditing ? (
                                        <Input
                                            type="text"
                                            value={formData.address || ''}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'address',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                            {currentProfile.address ||
                                                'Chưa xác định'}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Số điện thoại:
                                    </label>
                                    <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                        {currentProfile.user?.phone ||
                                            user?.phone ||
                                            'Chưa xác định'}
                                    </p>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email:
                                    </label>
                                    <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                        {currentProfile.user?.email ||
                                            user?.email ||
                                            'Chưa xác định'}
                                    </p>
                                </div>

                                {/* Teacher-specific fields */}
                                {user?.role === USER_ROLE.TEACHER && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Bằng cấp:
                                            </label>
                                            {isEditing ? (
                                                <Input
                                                    type="text"
                                                    value={
                                                        formData.qualification ||
                                                        ''
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'qualification',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                                    {(currentProfile as Teacher)
                                                        .qualification ||
                                                        'Chưa xác định'}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Ngày tuyển dụng:
                                            </label>
                                            {isEditing ? (
                                                <Input
                                                    type="date"
                                                    value={
                                                        formData.hire_date || ''
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'hire_date',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                                    {formatDate(
                                                        (
                                                            currentProfile as Teacher
                                                        ).hire_date
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Student-specific fields */}
                                {user?.role === USER_ROLE.STUDENT && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Ngày nhập học:
                                            </label>
                                            {isEditing ? (
                                                <Input
                                                    type="date"
                                                    value={
                                                        formData.enrollment_date ||
                                                        ''
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'enrollment_date',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                                    {formatDate(
                                                        (
                                                            currentProfile as Student
                                                        ).enrollment_date
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Parent-specific fields */}
                                {user?.role === USER_ROLE.PARENT && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mối quan hệ:
                                        </label>
                                        {isEditing ? (
                                            <Input
                                                type="text"
                                                value={
                                                    formData.relationship || ''
                                                }
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        'relationship',
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full"
                                                placeholder="Ví dụ: Bố, Mẹ, Người giám hộ"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                                {(currentProfile as Parent)
                                                    .relationship ||
                                                    'Chưa xác định'}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Social Media for Teachers and Parents */}
                                {(user?.role === USER_ROLE.TEACHER ||
                                    user?.role === USER_ROLE.PARENT) && (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Zalo ID:
                                            </label>
                                            {isEditing ? (
                                                <Input
                                                    type="text"
                                                    value={
                                                        formData.zalo_id || ''
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'zalo_id',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                                    {user?.role ===
                                                    USER_ROLE.TEACHER
                                                        ? (
                                                              currentProfile as Teacher
                                                          ).zalo_id ||
                                                          'Chưa xác định'
                                                        : (
                                                              currentProfile as Parent
                                                          ).zalo_id ||
                                                          'Chưa xác định'}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Facebook ID:
                                            </label>
                                            {isEditing ? (
                                                <Input
                                                    type="text"
                                                    value={
                                                        formData.facebook_id ||
                                                        ''
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'facebook_id',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full"
                                                />
                                            ) : (
                                                <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                                                    {user?.role ===
                                                    USER_ROLE.TEACHER
                                                        ? (
                                                              currentProfile as Teacher
                                                          ).facebook_id ||
                                                          'Chưa xác định'
                                                        : (
                                                              currentProfile as Parent
                                                          ).facebook_id ||
                                                          'Chưa xác định'}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">
                                    {loading
                                        ? 'Đang tải hồ sơ...'
                                        : 'Không có dữ liệu hồ sơ'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Admin Relationship Management or Activity */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        {user?.role === USER_ROLE.ADMIN ? (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                                    <Users className="inline w-5 h-5 mr-2" />
                                    Quản lý mối quan hệ
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Chọn học sinh:
                                        </label>
                                        <Select
                                            value={selectedStudentId}
                                            onValueChange={setSelectedStudentId}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Chọn một học sinh" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {students.map((student) => (
                                                    <SelectItem
                                                        key={student.id}
                                                        value={student.id}
                                                    >
                                                        {student.full_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Chọn phụ huynh:
                                        </label>
                                        <Select
                                            value={selectedParentId}
                                            onValueChange={setSelectedParentId}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Chọn một phụ huynh" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {parents.map((parent) => (
                                                    <SelectItem
                                                        key={parent.id}
                                                        value={parent.id}
                                                    >
                                                        {parent.full_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button
                                        onClick={handleCreateRelation}
                                        disabled={
                                            !selectedStudentId ||
                                            !selectedParentId ||
                                            loading
                                        }
                                        className="w-full bg-teal-400 hover:bg-teal-500"
                                    >
                                        Tạo mối quan hệ
                                    </Button>
                                </div>

                                {/* Current Relations */}
                                <div className="mt-6">
                                    <h4 className="text-md font-semibold text-gray-700 mb-3">
                                        Mối quan hệ hiện tại
                                    </h4>
                                    <div className="space-y-2">
                                        {relations.map((relation) => (
                                            <div
                                                key={relation.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                            >
                                                <div className="text-sm">
                                                    <span className="font-medium">
                                                        {
                                                            relation.student
                                                                ?.full_name
                                                        }
                                                    </span>
                                                    {' ↔ '}
                                                    <span className="font-medium">
                                                        {
                                                            relation.parent
                                                                ?.full_name
                                                        }
                                                    </span>
                                                    {relation.is_primary && (
                                                        <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
                                                            Chính
                                                        </span>
                                                    )}
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        deleteRelation(
                                                            relation.id
                                                        )
                                                    }
                                                >
                                                    Xóa
                                                </Button>
                                            </div>
                                        ))}
                                        {relations.length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-4">
                                                Không tìm thấy mối quan hệ nào
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : user?.role === USER_ROLE.PARENT ? (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                                    <Users className="inline w-5 h-5 mr-2" />
                                    Con em của tôi
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Thêm học sinh làm con:
                                        </label>
                                        <Select
                                            value={selectedStudentId}
                                            onValueChange={setSelectedStudentId}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Chọn một học sinh" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {students
                                                    .filter((student) => {
                                                        // Filter out students that are already children of this parent
                                                        return !relations.some(
                                                            (relation) =>
                                                                relation.student_id ===
                                                                    student.id &&
                                                                relation.parent_id ===
                                                                    user?.id.toString()
                                                        );
                                                    })
                                                    .map((student) => (
                                                        <SelectItem
                                                            key={student.id}
                                                            value={student.id}
                                                        >
                                                            {student.full_name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button
                                        onClick={handleAddChild}
                                        disabled={loading || !selectedStudentId}
                                        className="w-full bg-teal-400 hover:bg-teal-500"
                                    >
                                        <Users className="w-4 h-4 mr-2" />
                                        Thêm làm con
                                    </Button>
                                </div>

                                {/* Current Children */}
                                <div className="mt-6">
                                    <h4 className="text-md font-semibold text-gray-700 mb-3">
                                        Con em của tôi
                                    </h4>
                                    <div className="space-y-2">
                                        {relations.length > 0 ? (
                                            relations.map((relation) => (
                                                <div
                                                    key={relation.id}
                                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <div className="text-sm">
                                                        <span className="font-medium">
                                                            {relation.student
                                                                ?.full_name ||
                                                                'Học sinh không xác định'}
                                                        </span>
                                                        {relation.is_primary && (
                                                            <span className="ml-2 px-2 py-1 bg-teal-100 text-teal-700 rounded-full text-xs">
                                                                Người giám hộ
                                                                chính
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            handleRemoveChild(
                                                                relation.id
                                                            )
                                                        }
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500 text-center py-4">
                                                Bạn chưa thêm con nào. Sử dụng
                                                biểu mẫu phía trên để thêm học
                                                sinh làm con của bạn.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                                    Hoạt động gần đây
                                </h3>
                                <div className="space-y-4">
                                    <div className="text-center py-8">
                                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">
                                            Không có hoạt động gần đây
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Status and Settings Section */}
                {user?.role !== USER_ROLE.ADMIN && (
                    <div className="px-8 pb-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Trạng thái tài khoản
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Trạng thái hồ sơ
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Hồ sơ của bạn đang{' '}
                                        {currentProfile
                                            ? 'hoạt động'
                                            : 'chưa hoàn thành'}
                                    </p>
                                    <div
                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                            currentProfile
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {currentProfile
                                            ? 'Hoạt động'
                                            : 'Chưa hoàn thành'}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Cập nhật lần cuối
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {currentProfile?.updated_at
                                            ? new Date(
                                                  currentProfile.updated_at
                                              ).toLocaleDateString('vi-VN')
                                            : 'Chưa bao giờ'}
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">
                                        Thành viên từ
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {currentProfile?.created_at
                                            ? new Date(
                                                  currentProfile.created_at
                                              ).toLocaleDateString('vi-VN')
                                            : 'Không xác định'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
