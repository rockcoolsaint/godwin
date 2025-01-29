'use client'

import { useEffect, useRef } from 'react'

declare const Plotly: any

export default function ChartComponent({ title, data, layout }: { title: string; data: any[]; layout?: any }) {
  const chartRef = useRef<any>()

  useEffect(() => {
    if (chartRef.current) {
      const defaultLayout = {
        title: {
          text: title,
          font: {
            size: 24
          },
          y: 0.95,
          x: 0.5,
          xanchor: 'center',
          yanchor: 'top'
        },
        yaxis: {
          ticksuffix: ' TH/s'
        },
        margin: { 
          t: 100,  // Changed from 0 to allow space for title
          r: 50,
          l: 50,
          b: 50 
        },
        showlegend: true,
        legend: {
          x: 1,
          y: 1,
          xanchor: 'right'
        }
      }

      // Merge provided layout with default layout
      const finalLayout = { ...defaultLayout, ...layout }

      // Config should be separate from layout
      const config = {
        displayModeBar: false,
        displaylogo: false,
        responsive: true
      }

      Plotly.newPlot(chartRef.current, data, finalLayout, config)
    }
  }, [chartRef, title, data, layout])

  return <div ref={chartRef} />
}