"use client";

import { format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";

import { formatCurrency } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

type Payload = {
    value: number;
    payload: { date: string };
};

type Props = {
    active?: boolean;
    payload?: Payload[];
};

export const CustomTooltip = ({ active, payload }: Props) => {
    const t = useTranslations("summary");
    const locale = useLocale() as Locale;

    if (!active || !payload || payload.length === 0) return null;

    const date = payload[0].payload.date;
    const income = payload[0].value;
    const expenses = payload[1]?.value ?? 0;

    return (
        <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
            <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
                {format(date, locale === "en" ? "MMM dd, yyyy" : "dd MMM, yyyy")}
            </div>
            <div className="h-px bg-border" />
            <div className="p-2 px-3 space-y-1">
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 bg-blue-500 rounded-full" />
                        <p className="text-sm text-muted-foreground">{t("income")}</p>
                    </div>
                    <p className="text-sm text-right font-medium">
                        {formatCurrency(income, locale)}
                    </p>
                </div>
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 bg-rose-500 rounded-full" />
                        <p className="text-sm text-muted-foreground">{t("expenses")}</p>
                    </div>
                    <p className="text-sm text-right font-medium">
                        {formatCurrency(expenses * -1, locale)}
                    </p>
                </div>
            </div>
        </div>
    );
};
