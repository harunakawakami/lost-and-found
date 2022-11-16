import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "../components/CardItem";
import "./FoundList.css";

export default function FoundList() {
  const [fetchedData, setFetchedData] = useState([]);
  const dataFetchedRef = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    getItemData();
  }, []);

  async function getItemData() {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/api/found");
      setFetchedData(res.data);
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

  return (
    <div className="container__foundlist">
      <h1 className="title__foundlist">Found Items 👛 </h1>
      <div>{allFoundList}</div>
    </div>
  );
}
