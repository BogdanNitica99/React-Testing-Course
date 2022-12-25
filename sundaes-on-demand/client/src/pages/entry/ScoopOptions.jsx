import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { useState } from "react";

export default function ScoopOptions({ name, imagePath }) {
  const [isValid, setIsValid] = useState(true);

  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    const currentValue = parseFloat(e.target.value);

    const valueIsValid =
      0 <= currentValue &&
      currentValue <= 10 &&
      Math.floor(currentValue) === currentValue;

    setIsValid(valueIsValid);

    const newValue = valueIsValid ? parseInt(currentValue) : 0;

    updateItemCount(name, newValue, "scoops");
  };

  return (
    <Col>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
