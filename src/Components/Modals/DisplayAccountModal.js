import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddTransactionModal from "./AddTransactionModal";

function DisplayAccountModal(props) {
  // console.log(props.selectedaccount.first_name);
  const [modalShow, setModalShow] = useState(false);
  // const [accountData, setAccountData] = useState({});
  const [accountFirstName, setAccountFirstName] = useState(props.selectedaccount.first_name)
  // const [accountFirstName, setAccountFirstName] = useState()

  // const dispalyAccount = () => {
  //   axios
  //     .get(`${props.wemes_url}accounts/${props.index + 1}/`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setAccountData(response.data);
  //       // return response.data;
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {props.selectedaccount.first_name}'s Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/* <Form size="lg" onSubmit={submitAccountData}> */}
      <Form size="lg">
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedaccount.first_name}
              // onChange={(event) =>
              //   setAccountData({
              //     ...accountData,
              //     first_name: event.target.value,
              //   })
              // }
            />
            <Form.Text className="text-muted">{props.selectedaccount.first_name}</Form.Text>
          </Form.Group>
          </Form>
        <Button
          variant="warning"
          type="submit"
          onClick={() => setModalShow(true)}
        >
          Add Transaction
        </Button>
        <AddTransactionModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          wemes_url={props.wemes_url}
        />{" "}
      </Modal.Body>
    </Modal>
  );
}

export default DisplayAccountModal;
