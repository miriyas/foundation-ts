/* eslint-disable @typescript-eslint/ban-types */
// https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts
import { useCallback, useEffect, useRef } from 'react'

type ReadyFunction = () => boolean | null
type SetFunction = () => void
type ClearFunction = SetFunction

export type UseTimeoutFn = [SetFunction, ClearFunction, ReadyFunction]

export function useTimeoutFn(fn: Function, ms = 0): UseTimeoutFn {
  const ready = useRef<boolean | null>(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const callback = useRef(fn)

  const isReady = useCallback(() => ready.current, [])

  const set = useCallback(() => {
    ready.current = false
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      ready.current = true
      callback.current()
    }, ms)
  }, [ms])

  const clear = useCallback(() => {
    if (timeout.current == null) return
    ready.current = null
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }, [])

  // NOTE: unmount시 클리어 처리
  useEffect(() => {
    return clear
  }, [clear])

  return [set, clear, isReady]
}
