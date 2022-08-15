import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddItemModal from "./AddItemModal";


function DisplayTransactionModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const [transactionData, setTransactionData] = useState({});
  
  const dispalyTransaction = () => {
    axios
      .get(`${props.wemes_url}transactions/${props.index + 1}/`)
      .then((response) => {
        console.log(response.data);
        setTransactionData(response.data)
        // return response.data;
      })
      .catch((err) => {
        alert(err);
      });
  };


  // const [transactionData, setTransactionData] = useState({
  //   drop_off: "",
  //   admin: "",
  //   customer: "",
  //   description: "",
  //   items: [],
  // });

  // const submitTransactionData = (event) => {
  //   event.preventDefault();
  //   dispalyTransaction(transactionData);
  //   setTransactionData({
  //     drop_off: "",
  //     admin: "",
  //     customer: "",
  //     description: "",
  //     items: [],
  //   });
  // };

  // axios
  //   .get(`${props.wemes_url}transactions/${props.index + 1}/`)
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((err) => {
  //     alert(err);
  //   });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Transaction {props.index + 1}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Button
          variant="warning"
          type="submit"
          onClick={() => setModalShow(true)}
        >
          Add Item
        </Button>
        <AddItemModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          wemes_url={props.wemes_url}
        />{" "}
      </Modal.Body>
    </Modal>
  );
}

export default DisplayTransactionModal;
