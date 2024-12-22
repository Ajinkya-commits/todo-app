import z from 'zod';

export const signupInput = z.object({
  email : z.string().email(),
  password: z.string().min(6,"password must be of length 6"),
  name : z.string().optional(),
});


export const loginInput = z.object({
  email : z.string().email(),
  password : z.string().min(6,"Password must be of 6 length"),
})


export const createTodoInput = z.object({
  title : z.string().min(1,"Title is required"),
  description : z.string(),
  priority : z.enum(["High","Medium","Low"]),
  userId: z.string().regex(/^\d+$/, "userId must be a numeric string"),
})


export const updateTodoInput = z.object({
  title: z.string().min(1, "Title cannot be empty").optional(),
  description: z.string().optional(), 
  priority: z.enum(["High", "Medium", "Low"]).optional(), 
  completed: z.boolean().default(false).optional(),
})


export type SignupInput = z.infer<typeof signupInput>;
export type LoginInput = z.infer<typeof loginInput>
export type CreateTodoInput = z.infer<typeof createTodoInput>
export type UpdateTodoInput = z.infer<typeof updateTodoInput>
