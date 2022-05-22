import { getPlus } from './num'

it('getPlus', () => {
  expect(getPlus(1, 2)).toBe(3)
  expect(getPlus(2, 3)).toBe(5)
  expect(getPlus(0.1, 0.2)).toBe(0.3)
  expect(getPlus(0.2, 0.0)).toBe(0.2)
  expect(getPlus(1, 0.2)).toBe(1.2)
})
