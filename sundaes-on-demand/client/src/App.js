import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { useState } from "react";

function App() {
  //phase can be inProgress, review or complete
  const [phase, setPhase] = useState("inProgress");

  return (
    <Container>
      <OrderDetailsProvider>
        {phase === "inProgress" ? (
          <OrderEntry setPhase={setPhase} />
        ) : phase === "review" ? (
          <OrderSummary setPhase={setPhase} />
        ) : (
          <OrderConfirmation setPhase={setPhase} />
        )}
        {/* <OrderEntry /> */}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
