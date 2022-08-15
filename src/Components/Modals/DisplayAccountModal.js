import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddItemModal from "./AddItemModal";
import AddTransactionModal from "./AddTransactionModal";

function DisplayAccountModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const [accountData, setAccountData] = useState({});

  const dispalyAccount = () => {
    axios
      .get(`${props.wemes_url}accounts/${props.index + 1}/`)
      .then((response) => {
        console.log(response.data);
        setAccountData(response.data);
        // return response.data;
      })
      .catch((err) => {
        alert(err);
      });
  };

  // const [accountData, setAccountData] = useState({
  //   drop_off: "",
  //   admin: "",
  //   customer: "",
  //   description: "",
  //   items: [],
  // });

  // const submitAccountData = (event) => {
  //   event.preventDefault();
  //   dispalyAccount(accountData);
  //   setAccountData({
  //     drop_off: "",
  //     admin: "",
  //     customer: "",
  //     description: "",
  //     items: [],
  //   });
  // };

  // axios
  //   .get(`${props.wemes_url}accounts/${props.index + 1}/`)
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
          Edit Account {props.index + 1}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
