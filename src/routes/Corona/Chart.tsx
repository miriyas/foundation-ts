import { VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import { ScalePropType } from 'victory-core'

import { ChartDataItem } from 'types/corona'
import { csvToArray, convertData } from './utils'
import { COLORS } from './chartOption'

import styles from './corona.module.scss'

interface Props {
  csvData?: string
}

const Chart = ({ csvData }: Props) => {
  const data = csvToArray(csvData)
  const { confirmed, critical, death, negative, released, tested } = convertData(data as ChartDataItem[])

  const options = {
    width: 1194,
    height: 320,
    padding: {
      left: 0,
      top: 0,
      right: 60,
      bottom: 30,
    },
    scale: { x: 'time' as ScalePropType },
  }

  return (
    <section className={styles.chart}>
      <div className={styles.centering}>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension='x'
              labels={({ datum }) => `${datum.childName}: ${datum.y}`}
              labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: 'white' }} />}
            />
          }
          {...options}
        >
          <VictoryLine
            name='confirmed'
            style={{
              data: { stroke: COLORS.YELLOW },
              parent: { border: '1px solid #ccc' },
            }}
            data={confirmed}
          />
          <VictoryLine
            name='critical'
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            style={{
              data: { stroke: COLORS.ORANGE },
              parent: { border: '1px solid #ccc' },
            }}
            data={critical}
          />
          <VictoryLine
            name='death'
            animate={{
              duration: 2000,
              onLoad: { duration: 500 },
            }}
            style={{
              data: { stroke: COLORS.RED },
              parent: { border: '1px solid #ccc' },
            }}
            data={death}
          />
          <VictoryLine
            name='negative'
            animate={{
              duration: 2000,
              onLoad: { duration: 500 },
            }}
            style={{
              data: { stroke: COLORS.BLUE },
              parent: { border: '1px solid #ccc' },
            }}
            data={negative}
          />
          <VictoryLine
            name='released'
            animate={{
              duration: 2000,
              onLoad: { duration: 500 },
            }}
            style={{
              data: { stroke: COLORS.GREEN },
              parent: { border: '1px solid #ccc' },
            }}
            data={released}
          />
          <VictoryLine
            name='tested'
            animate={{
              duration: 2000,
              onLoad: { duration: 500 },
            }}
            style={{
              data: { stroke: COLORS.TEAL },
              parent: { border: '1px solid #ccc' },
            }}
            data={tested}
          />
        </VictoryChart>
      </div>
    </section>
  )
}

export default Chart
