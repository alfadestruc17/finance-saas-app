import { toast } from "sonner";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { client } from "@/lib/hono";
import { use } from "react";



type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"]

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories[":id"]["$patch"]({
                json,
                param: { id }
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Categoria actualizada")
            queryClient.invalidateQueries({ queryKey: ["category", { id }] })
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            // TODO: invalidate summary and transacitons
        },
        onError: () => {
            toast.error("Fallo en actualizar categoria")
        },
    });
    return mutation
};