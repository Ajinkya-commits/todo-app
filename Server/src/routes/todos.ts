import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createTodoInput, updateTodoInput } from "@ajinkya66/todo-common";


export const todosRouter = new Hono<{
  Bindings:{
    DATABASE_URL : string,
    JWT_SECRET : string,
  },
  Variables:{
    userId : string
   }
}>();

todosRouter.use('/*',async (c , next) => {
  const header = c.req.header("authorization") || "";
  try {
    const user = await verify(header,c.env.JWT_SECRET) as {id : string}
    if(user){
      c.set("userId",user.id);
      await next();
    }
  } catch (error) {
    console.error("token verfication failed..... :" ,error)
    c.status(403);
    return c.json({
      message : "you are not logged in",
    })
  }
})

todosRouter.post('/create',async (c) => {
  const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
      const body = await c.req.json();
      const validation = createTodoInput.safeParse(body);
      if(!validation.error?.errors){
        return c.json({error : validation.error?.errors},400);
      }
      const todos = await prisma.todo.create({
        data:{
          title : body.title,
          description : body.description,
          priority : body.priority,
          userId : body.userId,
        }
      });
      return c.json({todos});
      
    } catch (error) {
      c.status(411);
      return c.json({
        error : "failed to create todo"
      });
    }
});

todosRouter.get('/',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

 try {
  const userId = await c.req.query('userId')
  const todos = await prisma.todo.findMany({
    where:{
      userId : userId
    }
  })
  return c.json(todos)
 } catch (error) {
  return c.json({ error: 'Failed to retrieve To-Dos' }, 500);
 }
})

todosRouter.put('/:id',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
try {
  const id = c.req.param('id');

  const body = await c.req.json();
  const parsedData = updateTodoInput.parse(body);

  const updatedTodo = await prisma.todo.update({
    where : {
      id : id
    },
    data :parsedData, 
  })
  return c.json(updatedTodo);
} catch (error) {
  console.error(error);
    c.status(400);
    return c.json({ error: "Failed to update the todo" 
  });
}
});

todosRouter.delete('/:id',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

const id = c.req.param('id');
try {
  await prisma.todo.delete({
    where :{ id },
  })
  return c.json("Todo deleted successfully");
} catch (error) {
  return c.json({error : 'failed to delete todo'});
}
});