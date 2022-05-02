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

export const formatSeconds = (seconds: number | undefined | null): string => {
  if (seconds === undefined || seconds === null || seconds === 0) {
    return "--";
  }

  if (seconds <= 59) {
    return seconds.toString() + "s";
  }

  return new Date(seconds * 1000).toISOString().substr(11, 5);
};
