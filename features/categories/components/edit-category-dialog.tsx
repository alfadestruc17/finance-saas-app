import { z } from "zod";
import { Loader2 } from "lucide-react";

import { CategoryForm } from "@/features/categories/components/category-form";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

import { useConfirm } from "@/hooks/use-confirm";
import { insertCategoriesSchema } from "@/db/schema";
import { ResponsiveModal } from "@/components/responsive-modal";

const formSchema = insertCategoriesSchema.pick({ name: true });
type FormValues = z.infer<typeof formSchema>;

export const EditCategoryDialog = () => {
    const { isOpen, onClose, id } = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm(
        "¿Estás seguro?",
        "Vas a eliminar esta categoría de forma permanente.",
    );

    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = categoryQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    const defaultValues = categoryQuery.data
        ? { name: categoryQuery.data.name }
        : { name: "" };

    return (
        <>
            <ConfirmDialog />
            <ResponsiveModal
                open={isOpen}
                onOpenChange={onClose}
                title="Editar categoría"
                description="Edita una categoría registrada."
            >
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    </div>
                ) : (
                    <CategoryForm
                        id={id}
                        onSubmit={onSubmit}
                        disabled={isPending}
                        defaultValues={defaultValues}
                        onDelete={onDelete}
                    />
                )}
            </ResponsiveModal>
        </>
    );
};
