import { toast } from "sonner";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { client } from "@/lib/hono";
import { use } from "react";



type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>

export const useDeleteAccount = (id?: string) => {
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
            toast.success("Cuenta eliminada")
            queryClient.invalidateQueries({ queryKey: ["account", { id }] })
            queryClient.invalidateQueries({ queryKey: ["accounts"] })
            // TODO: invalidate summary and transacitons
        },
        onError: () => {
            toast.error("Fallo en eliminar cuenta")
        },
    });
    return mutation
};