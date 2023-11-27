import { z } from "zod";

export const addTodoSchema = z.object({
  name: z.string().min(2, "Your task must have at least 2 characters"),
});
