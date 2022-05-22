import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1e9,
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
  },
})

export { BigNumber }

const Num = (n: string | number, b?: number | undefined): BigNumber => {
  if (typeof n === 'string') {
    return new BigNumber(n.replace(/,/g, ''), b)
  }

  return new BigNumber(n, b)
}

export const getPlus = (a: number, b: number) => {
  return Num(a).plus(b).toNumber()
}
