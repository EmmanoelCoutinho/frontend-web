import { InterestEnum } from '@/types/enums/interestEnum';
import * as z from 'zod';

export const defaultContactSchema = z.object({
  name: z.string().min(3, { message: 'Nome é obrigatório' }),
  phone: z
    .string()
    .min(14, { message: 'Telefone Inválido' }),
  interest: z.nativeEnum(InterestEnum, {
    errorMap: (issue, _ctx) => {
      return { message: 'Campo obrigatório' };
    },
  }),
  message: z.string().min(3, { message: 'Campo obrigatório' }),
});

export type TypeFormData = z.infer<typeof defaultContactSchema>;
