import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/actions";
import { useEffect } from "react";
import CardServices from "../CardServices/CardServices";
import style from "./Home.module.css";
import fondo from "../../assets/undraw_searching_re_3ra9.svg";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";

export default function Home() {
  const distpach = useDispatch();
  let res = useSelector((state) => state.posts);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    distpach(getServices()).then(setLoader(false));
  }, [distpach]);

  return (
    <div className={style.contentAll}>
      <NavBar services={true} />
      <div className={style.content}>
        {loader ? (
          <div className={style.contentLoader}>
            <svg className={style.loader} viewBox="25 25 50 50">
              <circle
                r="20"
                cy="50"
                cx="50"
                className={style.loaderCircule}
              ></circle>
            </svg>
            Cargando publicaciones
          </div>
        ) : (
          <div className={style.contentPosts}>
            {!res.length ? (
              <h1>Lista de publicaciones vacía.</h1>
            ) : (
              res.map((element, index) => {
                return (
                  <CardServices
                    title={element.title}
                    servicesFor={element.nameUser}
                    location={element.location}
                    price={element.rangePrice}
                    contact={element.phoneNumber}
                    key={index}
                  />
                );
              })
            )}
          </div>
        )}
        <div className={style.image}>
          <img src={fondo} alt="" />
        </div>
      </div>
    </div>
  );
}
