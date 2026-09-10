"use client";

import { useMedia } from "react-use";

import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
    /** Extra classes for the desktop dialog content. */
    className?: string;
};

/**
 * Contenedor de formularios responsivo:
 * - `≥ lg`  → Dialog centrado.
 * - `< lg`  → Drawer que sube desde abajo (vaul).
 * Misma API para ambos.
 */
export const ResponsiveModal = ({
    open,
    onOpenChange,
    title,
    description,
    children,
    className,
}: Props) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className={cn(
                        "sm:max-w-md max-h-[85vh] overflow-y-auto",
                        className,
                    )}
                >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <div className="overflow-y-auto px-4 pb-8">{children}</div>
            </DrawerContent>
        </Drawer>
    );
};
