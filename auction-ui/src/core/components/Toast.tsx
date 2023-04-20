/* eslint-disable react/jsx-no-bind */
'use client'

import { useEffect, useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Image from 'next/image'

interface Props {
  title: string
  description: string
  show_toast: boolean
}

const ToastAlert = ({ title, description, show_toast }: Props) => {
  const [show, setShow] = useState(show_toast)
  useEffect(() => {
    setShow(true)
  }, [description])

  return (
    <ToastContainer position={'top-center'} className="p-4">
      <Toast bg="light" onClose={() => setShow(false)} show={show} delay={3000} autohide={true}>
        <Toast.Header>
          <Image src="holder.js/20x20?text=%20" className="me-2 rounded" alt="" />
          <strong className="me-auto">{title}</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body>{description}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastAlert
