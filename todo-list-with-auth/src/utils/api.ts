"use server";
import { db } from "~/server/db";
import { percentageCalculator } from "./percentage-calculator";

export async function getInfo() {
  const tasks = await db.todo.findMany({});
  const completedTasks = tasks.filter((task) => task.status === "COMPLETED");
  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
  const tasksToDo = tasks.filter((task) => task.status === "TO_DO");
  const cancelledTasks = tasks.filter((task) => task.status === "CANCELLED");
  const lateTasks = tasks.filter((task) => task.status === "LATE");

  return {
    tasksToDo: percentageCalculator({
      numberOfTodos: tasks.length,
      compareNumber: tasksToDo.length,
    }),
    count: `${tasks.length}`,
    completedTasksPercent: percentageCalculator({
      numberOfTodos: tasks.length,
      compareNumber: completedTasks.length,
    }),
    inProgressTasksPercent: percentageCalculator({
      numberOfTodos: tasks.length,
      compareNumber: inProgressTasks.length,
    }),
    cancelledTasksPercent: percentageCalculator({
      numberOfTodos: tasks.length,
      compareNumber: cancelledTasks.length,
    }),
    lateTasksPercent: percentageCalculator({
      numberOfTodos: tasks.length,
      compareNumber: lateTasks.length,
    }),
  };
}
export async function getChartInfo() {
  const todos = await db.todo.groupBy({
    by: ["createdAt"],
    orderBy: {
      createdAt: "desc",
    },
    _count: true,
  });
  return todos;
}
