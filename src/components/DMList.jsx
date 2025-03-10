import React from "react";
import DMItem from "./DMItem";
import { ListGroup } from "react-bootstrap";

function DMList({ dms, updateDM }) {
  return (
    <ListGroup>
      {dms.map((dm) => (
        <DMItem key={dm._id} dm={dm} updateDM={updateDM} />
      ))}
    </ListGroup>
  );
}

export default DMList;
