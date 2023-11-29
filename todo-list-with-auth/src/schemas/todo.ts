import { TodoModel } from "prisma/zod";

export const NewTodoSchema = TodoModel.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  createdById: true,
  completed: true,
});
