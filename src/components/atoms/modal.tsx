import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from '@/components/ui/dialog';

export const Modal = ({
    isOpen,
    title,
    children,
    button,
    onOpen,
    description = '',
}: {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    button: React.ReactNode;
    onOpen: () => void;
    description?: string;
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpen}>
            <form>
                <DialogTrigger asChild>{button}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription id="modal-description">
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </form>
        </Dialog>
    );
};
