import React from 'react'

interface Props{
  message: String
}

const Announcement = ({message}:Props) => {
  return (
    <div className="top-bar">
        <div className="container">
            <p>{message}</p>
        </div>
    </div>
  )
}

export default Announcement