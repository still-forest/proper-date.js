import ProperDate from "./model";

export const buildUtcDate = (year: number, month: number, day: number): Date => {
  return new Date(Date.UTC(year, month - 1, day))
}

export const buildUtcDateFromString = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);
  return buildUtcDate(year, month, day);
}

export const parseInput = (date: ProperDate | Date | string) => {
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
  } else if (typeof date === "string"){//} && isValidDateFormat(date)) {
    const parsedDate = buildUtcDateFromString(date);
    year = parsedDate.getFullYear();
    month = parsedDate.getMonth();
    day = parsedDate.getDate();
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
  const date = buildUtcDateFromString(dateString);
  const [year, month, day] = dateString.split("-").map(Number);
  const dayDiff = Math.abs(date.getDate() - day);
  console.log("dayDiff", dayDiff);

  const yearMatch = (date.getFullYear()) === year;
  const monthMatch = date.getMonth() + 1 === month;
  const dayMatch = dayDiff <= 1;

  console.log("isValidDateFormat",
    {
      date,
      year,
      month,
      dateGetFullYear: date.getFullYear(),
      dateGetMonth: date.getMonth(),
      dateGetDate: date.getDate(),
      day,
      dayDiff,
      yearMatch,
      monthMatch,
      dayMatch,
    }
  )
  return yearMatch && monthMatch && dayMatch;
}
