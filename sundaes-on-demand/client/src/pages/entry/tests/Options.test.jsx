import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // Get all images by role and with the alt text ending with scoop
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // Get all the alt texts from each img and check if they match
  const altText = scoopImages.map((scoopOption) => scoopOption.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  // Get all images by role and with the alt text ending with topping
  // Used findAllByRole because the images are a response from the server and the functions needs to use async / await
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // Get all the alt texts from each img and check if they match
  const altText = toppingImages.map((toppingOption) => toppingOption.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("scoops total doesn't update for invalid input", async () => {
  render(<Options optionType="scoops" />);

  const user = userEvent.setup();

  // check the total value starts at 0.00
  const scoopsTotal = screen.getByText("Scoops total", { exact: false });
  expect(scoopsTotal).toHaveTextContent("0.00");

  // add invalid scoops input
  const vanillaButton = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  // clear the input to not have leading or trailing 0's
  await user.clear(vanillaButton);
  await user.type(vanillaButton, "-1");

  expect(scoopsTotal).toHaveTextContent("0.00");

  await user.clear(vanillaButton);
  await user.type(vanillaButton, "1");

  expect(scoopsTotal).toHaveTextContent("2.00");
});
