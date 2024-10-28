"use client";
import React, { useState, useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDisclosure } from "@chakra-ui/react";

import {
  BasicSelect,
  DynamicServiceForm,
  ConfirmModal,
  DefaultAvatar,
  StyledBadge,
} from "../../../Components";
import { getItem, getServiceInitial, findServices } from "../../../utils";
import { serviceColors, selectEnvironmentItems } from "../../../../config";

const Credentials = (props: any) => {
  const router = useRouter();
  const theme = createTheme();
  const serviceRef: any = useRef(null);
  const {
    isOpen: isConfirmOpen,
    onOpen: isConfirmOnOpen,
    onClose: isConfirmClose,
  } = useDisclosure();

  const [service, setService] = useState(""); // Selected Service
  const [environment, setEnvironment] = useState(""); // Selected Service
  const [clientID, setClientID] = useState(""); // Selected Service
  const [allData, setAllData] = useState({}); // Contains all the clients data

  const selectedClient: any = getItem();
  if (!selectedClient) {
    return router.push("/dashboard/clients");
  }
  const selectServiceItems = findServices(selectedClient.services);

  const configuredServices =
    allData &&
    clientID &&
    allData.hasOwnProperty(clientID) &&
    //@ts-ignore
    Object.keys(allData?.[clientID]).length
      ? //@ts-ignore
        Object.keys(allData?.[clientID])
      : [];

  const clearValue = () => {
    serviceRef?.current?.clearValue();
  };

  const handleServiceSelectChange = (event: any) => {
    let value = event?.value;
    setService(value);

    // let selectedClient: any = getItem();
    // let serviceTempValue: any = getItem(`oasisServiceValue_${environment}`); // Get all the cred values

    // setClientID(selectedClient.id);
    // setAllData(serviceTempValue);
  };

  const handleEnvironmentSelectChange = (event: any) => {
    let value = event.value;
    let selectedClient: any = getItem();
    let serviceTempValue: any = getItem(`oasisServiceValue_${value}`); // Get all the cred values

    setClientID(selectedClient.id);
    setAllData(serviceTempValue);
    setEnvironment(value);
    setService("");
    clearValue();
  };

  const onClose = () => router.push("/dashboard/clients");

  return (
    <div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={isConfirmClose}
        closeFilter={onClose}
        header={"Credentials"}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs style={{ marginLeft: "8%" }}>
            <Paper
              sx={{
                borderRadius: "10px",
                my: { xs: 1, md: 2 },
                p: { xs: 1, md: 2 },
                display: "flex",
                justifyContent: "center",
                m: "25% 25%",
                // position: 'fixed'
              }}
              elevation={5}
            >
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                // alignItems="center"
              >
                <Grid item>
                  <IconButton onClick={isConfirmOnOpen}>
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <div className="mt-[7px] mr-[60px]">
                    Credentials for client - <b>{selectedClient.name}</b>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item style={{ width: "100px", marginTop: "20px" }}>
            <Stack direction="row" spacing={2}>
              {selectedClient.serviceInitial.map((service: any, index: any) => {
                if (
                  configuredServices.includes(selectedClient.services[index])
                ) {
                  return (
                    <StyledBadge
                      key={service}
                      // @ts-ignore
                      bgcolor={`${serviceColors[service]}`}
                      label={getServiceInitial(service)}
                    />
                  );
                } else {
                  return (
                    <DefaultAvatar
                      key={service}
                      // @ts-ignore
                      bgcolor={`${serviceColors[service]}`}
                      label={getServiceInitial(service)}
                    />
                  );
                }
              })}
            </Stack>
          </Grid>
        </Grid>

        <Container sx={{ mb: 4 }} maxWidth="sm">
          <Paper
            sx={{
              borderRadius: "10px",
              my: { xs: 3, md: 6 },
              p: { xs: 2, md: 3 },
            }}
            elevation={10}
          >
            <Grid
              container
              spacing={2}
              sx={{ paddingTop: 5, paddingBottom: 3 }}
            >
              <Grid item xs={12} sx={{ paddingBottom: 3 }}>
                <BasicSelect
                  label="Please select an Environment"
                  items={selectEnvironmentItems}
                  handleChange={handleEnvironmentSelectChange}
                  value={environment}
                  style={{
                    // marginTop: "10px",
                    width: "100px",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {environment && (
                  <BasicSelect
                    label="Please select a service"
                    refValue={serviceRef}
                    items={selectServiceItems}
                    handleChange={handleServiceSelectChange}
                    value={service}
                    style={{
                      marginTop: "10px",
                      width: "100px",
                    }}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                {service && environment && (
                  <DynamicServiceForm
                    service={service}
                    allData={allData}
                    clientID={clientID}
                    environment={environment}
                    clearValue={clearValue}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Credentials;
