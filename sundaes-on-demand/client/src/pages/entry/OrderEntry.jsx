import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderEntry({ setPhase }) {
  const { totals } = useOrderDetails();

  const handleChange = () => {
    setPhase("review");
  };

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h1>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h1>
      <button onClick={handleChange}>Order</button>
    </div>
  );
}
