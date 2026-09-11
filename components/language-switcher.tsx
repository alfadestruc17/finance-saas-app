"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";

import { locales, type Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const LanguageSwitcher = () => {
    const locale = useLocale();
    const t = useTranslations("languageSwitcher");
    const [isPending, startTransition] = useTransition();

    const onChange = (value: string) => {
        startTransition(() => {
            setUserLocale(value as Locale);
        });
    };

    return (
        <Select value={locale} onValueChange={onChange} disabled={isPending}>
            <SelectTrigger
                aria-label={t("label")}
                className="w-auto h-9 gap-2 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
            >
                <Languages className="size-4" />
                <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
                {locales.map((l) => (
                    <SelectItem key={l} value={l}>
                        {t(l)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
