import React from "react";
import NavBar from "../NavBar/NavBar";
import style from "./Landing.module.css";
import fondo from "../../assets/undraw_coffee_break_h3uu.svg";

export default function Landing() {
  return (
    <div className={style.contetAll}>
      <NavBar home={true} />
      <div className={style.content}>
        <div></div>
        <div className={style.contentText}>
          <h1>Services</h1>
          <h5>
            Plataforma para encontrar y publicar servicios, de manera rápida y
            sencilla.
          </h5>
        </div>
        <div className={style.contentImg}>
          <img src={fondo} alt="" />
        </div>
        <div className={style.wave}></div>
      </div>
    </div>
  );
}
