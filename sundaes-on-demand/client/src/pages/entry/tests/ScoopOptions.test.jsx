import { screen, render } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOptions";

test("red box appears for invalid scoop number and disappears for valid number of scoops", async () => {
  render(<ScoopOptions />);

  const user = userEvent.setup();

  // get the vanilla input box
  const userInput = await screen.findByRole("spinbutton");
  // clear the input to not have leading or trailing 0's
  await user.clear(userInput);
  // insert negative number of scoops
  await user.type(userInput, "-5");

  expect(userInput).toHaveClass("is-invalid");

  // clear the input box
  await user.clear(userInput);
  await user.type(userInput, "0");

  expect(userInput).not.toHaveClass("is-invalid");

  // clear the input to not have leading or trailing 0's
  await user.clear(userInput);
  // insert decimal number of scoops
  await user.type(userInput, "1.5");

  expect(userInput).toHaveClass("is-invalid");

  // clear the input box
  await user.clear(userInput);
  await user.type(userInput, "0");

  expect(userInput).not.toHaveClass("is-invalid");

  // clear the input to not have leading or trailing 0's
  await user.clear(userInput);
  // insert number bigger than 20
  await user.type(userInput, "25");

  expect(userInput).toHaveClass("is-invalid");

  // clear the input box
  await user.clear(userInput);
  await user.type(userInput, "0");

  expect(userInput).not.toHaveClass("is-invalid");
});
