import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

interface Step {
  image: StaticImport
  imageAlt: string
  title: string
  text: string
}

interface ThreeStepProcessProps {
  steps: Step[]
}

const ThreeStepProcess: React.FC<ThreeStepProcessProps> = ({ steps }) => {
  const imageSize = {
    width: 256,
    height: 256,
  }

  return (
    <div className="mx-6">
      <h2 className="mb-6 text-center text-3xl font-bold">3 easy steps</h2>
      <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center">
            <div className="mx-auto inline-block border border-gray-300 p-1">
              <Image src={step.image} alt={step.imageAlt} width={imageSize.width} height={imageSize.height} className="object-cover" />
            </div>
            <p className="mt-2 text-lg font-bold md:text-xl">{step.title}</p>
            <p className="mt-2 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: step.text }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThreeStepProcess
