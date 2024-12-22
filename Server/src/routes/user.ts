import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt";
import {loginInput, signupInput} from "@ajinkya66/todo-common"
 

export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL : string,
    JWT_SECRET : string,
  }
}>();


userRouter.post('/signup',async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    const validate = signupInput.safeParse(body);
    if(!validate.success){
      return c.json({error : validate.error.errors},400);
    }
    const user = await prisma.user.create({
      data:{
        email : body.email,
        password: body.password,
        name : body.name,
      },
    });
    const jwt = await sign({id : user.id}, c.env.JWT_SECRET);
    return c.json({
      jwt,
      userId : user.id,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message : "error during signup"
    })
  }
});


userRouter.post('/login',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  try {
    const body = await c.req.json();
    const validation = loginInput.safeParse(body);
    if(!validation.success){
      return c.json({error : validation.error.errors},400);
    }
    const user = await prisma.user.findUnique({
      where:{
        email : body.email,
        password : body.password,
      }
    });
    if(!user){
      c.status(403);
      return c.json({
        error : "user NOT found",
      })
    }
    const jwt = await sign({id : user.id},c.env.JWT_SECRET);
    return c.json({
      jwt,
      userId : user.id,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      error : "error during loginin"
    })
  }
})