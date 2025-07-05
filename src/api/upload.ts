import { api } from './api';

export interface UploadFileDto {
    folder?: string;
}

export interface UploadResponseDto {
    url: string;
    fileId: string;
    name: string;
    size: number;
    filePath: string;
}

export interface MultipleUploadResponseDto {
    files: UploadResponseDto[];
}

// Upload single file
export async function uploadSingleFileApi(
    file: File,
    dto?: UploadFileDto
): Promise<UploadResponseDto> {
    const formData = new FormData();
    formData.append('file', file);

    if (dto?.folder) {
        formData.append('folder', dto.folder);
    }

    const response = await api.post('api/v1/upload/single', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        params: dto?.folder ? { folder: dto.folder } : {},
    });

    return response.data;
}

// Upload multiple files
export async function uploadMultipleFilesApi(
    files: File[],
    dto?: UploadFileDto
): Promise<MultipleUploadResponseDto> {
    const formData = new FormData();

    files.forEach((file) => {
        formData.append('files', file);
    });

    if (dto?.folder) {
        formData.append('folder', dto.folder);
    }

    const response = await api.post('api/v1/upload/multiple', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        params: dto?.folder ? { folder: dto.folder } : {},
    });

    return response.data;
}

// Delete file
export async function deleteFileApi(fileId: string): Promise<{ success: boolean }> {
    const response = await api.delete(`api/v1/upload/${fileId}`);
    return response.data;
}

// Get file details
export async function getFileDetailsApi(fileId: string): Promise<UploadResponseDto> {
    const response = await api.get(`api/v1/upload/details/${fileId}`);
    return response.data;
}
