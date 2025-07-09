import ProperDate from "./model";

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
    year = date[0];
    month = date[1];
    day = date[2];
  } else if (typeof date === "string" && isValidDateString(date)) {
    const parsedDate = new Date(date);
    year = parsedDate.getFullYear();
    month = parsedDate.getMonth() + 1; // JS Date is 0-indexed, so we add 1 to get the correct day
    day = parsedDate.getDate() + 1; // JS Date is 0-indexed, so we add 1 to get the correct day
  } else {
    throw new Error(
      `[proper-date.js] Invalid date input: must be either a Date, ProperDate, a YYYY-MM-DD formatted string, or an array of [year, month, day]; got ${date} of type ${typeof date}`,
    );
  }
  return { year, month, day };
};

function isValidDateString(dateString: string): boolean {
  // This pattern checks for YYYY-MM-DD format and basic validity
  const pattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!pattern.test(dateString)) {
    return false;
  }

  return true;

  // Further validate the date is real
  const date = new Date(dateString);
  const [year, month, day] = dateString.split("-").map(Number);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
