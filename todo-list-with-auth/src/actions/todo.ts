"use server";

import { type Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

export async function addTodo(data: FormData) {
  const session = await getServerSession(authOptions);
  const name = data.get("name") as string;
  await db.todo.create({
    data: {
      name,
      createdById: session?.user.id,
    },
  });
  redirect("/");
}

export async function deleteTodo(id: Todo["id"]) {
  await db.todo.delete({
    where: {
      id: +id,
    },
  });
  revalidatePath("/");
}
