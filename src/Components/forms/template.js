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

const TemplateForm = (props) => {
  const { allData, clientID, environment, service, serviceData, clearValue } =
    props;

  const [userID, setUserID] = useState(serviceData?.userID || ''); // Selected Service
  const [clientSecret, setClientSecret] = useState(
    serviceData?.clientSecret || ''
  ); // Selected Service
  const [userName, setUserName] = useState(serviceData?.userName || ''); // Selected Service
  const [password, setPassword] = useState(serviceData?.password || ''); // Selected Service
  const [encodeBase64, setencodeBase64] = useState(
    serviceData?.encodeBase64 || ''
  ); // Selected Service
  const [baseURL, setbaseURL] = useState(serviceData?.baseURL || ''); // Selected Service
  const [URL, setURL] = useState(serviceData?.URL || ''); // Selected Service
  const [apiKey, setapiKey] = useState(serviceData?.apiKey || ''); // Selected Service
  const [decryptKey, setdecryptKey] = useState(serviceData?.decryptKey || ''); // Selected Service
  const [ca, setca] = useState(serviceData?.ca || ''); // Selected Service
  const [cert, setcert] = useState(serviceData?.cert || ''); // Selected Service
  const [key, setkey] = useState(serviceData?.key || ''); // Selected Service
  const [redirectURI, setredirectURI] = useState(
    serviceData?.redirectURI || ''
  ); // Selected Service

  // Password Eye icon logic
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let allDataCopy = allData;
    if (!allDataCopy) allDataCopy = {};
    if (!allDataCopy || !allDataCopy[clientID]) allDataCopy[clientID] = {};

    setUserID(data.get('userID'));
    setUserName(data.get('userName'));
    setClientSecret(data.get('clientSecret'));
    setPassword(data.get('password'));
    setencodeBase64(data.get('encodeBase64'));
    setbaseURL(data.get('baseURL'));
    setURL(data.get('URL'));
    setapiKey(data.get('apiKey'));
    setdecryptKey(data.get('decryptKey'));
    setca(data.get('ca'));
    setcert(data.get('cert'));
    setkey(data.get('key'));
    setredirectURI(data.get('redirectURI'));

    allDataCopy[clientID][service] = {
      userID: data.get('userID'),
      clientSecret: data.get('clientSecret'),
      userName: data.get('userName'),
      password: data.get('password'),
      encodeBase64: data.get('encodeBase64'),
      baseURL: data.get('baseURL'),
      URL: data.get('URL'),
      apiKey: data.get('apiKey'),
      decryptKey: data.get('decryptKey'),
      ca: data.get('ca'),
      cert: data.get('cert'),
      key: data.get('key'),
      redirectURI: data.get(''),
    };
    setItem(allDataCopy, `oasisServiceValue_${environment}`);
    setUserID('');
    setUserName('');
    setClientSecret('');
    setPassword('');
    setencodeBase64('');
    setbaseURL('');
    setURL('');
    setapiKey('');
    setdecryptKey('');
    setca('');
    setcert('');
    setkey('');
    setredirectURI('');
    clearValue();
  };

  const handleTextChange = (event) => {
    switch (event.target.id) {
      case 'userID':
        setUserID(event.target.value);
        break;
      case 'clientSecret':
        setClientSecret(event.target.value);
        break;
      case 'userName':
        setUserName(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'encodeBase64':
        setencodeBase64(event.target.value);
        break;
      case 'baseURL':
        setbaseURL(event.target.value);
        break;
      case 'URL':
        setURL(event.target.value);
        break;
      case 'apiKey':
        setapiKey(event.target.value);
        break;
      case 'decryptKey':
        setdecryptKey(event.target.value);
        break;
      case 'ca':
        setca(event.target.value);
        break;
      case 'cert':
        setcert(event.target.value);
        break;
      case 'key':
        setkey(event.target.value);
        break;
      case 'redirectURI':
        setredirectURI(event.target.value);
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
      <Paper
        sx={{
          borderRadius: "10px",
          my: { xs: 3, md: 6 },
          p: { xs: 2, md: 3 },
        }}
        elevation={10}
      >
        <Grid container spacing={2} sx={{ paddingTop: 5, paddingBottom: 3 }}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userID"
              label="ClientID"
              name="userID"
              autoComplete="clientID"
              autoFocus
              value={userID}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="clientSecret"
              label="Client Secret"
              type={showPassword ? "text" : "password"}
              id="clientSecret"
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
              value={clientSecret}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="encodeBase64"
              label="EncodeBase64"
              name="encodeBase64"
              autoComplete="encodeBase64"
              autoFocus
              value={encodeBase64}
              onChange={handleTextChange}
            />
          </Grid>
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="baseURL"
              label="Base URL"
              name="baseURL"
              autoComplete="clientID"
              autoFocus
              value={baseURL}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="URL"
              label="URL"
              name="URL"
              autoComplete="URL"
              autoFocus
              value={URL}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="apiKey"
              label="ApiKey"
              name="apiKey"
              autoComplete="apiKey"
              autoFocus
              value={apiKey}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="decryptKey"
              label="DecryptKey"
              name="decryptKey"
              autoComplete="decryptKey"
              autoFocus
              value={decryptKey}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="ca"
              label="CA"
              name="ca"
              autoComplete="ca"
              autoFocus
              value={ca}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="cert"
              label="Certificate"
              name="cert"
              autoComplete="cert"
              autoFocus
              value={cert}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="key"
              label="Key"
              name="key"
              autoComplete="key"
              autoFocus
              value={key}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="redirectURI"
              label="RedirectURI"
              name="redirectURI"
              autoComplete="redirectURI"
              autoFocus
              value={redirectURI}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            {userID &&
              clientSecret &&
              userName &&
              password &&
              encodeBase64 &&
              baseURL &&
              URL &&
              apiKey &&
              ca &&
              cert &&
              key &&
              redirectURI && (
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
      </Paper>
    </Container>
  );
};

export { TemplateForm };
