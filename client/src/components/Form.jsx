import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Map from "react-map-gl";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  NoLuggage,
  PhotoCamera,
  Report,
  LocationOn,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });
const theme = createTheme();

export default function Form() {
  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      item: "",
      prevLocation: "",
      currentLocation: "",
      comments: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    reset();
  }

  async function checkLocation(e) {
    e.preventDefault();
    const currentLocation = getValues("currentLocation");

    const geoData = await geocoder
      .forwardGeocode({
        query: currentLocation,
        limit: 1,
        fuzzyMatch: true,
        types: ["poi"],
        countries: ["JP"],
      })
      .send();
    console.log(geoData);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <NoLuggage />
            </Avatar>
            <Typography component="h1" variant="h5">
              Report Found Item
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="item"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="item"
                    label="Item description"
                    type="input"
                    autoFocus
                  />
                )}
              ></Controller>
              <Controller
                name="prevLocation"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="prevLocation"
                    label="Where you found the item?"
                    type="input"
                    autoFocus
                  />
                )}
              ></Controller>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                item
              >
                <Controller
                  name="currentLocation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      fullWidth
                      id="currentLocation"
                      label="Current item location"
                      type="input"
                      autoFocus
                    />
                  )}
                ></Controller>

                <Button
                  onClick={checkLocation}
                  startIcon={<LocationOn />}
                  id="update-location"
                  name="update-location"
                  variant="contained"
                  component="label"
                  size="large"
                  sx={{ mt: 2, mb: 1, ml: 1 }}
                >
                  Check
                </Button>
              </Grid>
              <Button
                startIcon={<PhotoCamera />}
                id="photoItem"
                name="photoItem"
                variant="contained"
                component="label"
                sx={{ mt: 2, mb: 1 }}
              >
                Upload item picture
                <input type="file" hidden />
              </Button>
              <Controller
                name="comments"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="comments"
                    name="comments"
                    label="Any comments?"
                    type="input"
                    autoFocus
                  />
                )}
              ></Controller>

              <Button
                startIcon={<Report />}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Report Item
              </Button>
            </Box>
          </Box>
        </Grid>
        <Map
          initialViewState={{
            longitude: 139.7531,
            latitude: 35.6812,
            zoom: 12,
          }}
          style={{ width: 600, height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </Grid>
    </ThemeProvider>
  );
}
