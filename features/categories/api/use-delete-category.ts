import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>

export const useDeleteCategory = (id?: string) => {
    const t = useTranslations("categories.toasts");
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.categories[":id"]["$delete"]({
                param: { id }
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success(t("deleted"))
            queryClient.invalidateQueries({ queryKey: ["category", { id }] })
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            queryClient.invalidateQueries({ queryKey: ["transactions"] })
            queryClient.invalidateQueries({ queryKey: ["summary"] })
        },
        onError: () => {
            toast.error(t("deleteError"))
        },
    });
    return mutation
};
