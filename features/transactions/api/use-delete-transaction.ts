import { toast } from "sonner";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { client } from "@/lib/hono";
import { use } from "react";



type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.transactions[":id"]["$delete"]({
                param: { id }
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transacción eliminada")
            queryClient.invalidateQueries({ queryKey: ["transaction", { id }] })
            queryClient.invalidateQueries({ queryKey: ["transactions"] })
            // TODO: invalidate summary 
        },
        onError: () => {
            toast.error("Fallo en eliminar transacción")
        },
    });
    return mutation
};