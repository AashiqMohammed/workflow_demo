"use client";

import React, { useState } from "react";
import { arrayOf, func, oneOfType, number, shape, string } from "prop-types";
import { BasicSelect as DropDownList } from "@/Components/select";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const operators = [
  { label: "Not Started", key: "operator", value: "Not Started" },
  { label: "Started", key: "operator", value: "Started" },
  { label: "Down", key: "operator", value: "Down" },
  { label: "Succeeded", key: "operator", value: "Succeeded" },
  { label: "Failed", key: "operator", value: "Failed" },
];
const fields = [
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

const fieldChecks = [
  { label: "Address Check", key: "fieldCheck", value: "Address Check" },
  { label: "Birthday Check", key: "fieldCheck", value: "Birthday Check" },
  { label: "Bank account Check", key: "fieldCheck", value: "Bank account Check" },
  { label: "Pin bank transfer Check", key: "fieldCheck", value: "Pin bank transfer Check" },
  { label: "Pin input Check", key: "fieldCheck", value: "Pin input Check" },
  { label: "Passport recognition", key: "fieldCheck", value: "Passport recognition" },
  { label: "Passport Check", key: "fieldCheck", value: "Passport Check" },
  { label: "Addiction Check", key: "fieldCheck", value: "Addiction Check" },
  { label: "Rule Hit", key: "fieldCheck", value: "Rule Hit" },
]


const EditNodeCondition = ({ node, path, nodeAction }) => {
  const [field, setField] = useState(node?.field||"");
  const [operator, setOperator] = useState(node?.operator||"");
  const [value, setValue] = useState(node?.value||"");
  const [fieldCheck, setFieldCheck] = useState(node?.fieldCheck || "");

  const onSubmit = () => {
    const newNode = { ...node, field, value, operator, fieldCheck };
    nodeAction("save", newNode, path);
  };

  const handleChange = (event, type) => {
    let value = event?.value;
    switch (type) {
      case "field":
        setField(value);
        break;
      case "operator":
        setOperator(value);
        break;
      case "value":
        setValue(event.target.value);
      case "fieldCheck":
        setFieldCheck(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="rowContents">
      <div className="rowLabel mode-edit" style={{ width: "650px" }}>
        <div style={{ width: "200px", marginRight: "6px" }}>
          <DropDownList
            label="Select a service"
            value={field}
            items={fields}
            handleChange={(event) => handleChange(event, "field")}
          />
        </div>
        <div style={{ width: "200px", marginRight: "6px" }}>
          <DropDownList
            label="Select a field check"
            value={fieldCheck}
            items={fieldChecks}
            handleChange={(event) => handleChange(event, "fieldCheck")}
          />
        </div>
        <div style={{ width: "200px", marginRight: "6px" }}>
          <DropDownList
            label="Select a pre condition"
            value={operator}
            items={operators}
            handleChange={(event) => handleChange(event, "operator")}
          />
        </div>
        {/* <div
          className="row-condition-value"
          style={{ width: '300px', marginRight: '6px' }}
        >
          <TextField
            // placeholder="Add a value"
            className="condition-value"
            id="value"
            value={value}
            onChange={(event) => handleChange(event, 'value')}
          />
        </div> */}
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
EditNodeCondition.propTypes = {
  node: shape({}).isRequired,
  path: arrayOf(oneOfType([string, number])).isRequired,
  nodeAction: func.isRequired,
};

export default React.memo(EditNodeCondition);
