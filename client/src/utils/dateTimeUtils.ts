export const startOfToday = (): number => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.getTime();
};

export const startOfDate = (timestamp: number): number => {
  const cp = new Date(timestamp);
  cp.setUTCHours(0, 0, 0, 0);
  return cp.getTime();
};

export const formatUnix = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const minusHours = (date: Date, hours: number): number => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours() - hours
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

export const getWeekDay = (timestamp: number): string => {
  const date = new Date(timestamp);
  let day;

  switch (date.getDay()) {
    case 0:
      day = "Mon";
      break;

    case 1:
      day = "Tue";
      break;

    case 2:
      day = "Wed";
      break;

    case 3:
      day = "Thu";
      break;

    case 4:
      day = "Fri";
      break;

    case 5:
      day = "Sat";
      break;

    case 6:
      day = "Sun";
      break;

    default:
      day = "";
      break;
  }

  return day;
};

export const getAllWeekDays = (): string[] => {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
};
