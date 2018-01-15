export const formatDateTime = (value: Date, locale: string) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  };
  return value.toLocaleString(locale, options);
};
