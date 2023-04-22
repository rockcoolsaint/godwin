/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
'use client'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import { Toast } from 'src/core'
import Link from 'src/components/shared/Link'

function MyVerticallyCenteredModal(props: any) {
  // const [maxValue, setMaxValue] = useState('');
  const [toastData, setToastData] = useState({ message: '' })
  const [showToast, setShowToast] = useState(false)
  const [query1, setQuery1] = useState('')

  const handleSubmit1 = () => {
    // TODO: Refactor using new auth system
    // getIdTokenClaims().then(async (data1: any) => {
    //   if (!query1) return
    //   if (!data1?.__raw) return
    //   fetch('/api/place-automatic-bid/', {
    //     method: 'post',
    //     headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data1?.__raw },
    //     body: JSON.stringify({
    //       proxy_bid_amnt: query1,
    //       source: 'list_page',
    //       list_id: props.data,
    //     }),
    //   })
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       props.onHide()
    //       setToastData({
    //         message: responseJson.place_bid_status.status,
    //       })
    //       setShowToast(true)
    //       return responseJson
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    // })
  }

  const handleChange4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setMaxValue(e.target.value);
    setQuery1(e.target.value)
  }

  return (
    <>
      {showToast ? <Toast title="Alert" description={toastData.message} show_toast={showToast} /> : <></>}
      <Modal {...props} size="lg" id="proxy_modal" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Place automatic bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="number" value={query1} onChange={handleChange4} className="form-control" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit1}>Save</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

interface Iprops {
  data: string | number
}

const BidModal = ({ data }: Iprops) => {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <>
      <Link
        href="#"
        className="primary"
        onClick={e => {
          e.preventDefault()
          setModalShow(true)
        }}
      >
        Place automatic bid
      </Link>

      <MyVerticallyCenteredModal data={data} show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default BidModal
