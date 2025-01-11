export function redirectWhatsapp(
  message?: string,
  phone?: string,
) {
  const text = message ? `/?text=${message}` : '';

  window.open(`https://wa.me/${phone ?? '5591981999538'}${text}`, '_blank');
  return;
}
