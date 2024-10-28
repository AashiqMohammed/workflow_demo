"use client";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '../styledButton';

import { setItem } from '../../utils';

const AutoIdentForm = (props) => {
  const { allData, clientID, environment, service, serviceData, clearValue } =
    props;

  const [baseURL, setbaseURL] = useState(serviceData?.baseURL || ''); // Selected Service
  const [URL, setURL] = useState(serviceData?.URL || ''); // Selected Service
  const [apiKey, setapiKey] = useState(serviceData?.apiKey || ''); // Selected Service


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let allDataCopy = allData;
    if (!allDataCopy) allDataCopy = {};
    if (!allDataCopy || !allDataCopy[clientID]) allDataCopy[clientID] = {};
    setbaseURL(data.get('baseURL'));
    setURL(data.get('URL'));
    setapiKey(data.get('apiKey'));

    allDataCopy[clientID][service] = {
      baseURL: data.get('baseURL'),
      apiKey: data.get('apiKey'),
      URL: data.get('URL'),
    };
    setItem(allDataCopy, `oasisServiceValue_${environment}`);
    setbaseURL('');
    setURL('');
    setapiKey('');
    clearValue();
  };

  const handleTextChange = (event) => {
    switch (event.target.id) {
      case 'baseURL':
        setbaseURL(event.target.value);
        break;
      case 'apiKey':
        setapiKey(event.target.value);
        break;
      case 'URL':
        setURL(event.target.value);
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
            {baseURL && apiKey && URL && (
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

export { AutoIdentForm };
