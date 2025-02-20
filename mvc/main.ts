import { Application } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import { router } from "./router.ts";

const app = new Application();

app.use(async (ctx, next) => {
  console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
  await next();
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal Server Error" };
  }
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

const port = parseInt(Deno.env.get("PORT")!) || 8080;

console.log(`API is running on http://localhost:${port}`);
await app.listen({ port });
