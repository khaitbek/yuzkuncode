import * as z from "zod";
import {
  CompleteCategory,
  CompletePriority,
  CompleteUser,
  RelatedCategoryModel,
  RelatedPriorityModel,
  RelatedUserModel,
} from "./index";

export const TodoModel = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  description: z.string().nullish(),
  createdById: z.string().nullish(),
  completed: z.boolean(),
  priorityId: z.string(),
  categoryId: z.string(),
});

export interface CompleteTodo extends z.infer<typeof TodoModel> {
  createdBy?: CompleteUser | null;
  category: CompleteCategory;
  priority: CompletePriority;
}

/**
 * RelatedTodoModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoModel: z.ZodSchema<CompleteTodo> = z.lazy(() =>
  TodoModel.extend({
    createdBy: RelatedUserModel.nullish(),
    category: RelatedCategoryModel,
    priority: RelatedPriorityModel,
  }),
);
