import { z } from "zod";
import { useTranslations } from "next-intl";

import { AccountForm } from "@/features/accounts/components/account-form";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { insertAccountSchema } from "@/db/schema";
import { ResponsiveModal } from "@/components/responsive-modal";

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.infer<typeof formSchema>;

export const NewAccountDialog = () => {
    const t = useTranslations("accounts");
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
            title={t("new.title")}
            description={t("new.description")}
        >
            <AccountForm
                onSubmit={onSubmit}
                disabled={mutation.isPending}
                defaultValues={{ name: "" }}
            />
        </ResponsiveModal>
    );
};
