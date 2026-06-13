export const buildWhatsAppUrl = (whatsappNumber: string, productName: string): string => {
  const sanitizedNumber = whatsappNumber.replace(/\D/g, '');
  const message = encodeURIComponent(`Hello, I am interested in ${productName}.`);
  return `https://wa.me/${sanitizedNumber}?text=${message}`;
};

export const openWhatsApp = (whatsappNumber: string, productName: string): void => {
  const url = buildWhatsAppUrl(whatsappNumber, productName);
  window.open(url, '_blank', 'noopener,noreferrer');
};
