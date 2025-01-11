import { PropertyType, PropertySubtype } from '@/types/enums/propertyEnum';

export const propertyTypes = [
  { title: 'Casa', value: PropertyType.HOUSE },
  { title: 'Apartamento', value: PropertyType.APARTMENT },
  { title: 'Terreno', value: PropertyType.LAND },
];

export const propertySubtypes = [
  { title: 'Casa Padrão', value: PropertySubtype.DEFAULT_HOUSE },
  { title: 'Apartamento Padrão', value: PropertySubtype.DEFAULT_APARTMENT },
  { title: 'Casa em Vila', value: PropertySubtype.HOUSE_IN_VILLAGE },
  { title: 'Casa em Condomínio', value: PropertySubtype.HOUSE_IN_CONDO },
  { title: 'Cobertura', value: PropertySubtype.PENTHOUSE_APARTMENT },
  { title: 'Duplex/Triplex', value: PropertySubtype.DUPLEX_OR_TRIPLEX },
  { title: 'Kitnet', value: PropertySubtype.KITNET },
  { title: 'Loft', value: PropertySubtype.LOFT },
];
