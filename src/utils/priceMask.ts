export const priceMask = (value: string) => {
  if (!value) return '';
  const numberValue = parseFloat(value.replace(/\./g, ''));
  return new Intl.NumberFormat('pt-BR').format(numberValue);
};
