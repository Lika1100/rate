export function parseDate(dt) {
  const year = +dt.slice(0, 4)
  const month = +dt.slice(4, 6)
  const day = +dt.slice(6, 8)
  const hours = +dt.slice(9, 11)
  const minutes = +dt.slice(11, 13)

  const MSK_TIMEZONE_SHIFT = 0;

  return new Date(year, month - 1, day, hours + MSK_TIMEZONE_SHIFT, minutes)
}
