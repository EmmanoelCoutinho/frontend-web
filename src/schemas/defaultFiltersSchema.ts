import * as z from 'zod';

export const defaultFiltersSchema = z.object({
  type: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  financing: z.boolean().optional(),
  minPrice: z
    .string()
    .transform((value) => {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    })
    .optional(),
  maxPrice: z
    .string()
    .transform((value) => {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    })
    .optional(),
});

export type TypeFormData = z.infer<typeof defaultFiltersSchema>;
