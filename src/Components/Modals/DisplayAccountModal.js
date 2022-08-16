import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddTransactionModal from "./AddTransactionModal";

const DisplayAccountModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [updatedAccountData, setUpdatedAccountData] = useState({
    first_name: props.selectedaccount.first_name,
    last_name: props.selectedaccount.last_name,
    email: props.selectedaccount.email,
    phone_num: props.selectedaccount.phone_num,
    last_four: props.selectedaccount.last_four,
  });

  const updateAccountData = async (index, accountData) => {
    axios
      .patch(`${props.wemes_url}users/${index}`, { accountData })
      .then(() => setUpdatedAccountData(accountData))
      .catch((error) => console.log(error));
    return accountData;
  };

  const submitAccountData = (event) => {
    event.preventDefault();
    updateAccountData(props.index, updatedAccountData);
    setUpdatedAccountData({
      first_name: "",
      last_name: "",
      phone_num: "",
      last_four: "",
      email: "",
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
          Edit {props.selectedaccount.first_name}'s Account{" "}
        </Modal.Title>
      </Modal.Header>
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
      <Modal.Body>
        <Form size="lg" onSubmit={submitAccountData}>
          {/* First Name */}
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedaccount.first_name}
              onChange={(event) =>
                setUpdatedAccountData({
                  ...updatedAccountData,
                  first_name: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.first_name}
            </Form.Text>
          </Form.Group>

          {/* Last Name */}
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedaccount.last_name}
              onChange={(event) =>
                setUpdatedAccountData({
                  ...updatedAccountData,
                  last_name: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.last_name}
            </Form.Text>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedaccount.email}
              onChange={(event) =>
                setUpdatedAccountData({
                  ...updatedAccountData,
                  email: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.email}
            </Form.Text>
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedaccount.phone_num}
              onChange={(event) =>
                setUpdatedAccountData({
                  ...updatedAccountData,
                  phone_num: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.phone_num}
            </Form.Text>
          </Form.Group>

          {/* Last Four */}
          <Form.Group className="mb-3" controlId="formLastFour">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedaccount.last_four}
              onChange={(event) =>
                setUpdatedAccountData({
                  ...updatedAccountData,
                  last_four: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.last_four}
            </Form.Text>
          </Form.Group>
        </Form>
        <Button
          className="modal-button"
          variant="warning"
          type="submit"
          onClick={props.onHide}
        >
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DisplayAccountModal;
