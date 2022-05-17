import { useCallback, useState } from 'react'
import { AxiosError } from 'axios'

import useThrottleCallback from './useThrottleCallback'

export function useSendApi(
  apiFn: (...args: any[]) => void,
  errorHandler?: (err: AxiosError<unknown> | unknown) => void
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AxiosError<unknown> | unknown>()

  const callFn = useThrottleCallback(async (...args: any[]) => {
    if (isLoading) return
    setIsLoading(true)
    setError(undefined)
    try {
      await apiFn(args)
    } catch (err) {
      setError(err)
      errorHandler?.(err)
    } finally {
      setIsLoading(false)
    }
  })

  const resetError = useCallback(() => setError(undefined), [])

  return [isLoading, callFn, error, resetError] as const
}

// const [isLoading, postSomethingApi, error] = useSendApi(
//   async () => {
//     const res = await postSomethingApi({
//       address: destAddress,
//     })
//     if (res.data?.id) setSomethingId(res.data.id)
//     gaEvent({
//       action: 'something_submit',
//       data: gaEventParams,
//     })
//   },
//   (err) => {
//     if (!err || !isAxiosError(err) || !err.response) return
//     const { error: message, errorDetails } = err.response.data
//     if (message !== 'api.something.blocked' || !errorDetails) {
//       addErrorAlert(message)
//       return
//     }
//   }
// )
