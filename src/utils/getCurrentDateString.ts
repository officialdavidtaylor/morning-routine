/** outputs the date as a string in the format YYYY-MM-DD */
export const getCurrentDateString = () => {
  const now = new Date();
  const tzOffset = now.getTimezoneOffset();
  const dateWithOffset = new Date(now.getTime() - tzOffset * 60 * 1000);
  const dateString = dateWithOffset.toISOString().split('T')[0];
  return dateString;
};
