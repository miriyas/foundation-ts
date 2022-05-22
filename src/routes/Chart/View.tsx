import { useQuery } from 'react-query'

import { getCoronaRawDataApi } from 'services/corona'
import { isAxiosError } from 'utils/axios'

import Chart from './Chart'
import Corona from './Corona'

const View = () => {
  const { data } = useQuery(['getCoronaRawDataApi'], () => getCoronaRawDataApi().then((res) => res.data), {
    refetchOnWindowFocus: true,
    suspense: true,
    useErrorBoundary: true,
    onError(err) {
      if (isAxiosError(err)) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  })

  return (
    <>
      <Corona />
      <Chart data={data} />
    </>
  )
}

export default View
