const dateToLocale = dateStr => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

export default dateToLocale;
