import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'

function MyVerticallyCenteredModal(props) {
    const [maxValue, setMaxValue] = useState('');

    const handleChange = e => {
        setMaxValue(e.target.value);
    };

    const handleProxyBid = (e) => {
        console.log("clicked")
            if(!props.token) return;
            console.log(props.token)
            fetch('/api/place-automatic-bid/', {
                method: 'post',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+props.token, 
                },
                body: JSON.stringify({
                    bid_amnt: maxValue,
                    source: "list_page",
                    list_id: props.data.id
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
            });
      };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Place automatic bid
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="number" value={maxValue} onChange={handleChange} className="form-control"  />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleProxyBid}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


const BidModal = ({token}) => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Place automatic bid
        </Button>
  
        <MyVerticallyCenteredModal
          token={token}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
}

export default BidModal