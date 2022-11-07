import { render, screen, fireEvent } from "@testing-library/react";
import { logRoles } from "@testing-library/react";
import App from "./App";

test("button is visible and has correct initial text and color", () => {
  // Helpful when you need to see all the accessible roles on that page
  const { container } = render(<App />);
  logRoles(container);

  const button = screen.getByRole("button", { name: "Change to blue" });

  expect(button).toBeVisible();
  expect(button).toHaveStyle({ backgroundColor: "red" });
});

test("button changes when clicked", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: "Change to blue" });

  fireEvent.click(button);

  expect(button).toHaveStyle({ backgroundColor: "blue" });

  expect(button).toHaveTextContent("Change to red");
});

test("button starts enabled and checkbox unchecked", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: "Change to blue" });
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  expect(checkbox).not.toBeChecked();
});

test("checkbox disbales button on first click and enables it on second click", () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", { name: "Change to blue" });

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
  const button = screen.getByRole("button", { name: "Change to blue" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "red" });

  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: "blue" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "blue" });
});
