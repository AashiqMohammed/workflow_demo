"use client";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '../styledButton';

import { setItem } from '../../utils';

const AuthadaForm = (props) => {
  const { allData, clientID, environment, service, serviceData, clearValue } =
    props;

  const [ca, setca] = useState(serviceData?.ca || ''); // Selected Service
  const [cert, setcert] = useState(serviceData?.cert || ''); // Selected Service
  const [key, setkey] = useState(serviceData?.key || ''); // Selected Service

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let allDataCopy = allData;
    if (!allDataCopy) allDataCopy = {};
    if (!allDataCopy || !allDataCopy[clientID]) allDataCopy[clientID] = {};

    setca(data.get('ca'));
    setcert(data.get('cert'));
    setkey(data.get('key'));

    allDataCopy[clientID][service] = {
      ca: data.get('ca'),
      cert: data.get('cert'),
      key: data.get('key'),
    };
    setItem(allDataCopy, `oasisServiceValue_${environment}`);

    setca('');
    setcert('');
    setkey('');
    clearValue();
  };

  const handleTextChange = (event) => {
    switch (event.target.id) {
      case 'ca':
        setca(event.target.value);
        break;
      case 'cert':
        setcert(event.target.value);
        break;
      case 'key':
        setkey(event.target.value);
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
            {ca && cert && key && (
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

export { AuthadaForm };
