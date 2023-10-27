'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useTransition } from 'react'
import { Loader } from 'src/core'

export default function MoreAuctions({
  path,
  triggerOnView = true,
  prefetch = true,
}: {
  path: string
  triggerOnView?: boolean
  prefetch?: boolean
}) {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const buttonRef = useRef<HTMLButtonElement>(null)

  const advance = useCallback(() => {
    startTransition(() => {
      router.push(path, { scroll: false })
    })
  }, [router, path])

  useEffect(() => {
    if (prefetch) {
      router.prefetch(path)
    }
  }, [router, path, prefetch])

  useEffect(() => {
    const observer = new IntersectionObserver(
      e => {
        if (triggerOnView && e[0].isIntersecting && !isPending) {
          advance()
        }
      },
      {
        root: null,
        threshold: 0,
      },
    )

    observer.observe(buttonRef.current!)

    return () => observer.disconnect()
  }, [triggerOnView, advance, isPending])

  return (
    <button
      ref={buttonRef}
      className="subtle mx-auto mt-8 block w-full bg-gray-300 p-12 text-xl text-dark-100 md:w-6/12"
      onClick={advance}
      disabled={isPending}
      //   onClick={!triggerOnView ? advance : undefined}
      //   disabled={triggerOnView || isPending}
    >
      {isPending ? (
        <span className="relative inline-block">
          <Loader width={24} height={24} />
        </span>
      ) : (
        'Load more auctions'
      )}
    </button>
  )
}
