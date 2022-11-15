import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

import CardItem from "../components/CardItem";
import "./FoundList.css";

export default function FoundList() {
  const [fetchedData, setFetchedData] = useState();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getItemData();
  }, []);

  async function getItemData() {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/api/found");
      console.log(res);
      await setFetchedData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(fetchedData);

  const allFoundList = fetchedData.map((data) => {
    return <CardItem item={data.item} currLocation={data.curr_location} />;
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
