import z from "zod";

import { CategoryForm } from "./category-form";
import { useGetCategory } from "../api/use-get-category";
import { useOpenCategory } from "../hooks/use-open-category";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

import { insertCategoriesSchema } from "@/db/schema";
import {

    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const formSchema = insertCategoriesSchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>;


export const EditCategorySheet = () => {

    const { isOpen, onClose, id } = useOpenCategory();

    const [ConfirmationDialog, confirm] = useConfirm(
        "Estas seguro",
        "Tu vas a eliminar esta categoria"
    )

    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isPending =
        editMutation.isPending ||
        deleteMutation.isPending


    const isLoanding = categoryQuery.isLoading;

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    const onDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            })
        }
    }

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
    } : {
        name: "",
    }

    return (
        <>
            <ConfirmationDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Editar categoria
                        </SheetTitle>
                        <SheetDescription>
                            Edita una categoria registrada.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoanding
                        ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="size-4 text-muted-foreground animate-spin" />
                            </div>
                        )
                        : (
                            <CategoryForm
                                id={id}
                                onSubmit={onSubmit}
                                disabled={isPending}
                                defaultValues={defaultValues}
                                onDelete={onDelete}
                            />
                        )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}