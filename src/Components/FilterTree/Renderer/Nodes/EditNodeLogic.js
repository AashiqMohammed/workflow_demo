"use client";

import React, { useState, useEffect, useCallback } from "react";
import { arrayOf, func, oneOfType, number, shape, string } from "prop-types";
import { BasicSelect as DropDownList } from "../../../select";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const EditNodeLogic = ({ node, path, nodeAction }) => {
  const source = [
    { label: "AND", logic: "AND", value: "AND" },
    { label: "OR", logic: "OR", value: "OR" },
  ];
  const [logic, setLogic] = useState(node.logic);

  const onLogicChange = (event) => {
    let value = event?.value;
    setLogic(value);
  };

  const onSubmit = () => {
    nodeAction("save", { ...node, logic }, path);
  };

  const onCancel = useCallback(
    () => nodeAction("cancel", node, path),
    [node, path, nodeAction]
  );

  return (
    <div className="rowContents">
      <div className="rowLabel mode-edit">
        <DropDownList
          name="logic"
          placeholder="Select logic ..."
          floatLabelType="Never"
          value={logic}
          items={source}
          handleChange={onLogicChange}
        />
      </div>
      <div className="rowToolbar">
        <div className="toolbarButton">
          <button className="btn btn-primary" id="checkmark" onClick={onSubmit}>
            <CheckIcon style={{ color: "grey" }} />
          </button>
        </div>
        <div className="toolbarButton">
          <button
            className="btn btn-prmary"
            onClick={() => nodeAction("cancel", node, path)}
            id="cancel"
          >
            <CloseIcon style={{ color: "grey" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

EditNodeLogic.propTypes = {
  node: shape({}).isRequired,
  path: arrayOf(oneOfType([string, number])).isRequired,
  nodeAction: func.isRequired,
};

export default EditNodeLogic;
