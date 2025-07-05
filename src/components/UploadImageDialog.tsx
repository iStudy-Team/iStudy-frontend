import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ReactNode, useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, FileText } from 'lucide-react';
import { useUploadStore } from '@/store/useUploadStore';
import { toast } from 'sonner';

interface UploadImageDialogProps {
    children: ReactNode;
    onUploadSuccess?: (url: string, fileId: string) => void;
    folder?: string;
    maxFileSize?: number; // in bytes, default 5MB
    acceptedFileTypes?: string[];
    title?: string;
    description?: string;
}

export function UploadImageDialog({
    children,
    onUploadSuccess,
    folder = 'uploads',
    maxFileSize = 5 * 1024 * 1024, // 5MB
    acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    title = 'Upload Image',
    description = 'Select an image file to upload',
}: UploadImageDialogProps) {
    const { uploadSingleFile, isUploading, uploadProgress } = useUploadStore();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback(
        (file: File): boolean => {
            // Check file type
            if (!acceptedFileTypes.includes(file.type)) {
                toast.error(
                    `Invalid file type. Accepted types: ${acceptedFileTypes.join(', ')}`
                );
                return false;
            }

            // Check file size
            if (file.size > maxFileSize) {
                toast.error(
                    `File size too large. Maximum size: ${(maxFileSize / 1024 / 1024).toFixed(1)}MB`
                );
                return false;
            }

            return true;
        },
        [acceptedFileTypes, maxFileSize]
    );

    const handleFileSelect = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            if (!validateFile(file)) {
                event.target.value = '';
                return;
            }

            setSelectedFile(file);

            // Create preview URL for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewUrl(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
        },
        [validateFile]
    );

    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (!file) return;

            if (!validateFile(file)) return;

            setSelectedFile(file);

            // Create preview URL for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewUrl(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            }
        },
        [validateFile]
    );

    const handleDragOver = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
        },
        []
    );

    const handleRemoveFile = useCallback(() => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('Please select a file first');
            return;
        }

        try {
            const result = await uploadSingleFile(selectedFile, { folder });

            if (result) {
                onUploadSuccess?.(result.url, result.fileId);
                toast.success('Image uploaded successfully');

                // Reset form
                setSelectedFile(null);
                setPreviewUrl(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setOpen(false);
            }
        } catch {
            toast.error('Failed to upload image');
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <p className="text-sm text-gray-500">{description}</p>
                </DialogHeader>

                <div className="space-y-4">
                    {/* File Upload Area */}
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept={acceptedFileTypes.join(',')}
                            onChange={handleFileSelect}
                            className="hidden"
                        />

                        {selectedFile ? (
                            <div className="space-y-4">
                                {previewUrl ? (
                                    <div className="relative">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="max-w-full max-h-32 mx-auto rounded-lg"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveFile();
                                            }}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <FileText className="w-8 h-8 text-gray-400" />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveFile();
                                            }}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}

                                <div className="text-sm text-gray-600">
                                    <p className="font-medium">
                                        {selectedFile.name}
                                    </p>
                                    <p>{formatFileSize(selectedFile.size)}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Max file size:{' '}
                                        {(maxFileSize / 1024 / 1024).toFixed(1)}
                                        MB
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Supported formats:{' '}
                                        {acceptedFileTypes
                                            .map((type) =>
                                                type.split('/')[1].toUpperCase()
                                            )
                                            .join(', ')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-medium">
                                    Uploading...
                                </Label>
                                <span className="text-sm text-gray-500">
                                    {uploadProgress}%
                                </span>
                            </div>
                            <Progress
                                value={uploadProgress}
                                className="w-full"
                            />
                        </div>
                    )}
                </div>

                <DialogFooter className="flex justify-between">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isUploading}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleUpload}
                        disabled={!selectedFile || isUploading}
                        className="bg-teal-500 hover:bg-teal-600"
                    >
                        {isUploading ? (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                <span>Uploading...</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Upload className="w-4 h-4" />
                                <span>Upload</span>
                            </div>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
