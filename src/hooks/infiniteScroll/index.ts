import { useEffect, useState } from 'react'

interface useIntersectionObserverProps {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number
  onIntersect: IntersectionObserverCallback
}

const useIntersectionObserver = ({
  root,
  rootMargin = '0px',
  threshold = 0,
  onIntersect,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)

  useEffect(() => {
    if (!target) return undefined

    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
    observer.observe(target)

    return () => observer.unobserve(target)
  }, [onIntersect, root, rootMargin, target, threshold])

  return { setTarget }
}

export default useIntersectionObserver
