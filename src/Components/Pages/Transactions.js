import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsList from "../TransactionsList";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {FaUserTag} from "react-icons/fa";

function AddTransactionModal(props) {
  const addTransaction = ({
    drop_off,
    admin,
    customer,
    description,
    items,
  }) => {
    axios
      .post(`${props.WEMES_URL}transactions/`, {
        drop_off: drop_off,
        admin: admin,
        customer: customer,
        description: description,
        items: items,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [transactionData, setTransactionData] = useState({
    drop_off: "",
    admin: "",
    customer: "",
    description: "",
    items: [],
  });

  const submitTransactionData = (event) => {
    event.preventDefault();
    addTransaction(transactionData);
    setTransactionData({
      drop_off: "",
      admin: "",
      customer: "",
      description: "",
      items: [],
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
          Add New Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form size="lg" onSubmit={submitTransactionData}>
          <Form.Group className="mb-3" controlId="formDropOff">
            <Form.Label>Drop Off Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="12/12/22"
              onChange={(event) =>
                setTransactionData({
                  ...transactionData,
                  drop_off: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAdmin">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Who are you?"
              onChange={(event) =>
                setTransactionData({
                  ...transactionData,
                  admin: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCustomer">
            <Form.Label>Customer</Form.Label>
            <Form.Control
              type="text"
              name="customer"
              placeholder="Customer"
              onChange={(event) =>
                setTransactionData({
                  ...transactionData,
                  customer: event.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Leave a Note"
              onChange={(event) =>
                setTransactionData({
                  ...transactionData,
                  description: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItems">
            <Form.Label>Items</Form.Label>
            <Form.Control type="text" placeholder="" disabled />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" value="false" label="Check me out" />
      </Form.Group> */}

          <Button variant="warning" type="submit" onClick={props.onHide}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const Transactions = ({ WEMES_URL }) => {
  const [transactionData, setTransactionData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const getTransactions = () => {
    axios
      .get(`${WEMES_URL}transactions/`)
      .then((response) => {
        // console.log(response);
        const newData = response.data.map((transaction) => {
          return {
            id: transaction.id,
            drop_off: transaction.drop_off,
            admin: transaction.admin,
            customer: transaction.customer,
            items: transaction.items,
            description: transaction.description,
          };
        });
        setTransactionData(newData);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => getTransactions(), [transactionData]);

  return (
    <div>
      <h1>Transactions</h1>
      <FaUserTag title="add an account" size={50} variant="warning" onClick={() => setModalShow(true)} />

      <AddTransactionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        WEMES_URL={WEMES_URL}
      />
      <TransactionsList transactionData={transactionData} />
    </div>
  );
};

Transactions.propTypes = {
  WEMES_URL: PropTypes.string.isRequired,
};

export default Transactions;
