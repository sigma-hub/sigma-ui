import { z } from 'zod';

export const tableSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Table = z.infer<typeof tableSchema>;
