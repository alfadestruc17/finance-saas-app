import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { createId } from "@paralleldrive/cuid2";
import { eachDayOfInterval, subDays, format } from "date-fns";

import * as schema from "../db/schema";
import { convertAmountToMiliunits } from "../lib/utils";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const SEED_USER_ID = process.env.SEED_USER_ID;

const SEED_CATEGORIES = [
    "Comida",
    "Alquiler",
    "Servicios",
    "Ropa",
    "Salud",
    "Transporte",
    "Entretenimiento",
    "Sueldo",
];

const SEED_ACCOUNTS = ["Cuenta corriente", "Ahorros", "Efectivo"];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const generateTransactionsForDay = (
    day: Date,
    accountIds: string[],
    categoryIds: string[],
) => {
    const numTransactions = randomInt(1, 4);
    const rows: (typeof schema.transactions.$inferInsert)[] = [];

    for (let i = 0; i < numTransactions; i++) {
        const isExpense = Math.random() > 0.6;
        const amount = isExpense
            ? convertAmountToMiliunits(randomInt(5, 200) * -1)
            : convertAmountToMiliunits(randomInt(100, 2500));

        rows.push({
            id: createId(),
            accountId: accountIds[randomInt(0, accountIds.length - 1)],
            categoryId: categoryIds[randomInt(0, categoryIds.length - 1)],
            date: day,
            amount,
            payee: "Comercio de ejemplo",
            notes: "Transacción generada por el seed",
        });
    }

    return rows;
};

const main = async () => {
    if (!SEED_USER_ID) {
        console.error(
            "Falta SEED_USER_ID en .env.local (id de usuario de Clerk).",
        );
        process.exit(1);
    }

    try {
        // Solo para desarrollo: limpia todas las tablas antes de sembrar.
        await db.delete(schema.transactions);
        await db.delete(schema.accounts);
        await db.delete(schema.categories);

        const accounts = SEED_ACCOUNTS.map((name) => ({
            id: createId(),
            name,
            userId: SEED_USER_ID,
        }));
        const categories = SEED_CATEGORIES.map((name) => ({
            id: createId(),
            name,
            userId: SEED_USER_ID,
        }));

        await db.insert(schema.accounts).values(accounts);
        await db.insert(schema.categories).values(categories);

        const accountIds = accounts.map((a) => a.id);
        const categoryIds = categories.map((c) => c.id);

        const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
        const transactions = days.flatMap((day) =>
            generateTransactionsForDay(day, accountIds, categoryIds),
        );

        for (let i = 0; i < transactions.length; i += 100) {
            await db
                .insert(schema.transactions)
                .values(transactions.slice(i, i + 100));
        }

        console.log(
            `Seed completado: ${accounts.length} cuentas, ${categories.length} categorías, ${transactions.length} transacciones (${format(defaultFrom, "yyyy-MM-dd")} -> ${format(defaultTo, "yyyy-MM-dd")}).`,
        );
    } catch (error) {
        console.error("Error durante el seed:", error);
        process.exit(1);
    }
};

main();
