import { RefObject } from 'react'
import { useMount, useUnmount } from 'react-use'

export const useKeys = () => {
  const useKey = (key: string, cb: (e?: KeyboardEvent) => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        cb(e)
      }
    }

    useMount(() => {
      window.addEventListener('keydown', handleKeyDown)
    })
    useUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }

  // const { useEnterToConfirm } = useKeys()
  // const closeBtnRef = useRef<HTMLButtonElement>(null)
  // useEnterToConfirm(closeBtnRef)

  const useEnterToConfirm = (btnRef: RefObject<HTMLButtonElement>, cb?: (e?: KeyboardEvent) => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return
      if (!btnRef.current) return
      if (cb) {
        cb(e)
        return
      }
      btnRef.current.click()
    }
    useMount(() => {
      window.addEventListener('keydown', handleKeyDown)
    })
    useUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }

  return {
    useKey,
    useEnterToConfirm,
  }
}
