import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { FaExclamationTriangle, FaCheck } from "react-icons/fa"; // Example icons

function DMItem({ dm, updateDM }) {
  const handlePriorityChange = (newPriority) => {
    updateDM(dm._id, { priority: newPriority });
  };

  const handleSpamChange = (isSpam) => {
    updateDM(dm._id, { isSpam: isSpam });
  };
  return (
    <ListGroup.Item>
      <h5>{dm.sender}</h5>
      <p>{dm.message}</p>
      <p>
        Priority:
        <select
          value={dm.priority}
          onChange={(e) => handlePriorityChange(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </p>
      <div>
        Spam:
        <button
          onClick={() => handleSpamChange(true)}
          disabled={dm.isSpam === true}
        >
          <FaExclamationTriangle color={dm.isSpam === true ? "red" : "gray"} />{" "}
          Spam
        </button>
        <button
          onClick={() => handleSpamChange(false)}
          disabled={dm.isSpam === false}
        >
          <FaCheck color={dm.isSpam === false ? "green" : "gray"} /> Not Spam
        </button>
      </div>
      <Badge variant="secondary">{dm.timestamp}</Badge>
    </ListGroup.Item>
  );
}

export default DMItem;
