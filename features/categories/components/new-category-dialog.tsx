import { z } from "zod";

import { CategoryForm } from "@/features/categories/components/category-form";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { insertCategoriesSchema } from "@/db/schema";
import { ResponsiveModal } from "@/components/responsive-modal";

const formSchema = insertCategoriesSchema.pick({ name: true });
type FormValues = z.infer<typeof formSchema>;

export const NewCategoryDialog = () => {
    const { isOpen, onClose } = useNewCategory();
    const mutation = useCreateCategory();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <ResponsiveModal
            open={isOpen}
            onOpenChange={onClose}
            title="Nueva categoría"
            description="Crea una nueva categoría para organizar tus transacciones."
        >
            <CategoryForm
                onSubmit={onSubmit}
                disabled={mutation.isPending}
                defaultValues={{ name: "" }}
            />
        </ResponsiveModal>
    );
};
