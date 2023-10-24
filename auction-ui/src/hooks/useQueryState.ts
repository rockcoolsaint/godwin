// import { useRouter } from 'next/router'
// import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'

export const useQueryState = <State extends string>(name: string, defaultState?: State) => {
  //   const router = useRouter()
  const searchParam = useSearchParams()

  const getInitialState = useCallback(() => {
    // const queries = router.query[name]
    const queries = searchParam.get(name)
    const query = Array.isArray(queries) ? queries[0] : queries

    console.log('useQueryState.ts: getInitialState', { queries, query })

    return query ? (query as State) : defaultState
  }, [defaultState, name, searchParam])

  const [state, setState] = useState(getInitialState)

  useEffect(() => {
    if (searchParam.get(name)) setState(getInitialState)
  }, [getInitialState, name, searchParam])

  //   const toggle = useCallback(
  //     (newState: State) => {
  //       setState(newState)
  //       router.query[name] = newState
  //       searchParam.router.replace({ query: router.query }, undefined, {
  //         scroll: false,
  //       })
  //     },
  //     [name, router],
  //   )

  //   console.log('useQueryState.ts:', { state, toggle })

  return [state] as const
}
