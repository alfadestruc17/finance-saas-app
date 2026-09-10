"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const AccountFilter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const accountId = params.get("accountId") || "all";
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
    const { isLoading: isLoadingSummary } = useGetSummary();

    const onChange = (newValue: string) => {
        const query = new URLSearchParams();
        if (from) query.set("from", from);
        if (to) query.set("to", to);
        if (newValue && newValue !== "all") query.set("accountId", newValue);

        const queryString = query.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname);
    };

    return (
        <Select
            value={accountId}
            onValueChange={onChange}
            disabled={isLoadingAccounts || isLoadingSummary}
        >
            <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
                <SelectValue placeholder="Cuenta" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todas las cuentas</SelectItem>
                {accounts?.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                        {account.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
