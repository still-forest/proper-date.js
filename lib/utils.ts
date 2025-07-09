import ProperDate from "./model";

export const buildUtcDate = (year: number, month: number, day: number): Date => {
  return new Date(Date.UTC(year, month - 1, day))
}

export const buildUtcDateFromString = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);
  return buildUtcDate(year, month, day);
}

export const parseInput = (date: ProperDate | Date | string | number[]) => {
  let year: number;
  let month: number;
  let day: number;

  if (date instanceof ProperDate) {
    year = date.year;
    month = date.month;
    day = date.day;
  } else if (date instanceof Date) {
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
  } else if (Array.isArray(date) && date.length === 3) {
    const parsedDate = buildUtcDate(date[0], date[1], date[2]);
    year = parsedDate.getFullYear();
    month = parsedDate.getMonth();
    day = parsedDate.getDate();
  } else if (typeof date === "string" && isValidDateFormat(date)) {
    const parsedDate = buildUtcDateFromString(date);
    year = parsedDate.getFullYear();
    month = parsedDate.getMonth();
    day = parsedDate.getDate();
  } else {
    throw new Error("Date must be either a Date, ProperDate, or YYYY-MM-DD formatted string");
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
  const date = buildUtcDateFromString(dateString);
  const [year, month, day] = dateString.split("-").map(Number);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
