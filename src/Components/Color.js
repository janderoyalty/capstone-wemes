import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

const Color = ({ wemes_url }) => {
  const [colordata, setColorData] = useState([]);

  const getColor = () => {
    axios
      .get(`${wemes_url}color/`)
      .then((response) => {
        const newData = response.data.map((color) => {
          return {
            color_name: color.name,
          };
        });
        console.log(newData);
        setColorData(newData);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => getColor(), []);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Color;
