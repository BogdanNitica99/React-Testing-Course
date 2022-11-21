import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { pricePerItem } from "../../constants";
import AlertBanner from "../common/AlertBanner";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const OptionComponent =
    optionType === "scoops" ? ScoopOptions : ToppingOptions;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>
        {items.map((item, index) => (
          <OptionComponent
            key={index}
            name={item.name}
            imagePath={item.imagePath}
          />
        ))}
      </Row>
    </>
  );
}
