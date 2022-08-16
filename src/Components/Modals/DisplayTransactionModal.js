import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddItemModal from "./AddItemModal";

function DisplayTransactionModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const [updatedTransactionData, setUpdatedTransactionData] = useState({
    drop_off: props.selectedtransaction.drop_off,
    admin: props.selectedtransaction.admin,
    customer: props.selectedtransaction.customer,
    // items: props.selectedtransaction.items,
    description: props.selectedtransaction.description,
  });

  const updateTransactionData = async (index, transactionData) => {
    axios
      .patch(`${props.wemes_url}users/${index}`, { transactionData })
      .then(() => setUpdatedTransactionData(transactionData))
      .catch((error) => console.log(error));
    return transactionData;
  };

  const submitTransactionData = (event) => {
    event.preventDefault();
    updateTransactionData(props.index, updatedTransactionData);
    setUpdatedTransactionData({
      drop_off: "",
      admin: "",
      // items: "",
      description: "",
      customer: "",
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
          Edit {props.selectedtransaction.customer}'s 
          <br/>
          Transaction on {props.selectedtransaction.drop_off}
        </Modal.Title>
      </Modal.Header>
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
      <Modal.Body>
        <Form size="lg" onSubmit={submitTransactionData}>
          {/* <Form size="lg"> */}
          {/* Drop Off Data*/}
          <Form.Group className="mb-3" controlId="formDropOffDate">
            <Form.Label>Drop Off Date</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedtransaction.drop_off}
              onChange={(event) =>
                setUpdatedTransactionData({
                  ...updatedTransactionData,
                  drop_off: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedtransaction.drop_off}
            </Form.Text>
          </Form.Group>

          {/* Customer's Name */}
          <Form.Group className="mb-3" controlId="formCustomerName">
            <Form.Label>Cusotmer</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedtransaction.customer}
              onChange={(event) =>
                setUpdatedTransactionData({
                  ...updatedTransactionData,
                  customer: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedtransaction.customer}
            </Form.Text>
          </Form.Group>

          {/* Admin's Name */}
          <Form.Group className="mb-3" controlId="formAdminName">
            <Form.Label>Admin</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedtransaction.admin}
              onChange={(event) =>
                setUpdatedTransactionData({
                  ...updatedTransactionData,
                  admin: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedtransaction.admin}
            </Form.Text>
          </Form.Group>

          {/* Items */}
          {/* <Form.Group className="mb-3" controlId="formItems">
            <Form.Label>Items</Form.Label>
            <Form.Control
              type="name"
              disabled
              defaultValue={props.selectedtransaction.items}
              onChange={(event) =>
                setUpdatedTransactionData({
                  ...updatedTransactionData,
                  items: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedtransaction.items}
            </Form.Text>
          </Form.Group> */}

          {/* Message */}
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedtransaction.description}
              onChange={(event) =>
                setUpdatedTransactionData({
                  ...updatedTransactionData,
                  description: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selectedtransaction.description}
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
}

export default DisplayTransactionModal;
