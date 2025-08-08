"use client";

import { usePathname } from "next/navigation";
import { NavButton } from "./nav-button";

const routes = [
    {
        href: "/",
        label: "Overview",
    },
    {
        href: "/transaction",
        label: "Transaction",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    },
];


export const Navigation = () => {
    const pathname = usePathname();

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
    )
}