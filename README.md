# Finance App

Aplicación de gestión de finanzas personales: cuentas, categorías, transacciones,
importación de CSV y un panel con métricas y gráficos.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Hono** como capa de API (`app/api/[[...route]]`) con cliente RPC tipado (`lib/hono.ts`)
- **Clerk** para autenticación
- **Drizzle ORM** + **Neon** (PostgreSQL serverless)
- **TanStack Query** para el estado del servidor en el cliente
- **Tailwind CSS 4** + **shadcn/ui** (Radix) para la UI
- **Recharts** para los gráficos del panel
- **Zod** + **react-hook-form** para formularios y validación

## Requisitos

- Node.js 18.17 o superior
- pnpm 9 o superior
- Una base de datos PostgreSQL (recomendado: [Neon](https://neon.tech))
- Un proyecto de [Clerk](https://dashboard.clerk.com)

## Puesta en marcha

1. Instala dependencias:

   ```bash
   pnpm install
   ```

2. Configura las variables de entorno:

   ```bash
   cp .env.example .env.local
   ```

   Rellena `DATABASE_URL`, las claves de Clerk y `NEXT_PUBLIC_APP_URL`.

3. Sincroniza el esquema con la base de datos:

   ```bash
   pnpm db:push
   ```

   (o `pnpm db:generate` + `pnpm db:migrate` si prefieres migraciones versionadas.)

4. (Opcional) Siembra datos de ejemplo. Necesita `SEED_USER_ID` en `.env.local`
   (el id de tu usuario de Clerk):

   ```bash
   pnpm db:seed
   ```

5. Arranca el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

   Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Script            | Descripción                                             |
| ----------------- | ------------------------------------------------------- |
| `pnpm dev`        | Servidor de desarrollo (Turbopack)                     |
| `pnpm build`      | Build de producción                                    |
| `pnpm start`      | Sirve el build de producción                           |
| `pnpm lint`       | ESLint                                                 |
| `pnpm db:generate`| Genera migraciones SQL a partir de `db/schema.ts`      |
| `pnpm db:migrate` | Aplica las migraciones (`scripts/migrate.ts`)          |
| `pnpm db:push`    | Empuja el esquema directamente a la base de datos      |
| `pnpm db:studio`  | Abre Drizzle Studio                                    |
| `pnpm db:seed`    | Siembra datos de ejemplo (`scripts/seed.ts`)           |

## Estructura

```
app/
  (auth)/            Páginas de Clerk (sign-in / sign-up)
  (dashboard)/       Panel: resumen, accounts, categories, transactions
  api/[[...route]]/  API con Hono: accounts, categories, transactions, summary
components/          Componentes compartidos + components/ui (shadcn)
db/                  Esquema de Drizzle y cliente de conexión
drizzle/             Migraciones generadas
features/            Módulos por dominio (api hooks, componentes, stores)
hooks/               Hooks genéricos (use-confirm, ...)
lib/                 Utilidades (cn, formato de moneda, cliente Hono, ...)
scripts/             migrate.ts, seed.ts
```

Cada feature en `features/<dominio>` sigue el mismo patrón: `api/` (hooks de
TanStack Query sobre el cliente RPC de Hono), `components/` (formularios y
sheets) y `hooks/` (stores de Zustand para abrir/cerrar los sheets).

## Notas

- Las migraciones de `drizzle/` se regeneraron desde cero para el formato actual
  de `drizzle-kit`. Si ya tenías una base de datos previa, usa `pnpm db:push`.
- El módulo de conexión bancaria (Plaid) y el de suscripción no están incluidos.
