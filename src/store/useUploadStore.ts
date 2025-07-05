import { create } from 'zustand';
import { toast } from 'sonner';
import {
    UploadFileDto,
    UploadResponseDto,
    uploadSingleFileApi,
    uploadMultipleFilesApi,
    deleteFileApi,
    getFileDetailsApi,
} from '@/api/upload';

interface UploadState {
    // State
    uploadedFiles: UploadResponseDto[];
    isUploading: boolean;
    uploadProgress: number;
    error: string | null;

    // Actions
    setUploadedFiles: (files: UploadResponseDto[]) => void;
    setIsUploading: (uploading: boolean) => void;
    setUploadProgress: (progress: number) => void;
    setError: (error: string | null) => void;

    // API Actions
    uploadSingleFile: (file: File, dto?: UploadFileDto) => Promise<UploadResponseDto | null>;
    uploadMultipleFiles: (files: File[], dto?: UploadFileDto) => Promise<UploadResponseDto[] | null>;
    deleteFile: (fileId: string) => Promise<boolean>;
    getFileDetails: (fileId: string) => Promise<UploadResponseDto | null>;
    clearError: () => void;
    reset: () => void;
}

const initialState = {
    uploadedFiles: [],
    isUploading: false,
    uploadProgress: 0,
    error: null,
};

export const useUploadStore = create<UploadState>((set, get) => ({
    ...initialState,

    // State setters
    setUploadedFiles: (files) => set({ uploadedFiles: files }),
    setIsUploading: (uploading) => set({ isUploading: uploading }),
    setUploadProgress: (progress) => set({ uploadProgress: progress }),
    setError: (error) => set({ error }),

    // API Actions
    uploadSingleFile: async (file, dto) => {
        set({ isUploading: true, error: null, uploadProgress: 0 });

        try {
            // Simulate progress for better UX
            const progressInterval = setInterval(() => {
                const { uploadProgress } = get();
                if (uploadProgress < 90) {
                    set({ uploadProgress: uploadProgress + 10 });
                }
            }, 100);

            const result = await uploadSingleFileApi(file, dto);

            clearInterval(progressInterval);
            set({ uploadProgress: 100 });

            const { uploadedFiles } = get();
            set({
                uploadedFiles: [result, ...uploadedFiles],
                isUploading: false,
                uploadProgress: 0,
            });

            toast.success('File uploaded successfully');
            return result;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to upload file';
            set({
                error: errorMessage,
                isUploading: false,
                uploadProgress: 0,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    uploadMultipleFiles: async (files, dto) => {
        set({ isUploading: true, error: null, uploadProgress: 0 });

        try {
            // Simulate progress for better UX
            const progressInterval = setInterval(() => {
                const { uploadProgress } = get();
                if (uploadProgress < 90) {
                    set({ uploadProgress: uploadProgress + 10 });
                }
            }, 100);

            const result = await uploadMultipleFilesApi(files, dto);

            clearInterval(progressInterval);
            set({ uploadProgress: 100 });

            const { uploadedFiles } = get();
            set({
                uploadedFiles: [...result.files, ...uploadedFiles],
                isUploading: false,
                uploadProgress: 0,
            });

            toast.success(`${result.files.length} files uploaded successfully`);
            return result.files;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to upload files';
            set({
                error: errorMessage,
                isUploading: false,
                uploadProgress: 0,
            });
            toast.error(errorMessage);
            return null;
        }
    },

    deleteFile: async (fileId) => {
        set({ error: null });

        try {
            const result = await deleteFileApi(fileId);

            if (result.success) {
                const { uploadedFiles } = get();
                const filteredFiles = uploadedFiles.filter(file => file.fileId !== fileId);
                set({ uploadedFiles: filteredFiles });
                toast.success('File deleted successfully');
                return true;
            }

            return false;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to delete file';
            set({ error: errorMessage });
            toast.error(errorMessage);
            return false;
        }
    },

    getFileDetails: async (fileId) => {
        set({ error: null });

        try {
            const result = await getFileDetailsApi(fileId);
            return result;
        } catch (error) {
            const errorMessage = (error as Error).message || 'Failed to get file details';
            set({ error: errorMessage });
            toast.error(errorMessage);
            return null;
        }
    },

    clearError: () => set({ error: null }),
    reset: () => set(initialState),
}));
