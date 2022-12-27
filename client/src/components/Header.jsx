import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import "./Header.css";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      sx={{
        height: "100px",
        backgroundColor: "#0D1B2A",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "flex" },
                fontFamily: "Pacifico",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Lost and Found
            </Typography>
          </Link>

          <Box sx={{ display: "flex", ml: "auto" }}>
            <Link style={{ textDecoration: "none" }} to="/found">
              <Button variant="text" className="btn__line--white">
                Look for Found Items
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/found/newitem">
              <Button
                variant="outlined"
                className="btn__line--white"
                sx={{ mr: 2, ml: 1 }}
              >
                Report Found Item
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
