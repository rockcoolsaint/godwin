'use client'

import { useEffect, useRef } from 'react'

declare const Plotly: any

export default function ChartComponent({ title, data }: { title: string; data: any[] }) {
  const chartRef = useRef<any>()

  useEffect(() => {
    if (chartRef.current) {
      Plotly.newPlot(
        chartRef.current,
        data,
        {
          title: title,
          xaxis: {
            // showgrid: false,
            // zeroline: false,
          },
          yaxis: {
            ticksuffix: 'TH/sec  ',
          },
          margin: { t: 0, r: 20 },
        },
        {
          displayModeBar: false,
        },
      )
    }
  }, [chartRef, title, data])

  return <div ref={chartRef} />
}
