import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const OptionComponent =
    optionType === "scoop" ? ScoopOptions : ToppingOptions;

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
