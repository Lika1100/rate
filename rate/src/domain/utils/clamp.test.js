import {clamp} from './math'
describe('clampFunc', () => {
    test('value > max', () => {
      expect(clamp(50, 10, 40)).toEqual(40);
    });
    test('value < min', () => {
      expect(clamp(5, 10, 40)).toEqual(10);
    });
    test('value in range [min, max]', () => {
      expect(clamp(30, 10, 40)).toEqual(30);
    });
})