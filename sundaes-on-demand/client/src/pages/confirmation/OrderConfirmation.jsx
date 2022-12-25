import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  const { resetOrder } = useOrderDetails();

  const handleChange = () => {
    resetOrder();
    setPhase("inProgress");
  };

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <>
        <AlertBanner />
        <button onClick={handleChange}>Create new order</button>
      </>
    );
  }

  if (!orderNumber) {
    return <h1>Loading!</h1>;
  }

  return (
    <div>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <p>As of our terms and conditions nothing will happen</p>

      <button onClick={handleChange}>Create new order</button>
    </div>
  );
}
