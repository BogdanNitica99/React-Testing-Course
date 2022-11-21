import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("checks the total value for scoops", async () => {
  render(<Options optionType="scoops" />);

  const user = userEvent.setup();

  // check the total value starts at 0.00
  const scoopsTotal = screen.getByText("Scoops total", { exact: false });
  expect(scoopsTotal).toHaveTextContent("0.00");

  // add one vanilla scoop and check the total sum
  const vanillaButton = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // clear the input to not have leading or trailing 0's
  await user.clear(vanillaButton);
  await user.type(vanillaButton, "1");

  expect(scoopsTotal).toHaveTextContent("2.00");

  // add two chocolate scoops and check the total sum
  const chocolateButton = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateButton);
  await user.type(chocolateButton, "2");

  // 2 from vanilla and 4 from chocolate
  expect(scoopsTotal).toHaveTextContent("6.00");
});

test("checks the total value for toppings", async () => {
  render(<Options optionType="toppings" />);

  const user = userEvent.setup();

  //check the total value starts at 0.00
  const toppingsTotal = screen.getByText("Toppings total", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // check cherries topping and check the total sum
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesCheckbox).not.toBeChecked();
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();

  expect(toppingsTotal).toHaveTextContent("1.50");

  // check M&M's checkbox and check the total sum
  const mAndMCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  await user.click(mAndMCheckbox);
  expect(mAndMCheckbox).toBeChecked();

  expect(toppingsTotal).toHaveTextContent("3.00");

  // uncheck cherries topping and check the total sum
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();

  expect(toppingsTotal).toHaveTextContent("1.50");
});
