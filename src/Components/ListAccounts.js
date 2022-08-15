import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import SortMenuAccounts from "./SortMenuAccounts";
import { AiFillEdit } from "react-icons/ai";
import DisplayAccountModal from "./Modals/DisplayAccountModal";

const ListAccounts = ({ accounts, wemes_url }) => {
  const [modalShow, setModalShow] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [orderBy, setOrderBy] = useState("desc");
  const [selectedaccount, setSelectedAccount] = useState({})

  const sortedAccounts = accounts.sort((a, b) => {
    let order = orderBy === "asc" ? 1 : -1;
    let sortByA = sortBy === "id" ? a[sortBy] : a[sortBy];
    let sortByB = sortBy === "id" ? b[sortBy] : b[sortBy];
    return sortByA < sortByB ? -1 * order : 1 * order;
  });

  const accountInfo = () => {
    return sortedAccounts.map((account, index) => (
      <tr
        key={index}
        onClick={() => {
          setClickedIndex(index);
          setModalShow(true);
          setSelectedAccount(account)
        }}
      >
        <td>
          <AiFillEdit />
        </td>
        <td>{account.last_four}</td>
        <td>{account.first_name}</td>
        <td>{account.last_name}</td>
        <td>{account.phone_num}</td>
        <td>{account.email}</td>
        <td>{account.transactions.length}</td>
      </tr>
    ));
  };

  // console.log('selectAccount');
  // console.log(selectAccount);

  return (
    <>
      <div>
        <DisplayAccountModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          wemes_url={wemes_url}
          index={clickedIndex}
          selectedaccount={selectedaccount}
        />
        <SortMenuAccounts
          sortBy={sortBy}
          onSortByChange={(sortOption) => {
            setSortBy(sortOption);
          }}
          orderBy={orderBy}
          onOrderByChange={(orderOption) => {
            setOrderBy(orderOption);
          }}
        />
      </div>
      <Table striped hover date-paganation="true">
        <thead>
          <tr>
            <th>Edit</th>
            <th>Account ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>{accountInfo()}</tbody>
      </Table>
    </>
  );
};

ListAccounts.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default ListAccounts;
