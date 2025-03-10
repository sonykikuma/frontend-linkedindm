import React from "react";
import { Form } from "react-bootstrap";

function FilterOptions({ onFilterChange, filters }) {
  const handlePriorityChange = (e) => {
    onFilterChange({ ...filters, priority: e.target.value }); // Ensure filters are merged correctly

    //onFilterChange({ priority: e.target.value });
  };

  const handleSpamChange = (e) => {
    const value = e.target.value === "" ? null : e.target.value === "true";
    onFilterChange({ isSpam: value });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ searchTerm: e.target.value });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Priority:</Form.Label>
        <Form.Control as="select" onChange={handlePriorityChange}>
          <option value="">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Spam:</Form.Label>
        <Form.Control as="select" onChange={handleSpamChange}>
          <option value="">All</option>
          <option value="true">Spam</option>
          <option value="false">Not Spam</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Search:</Form.Label>
        <Form.Control
          className="mb-3"
          type="text"
          placeholder="Search sender or message"
          onChange={handleSearchChange}
        />
      </Form.Group>
    </Form>
  );
}

export default FilterOptions;
