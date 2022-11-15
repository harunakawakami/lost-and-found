import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Link } from "react-router-dom";
import "./CardItem.css";
import SingleFoundItem from "../pages/SingleFoundItem";

export default function CardItem(props) {
  const { item, currLocation } = props;
  return (
    <>
      <div className="card">
        <div className="item--locaiton">
          <Link
            style={{ textDecoration: "none", color: "#1c1c1a" }}
            to="/found/foundId:"
          >
            <CardContent
              sx={{ px: 2, display: "flex", justifyContent: "center" }}
            >
              <Typography
                fontWeight="lg"
                mb={0.7}
                sx={{ color: "#1B263B", fontSize: "1.7rem" }}
              >
                {item}
              </Typography>
              <Typography
                startDecorator={<LocationOnRoundedIcon />}
                level="body2"
                textColor="neutral.600"
                sx={{ fontSize: "1.2rem" }}
              >
                {currLocation}
              </Typography>
            </CardContent>
          </Link>
        </div>
        <div className="img__wrapper">
          <Divider />
          <AspectRatio ratio="1" sx={{ width: "200px", height: "200px" }}>
            <img
              src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
              srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </div>
      </div>
    </>
  );
}
