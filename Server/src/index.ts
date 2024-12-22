import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user'
import { todosRouter } from './routes/todos'

const app = new Hono()

app.use(cors());

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/user',userRouter);
app.route('/api/v1/todos',todosRouter);


export default app
