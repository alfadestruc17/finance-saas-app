import { toast } from "sonner";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { client } from "@/lib/hono";
import { use } from "react";



type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"]

export const useEditTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.transactions[":id"]["$patch"]({
                json,
                param: { id }
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transacción actualizada")
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }] })
            queryClient.invalidateQueries({ queryKey: ["transactions"] })
            // TODO: invalidate summary and transacitons
        },
        onError: () => {
            toast.error("Fallo en actualizar transaccióm")
        },
    });
    return mutation
};