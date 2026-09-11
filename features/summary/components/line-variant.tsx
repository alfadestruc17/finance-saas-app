"use client";

import {
    Tooltip,
    XAxis,
    LineChart,
    Line,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import { useLocale } from "next-intl";

import { dateFnsLocale } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { CustomTooltip } from "./custom-tooltip";

type Props = {
    data: {
        date: string;
        income: number;
        expenses: number;
    }[];
};

export const LineVariant = ({ data }: Props) => {
    const locale = useLocale() as Locale;

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MMM", { locale: dateFnsLocale(locale) })}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    dot={false}
                    dataKey="income"
                    stroke="#3d82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Line
                    dot={false}
                    dataKey="expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
