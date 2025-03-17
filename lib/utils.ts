export const parseInput = (date: Date | string) => {
  let year: number;
  let month: number;
  let day: number;

  if (date instanceof Date) {
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
  } else if (typeof date === "string") {
    const parsedDate = new Date(date);
    year = parsedDate.getFullYear();
    month = parsedDate.getMonth();
    day = parsedDate.getDate();
  } else {
    throw new Error( // TODO: custom error type
      "Date must be either a Date, ProperDate, or stringified date"
    );
  }
  return { year, month, day };
};
