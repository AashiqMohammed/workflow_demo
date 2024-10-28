"use client";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button } from '../styledButton';

import { setItem } from '../../utils';

const WebIdSignForm = (props) => {
  const { allData, clientID, environment, service, serviceData, clearValue } =
    props;

  const [userName, setUserName] = useState(serviceData?.userName || ''); // Selected Service
  const [password, setPassword] = useState(serviceData?.password || ''); // Selected Service

  // Password Eye icon logic
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let allDataCopy = allData;
    if (!allDataCopy) allDataCopy = {};
    if (!allDataCopy || !allDataCopy[clientID]) allDataCopy[clientID] = {};

    setUserName(data.get('userName'));
    setPassword(data.get('password'));

    allDataCopy[clientID][service] = {
      userName: data.get('userName'),
      password: data.get('password'),
    };
    setItem(allDataCopy, `oasisServiceValue_${environment}`);
    setUserName('');
    setPassword('');

    clearValue();
  };

  const handleTextChange = (event) => {
    switch (event.target.id) {
      case 'userName':
        setUserName(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
    }
  };

  return (
    <Container
      component="form"
      sx={{ mb: 4 }}
      maxWidth="sm"
      onSubmit={handleSubmit}
    >
      {/* <Paper
        sx={{
          borderRadius: "10px",
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
        }}
        elevation={10}
      > */}
        <Grid container spacing={2} sx={{ paddingTop: 5, paddingBottom: 3 }}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="UserName"
              name="userName"
              autoComplete="userName"
              autoFocus
              value={userName}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={handleTextChange}
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
              value={password}
            />
          </Grid>

          <Grid item xs={12}>
            {userName && password && (
              <Button
                label="Submit"
                style={{
                  margin: "0px 0px",
                  left: "30%",
                  position: "relative",
                  width: "200px",
                  height: "50px",
                  background: "#004696",
                  borderRadius: "0",
                  fontSize: "20px",
                }}
              />
            )}
          </Grid>
        </Grid>
      {/* </Paper> */}
    </Container>
  );
};

export { WebIdSignForm };
