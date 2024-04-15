import { adjustForInflation, adjustForInflation2 } from "./adjustForInflation";
/* import {month2inflation} from "./adjustForInflation" */

describe('adjustForInflation', function () {
  const months = { '2022.1': 1.2, '2022.2': 1.3, '2022.3': 1.5 }

  test('should compound inflation forward', function () {
    expect(adjustForInflation(months, 4, 2022, 1, 2022)).toBeCloseTo(2.34, 5);
  })

  test('should compound inflation forward', function () {
    // 2 → 1000  0.7692307692308
    // 3 → 1300  1000
    expect(adjustForInflation(months, 2, 2022, 3, 2022)).toBeCloseTo(0.7692307692308, 5);
  })
})

// describe('adjustForInflation2', function () {
//   test('should count sum inflation', function () {
//     // 1.17 7.61 1.56
//     // 1.0117 1.0761 1.0156
//     // 1011.7 1088.69 1105.67 = 3206.06
//     const example = [
//       { price: 1000, start: new Date('1.2.2022') },
//       { price: 1000, start: new Date('2.3.2022') },
//       { price: 1000, start: new Date('3.4.2022') }
//     ]
//     console.log(adjustForInflation2(example, 10, 2022))
//     const result = 3206.06
//     expect(adjustForInflation2(example, 1, 2022)).toEqual(result) // 2.34
//   })
// })