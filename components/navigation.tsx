"use client";

import { useState } from "react";
import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { NavButton } from "./nav-button";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const t = useTranslations("nav");
    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMedia("(max-width: 1024px)", false);

    const routes = [
        { href: "/", label: t("overview") },
        { href: "/transactions", label: t("transactions") },
        { href: "/accounts", label: t("accounts") },
        { href: "/categories", label: t("categories") },
    ];

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={
                                    route.href === pathname ? "secondary" : "ghost"
                                }
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-auto">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                />
            ))}
        </nav>
    );
};
