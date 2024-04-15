export function padMonths(months) {
  let result = [...months]
  while (result[0].month % 3 !== 0) {
    result.unshift({
      month: result[0].month - 1,
      year: result[0].year,
    })
  }
  while (result.at(-1).month % 3 !== 2) {
    result.push({
      month: result.at(-1).month + 1,
      year: result.at(-1).year,
    })
  }
  return result
}
