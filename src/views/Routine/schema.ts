import { z } from 'zod';
/** each task instance has three fields; an `id`, a `checked` state, and a `title` */
export const taskInstanceSchema = z.object({
  id: z.string(),
  title: z.string(),
  checked: z.boolean(),
});

export type TaskInstanace = z.infer<typeof taskInstanceSchema>;

export const routineSchema = z.object({
  version: z.literal('1.0'),
  // TODO: replace with z.string().date() on the next Zod release~
  dateLastUsed: z.string().refine((str: string) => {
    return (
      /^\d{4}-\d{2}-\d{2}$/.test(str) &&
      new Date(str).toISOString().startsWith(str)
    );
  }),
  tasks: z.array(taskInstanceSchema),
});
export type Routine = z.infer<typeof routineSchema>;
