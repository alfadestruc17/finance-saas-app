import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
    (typeof client.api.transactions)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
    (typeof client.api.transactions)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteTransactions = () => {
    const t = useTranslations("transactions.toasts");
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.transactions["bulk-delete"]["$post"]({
                json,
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success(t("bulkDeleted"));
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] });
        },
        onError: () => {
            toast.error(t("bulkDeleteError"));
        },
    });

    return mutation;
};
