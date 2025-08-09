import { Hono } from 'hono'

import { db } from '@/db/drizzle'
import { accounts, insertAccountSchema } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { HTTPException } from 'hono/http-exception'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()
    .get(
        "/",
        clerkMiddleware(),

        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                throw new HTTPException(401, {
                    res: c.json({ error: "Unauthorized" }, 401)
                })
            }



            const data = await db
                .select({
                    id: accounts.id,
                    name: accounts.name,

                })
                .from(accounts)

            return c.json({ data })
        })
    .post(
        "/",
        clerkMiddleware(),
        zValidator("json", insertAccountSchema.pick({
            name: true,
        })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json")

            if (!auth?.userId) {
                throw new HTTPException(401, {
                    res: c.json({ error: "Unauthorized" }, 401)
                })
            }
            return c.json({})
        })

export default app 