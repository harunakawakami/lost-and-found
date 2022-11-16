import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./SingleFoundItem.css";

export default function SingleFoundItem() {
  const urlId = useParams();
  const id = urlId.foundId;
  console.log(id);

  const [fetchedData, setFetchedData] = useState([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getItemData(id);
  }, []);

  async function getItemData(id) {
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
    <div className="container__single--page">
      <div className="container__content">
        <section className="content__left">
          {/* <span> */}
          {/* <p className="item__title">Item Name: </p>
            <p>{fetchedData[0].item}</p>
          </span> */}
          {/* <span>
            <p className="item__location">Found Location:</p>
            <p>{fetchedData[0].prev_location}</p>
          </span>
          <span>
            <p className="item__location">Current Item Location:</p>
            <p>{fetchedData[0].curr_location}</p>
          </span>
          <span>
            <p className="item__location">
              Comments from the Person Picked Up:
            </p>
            <p>{fetchedData[0].comment}</p>
          </span> */}
        </section>
        <section className="content__right">
          <div className="img__wrapper"></div>
          <div className="map__wrapper"></div>
        </section>
      </div>
    </div>
  );
}
