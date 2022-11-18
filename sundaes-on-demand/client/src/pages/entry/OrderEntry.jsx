import Options from "./Options";

export default function OrderEntry() {
  return (
    <div>
      <Options optionType="scoop" />
      <Options optionType="topping" />
    </div>
  );
}
