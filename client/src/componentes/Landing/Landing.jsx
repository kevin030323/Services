import React from "react";
import NavBar from "../NavBar/NavBar";
import sytle from "./Landing.module.css";
import fondo from "../../assets/undraw_coffee_break_h3uu.svg";

export default function Landing() {
  return (
    <div>
      <NavBar home={true} />
      <div className={sytle.content}>
        <div className={sytle.contentText}>
          <h1>Services</h1>
          <h5>
            Plataforma para encontrar y publicar servicios, de manera rápida y
            sencilla.
          </h5>
        </div>
        <div className={sytle.contentImg}>
          <img src={fondo} alt="" />
        </div>
      </div>
    </div>
  );
}
