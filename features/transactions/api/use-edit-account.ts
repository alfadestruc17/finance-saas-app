import { toast } from "sonner";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { client } from "@/lib/hono";
import { use } from "react";



type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"]

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$patch"]({
                json,
                param: { id }
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Cuenta actualizada")
            queryClient.invalidateQueries({ queryKey: ["account", { id }] })
            queryClient.invalidateQueries({ queryKey: ["accounts"] })
            // TODO: invalidate summary and transacitons
        },
        onError: () => {
            toast.error("Fallo en actualizar cuenta")
        },
    });
    return mutation
};