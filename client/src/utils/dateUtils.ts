export const startOfToday = (): number => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
};

export const minusDays = (date: Date, days: number): number => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - days
  ).getTime();
};
