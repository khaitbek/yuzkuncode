"use server";
import { type Todo } from "@prisma/client";
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

export async function getInfo() {
  const tasks = await db.todo.findMany({});
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED");
  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
  const tasksToDo = tasks.filter((task) => task.status === "TO_DO");
  const cancelledTasks = tasks.filter((task) => task.status === "CANCELLED");

  return {
    tasksToDo: `${tasksToDo.length}`,
    count: `${tasks.length}`,
    completedTasksPercent: `${
      Math.floor(tasks.length / 100) * completedTasks.length
    }%`,
    inProgressTasksPercent: `${
      Math.floor(tasks.length / 100) * inProgressTasks.length
    }%`,
    cancelledTasksPercent: `${
      Math.floor(tasks.length / 100) * cancelledTasks.length
    }%`,
  };
}
