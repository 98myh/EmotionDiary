export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10); //0~9까지
};
