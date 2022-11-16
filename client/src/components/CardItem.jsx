import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import noimage from "./image/noimage.png";
import "./CardItem.css";

export default function CardItem(props) {
  const { id, item, currLocation, handleClick, photoItem } = props;

  return (
    <>
      <div className="card" onClick={handleClick}>
        <div className="item--locaiton">
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
        </div>
        <div className="img__wrapper">
          <Divider />
          <AspectRatio ratio="1" sx={{ width: "200px", height: "200px" }}>
            <img src={photoItem} srcSet={noimage} loading="lazy" alt="" />
          </AspectRatio>
        </div>
      </div>
    </>
  );
}
