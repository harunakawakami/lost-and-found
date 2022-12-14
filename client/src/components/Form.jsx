import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import "./Form.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NoLuggage, Report, LocationOn } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import pin from "./icon/pin.svg";

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

const theme = createTheme();

export default function Form() {
  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      item: "",
      prevLocation: "",
      currentLocation: "",
      photoItem: "",
      comment: "",
    },
  });

  const [longitude, setLongitude] = useState(139.7531);
  const [latitude, setLatitude] = useState(35.6812);
  const [coordinates, setCoordinates] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const mapRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    flyToLocation(longitude, latitude);
  }, [longitude, latitude]);

  async function onSubmit(data) {
    data.lonAndLat = coordinates;
    data.photoItem = imgUrl;
    console.log(data);
    try {
      await axios.post(process.env.REACT_APP_API_URL + "/api/found/newitem", {
        item: data.item,
        prev_location: data.prevLocation,
        curr_location: data.currentLocation,
        coordinates: data.lonAndLat,
        img_url: data.photoItem,
        comment: data.comment,
      });
      reset();
      navigate("/found");
    } catch (err) {
      console.error(err);
    }
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
    const lonAndLatObj = geoData.body.features[0].geometry;
    setCoordinates(lonAndLatObj);
    setLongitude(lonAndLatObj.coordinates[0]);
    setLatitude(lonAndLatObj.coordinates[1]);
  }

  function flyToLocation(longitude, latitude) {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [longitude, latitude],
      essential: true,
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={7}
          sm={7}
          component={Paper}
          elevation={6}
          square
          sx={{ backgroundColor: "#1B263B" }}
        >
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
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#ffffff", fontSize: "2rem" }}
            >
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
                    className="input__field"
                    InputLabelProps={{ className: "input__label" }}
                    inputProps={{ className: "input__label" }}
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
                    className="input__field"
                    InputLabelProps={{ className: "input__label" }}
                    inputProps={{ className: "input__label" }}
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
                      className="input__field"
                      InputLabelProps={{ className: "input__label" }}
                      inputProps={{ className: "input__label" }}
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
                  sx={{ mt: 2, mb: 1, ml: 1, backgroundColor: "#ff5722" }}
                >
                  Check
                </Button>
              </Grid>
              <CloudinaryUploadWidget setImgUrl={setImgUrl} />
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    fullWidth
                    id="comment"
                    name="comment"
                    label="Any comments?"
                    type="input"
                    className="input__field"
                    InputLabelProps={{ className: "input__label" }}
                    inputProps={{ className: "input__label" }}
                  />
                )}
              ></Controller>

              <Button
                startIcon={<Report />}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#ff5722" }}
              >
                Report Item
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={5} sm={5}>
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: longitude,
              latitude: latitude,
              zoom: 15,
            }}
            style={{ width: 600, height: "100vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker
              longitude={longitude}
              latitude={latitude}
              pitchAlignment="map"
              anchor="top"
            >
              <img className="icon__pin" src={pin} alt="" />
            </Marker>
          </Map>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
