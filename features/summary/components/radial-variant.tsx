"use client";

import {
    Cell,
    Legend,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
} from "recharts";
import { useLocale } from "next-intl";

import { formatCurrency } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
    data: {
        name: string;
        value: number;
    }[];
};

export const RadialVariant = ({ data }: Props) => {
    const locale = useLocale() as Locale;

    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadialBarChart
                cx="50%"
                cy="30%"
                barSize={10}
                innerRadius="90%"
                outerRadius="40%"
                data={data.map((item, index) => ({
                    ...item,
                    fill: COLORS[index % COLORS.length],
                }))}
            >
                <RadialBar
                    label={{
                        position: "insideStart",
                        fill: "#fff",
                        fontSize: "12px",
                    }}
                    background
                    dataKey="value"
                >
                    {data.map((_entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </RadialBar>
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    content={({ payload }) => {
                        return (
                            <ul className="flex flex-col space-y-2">
                                {(payload ?? []).map((entry, index) => (
                                    <li
                                        key={`item-${index}`}
                                        className="flex items-center space-x-2"
                                    >
                                        <span
                                            className="size-2 rounded-full"
                                            style={{ backgroundColor: entry.color }}
                                        />
                                        <div className="space-x-1">
                                            <span className="text-sm text-muted-foreground">
                                                {entry.value}
                                            </span>
                                            <span className="text-sm">
                                                {formatCurrency(
                                                    (entry.payload as unknown as { value: number })
                                                        .value,
                                                    locale,
                                                )}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        );
                    }}
                />
            </RadialBarChart>
        </ResponsiveContainer>
    );
};
