import { countAvaregeAndMid } from "./countAveregeAndMid";

describe("countAvaregeAndMid", () => {
  test("...", () => {
    const countsArr = [1, 2, 5, 8, 12]
    expect(countAvaregeAndMid(countsArr)).toEqual({
        mid: 5,
        midIndex: 2,
        average: 5.6,
        averageIndex: 2
    })
  });
  test("2", () => {
    const countsArr = [98, 147, 222, 354, 1200, 10003]
    expect(countAvaregeAndMid(countsArr)).toEqual({
        mid: 354,
        midIndex: 3,
        average: 2004,
        averageIndex: 4
    })
  });
})