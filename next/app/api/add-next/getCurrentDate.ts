// Get the current date for card insertion purposes
export default function getCurrentDate(): string {
  const date = new Date(); // Create a new Date object representing the current moment

  const year = date.getFullYear(); // Get the full year (4 digits)
  const month = date.getMonth() + 1; // Get the month (0-indexed, so +1)
  const day = date.getDate(); // Get the day of the month

  // Pad the month and day with a leading zero if necessary and return the formatted date string
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}
