"use server";
import { type Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { NewTodoSchema } from "~/schemas/todo";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

export const action = createSafeActionClient();

export const addTodo = action(
  NewTodoSchema,
  async ({ name, priorityId, description, categoryId }) => {
    try {
      const session = await getServerSession(authOptions);
      const newTodo = await db.todo.create({
        data: {
          name,
          createdById: session?.user.id,
          priorityId: priorityId,
          categoryId: categoryId,
          description,
          status: "TO_DO",
        },
      });
      return {
        todo: newTodo,
      };
      // await getQueryClient().invalidateQueries({
      //   queryKey: ["todos"],
      // });
      // redirect("/");
    } catch (error) {
      return {
        message: "Error happened",
      };
    }
  },
);

export const editTodo = action(
  NewTodoSchema.extend({
    id: z.number().int(),
  }),
  async ({ name, priorityId, description, categoryId, id }) => {
    try {
      const session = await getServerSession(authOptions);
      await db.todo.update({
        where: {
          id,
        },
        data: {
          name,
          createdById: session?.user.id,
          priorityId: priorityId,
          categoryId: categoryId,
          description,
          status: "TO_DO",
        },
      });
      // await getQueryClient().invalidateQueries({
      //   queryKey: ["todos"],
      // });
      // revalidatePath("/");
      // redirect("/");
    } catch (error) {
      return {
        message: "Error happened while updating",
      };
    }
  },
);

export const changeTodoStatus = action(
  z.object({
    status: z.string(),
    id: z.string(),
  }),
  async ({ id, status }) => {
    try {
      await db.todo.update({
        where: {
          id: +id,
        },
        data: {
          status: status as unknown as never,
        },
      });
      // await getQueryClient().invalidateQueries({
      //   queryKey: ["todos"],
      // });
      revalidatePath("/");
    } catch (error) {}
  },
);

export async function getTodos(userId: Todo["createdById"]) {
  return await db.todo.findMany({
    where: { createdById: userId },
    include: {
      category: {
        include: {
          todos: true,
          _count: true,
        },
      },
      priority: {
        include: {
          todos: true,
          _count: true,
        },
      },
    },
  });
}

// 100 -> 70 completed
// 100 -> 100 / 100 => 1 * (completed.length)

export async function deleteTodo(id: Todo["id"]) {
  await db.todo.delete({
    where: {
      id: +id,
    },
  });
  revalidatePath("/");
}

export async function clearTodos() {
  await db.todo.deleteMany();
  revalidatePath("/");
}

export async function getTableCategoryAndPriority() {
  const categories = await db.category.findMany({});
  const priorities = await db.priority.findMany({});
  return {
    categories: categories?.map((c) => ({
      value: c.id,
      label: c.name,
      icon: undefined,
    })),
    priorities: priorities?.map((p) => ({
      value: p.name,
      label: p.name,
      icon: undefined,
    })),
  };
}
export async function getCategories() {
  return await db.category.findMany();
}

export async function getPriorites() {
  return await db.priority.findMany();
}
export async function getFormInfo() {
  const categories = await getCategories();
  const priorities = await getPriorites();
  return {
    categories,
    priorities,
  };
}
export async function getTasksByStatus(status: Todo["status"]) {
  return await db.todo.findMany({
    where: {
      status,
    },
  });
}
