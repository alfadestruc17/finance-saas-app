"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    columnIndex: number;
    selectedColumns: Record<string, string | null>;
    onChange: (columnIndex: number, value: string | null) => void;
};

const options = ["amount", "payee", "date"];

export const TableHeadSelect = ({
    columnIndex,
    selectedColumns,
    onChange,
}: Props) => {
    const t = useTranslations("transactions");
    const currentSelection = selectedColumns[`column_${columnIndex}`];

    const optionLabels: Record<string, string> = {
        amount: t("form.amount"),
        payee: t("form.payee"),
        date: t("columns.date"),
    };

    return (
        <Select
            value={currentSelection || ""}
            onValueChange={(value) => onChange(columnIndex, value)}
        >
            <SelectTrigger
                className={cn(
                    "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
                    currentSelection && "text-blue-500",
                )}
            >
                <SelectValue placeholder={t("import.skip")} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="skip">{t("import.skip")}</SelectItem>
                {options.map((option, index) => {
                    const disabled =
                        Object.values(selectedColumns).includes(option) &&
                        selectedColumns[`column_${columnIndex}`] !== option;

                    return (
                        <SelectItem
                            key={index}
                            value={option}
                            disabled={disabled}
                        >
                            {optionLabels[option]}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};
