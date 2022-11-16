import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoop" />);

  // Get all images by role and with the alt text ending with scoop
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // Get all the alt texts from each img and check if they match
  const altText = scoopImages.map((scoopOption) => scoopOption.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="topping" />);

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
