import { render, screen, fireEvent } from "@testing-library/react";
import { logRoles } from "@testing-library/react";
import App, { camelCaseToSpaceColorNames } from "./App";

test("button is visible and has correct initial text and color", () => {
  // Helpful when you need to see all the accessible roles on that page
  const { container } = render(<App />);
  logRoles(container);

  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  expect(button).toBeVisible();
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("button changes when clicked", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(button);

  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });

  expect(button).toHaveTextContent("Change to Medium Violet Red");
});

test("button starts enabled and checkbox unchecked", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  expect(checkbox).not.toBeChecked();
});

test("checkbox disbales button on first click and enables it on second click", () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeEnabled();
});

test("changing colors to the button with gray for disable", () => {
  // disable button -> button is gray -> enable button -> button is red
  // click button to change color -> button is blue -> disable button -> button is gray
  // enable button -> button is blue
  render(<App />);

  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("works for no inner capital letters", () => {
    expect(camelCaseToSpaceColorNames("Red")).toBe("Red");
  });

  test("works for one inner capital letters", () => {
    expect(camelCaseToSpaceColorNames("MidnightBlue")).toBe("Midnight Blue");
  });

  test("works for multiple inner capital letters", () => {
    expect(camelCaseToSpaceColorNames("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});
