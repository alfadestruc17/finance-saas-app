import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"]

export const useBulkDeleteAccounts = () => {
    const t = useTranslations("accounts.toasts");
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({ json })
            return await response.json();
        },
        onSuccess: () => {
            toast.success(t("bulkDeleted"))
            queryClient.invalidateQueries({ queryKey: ["accounts"] })
            queryClient.invalidateQueries({ queryKey: ["transactions"] })
            queryClient.invalidateQueries({ queryKey: ["summary"] })
        },
        onError: () => {
            toast.error(t("bulkDeleteError"))
        },
    });
    return mutation
};
