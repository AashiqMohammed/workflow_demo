import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Password = (props) => {
  const {
    label = 'Enter your password',
    id = 'password',
    onChange,
    value,
  } = props;
  const name = props?.name || id;

  // Password Eye icon logic
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      id={id}
      autoComplete="current-password"
      onChange={onChange}
      InputProps={{
        // <-- This is where the toggle button is added.
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={value}
    />
  );
};
export { Password };
