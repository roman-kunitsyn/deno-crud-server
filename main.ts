import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";

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

interface Todo {
  id: string;
  data: unknown;
  createdAt: string;
}

let todos: Todo[] = [];

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Welcome to the API!";
});

router.get("/todos", (ctx) => {
  ctx.response.body = { todos: todos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body.json();

  const newTodo: Todo = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    data,
  };

  todos.push(newTodo);
  ctx.response.body = { message: "Created todo", todo: newTodo };
});

router.post("/todos/list", async (ctx) => {
  const data = await ctx.request.body.json();
  const list = data.map((item: unknown) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      data: item,
    };
    return newTodo;
  });

  todos.push(...list);
  ctx.response.body = { message: "Created todo list", todo: todos };
});

router.get("/todos/:todoId", (ctx) => {
  const todoId = ctx.params.todoId;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    ctx.response.body = { message: "Get todo", todo: todos[todoIndex] };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Todo not found" };
  }
});

router.put("/todos/:todoId", async (ctx) => {
  const todoId = ctx.params.todoId;
  const data = await ctx.request.body.json();
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], data };
    ctx.response.body = { message: "Updated todo", todo: todos[todoIndex] };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Todo not found" };
  }
});

router.delete("/todos/:todoId", (ctx) => {
  const todoId = ctx.params.todoId;
  const initialLength = todos.length;
  todos = todos.filter((todo) => todo.id !== todoId);

  if (todos.length < initialLength) {
    ctx.response.body = { message: "Deleted todo" };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { message: "Todo not found" };
  }
});

router.delete("/todos/all", (ctx) => {
  todos = [];
  ctx.response.body = { message: "Deleted all todos" };
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

const port = parseInt(Deno.env.get("PORT")!) || 8080;

console.log(`API is running on http://localhost:${port}`);
await app.listen({ port });
