import React, { useState, useEffect } from "react";
import axios from "axios";
import ListTransactions from "../ListTransactions";
import PropTypes from "prop-types";
import { FaUserTag } from "react-icons/fa";
import AddTransactionModal from "../Modals/AddTransactionModal";

const Transactions = ({ wemes_url }) => {
  const [transactionData, setTransactionData] = useState([]);
  const [addTransactionModalShow, setAddTransactionModalShow] = useState(false);
  const [accountData, setAccountData] = useState([]);

  const getTransactions = () => {
    axios
      .get(`${wemes_url}transactions/`)
      .then((response) => {
        const newData = response.data.map((transaction) => {
          return {
            id: transaction.id,
            drop_off: transaction.drop_off,
            admin: `${transaction.admin.first_name} ${transaction.admin.last_name}`,
            customer: `${transaction.customer.first_name} ${transaction.customer.last_name}`,
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

  // const getAccounts = () => {
  //   axios
  //     .get(`${wemes_url}users/`)
  //     .then((response) => {
  //       const newData = response.data.map((account) => {
  //         return {
  //           id: account.id,
  //           first_name: account.first_name,
  //           last_name: account.last_name,
  //           admin: account.admin,
  //           is_active: account.is_active,
  //         };
  //       });
  //       setAccountData(newData);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  // useEffect(() => getTransactions(), [transactionData]);
  useEffect(() => getTransactions(), []);

  const hideModal = () => {
    setAddTransactionModalShow(false);
    getTransactions();
  };
  return (
    <div>
      <h1>Transactions</h1>
      <FaUserTag
        title="add an account"
        size={50}
        variant="warning"
        onClick={() => setAddTransactionModalShow(true)}
      />

      <AddTransactionModal
        show={addTransactionModalShow}
        onHide={() => hideModal()}
        wemes_url={wemes_url}
      />
      <ListTransactions
        wemes_url={wemes_url}
        transactionData={transactionData}
        accountData={accountData}
      />
    </div>
  );
};

Transactions.propTypes = {
  wemes_url: PropTypes.string.isRequired,
};

export default Transactions;
