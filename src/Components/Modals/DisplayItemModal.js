import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddItemModal from "./AddItemModal";

function DisplayItemModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const [updatedItemData, setUpdatedItemData] = useState({
    drop_off: props.selecteditem.drop_off,
    admin: props.selecteditem.admin,
    customer: props.selecteditem.customer,
    // items: props.selecteditem.items,
    description: props.selecteditem.description,
  });

  const updateItemData = async (index, itemData) => {
    axios
      .patch(`${props.wemes_url}users/${index}`, { itemData })
      .then(() => setUpdatedItemData(itemData))
      .catch((error) => console.log(error));
    return itemData;
  };

  const submitItemData = (event) => {
    event.preventDefault();
    updateItemData(props.index, updatedItemData);
    setUpdatedItemData({
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
          Edit {props.selecteditem.customer}'s 
          <br/>
          Item on {props.selecteditem.drop_off}
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
        <Form size="lg" onSubmit={submitItemData}>
          {/* <Form size="lg"> */}
          {/* Drop Off Data*/}
          <Form.Group className="mb-3" controlId="formDropOffDate">
            <Form.Label>Drop Off Date</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selecteditem.drop_off}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  drop_off: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.drop_off}
            </Form.Text>
          </Form.Group>

          {/* Customer's Name */}
          <Form.Group className="mb-3" controlId="formCustomerName">
            <Form.Label>Cusotmer</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selecteditem.customer}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  customer: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.customer}
            </Form.Text>
          </Form.Group>

          {/* Admin's Name */}
          <Form.Group className="mb-3" controlId="formAdminName">
            <Form.Label>Admin</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selecteditem.admin}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  admin: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.admin}
            </Form.Text>
          </Form.Group>

          {/* Items */}
          {/* <Form.Group className="mb-3" controlId="formItems">
            <Form.Label>Items</Form.Label>
            <Form.Control
              type="name"
              disabled
              defaultValue={props.selecteditem.items}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  items: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.items}
            </Form.Text>
          </Form.Group> */}

          {/* Message */}
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selecteditem.description}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  description: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.description}
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

export default DisplayItemModal;
