import { screen, render } from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderConfirmation from "../OrderConfirmation";

test("shows error from server", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setPhase={jest.fn()} />);

  const alert = await screen.findByRole("alert");
  expect(alert).toBeInTheDocument();
});
