import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

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
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "Pacifico",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Lost and Found
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <MenuItem>
              <Link to="/found">
                <Typography textAlign="center">Found Items</Typography>
              </Link>
            </MenuItem>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/found/newitem"></Link>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              Report Found Item
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
