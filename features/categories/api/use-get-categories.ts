import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategories = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["categories", { id }],
        queryFn: async () => {
            const response = await client.api.categories.$get({ param: { id } });

            if (!response.ok) {
                throw new Error("Error fetching categories");
            }
            const { data } = await response.json();
            return data;
        },
    });
    return query;
}
