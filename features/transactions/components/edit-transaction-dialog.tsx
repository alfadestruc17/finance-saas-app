import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { convertAmountFromMiliunits } from "@/lib/utils";
import { useConfirm } from "@/hooks/use-confirm";
import { ResponsiveModal } from "@/components/responsive-modal";

export const EditTransactionDialog = () => {
    const t = useTranslations("transactions");
    const { isOpen, onClose, id } = useOpenTransaction();

    const [ConfirmDialog, confirm] = useConfirm(
        t("confirmDelete.title"),
        t("confirmDelete.description"),
    );

    const transactionQuery = useGetTransaction(id);
    const editMutation = useEditTransaction(id);
    const deleteMutation = useDeleteTransaction(id);

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory();
    const onCreateCategory = (name: string) => categoryMutation.mutate({ name });
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
        label: category.name,
        value: category.id,
    }));

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({ name });
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }));

    const isPending =
        editMutation.isPending ||
        deleteMutation.isPending ||
        transactionQuery.isLoading ||
        categoryMutation.isPending ||
        accountMutation.isPending;

    const isLoading =
        transactionQuery.isLoading ||
        categoryQuery.isLoading ||
        accountQuery.isLoading;

    const defaultValues = transactionQuery.data
        ? {
              accountId: transactionQuery.data.accountId,
              categoryId: transactionQuery.data.categoryId,
              amount: convertAmountFromMiliunits(
                  transactionQuery.data.amount,
              ).toString(),
              date: transactionQuery.data.date
                  ? new Date(transactionQuery.data.date)
                  : new Date(),
              payee: transactionQuery.data.payee,
              notes: transactionQuery.data.notes,
          }
        : {
              accountId: "",
              categoryId: "",
              amount: "",
              date: new Date(),
              payee: "",
              notes: "",
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
                    <TransactionForm
                        id={id}
                        defaultValues={defaultValues}
                        onSubmit={(values) => {
                            editMutation.mutate(values, {
                                onSuccess: () => {
                                    onClose();
                                },
                            });
                        }}
                        onDelete={onDelete}
                        disabled={isPending}
                        categoryOptions={categoryOptions}
                        onCreateCategory={onCreateCategory}
                        accountOptions={accountOptions}
                        onCreateAccount={onCreateAccount}
                    />
                )}
            </ResponsiveModal>
        </>
    );
};
