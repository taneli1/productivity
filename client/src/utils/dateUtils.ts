export const startOfToday = (): number => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
};
