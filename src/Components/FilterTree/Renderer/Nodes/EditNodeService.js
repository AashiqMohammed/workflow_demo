"use client";

import React, { useEffect, useState } from "react";
import { arrayOf, func, oneOfType, number, shape, string } from "prop-types";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { BasicSelect as DropDownList } from "../../../select";

const sourceData = [
  { label: "SCHUFA", value: "SCHUFA", key: "SCHUFA" },
  { label: "PEP & Sanction", value: "PEP & Sanction", key: "PEP_and_Sanction" },
  { label: "OASIS Check", value: "OASIS Check", key: "oasis" },
  { label: "1-Cent", value: "1-Cent", key: "OneCent" },
  { label: "YES", value: "YES", key: "Yes" },
  { label: "Identt", value: "Identt", key: "Identt" },
  { label: "Hooyu", value: "Hooyu", key: "Hooyu" },
  { label: "Verifeye", value: "Verifeye", key: "Verifeye" },
  { label: "AutoIdent", value: "AutoIdent", key: "AutoIdent" },
  { label: "PostIdent", value: "PostIdent", key: "PostIdent" },
  { label: "Authada", value: "Authada", key: "Authada" },
  { label: "Fintec", value: "Fintec", key: "Fintec" },
  { label: "Jumio", value: "Jumio", key: "Jumio" },
  { label: "ATrust", value: "ATrust", key: "ATrust" },
  { label: "WebId", value: "WebId", key: "WebId" },
  { label: "WebIdSign", value: "WebIdSign", key: "WebIdSign" },
  { label: "IdAustria", value: "IdAustria", key: "IdAustria" },
  { label: "Neos", value: "Neos", key: "Neos" },
  { label: "ItsMe", value: "ItsMe", key: "ItsMe" },
];
const EditServiceCondition = ({ node, path, nodeAction }) => {
  const [nodeData, setNodeData] = useState(node);
  const [serviceValue, SetServiceValue] = useState(node?.serviceValue || '');

  const handleChange = (event) => {
    let value = event?.value;
    SetServiceValue(value);
  };

  const onSubmit = () => {
    const newNode = { ...nodeData, serviceValue };
    nodeAction("save", newNode, path, "service", false, serviceValue);
  };

  useEffect(() => {
    setNodeData(node);
  }, [node]);
  return (
    <div className="rowContents">
      <div className="rowLabel mode-edit" style={{ width: "400px" }}>
        <div style={{ width: "220px", marginRight: "6px" }}>
          <div>
            <DropDownList
              label="Add service"
              items={sourceData}
              handleChange={handleChange}
              value={serviceValue}
              style={{
                marginTop: "10px",
                width: "100px",
              }}
            />
          </div>
        </div>
      </div>
      <div className="rowToolbar">
        <div className="toolbarButton">
          <button className="btn btn-primary" id="checkmark" onClick={onSubmit}>
            <CheckIcon style={{ color: "grey" }} />
          </button>
        </div>
        <div className="toolbarButton">
          <button
            className="btn btn-primary"
            onClick={() => nodeAction("cancel", nodeData, path)}
            id="cancel"
          >
            <CloseIcon style={{ color: "grey" }} />
          </button>
        </div>
      </div>
    </div>
  );
};
EditServiceCondition.propTypes = {
  node: shape({}).isRequired,
  path: arrayOf(oneOfType([string, number])).isRequired,
  nodeAction: func.isRequired,
};

export default React.memo(EditServiceCondition);
