import { createRoot } from 'react-dom/client';
import { DevConfirmAlert } from '@/components/atoms/confirm-alert';
import React from 'react';

type ConfirmOptions = {
    title: string;
    description: string;
    cancelText?: string;
    confirmText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmButtonVariant?:
        | 'default'
        | 'destructive'
        | 'secondary'
        | 'outline'
        | 'ghost'
        | 'link';
};

export const confirm = (options: ConfirmOptions): Promise<void> => {
    return new Promise((resolve) => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = createRoot(container);

        const handleClose = () => {
            root.unmount();
            document.body.removeChild(container);
            if (options.onCancel) {
                options.onCancel();
            }
            resolve();
        };

        const handleConfirm = () => {
            root.unmount();
            document.body.removeChild(container);
            options.onConfirm();
            resolve();
        };

        root.render(
            React.createElement(DevConfirmAlert, {
                isOpen: true,
                onClose: handleClose,
                onConfirm: handleConfirm,
                title: options.title,
                description: options.description,
                cancelText: options.cancelText,
                confirmText: options.confirmText,
                confirmButtonVariant: options.confirmButtonVariant,
            })
        );
    });
};
