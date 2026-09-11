"use server";

import { cookies } from "next/headers";

import { locales, defaultLocale, type Locale } from "./config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<Locale> {
    const cookieStore = await cookies();
    const value = cookieStore.get(COOKIE_NAME)?.value;

    return (locales as readonly string[]).includes(value ?? "")
        ? (value as Locale)
        : defaultLocale;
}

export async function setUserLocale(locale: Locale) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
    });
}
