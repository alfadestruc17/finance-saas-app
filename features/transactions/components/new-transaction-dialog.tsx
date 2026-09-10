import { Loader2 } from "lucide-react";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { ResponsiveModal } from "@/components/responsive-modal";

export const NewTransactionDialog = () => {
    const { isOpen, onClose } = useNewTransaction();

    const createMutation = useCreateTransaction();

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
        createMutation.isPending ||
        categoryMutation.isPending ||
        accountMutation.isPending;

    const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

    return (
        <ResponsiveModal
            open={isOpen}
            onOpenChange={onClose}
            title="Nueva transacción"
            description="Añade una nueva transacción."
        >
            {isLoading ? (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="size-4 text-muted-foreground animate-spin" />
                </div>
            ) : (
                <TransactionForm
                    onSubmit={(values) => {
                        createMutation.mutate(values, {
                            onSuccess: () => {
                                onClose();
                            },
                        });
                    }}
                    disabled={isPending}
                    categoryOptions={categoryOptions}
                    onCreateCategory={onCreateCategory}
                    accountOptions={accountOptions}
                    onCreateAccount={onCreateAccount}
                />
            )}
        </ResponsiveModal>
    );
};
