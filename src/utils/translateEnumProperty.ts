import { PropertyType } from "@/types/enums/propertyEnum";


export const translateEnumProperty = (enumValue: string) => {
  switch (enumValue) {
    case 'HOUSE':
      return 'Casa';
    case 'APARTAMENT':
      return 'Apartamento';
    case 'LAND':
      return 'Terreno'
  }
};