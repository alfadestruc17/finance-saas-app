import { clerkMiddleware as honoClerkMiddleware } from "@hono/clerk-auth";

/**
 * `@hono/clerk-auth` lee `CLERK_PUBLISHABLE_KEY` (sin el prefijo `NEXT_PUBLIC_`)
 * cuando no se le pasan opciones, así que fallaría con la variable estándar de
 * Next (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`). Pasamos las claves explícitamente
 * para no depender de una variable de entorno duplicada.
 */
export const clerkMiddleware = () =>
    honoClerkMiddleware({
        secretKey: process.env.CLERK_SECRET_KEY,
        publishableKey:
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
            process.env.CLERK_PUBLISHABLE_KEY,
    });
