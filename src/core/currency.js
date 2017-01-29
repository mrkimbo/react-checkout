let settings = {
  locale: 'en-AU',
  currencyCode: 'AUD',
  precision: 2
};

export const formatCurrency = (n = 0) => n.toLocaleString(settings.locale, {
  style: 'currency',
  currency: settings.currencyCode,
  minimumFractionDigits: settings.precision,
  maximumFractionDigits: settings.precision
});

export default {
  settings
};
