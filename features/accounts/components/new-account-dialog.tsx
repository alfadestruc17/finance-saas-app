import { z } from "zod";

import { AccountForm } from "@/features/accounts/components/account-form";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { insertAccountSchema } from "@/db/schema";
import { ResponsiveModal } from "@/components/responsive-modal";

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.infer<typeof formSchema>;

export const NewAccountDialog = () => {
    const { isOpen, onClose } = useNewAccount();
    const mutation = useCreateAccount();

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
            title="Nueva cuenta"
            description="Crea una nueva cuenta para gestionar tus finanzas."
        >
            <AccountForm
                onSubmit={onSubmit}
                disabled={mutation.isPending}
                defaultValues={{ name: "" }}
            />
        </ResponsiveModal>
    );
};
