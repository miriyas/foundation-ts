import { useQuery } from 'react-query'
import styles from './corona.module.scss'

import { isAxiosError } from 'utils/axios'
import { getCoronaRawDataApi } from 'services/corona'

import Chart from './Chart'

const Corona = () => {
  const { data: csvData } = useQuery(
    ['getCoronaRawDataApi'],
    () =>
      getCoronaRawDataApi().then((res) => {
        return res.data
      }),
    {
      refetchOnWindowFocus: true,
      suspense: true,
      useErrorBoundary: true,
      onError(err) {
        if (isAxiosError(err)) {
          // eslint-disable-next-line no-console
          console.log(err)
        }
      },
    }
  )

  return (
    <div className={styles.corona}>
      <div className={styles.centering}>
        <Chart csvData={csvData} />
      </div>
    </div>
  )
}

export default Corona
