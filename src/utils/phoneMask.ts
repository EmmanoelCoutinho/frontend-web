export const phoneMask = (value: string) => {
  if (!value) return '';

  let formattedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  formattedValue = formattedValue.replace(/^(\d{2})(\d)/, '($1) $2'); // Adiciona parênteses ao DDD
  formattedValue = formattedValue.replace(/(\d)(\d{4})$/, '$1-$2'); // Adiciona hífen ao número
  return formattedValue
};
