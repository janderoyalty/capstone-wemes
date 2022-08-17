import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddTransactionModal from "./AddTransactionModal";

const DisplayAccountModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [updatedAccountData, setUpdatedAccountData] = useState({});

  const updateAccountData = async (index, accountData) => {
    axios
      .patch(`${props.wemes_url}users/${index}/`, accountData)
      .then()
      .catch((error) => console.log(error));
    return accountData;
  };

  const handleFormChange = (e) => {
    const updated_key = e.target.name;
    setUpdatedAccountData({
      ...updatedAccountData,
      [updated_key]: e.target.value, //computed property
    });
  };

  const submitAccountData = (event) => {
    event.preventDefault();

    updateAccountData(props.selectedaccount.id, updatedAccountData);
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
              name="first_name"
              onChange={handleFormChange}
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
              name="last_name"
              onChange={handleFormChange}
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
              name="email"
              onChange={handleFormChange}
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
              name="phone_num"
              onChange={handleFormChange}
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
              name="last_four"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.last_four}
            </Form.Text>
          </Form.Group>

          <Button
            className="modal-button"
            variant="warning"
            type="submit"
            onClick={props.onHide}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DisplayAccountModal;
