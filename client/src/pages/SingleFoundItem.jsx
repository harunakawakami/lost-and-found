import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

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

  return (
    fetchedData && (
      <div className="container__single--page">
        <div className="container__content">
          <section className="content__left">
            <span className="span__item">
              <p className="item__title">
                Found Item Name <span className="space">:</span>
              </p>
              <p className="item">{fetchedData.item}</p>
            </span>
            <span className="span__item">
              <p className="item__title">
                Found Location <span className="space">:</span>{" "}
              </p>
              <p className="item">{fetchedData.prev_location}</p>
            </span>
            <span className="span__item">
              <p className="item__title">
                Current Item Location <span className="space">:</span>{" "}
              </p>
              <p className="item">{fetchedData.curr_location}</p>
            </span>
            <span className="span__item span__comment">
              <p className="item__title">
                Comments from the Person Picked Up{" "}
                <span className="space">:</span>
              </p>
              <p className="item">{fetchedData.comment}</p>
            </span>
          </section>
          <section className="content__right">
            <div className="img__wrapper">
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
                style={{ width: 500, height: "40vh" }}
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
