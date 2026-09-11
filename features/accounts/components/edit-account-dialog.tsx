import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

import { useConfirm } from "@/hooks/use-confirm";
import { insertAccountSchema } from "@/db/schema";
import { ResponsiveModal } from "@/components/responsive-modal";

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.infer<typeof formSchema>;

export const EditAccountDialog = () => {
    const t = useTranslations("accounts");
    const { isOpen, onClose, id } = useOpenAccount();

    const [ConfirmDialog, confirm] = useConfirm(
        t("confirmDelete.title"),
        t("confirmDelete.description"),
    );

    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);

    const isPending = editMutation.isPending || deleteMutation.isPending;
    const isLoading = accountQuery.isLoading;

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

    const defaultValues = accountQuery.data
        ? { name: accountQuery.data.name }
        : { name: "" };

    return (
        <>
            <ConfirmDialog />
            <ResponsiveModal
                open={isOpen}
                onOpenChange={onClose}
                title={t("edit.title")}
                description={t("edit.description")}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    </div>
                ) : (
                    <AccountForm
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
