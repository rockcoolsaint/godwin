'use client'
import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import qr from 'qrcode'

export default function QR({ className, code }: { className?: string; code: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    qr.toCanvas(canvasRef.current, code, err => {
      if (err) {
        console.error(err)
      }
    })
  }, [canvasRef, code])

  return <canvas ref={canvasRef} className={clsx(className, 'h-40 w-40')}></canvas>
}
