import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { eachDayOfInterval, isSameDay, subDays, format } from "date-fns"
import { es as esDateLocale, enUS as enDateLocale } from "date-fns/locale"

import type { Locale } from "@/i18n/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

const intlLocale = (locale: Locale = "es") => (locale === "en" ? "en-US" : "es-ES");
export const dateFnsLocale = (locale: Locale = "es") =>
  locale === "en" ? enDateLocale : esDateLocale;

export function formatCurrency(value: number, locale: Locale = "es", currency = "USD") {
  return Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / Math.abs(previous)) * 100;
}

export function fillMissingDays(
  activeDays: { date: Date; income: number; expenses: number }[],
  startDate: Date,
  endDate: Date,
) {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) {
      return found;
    }

    return {
      date: day,
      income: 0,
      expenses: 0,
    };
  });

  return transactionsByDay;
}

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period, locale: Locale = "es") {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);
  const opts = { locale: dateFnsLocale(locale) };

  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd", opts)} - ${format(defaultTo, "LLL dd, y", opts)}`;
  }

  if (period.to) {
    return `${format(period.from, "LLL dd", opts)} - ${format(period.to, "LLL dd, y", opts)}`;
  }

  return format(period.from, "LLL dd, y", opts);
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false },
  locale: Locale = "es",
) {
  const result = new Intl.NumberFormat(intlLocale(locale), {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
}
