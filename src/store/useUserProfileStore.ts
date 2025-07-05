import { create } from 'zustand';
import { toast } from 'sonner';
import {
    Teacher,
    Student,
    Parent,
    StudentParentRelation,
    UpdateTeacherDto,
    UpdateStudentDto,
    UpdateParentDto,
    CreateRelationDto,
    UpdateRelationDto,
    updateTeacherApi,
    getTeacherByIdApi,
    getAllTeachersApi,
    deleteTeacherApi,
    updateStudentApi,
    getStudentByIdApi,
    getAllStudentsApi,
    deleteStudentApi,
    updateParentApi,
    getParentByIdApi,
    getAllParentsApi,
    deleteParentApi,
    createRelationApi,
    updateRelationApi,
    getRelationByIdApi,
    deleteRelationApi,
    getAllRelationsApi,
    getRelationsByStudentIdApi,
    getRelationsByParentIdApi,
} from '@/api/userProfile';

interface UserProfileState {
    // Teachers
    teachers: Teacher[];
    currentTeacher: Teacher | null;

    // Students
    students: Student[];
    currentStudent: Student | null;

    // Parents
    parents: Parent[];
    currentParent: Parent | null;

    // Relations
    relations: StudentParentRelation[];
    currentRelation: StudentParentRelation | null;

    // Common state
    loading: boolean;
    error: string | null;

    // Teacher Actions
    setTeachers: (teachers: Teacher[]) => void;
    setCurrentTeacher: (teacher: Teacher | null) => void;
    updateTeacher: (id: string, dto: UpdateTeacherDto) => Promise<Teacher | null>;
    getTeacherById: (id: string) => Promise<Teacher | null>;
    getAllTeachers: () => Promise<void>;
    deleteTeacher: (id: string) => Promise<boolean>;

    // Student Actions
    setStudents: (students: Student[]) => void;
    setCurrentStudent: (student: Student | null) => void;
    updateStudent: (id: string, dto: UpdateStudentDto) => Promise<Student | null>;
    getStudentById: (id: string) => Promise<Student | null>;
    getAllStudents: () => Promise<void>;
    deleteStudent: (id: string) => Promise<boolean>;

    // Parent Actions
    setParents: (parents: Parent[]) => void;
    setCurrentParent: (parent: Parent | null) => void;
    updateParent: (id: string, dto: UpdateParentDto) => Promise<Parent | null>;
    getParentById: (id: string) => Promise<Parent | null>;
    getAllParents: () => Promise<void>;
    deleteParent: (id: string) => Promise<boolean>;

    // Relation Actions
    setRelations: (relations: StudentParentRelation[]) => void;
    setCurrentRelation: (relation: StudentParentRelation | null) => void;
    createRelation: (dto: CreateRelationDto) => Promise<StudentParentRelation | null>;
    updateRelation: (id: string, dto: UpdateRelationDto) => Promise<StudentParentRelation | null>;
    getRelationById: (id: string) => Promise<StudentParentRelation | null>;
    deleteRelation: (id: string) => Promise<boolean>;
    getAllRelations: () => Promise<void>;
    getRelationsByStudentId: (studentId: string) => Promise<void>;
    getRelationsByParentId: (parentId: string) => Promise<void>;

    // Common Actions
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    teachers: [],
    currentTeacher: null,
    students: [],
    currentStudent: null,
    parents: [],
    currentParent: null,
    relations: [],
    currentRelation: null,
    loading: false,
    error: null,
};

