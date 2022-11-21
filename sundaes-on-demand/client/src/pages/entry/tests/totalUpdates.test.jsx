import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("checks the total value for scoops", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  const user = userEvent.setup();

  // check the total value to start at 0.00
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
