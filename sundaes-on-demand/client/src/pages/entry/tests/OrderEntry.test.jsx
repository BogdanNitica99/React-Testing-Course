import {
  screen,
  render,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

test("shows error from server", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoop", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/topping", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
