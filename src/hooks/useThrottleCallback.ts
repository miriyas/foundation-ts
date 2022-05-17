import { throttle } from 'lodash'
import { useMemo, useRef } from 'react'

function useThrottleCallback(cb: (...args: any[]) => void, delay: number = 300) {
  const cbRef = useRef(cb)
  cbRef.current = cb

  return useMemo(
    () => throttle((...args) => cbRef.current(...args), delay, { leading: true, trailing: false }),
    [delay]
  )
}

export default useThrottleCallback
