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
    const dateString = date.toISOString().split("T")[0];
    [year, month, day] = dateString.split("-").map(Number);
  } else if (Array.isArray(date) && date.length === 3) {
    year = date[0];
    month = date[1];
    day = date[2];
  } else if (typeof date === "string" && isValidDateString(date)) {
    const dateString = date;
    [year, month, day] = dateString.split("-").map(Number);
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

  // Further validate the date is real
  const date = new Date(dateString);
  const [year, month, day] = dateString.split("-").map(Number);

  if (month < 1 || month > 12) {
    return false;
  }
  if (day < 1 || day > 31) {
    return false;
  }
  if (year < 1000 || year > 9999) {
    return false;
  }

  return true;
}


export const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 0);
  return date.getDate();
};