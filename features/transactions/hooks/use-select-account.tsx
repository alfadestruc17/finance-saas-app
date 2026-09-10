import { useRef, useState, JSX } from "react";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const useSelectAccount = (): [
    () => JSX.Element,
    () => Promise<string | undefined>,
] => {
    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({ name });
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }));

    const [promise, setPromise] = useState<{
        resolve: (value: string | undefined) => void;
    } | null>(null);
    const selectValue = useRef<string>(undefined);

    const confirm = () =>
        new Promise<string | undefined>((resolve) => {
            setPromise({ resolve });
        });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(selectValue.current);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(undefined);
        handleClose();
    };

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null} onOpenChange={handleCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Selecciona una cuenta</DialogTitle>
                    <DialogDescription>
                        Elige una cuenta para importar estas transacciones.
                    </DialogDescription>
                </DialogHeader>
                <Select
                    placeholder="Selecciona una cuenta"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    onChange={(value) => (selectValue.current = value)}
                    disabled={accountQuery.isLoading || accountMutation.isPending}
                />
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant="outline">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm}>Continuar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [ConfirmationDialog, confirm];
};
