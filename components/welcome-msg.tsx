"use client";

import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export const WelcomeMsg = () => {
    const { user, isLoaded } = useUser();
    const t = useTranslations("header");

    const name = isLoaded && user?.firstName ? `, ${user.firstName}` : "";

    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-4xl text-white font-medium">
                {t("welcomeBack", { name })}
            </h2>
            <p className="text-sm lg:text-base text-[#89b6fd]">
                {t("subtitle")}
            </p>
        </div>
    );
};
