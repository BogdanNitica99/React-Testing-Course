import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOptions from "./ScoopOptions";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, [optionType]);

  const OptionComponent = optionType === "scoop" ? ScoopOptions : null;

  return (
    <Row>
      {items.map((item, index) => (
        <OptionComponent
          key={index}
          name={item.name}
          imagePath={item.imagePath}
        />
      ))}
    </Row>
  );
}
