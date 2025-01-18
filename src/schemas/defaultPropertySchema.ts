import { PropertySubtype, PropertyType } from '@/types/enums/propertyEnum';
import * as z from 'zod';

export const defaultProperySchema = z.object({
  title: z.string().nonempty({ message: 'O título é obrigatório' }),
  price: z.string().nonempty({ message: 'O preço é obrigatório' }),
  condon_price: z.string().optional(),
  iptu: z.string().optional(),
  description: z.string().nonempty({ message: 'A descrição é obrigatória' }),
  Property_type: z.string(),
  Property_subtype: z.string().optional(),
  financeable: z.string(),
  bedroom: z.string().refine((val) => parseInt(val) >= 0, {
    message: 'O número de quartos é obrigatório',
  }),
  bathroom: z.string().refine((val) => parseInt(val) >= 0, {
    message: 'O número de banheiros é obrigatório',
  }),
  total_area: z.string().optional(),
  useful_area: z.string().optional(),
  parking_spaces: z.string().refine((val) => parseInt(val) >= 0, {
    message: 'O número de vagas de estacionamento é obrigatório',
  }),
  videotour_url: z.string().optional().nullable(),
  address: z.string().nonempty({ message: 'O CEP é obrigatório' }),
  realtorId: z
    .string()
    .refine((val) => parseInt(val) > 0, {
      message: 'O ID do corretor é obrigatório',
    }),
  property_features: z
    .object({
      serviceArea: z.boolean().optional(),
      bedroomClosets: z.boolean().optional(),
      kitchenCabinets: z.boolean().optional(),
      furnished: z.boolean().optional(),
      airConditioning: z.boolean().optional(),
      barbecueGrill: z.boolean().optional(),
      balcony: z.boolean().optional(),
      gym: z.boolean().optional(),
      swimmingPool: z.boolean().optional(),
      serviceRoom: z.boolean().optional(),
    })
    .optional(),
  condo_features: z
    .object({
      gatedCommunity: z.boolean().optional(),
      elevator: z.boolean().optional(),
      security24h: z.boolean().optional(),
      concierge: z.boolean().optional(),
      petsAllowed: z.boolean().optional(),
      gym: z.boolean().optional(),
      swimmingPool: z.boolean().optional(),
      partyHall: z.boolean().optional(),
      playground: z.boolean().optional(),
    })
    .optional(),
});

export type TypeFormData = z.infer<typeof defaultProperySchema>;