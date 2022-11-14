import Col from "react-bootstrap/Col";

export default function ScoopOptions({ name, imagePath }) {
  return (
    <Col>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
    </Col>
  );
}
