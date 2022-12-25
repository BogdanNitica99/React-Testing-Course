import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render App
  render(<App />);

  const user = userEvent.setup();

  // add vanilla scoops
  const vanillaButton = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // clear the input to not have leading or trailing 0's
  await user.clear(vanillaButton);
  await user.type(vanillaButton, "2");

  // add cherries topping
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

  // chack that loading appears on the page while the server responds with the data
  const loading = screen.getByRole("heading", { name: "Loading!" });
  expect(loading).toBeInTheDocument();

  // find the thank you message, which means the loading is done
  const thankYouHeader = await screen.findByRole("heading", {
    name: "Thank you!",
  });
  expect(thankYouHeader).toBeInTheDocument();

  // check that the loading has disappeared the screen
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

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

test("toppings header is not on summary page if no toppings ordered", async () => {
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

  // find and click order button
  const orderButton = screen.getByRole("button", { name: "Order" });
  await user.click(orderButton);

  // check summary information based on order
  const scoopsSummary = screen.getByRole("heading", { name: /scoops: /i });
  expect(scoopsSummary).toHaveTextContent("$4.00");

  const notToppingsSummary = screen.queryByRole("heading", {
    name: /toppings: /i,
  });
  expect(notToppingsSummary).not.toBeInTheDocument();
});

test("toppings header is not on summary page if toppings ordered, then removed", async () => {
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

  // add cherries topping
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  //remove topping
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();
  expect(toppingsTotal).toHaveTextContent("0.00");

  // find and click order button
  const orderButton = screen.getByRole("button", { name: "Order" });
  await user.click(orderButton);

  // check summary information based on order
  const scoopsSummary = screen.getByRole("heading", { name: /scoops: /i });
  expect(scoopsSummary).toHaveTextContent("$4.00");

  // check that the topping is not on screen
  const notToppingsSummary = screen.queryByRole("heading", {
    name: /toppings: /i,
  });
  expect(notToppingsSummary).not.toBeInTheDocument();
});
