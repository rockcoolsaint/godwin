'use client'

import { useEffect, useState } from 'react'
import { getAllAuctions } from 'src/api/auction/getAllAuctions'
import { AllAuctionsResponse } from 'src/api/auction/types'
import CollectionList from 'src/components/pages/collections/CollectionsList'
import { Loader } from 'src/core'
import Container from 'src/core/components/Container'

export default function HomePage() {
  const [auctions, setAuctions] = useState<AllAuctionsResponse | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const prepareCollections = async () => {
      setLoading(true)
      try {
        const res = await getAllAuctions({ limit: 10 })

        setAuctions(res)
      } catch (ex) {
        console.error(ex)
      } finally {
        setLoading(false)
      }
    }
    prepareCollections()
  }, [])

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      </Container>
    )
  }

  if (!auctions) {
    return (
      <Container>
        <div className="flex items-center justify-center">Could not load auctions</div>
      </Container>
    )
  }

  return (
    <section>
      <CollectionList auction={auctions.results} />
    </section>
  )
}
