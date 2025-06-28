import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface ConfirmAlertProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    cancelText?: string;
    confirmText?: string;
    confirmButtonVariant?:
        | 'default'
        | 'destructive'
        | 'secondary'
        | 'outline'
        | 'ghost'
        | 'link';
}

export function DevConfirmAlert({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    cancelText = 'Hủy',
    confirmText = 'Xác nhận',
    confirmButtonVariant = 'destructive',
}: ConfirmAlertProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>
                        {cancelText}
                    </AlertDialogCancel>
                    <Button variant={confirmButtonVariant} onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
