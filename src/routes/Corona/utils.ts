import { ChartDataItem } from 'types/corona'

type ChartData = Record<string, number>

export const csvToArray = (str?: string, delimiter = ',') => {
  if (!str) return []

  const headers = str.slice(0, str.indexOf('\n')).replace('\r', '').split(',')
  const rows = str.slice(str.indexOf('\n') + 1).split('\r')

  const arr = rows.map((row) => {
    const values = row.split(delimiter)

    const el = headers.reduce<ChartData>((object, header, index) => {
      object[header] = Number(values[index])
      return object
    }, {})

    return el
  }) as ChartDataItem[]

  return arr
}

type Data = {
  x: Date
  y: number
}

const parseDate = (rawStr: number) => {
  const str = rawStr.toString()
  const y = Number(str.substring(0, 4))
  const m = Number(str.substring(4, 6)) - 1
  const d = Number(str.substring(6, 8))
  return new Date(y, m, d)
}

export const convertData = (data: ChartDataItem[]) => {
  const confirmed: Data[] = []
  const critical: Data[] = []
  const death: Data[] = []
  const negative: Data[] = []
  const released: Data[] = []
  const tested: Data[] = []

  data.forEach((d) => {
    confirmed.push({
      x: parseDate(d.date),
      y: d.confirmed,
    })
    critical.push({
      x: parseDate(d.date),
      y: d.critical,
    })
    death.push({
      x: parseDate(d.date),
      y: d.death,
    })
    negative.push({
      x: parseDate(d.date),
      y: d.negative,
    })
    released.push({
      x: parseDate(d.date),
      y: d.released,
    })
    tested.push({
      x: parseDate(d.date),
      y: d.tested,
    })
  })

  return {
    confirmed,
    critical,
    death,
    negative,
    released,
    tested,
  }
}
