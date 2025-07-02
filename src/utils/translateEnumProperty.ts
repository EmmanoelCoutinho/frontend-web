export const translateEnumProperty = (enumValue: string) => {
  switch (enumValue) {
    case 'HOUSE':
      return 'Casa';
    case 'APARTMENT':
      return 'Apartamento';
    case 'LAND':
      return 'Terreno';
    case 'COMMERCIAL':
      return 'Comercial'
  }
};

export const reverseTranslateEnumProperty = (translatedValue: string | undefined) => {
  switch (translatedValue) {
    case 'Casa':
      return 'HOUSE';
    case 'Apartamento':
      return 'APARTMENT';
    case 'Terreno':
      return 'LAND';
    default:
      return null;
  }
};
