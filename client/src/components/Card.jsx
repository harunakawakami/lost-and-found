import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { LocationOnRounded } from "@mui/icons-material";

export default function InteractiveCard() {
  return (
    <Card
      variant="outlined"
      row
      sx={{
        width: 500,
        height: 200,
        gap: 2,
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <Typography level="h2" fontSize="lg" id="card-description" mb={2}>
          Yosemite Park
        </Typography>
        <Typography
          fontSize="sm"
          aria-describedby="card-description"
          startDecorator={<LocationOnRounded />}
          mb={1}
        >
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: "text.tertiary" }}
          >
            California, USA
          </Link>
        </Typography>
      </div>
      <AspectRatio ratio="1" sx={{ width: 200, ml: "auto" }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
    </Card>
  );
}
