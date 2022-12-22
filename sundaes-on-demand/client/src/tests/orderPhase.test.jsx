import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render App
  render(<App />);

  const user = userEvent.setup();

  // add ice cream scoops
  const vanillaButton = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // clear the input to not have leading or trailing 0's
  await user.clear(vanillaButton);
  await user.type(vanillaButton, "2");

  // add ice cream topping
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole("button", { name: "Order" });
  await user.click(orderButton);

  // check summary information based on order
  const scoopsSummary = screen.getByRole("heading", { name: /scoops: /i });
  expect(scoopsSummary).toHaveTextContent("$4.00");

  const toppingsSummary = screen.getByRole("heading", { name: /toppings: /i });
  expect(toppingsSummary).toHaveTextContent("$1.50");

  // accept terms and conditions and click button to confirm order
  const termsAndConditions = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsAndConditions);

  const confirmOrder = screen.getByRole("button", { name: /confirm order/i });
  await user.click(confirmOrder);

  // confirm order number on confirmation page
  const confirmationNumber = await screen.findByText(/order number/i);
  expect(confirmationNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  await user.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
