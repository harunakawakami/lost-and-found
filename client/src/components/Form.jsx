import * as React from "react";
import Map from "react-map-gl";
import { useForm, Controller } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NoLuggage, PhotoCamera, Report } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Form() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

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
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="item"
                label="Item description"
                type="input"
                name="item"
                autoFocus
                {...register("item", { required: true })}
              />
              <TextField
                margin="normal"
                fullWidth
                name="prev-location"
                label="Where you found the item?"
                type="input"
                id="prev-location"
                autoFocus
                {...register("prev-location", { required: true })}
              />
              <TextField
                margin="normal"
                fullWidth
                name="current-location"
                label="Current item location"
                type="input"
                id="current-location"
                autoFocus
                {...register("current-location", { required: true })}
              />
              <Button
                startIcon={<PhotoCamera />}
                id="photo-item"
                name="photo-item"
                variant="contained"
                component="label"
                sx={{ mt: 2, mb: 1 }}
              >
                Upload item picture
                <input type="file" hidden />
              </Button>
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
            longitude: 139.65,
            latitude: 35.67,
            zoom: 10,
          }}
          style={{ width: 600, height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </Grid>
    </ThemeProvider>
  );
}
