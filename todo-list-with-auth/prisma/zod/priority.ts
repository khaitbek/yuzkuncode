import * as z from "zod"
import { CompleteTodo, RelatedTodoModel } from "./index"

export const PriorityModel = z.object({
  id: z.string(),
  name: z.string(),
})

export interface CompletePriority extends z.infer<typeof PriorityModel> {
  todos: CompleteTodo[]
}

/**
 * RelatedPriorityModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPriorityModel: z.ZodSchema<CompletePriority> = z.lazy(() => PriorityModel.extend({
  todos: RelatedTodoModel.array(),
}))