export const useUserProfileStore = create<UserProfileState>((set, get) => ({
    ...initialState,

    // Common setters
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
    reset: () => set(initialState),

    // Teacher Actions
    setTeachers: (teachers) => set({ teachers }),
    setCurrentTeacher: (teacher) => set({ currentTeacher: teacher }),

    updateTeacher: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedTeacher = await updateTeacherApi(id, dto);
            const { teachers } = get();
            const updatedTeachers = teachers.map((teacher) =>
                teacher.id === id ? updatedTeacher : teacher
            );
            set({
                teachers: updatedTeachers,
                currentTeacher: updatedTeacher,
                loading: false,
            });
            toast.success('Thông tin giáo viên đã được cập nhật thành công');
            return updatedTeacher;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể cập nhật thông tin giáo viên';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    getTeacherById: async (id) => {
        set({ loading: true, error: null });
        try {
            const teacher = await getTeacherByIdApi(id);
            set({ currentTeacher: teacher, loading: false });
            return teacher;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải thông tin giáo viên';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    getAllTeachers: async () => {
        set({ loading: true, error: null });
        try {
            const teachers = await getAllTeachersApi();
            set({ teachers, loading: false });
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải danh sách giáo viên';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
        }
    },

    deleteTeacher: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteTeacherApi(id);
            const { teachers } = get();
            const filteredTeachers = teachers.filter((teacher) => teacher.id !== id);
            set({ teachers: filteredTeachers, loading: false });
            toast.success('Giáo viên đã được xóa thành công');
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể xóa giáo viên';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return false;
        }
    },

    // Student Actions
    setStudents: (students) => set({ students }),
    setCurrentStudent: (student) => set({ currentStudent: student }),

    updateStudent: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedStudent = await updateStudentApi(id, dto);
            const { students } = get();
            const updatedStudents = students.map((student) =>
                student.id === id ? updatedStudent : student
            );
            set({
                students: updatedStudents,
                currentStudent: updatedStudent,
                loading: false,
            });
            toast.success('Thông tin học sinh đã được cập nhật thành công');
            return updatedStudent;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể cập nhật thông tin học sinh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    getStudentById: async (id) => {
        set({ loading: true, error: null });
        try {
            const student = await getStudentByIdApi(id);
            set({ currentStudent: student, loading: false });
            return student;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải thông tin học sinh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    getAllStudents: async () => {
        set({ loading: true, error: null });
        try {
            const students = await getAllStudentsApi();
            set({ students, loading: false });
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải danh sách học sinh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
        }
    },

    deleteStudent: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteStudentApi(id);
            const { students } = get();
            const filteredStudents = students.filter((student) => student.id !== id);
            set({ students: filteredStudents, loading: false });
            toast.success('Học sinh đã được xóa thành công');
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể xóa học sinh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return false;
        }
    },

    // Parent Actions
    setParents: (parents) => set({ parents }),
    setCurrentParent: (parent) => set({ currentParent: parent }),

    updateParent: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedParent = await updateParentApi(id, dto);
            const { parents } = get();
            const updatedParents = parents.map((parent) =>
                parent.id === id ? updatedParent : parent
            );
            set({
                parents: updatedParents,
                currentParent: updatedParent,
                loading: false,
            });
            toast.success('Thông tin phụ huynh đã được cập nhật thành công');
            return updatedParent;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể cập nhật thông tin phụ huynh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    getParentById: async (id) => {
        set({ loading: true, error: null });
        try {
            const parent = await getParentByIdApi(id);
            set({ currentParent: parent, loading: false });
            return parent;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải thông tin phụ huynh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    getAllParents: async () => {
        set({ loading: true, error: null });
        try {
            const parents = await getAllParentsApi();
            set({ parents, loading: false });
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải danh sách phụ huynh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
        }
    },

    deleteParent: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteParentApi(id);
            const { parents } = get();
            const filteredParents = parents.filter((parent) => parent.id !== id);
            set({ parents: filteredParents, loading: false });
            toast.success('Phụ huynh đã được xóa thành công');
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể xóa phụ huynh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return false;
        }
    },

    // Relation Actions
    setRelations: (relations) => set({ relations }),
    setCurrentRelation: (relation) => set({ currentRelation: relation }),

    createRelation: async (dto) => {
        set({ loading: true, error: null });
        try {
            const newRelation = await createRelationApi(dto);
            const { relations } = get();
            set({
                relations: [newRelation, ...relations],
                loading: false,
            });
            toast.success('Mối quan hệ đã được tạo thành công');
            return newRelation;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tạo mối quan hệ';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    updateRelation: async (id, dto) => {
        set({ loading: true, error: null });
        try {
            const updatedRelation = await updateRelationApi(id, dto);
            const { relations } = get();
            const updatedRelations = relations.map((relation) =>
                relation.id === id ? updatedRelation : relation
            );
            set({
                relations: updatedRelations,
                currentRelation: updatedRelation,
                loading: false,
            });
            toast.success('Mối quan hệ đã được cập nhật thành công');
            return updatedRelation;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể cập nhật mối quan hệ';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    getRelationById: async (id) => {
        set({ loading: true, error: null });
        try {
            const relation = await getRelationByIdApi(id);
            set({ currentRelation: relation, loading: false });
            return relation;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải thông tin mối quan hệ';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    deleteRelation: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteRelationApi(id);
            const { relations } = get();
            const filteredRelations = relations.filter((relation) => relation.id !== id);
            set({ relations: filteredRelations, loading: false });
            toast.success('Mối quan hệ đã được xóa thành công');
            return true;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể xóa mối quan hệ';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
            return false;
        }
    },

    getAllRelations: async () => {
        set({ loading: true, error: null });
        try {
            const relations = await getAllRelationsApi();
            set({ relations, loading: false });
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải danh sách mối quan hệ';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
        }
    },

    getRelationsByStudentId: async (studentId) => {
        set({ loading: true, error: null });
        try {
            const relations = await getRelationsByStudentIdApi(studentId);
            set({ relations, loading: false });
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải mối quan hệ của học sinh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
        }
    },

    getRelationsByParentId: async (parentId) => {
        set({ loading: true, error: null });
        try {
            const relations = await getRelationsByParentIdApi(parentId);
            set({ relations, loading: false });
        } catch (error) {
            const errorMessage = (error as Error).message || 'Không thể tải mối quan hệ của phụ huynh';
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
        }
    },
}));
