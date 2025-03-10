import React from "react";
import { Card } from "react-bootstrap";

function Settings() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Settings</Card.Title>
        <Card.Text>
          Here you can add settings like auto-remove connections who spam with
          sales, prioritization, etc.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Settings;
