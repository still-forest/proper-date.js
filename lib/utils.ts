import ProperDate from "./model";

export const buildLocalDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day);
};

export const buildUTCDate = (year: number, month: number, day: number): Date => {
  return new Date(Date.UTC(year, month - 1, day));
};

export const buildLocalDateFromString = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);
  return buildLocalDate(year, month, day);
};

export const parseInput = (date: ProperDate | string | number[]) => {
  let year: number;
  let month: number;
  let day: number;

  if (date instanceof ProperDate) {
    year = date.year;
    month = date.month;
    day = date.day;
  } else if (Array.isArray(date) && date.length === 3) {
    const parsedDate = buildLocalDate(date[0], date[1], date[2]);
    year = parsedDate.getFullYear();
    month = parsedDate.getMonth();
    day = parsedDate.getDate();
  } else if (typeof date === "string" && isValidDateFormat(date)) {
    const parsedDate = buildLocalDateFromString(date);
    year = parsedDate.getFullYear();
    month = parsedDate.getMonth();
    day = parsedDate.getDate();
  } else {
    throw new Error(
      "[proper-date.js] Input must be either a ProperDate, YYYY-MM-DD formatted string, or an array of [year, month, day]. Received: " +
        date +
        " of type " +
        typeof date,
    );
  }
  return { year, month, day };
};

function isValidDateFormat(dateString: string): boolean {
  // This pattern checks for YYYY-MM-DD format and basic validity
  const pattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!pattern.test(dateString)) {
    return false;
  }

  // Further validate the date is real
  const date = buildLocalDateFromString(dateString);
  const [year, month, day] = dateString.split("-").map(Number);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
