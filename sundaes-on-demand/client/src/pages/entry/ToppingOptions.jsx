import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { useState } from "react";

export default function ToppingOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
  };

  return (
    <Col>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Check
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
