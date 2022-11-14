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
