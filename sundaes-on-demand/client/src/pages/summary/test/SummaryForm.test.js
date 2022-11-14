import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("checkbox enables and disables the button", async () => {
  render(<SummaryForm />);

  const user = userEvent.setup();

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const button = screen.getByRole("button", { name: /confirm order/i });

  //by default the checkbox should be uncheckes
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();

  await user.click(checkbox);

  //checking the checkbox should enable the button
  expect(button).toBeEnabled();

  await user.click(checkbox);

  //unchecking the checkbox should disable the button
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  const user = userEvent.setup();

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  // popover should start out hidden
  expect(nullPopover).not.toBeInTheDocument();

  // popover should appear on mouseover of checkbox label
  const termsAndConditionsLabel = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditionsLabel);

  const popover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();

  // popover should disappear on mouse out
  await user.unhover(termsAndConditionsLabel);
  expect(popover).not.toBeInTheDocument();
});
