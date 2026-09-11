import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>

export const useDeleteAccount = (id?: string) => {
    const t = useTranslations("accounts.toasts");
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.accounts[":id"]["$delete"]({
                param: { id }
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success(t("deleted"))
            queryClient.invalidateQueries({ queryKey: ["account", { id }] })
            queryClient.invalidateQueries({ queryKey: ["accounts"] })
            queryClient.invalidateQueries({ queryKey: ["transactions"] })
            queryClient.invalidateQueries({ queryKey: ["summary"] })
        },
        onError: () => {
            toast.error(t("deleteError"))
        },
    });
    return mutation
};
