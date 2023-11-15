import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "../components/TodoItem"

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"
  await prisma.todo.update({where: {id}, data: { complete }})
}

export default async function Home() {
  const todos = await getTodos()
  // await prisma.todo.create({data: {title: "test", complete: false}});
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      🔥🍺🔥
      <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href = "/new">New</Link>
      🔥🍺🔥

      <ul className="pl-4">
        todos:
        {todos.map(todo =>(
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
        ) )}
      </ul>
    </main>
  )
}
