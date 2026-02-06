/**
 * Format a date string for display in templates
 * Handles various date formats: ISO strings, timestamps, Date objects
 */
export function formatDate(date?: string | number | null): string {
  if (!date) return "";

  let parsed: Date;

  // Handle numeric timestamps (milliseconds)
  if (typeof date === 'number') {
    parsed = new Date(date);
  }
  // Handle string dates
  else if (typeof date === 'string') {
    // Try to parse as number first (timestamp as string)
    const timestamp = Number(date);
    if (!isNaN(timestamp) && timestamp > 0) {
      parsed = new Date(timestamp);
    } else {
      // Parse as date string
      parsed = new Date(date);
    }
  } else {
    return "";
  }

  // Check if date is valid
  if (isNaN(parsed.getTime())) {
    console.warn('[formatDate] Invalid date:', date);
    return "";
  }

  // Check for reasonable date range (1900 - 2100)
  const year = parsed.getFullYear();
  if (year < 1900 || year > 2100) {
    console.warn('[formatDate] Date out of range:', date, '-> year:', year);
    return "";
  }

  return parsed.toLocaleDateString("nl-NL", { year: "numeric", month: "short" });
}
