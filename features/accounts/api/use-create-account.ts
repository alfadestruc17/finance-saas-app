import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]

export const useCreateAccount = () => {
    const t = useTranslations("accounts.toasts");
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts.$post({ json })
            return await response.json();
        },
        onSuccess: () => {
            toast.success(t("created"))
            queryClient.invalidateQueries({ queryKey: ["accounts"] })
        },
        onError: () => {
            toast.error(t("createError"))
        },
    });
    return mutation
};
