import * as z from 'zod';

export const defaultLoginSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});

export type TypeFormData = z.infer<typeof defaultLoginSchema>;
