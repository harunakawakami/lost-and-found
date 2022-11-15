import React, { useRef, useEffect } from "react";

import Button from "@mui/material/Button";
import { PhotoCamera } from "@mui/icons-material";

export default function CloudinaryUploadWidget() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_API_CLOUDINARY_NAME,
        uploadPreset: process.env.REACT_APP_API_CLOUDINARY_PRESET,
        folder: process.env.REACT_APP_API_CLOUDINARY_FOLDER,
      },
      function (error, result) {
        console.log(result.info.files[0].uploadInfo.url);
      }
    );
  }, []);

  return (
    <Button
      onClick={() => widgetRef.current.open()}
      startIcon={<PhotoCamera />}
      id="photoItem"
      name="photoItem"
      variant="contained"
      component="label"
      sx={{ mt: 2, mb: 1 }}
    >
      Upload item picture
    </Button>
  );
}
