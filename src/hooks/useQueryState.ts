import { useSearchParams } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'

export const useQueryState = <State extends string>(name: string, defaultState?: State) => {
  const searchParam = useSearchParams()

  const getInitialState = useCallback(() => {
    const queries = searchParam.get(name)
    const query = Array.isArray(queries) ? queries[0] : queries

    return query ? (query as State) : defaultState
  }, [defaultState, name, searchParam])

  const [state, setState] = useState(getInitialState)

  useEffect(() => {
    if (searchParam.get(name)) setState(getInitialState)
  }, [getInitialState, name, searchParam])

  return [state] as const
}
