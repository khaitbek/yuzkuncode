"use server";

import { Todo } from "@prisma/client";
import { db } from "~/server/db";

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
export async function getCategories() {
  return await db.category.findMany();
}

export async function getPriorites() {
  return await db.priority.findMany();
}
