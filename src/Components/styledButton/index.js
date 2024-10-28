/* eslint-disable react/prop-types */
import { styled } from "@mui/material/styles";
import React from 'react';

const getButton = (style) => {
  const StyledButton = styled("button")(style);
  return StyledButton;
};
const Button = (props) => {
  const style = {
    width: "40%",
    height: "40px",
    background: "#1565C0",
    color: "#ffffff",
    cursor: "pointer",
    borderRadius: "1rem",
    border: 0,
    ...(props.style || {}),
  };
  const StyledButton = getButton(style);
  return <StyledButton onClick={props.onClick}>{props.label}</StyledButton>;
};

export { Button };
