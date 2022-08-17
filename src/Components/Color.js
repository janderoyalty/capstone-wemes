import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

const Color = ({ wemes_url, onChange }) => {
  const [colordata, setColorData] = useState([]);

  const getColor = () => {
    axios
      .get(`${wemes_url}color/`)
      .then((response) => setColorData(response.data))
      .catch(alert);
  };
  useEffect(() => getColor(), []);

  console.log(colordata);
  return (
    <Dropdown variant="warning" onSelect={(eventKey, event) => onChange(event)}>
      <Dropdown.Toggle>Color</Dropdown.Toggle>

      <Dropdown.Menu variant="light">
        {colordata.map((color) => (
          <Dropdown.Item as="button">{color.name}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Color;
