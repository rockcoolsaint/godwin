import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function MyVerticallyCenteredModal(props) {
    // const [maxValue, setMaxValue] = useState('');
    const { getIdTokenClaims, isAuthenticated } = useAuth0();
    const [query1, setQuery1] = useState("");


    const handleSubmit1 = (e) => {
      e.preventDefault();
      getIdTokenClaims().then(async(data1) => {
          if (!query1) return;
          if(!data1.__raw) return;
          fetch('/api/place-automatic-bid/', {
              method: 'post',
              headers: { 'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+data1.__raw, 
              },
              body: JSON.stringify({
                  proxy_bid_amnt: query1,
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
      })
    };

    const handleChange4 = e => {
        // setMaxValue(e.target.value);
        setQuery1(e.target.value)
        console.log(query1)
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
        <input type={Number} value={query1} onChange={handleChange4} className="form-control"  />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit1}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


const BidModal = ({data, setQuery1, handleSubmit1}) => {
    const [modalShow, setModalShow] = React.useState(false);
    const abc = 123
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Place automatic bid
        </Button>
  
        <MyVerticallyCenteredModal
          data={data}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
}

export default BidModal