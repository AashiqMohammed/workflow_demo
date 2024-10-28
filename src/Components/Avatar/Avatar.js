import * as React from "react";
import Avatar from "@mui/material/Avatar";

const DefaultAvatar = (props) => {
  const { service, bgcolor, label } = props;
  return (
    <Avatar key={service} sx={{ bgcolor }}>
      {label}
    </Avatar>
  );
};

export default DefaultAvatar;
