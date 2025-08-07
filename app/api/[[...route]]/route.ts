import { z } from 'zod';
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { zValidator } from '@hono/zod-validator';

export const runtime = 'edge';

const app = new Hono().basePath('/api');


app.get('/hello', (c) => {
    return c.json({
        message: "hello world"
    })
})
    .get('/hello/:test',
        (c) => {
            return c.json({
                message: "hello world"
            })
        })
    .post("/",
        zValidator("json", z.object({
            name: z.string(),
            userId: z.string(),
        })),
        (c) => {
            const { } = c.req.valid("json");

            return c.json({})
        })

export const POST = handle(app);
export const GET = handle(app);