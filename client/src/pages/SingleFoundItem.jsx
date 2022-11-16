import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

import Button from "@mui/material/Button";
import "./SingleFoundItem.css";
import noimage_big from "../components/image/noimage-big.png";
import pin from "../components/icon/pin.svg";

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

export default function SingleFoundItem() {
  const urlId = useParams();
  const id = urlId.foundId;
  console.log(id);

  const [fetchedData, setFetchedData] = useState(null);
  const mapRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    getSingleData(id);
  }, []);

  async function getSingleData(id) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `/api/found/${id}`
      );
      setFetchedData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteData(id) {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_API_URL + `/api/found/${id}`
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    fetchedData && (
      <div className="container__single--page">
        <div className="container__content">
          <section className="content__left">
            <span className="span__item">
              <p className="item name">{fetchedData.item}</p>
            </span>
            <span className="span__item">
              <p className="item__title">Found Location</p>
              <p className="item">{fetchedData.prev_location}</p>
            </span>
            <span className="span__item">
              <p className="item__title">Current Location</p>
              <p className="item">{fetchedData.curr_location}</p>
            </span>
            <span className="span__item span__comment">
              <p className="item__title">Comments from</p>
              <p className="item__title">the Person Picked Up</p>
              <p className="item">{fetchedData.comment}</p>
            </span>

            <Button
              variant="contained"
              size="large"
              sx={{ ml: 4 }}
              onClick={() => {
                deleteData(fetchedData.id);
                navigate("/found");
              }}
            >
              Already Picked Up This Item
            </Button>
          </section>
          <section className="content__right">
            <div className="img__wrapper--single">
              <img
                className="img__item"
                src={noimage_big}
                srcSet={fetchedData.img_url}
                alt={fetchedData.item}
              />
            </div>
            <div className="map__wrapper">
              <Map
                ref={mapRef}
                initialViewState={{
                  longitude: fetchedData.coordinates.coordinates[0],
                  latitude: fetchedData.coordinates.coordinates[1],
                  zoom: 15,
                }}
                style={{ width: 450, height: "75vh", borderRadius: "1rem" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                <Marker
                  longitude={fetchedData.coordinates.coordinates[0]}
                  latitude={fetchedData.coordinates.coordinates[1]}
                  pitchAlignment="map"
                  anchor="top"
                >
                  <img className="icon__pin" src={pin} alt="" />
                </Marker>
              </Map>
            </div>
          </section>
        </div>
      </div>
    )
  );
}
