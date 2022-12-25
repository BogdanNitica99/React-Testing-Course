import {
  screen,
  render,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";

test("shows error from server", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("disables the order button if no scoops ordered", async () => {
  const user = userEvent.setup();

  render(<OrderEntry setPhase={jest.fn()} />);

  // get the order button and by default it should be disabled
  const orderButton = screen.getByRole("button", { name: "Order" });
  expect(orderButton).toBeDisabled();

  // add two scoops of vanilla
  const vanillaButton = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // clear the input to not have leading or trailing 0's
  await user.clear(vanillaButton);
  await user.type(vanillaButton, "2");

  expect(orderButton).toBeEnabled();

  // clear the scoops
  await user.clear(vanillaButton);
  await user.type(vanillaButton, "0");
  expect(orderButton).toBeDisabled();
});
