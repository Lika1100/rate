import { padMonths } from './padMonths'

describe('padMonths', function () {
  test('should add months to the beginning and to the end', function () {
    const months = [
      {
        month: 1,
        year: 2023
      },
      {
        month: 2,
        year: 2023
      },
      {
        month: 3,
        year: 2023
      },
    ]

    const result = [
      {
        month: 0,
        year: 2023
      },
      {
        month: 1,
        year: 2023
      },
      {
        month: 2,
        year: 2023
      },
      {
        month: 3,
        year: 2023
      },
      {
        month: 4,
        year: 2023
      },
      {
        month: 5,
        year: 2023
      },
    ]

    expect(padMonths(months)).toEqual(result)
  })
})

