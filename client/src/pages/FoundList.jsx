import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

import CardItem from "../components/CardItem";
import "./FoundList.css";

export default function FoundList() {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    getItemData();
  }, []);

  async function getItemData() {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/api/found");
      console.log(res.data);
      setFetchedData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const allFoundList = fetchedData.map((singleFound) => {
    return (
      <CardItem
        key={singleFound.id}
        item={singleFound.item}
        currLocation={singleFound.curr_location}
      />
    );
  });

  return (
    <div>
      <div className="container__foundlist">
        <h1 className="title__foundlist">Found Items</h1>
        {allFoundList}
      </div>
    </div>
  );
}
