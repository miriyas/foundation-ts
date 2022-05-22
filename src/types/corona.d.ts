export interface ChartDataItem {
  confirmed: number
  critical: number
  date: number
  death: number
  negative: number
  released: number
  tested: number
  [key: string]: number
}
