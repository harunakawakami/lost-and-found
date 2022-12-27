import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { Container, Box } from "@mui/system";
import CardItem from "../components/CardItem";
import pin from "../components/icon/pin.svg";
import "./FoundList.css";

export default function FoundList() {
  const [fetchedData, setFetchedData] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    getItemData();
  }, []);

  async function getItemData() {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/api/found");
      setFetchedData(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  const allFoundList = fetchedData.map((singleFound) => {
    return (
      <CardItem
        key={singleFound.id}
        id={singleFound.id}
        item={singleFound.item}
        currLocation={singleFound.curr_location}
        photoItem={singleFound.img_url}
        handleClick={(e) => navigate(`/found/${singleFound.id}`)}
      />
    );
  });

  const pins =
    fetchedData.length &&
    fetchedData.map((singleFound) => {
      return (
        <Marker
          key={`marker-${singleFound.id}`}
          longitude={JSON.parse(singleFound.coordinates).coordinates[0]}
          latitude={JSON.parse(singleFound.coordinates).coordinates[1]}
          pitchAlignment="map"
          anchor="top"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(singleFound);
          }}
        >
          <img className="icon__pin" src={pin} alt="" />
        </Marker>
      );
    });

  return (
    fetchedData && (
      <Box sx={{ m: 2 }}>
        <h1 className="title__foundlist">Found Items 👛 </h1>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-around",
            mt: 1,
          }}
        >
          <div>{allFoundList}</div>
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: 139.7872551,
              latitude: 35.6780074,
              zoom: 10,
            }}
            style={{
              width: "50vw",
              height: "100vh",
              borderRadius: "1rem",
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {pins}

            {popupInfo && (
              <Popup
                anchor="bottom"
                longitude={JSON.parse(popupInfo.coordinates).coordinates[0]}
                latitude={JSON.parse(popupInfo.coordinates).coordinates[1]}
                onClose={() => setPopupInfo(null)}
              >
                <div>{popupInfo.item}</div>
              </Popup>
            )}
          </Map>
        </Box>
      </Box>
    )
  );
}
