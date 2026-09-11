import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
    (typeof client.api.transactions)["bulk-create"]["$post"]
>;
type RequestType = InferRequestType<
    (typeof client.api.transactions)["bulk-create"]["$post"]
>["json"];

export const useBulkCreateTransactions = () => {
    const t = useTranslations("transactions.toasts");
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.transactions["bulk-create"]["$post"]({
                json,
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success(t("bulkCreated"));
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] });
        },
        onError: () => {
            toast.error(t("bulkCreateError"));
        },
    });

    return mutation;
};
