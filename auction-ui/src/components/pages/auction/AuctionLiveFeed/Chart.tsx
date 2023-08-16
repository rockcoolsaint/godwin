'use client'

import { useEffect, useRef } from 'react'

declare const Plotly: any

export default function ChartComponent({ title, data, layout }: { title: string; data: any[]; layout: any }) {
  const chartRef = useRef<any>()

  useEffect(() => {
    if (chartRef.current) {
      Plotly.newPlot(chartRef.current, data, layout, {
        title: title,
        yaxis: {
          ticksuffix: 'TH/sec  ',
        },
        margin: { t: 0, r: 20 },
      })
    }
  }, [chartRef, title, data, layout])

  return <div ref={chartRef} />
}
