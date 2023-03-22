import { useEffect, useRef } from 'react'

function createAbortController() {
  return new AbortController()
}

type EffectType = (abortSignal: AbortSignal) => Promise<void | ((controller: AbortController) => void)>
type CleanupFnType = ((controller: AbortController) => void) | undefined

export default function useFetchOnMount(effect: EffectType, cleanupFn: CleanupFnType, deps: any[]) {
  const firstRun = useRef(true)
  const controllerRef = useRef<AbortController | undefined>()

  if (!controllerRef.current) {
    controllerRef.current = createAbortController()
  }

  useEffect(() => {
    if (firstRun.current === false) {
      controllerRef.current = createAbortController()
    } else {
      firstRun.current = false
    }

    const controller = controllerRef.current!

    effect(controller.signal)

    return () => {
      if (cleanupFn) {
        cleanupFn(controller)
      } else {
        controller.abort()
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return controllerRef
}
