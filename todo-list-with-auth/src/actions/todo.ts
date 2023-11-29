"use server";
import { type Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { NewTodoSchema } from "~/schemas/todo";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

export const action = createSafeActionClient();

export const addTodo = action(
  NewTodoSchema,
  async ({ name, priorityId, description, categoryId }) => {
    try {
      const session = await getServerSession(authOptions);
      await db.todo.create({
        data: {
          name,
          createdById: session?.user.id,
          priorityId: priorityId,
          categoryId: categoryId,
          description,
        },
      });
      return {
        message: "Successfully added",
      };
    } catch (error) {
      return {
        message: "Error happened",
      };
    }
  },
);

export async function getTodos(userId: Todo["createdById"]) {
  return await db.todo.findMany({ where: { createdById: userId } });
}

export async function deleteTodo(id: Todo["id"]) {
  await db.todo.delete({
    where: {
      id: +id,
    },
  });
  revalidatePath("/");
}
