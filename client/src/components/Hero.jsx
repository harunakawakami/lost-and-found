import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Hero.css";

const backgroundImage =
  "https://images.unsplash.com/photo-1626010448982-0fec79ed1979?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

export default function Hero() {
  return (
    <>
      <div className="container">
        <section className="img__container"></section>
        <section className="link__container">
          <div className="found--list">
            <Link className="text-on-image" to="/found/">
              <p>Search Found Items</p>
            </Link>
          </div>
          <div className="report--item">
            <Link className="text-on-image" to="/found/newitem">
              <p>Report Found Item</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
