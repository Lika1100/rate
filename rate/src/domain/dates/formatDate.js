export function formatDDMMYY(date) {
  return date.getDate().toString().padStart(2, "0") + "." + (date.getMonth() + 1).toString().padStart(2, "0") + "." + date.getYear() % 100;
}

export function formatMMYYYY(date) {
  return (date.getMonth() + 1).toString().padStart(2, "0") + "." + date.getFullYear();
}
