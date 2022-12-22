import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);

  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        console.error(error);
        // To do
      });
  }, []);

  if (!orderNumber) {
    return <h1>Loading!</h1>;
  }

  const handleChange = () => {
    resetOrder();
    setPhase("inProgress");
  };

  return (
    <div>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <p>As of our terms and conditions nothing will happen</p>

      <button onClick={handleChange}>Create new order</button>
    </div>
  );
}
