import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
    "use server"

    const title = data.get("title")?.valueOf()
    if (typeof title !== "string" || title.length === 0) {
        return new Error("Invalid Title")
    }

    await prisma.todo.create({data: {title: title, complete: false}})
    redirect("/")
}

export default function Page() {
  return (
    <>
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl">test</h1>
        </header>
        <form action={createTodo} className="flex gap-1 flex-col">
            <input 
            type="text" 
            name="title"
            className="border border-size-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
            />
        <div className="flex gap-2  justify-end">
            <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
            <button type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
            >
                Create
            </button>
        </div>
        </form>
    </>
  )
}