'use client'

import { useEffect, useRef } from 'react'

import { Chart } from 'chart.js/auto'

export default function ChartComponent({ title, data }: { title: string; data: any[] }) {
  const chartRef = useRef<any>()

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: title,
              data,
            },
          ],
        },
        options: {
          animation: false,
          showLine: true,
          responsive: true,
        },
      })
    }
  }, [title, data, chartRef])

  return <canvas className="h-full w-full" ref={chartRef}></canvas>
}
