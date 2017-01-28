export const formatCurrency = (n = 0) => n.toLocaleString('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
