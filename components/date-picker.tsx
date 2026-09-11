"use client";

import { format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, dateFnsLocale } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
    value?: Date;
    onChange: (date?: Date) => void;
    disabled?: boolean;
};

export const DatePicker = ({ value, onChange, disabled }: Props) => {
    const t = useTranslations("common");
    const locale = useLocale() as Locale;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon className="size-4 mr-2" />
                    {value ? (
                        format(value, "PPP", { locale: dateFnsLocale(locale) })
                    ) : (
                        <span>{t("pickDate")}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date)}
                    disabled={disabled}
                    autoFocus
                    locale={dateFnsLocale(locale)}
                />
            </PopoverContent>
        </Popover>
    );
};
