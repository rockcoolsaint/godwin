import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface TeamMemberCardProps {
  image: StaticImageData
  name: string
  description: string
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ image, name, description }) => {
  return (
    <li className="rounded-2xl border-2 border-gray-800 bg-white px-8 py-10 shadow-md">
      <div className="mb-4 flex justify-center">
        <Image src={image} alt={name} className="h-48 w-48 rounded-full object-cover md:h-56 md:w-56" width={224} height={224} />
      </div>
      <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-black">{name}</h3>
      <p className="text-sm leading-6 text-black">{description}</p>
    </li>
  )
}

export default TeamMemberCard
