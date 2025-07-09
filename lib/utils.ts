import ProperDate from "./model";

export const parseInput = (date: ProperDate | Date | string) => {
  let year: number;
  let month: number;
  let day: number;

  if (date instanceof ProperDate) {
    year = date.year;
    month = date.month;
    day = date.day;
  } else if (date instanceof Date) {
    const dateString = date.toISOString().split("T")[0];
    [year, month, day] = dateString.split("-").map(Number);
  } else if (typeof date === "string" && isValidDateFormat(date)) {
    [year, month, day] = date.split("-").map(Number);
  } else {
    throw new Error(
      `[proper-date.js] Invalid date input: must be either a Date, ProperDate, or YYYY-MM-DD formatted string; got ${date} of type ${typeof date}`,
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
  const date = new Date(dateString);
  const [year, month, day] = dateString.split("-").map(Number);
  console.debug("isValidDateFormat", {
    dateString,
    year,
    month,
    day,
    date,
    dateYear: date.getFullYear(),
    dateMonth: date.getMonth(),
    dateDay: date.getDate(),
    dateYearEqualsYear: date.getFullYear() === year,
    dateMonthEqualsMonth: date.getMonth() === month,
    dateDayEqualsDay: date.getDate() === day,
  });
  if (date.getFullYear() !== year) {
    return false;
  }
  if (month < 1 || month > 12) {
    return false;
  }
  if (day < 1 || day > 31) {
    return false;
  }

  return true;
}
