// https://tc39.es/proposal-temporal/docs/index.html
export function convertToDate(dateStr) {
  if (!/^\d\d\.\d\d\.\d\d$/.test(dateStr)) {
    return null;
  }

  const [day, month, year] = dateStr.split('.').map(num => Number(num))
  const date = new Date(year + 2000, month - 1, day, 3, 0, 0)

  if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getYear() % 100 !== year) {
    return null;
  }
  if (date.getDay() !== 1) {
    return null
  }

  return date
}
