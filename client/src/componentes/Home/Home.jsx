import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/actions";
import { useEffect } from "react";
import CardServices from "../CardServices/CardServices";
import style from "./Home.module.css";
import fondo from "../../assets/undraw_searching_re_3ra9.svg";
import NavBar from "../NavBar/NavBar";

export default function Home() {
  const distpach = useDispatch();
  useEffect(() => {
    distpach(getServices());
  }, [distpach]);
  let res = useSelector((state) => state.posts);
  console.log(res);
  return (
    <div>
      <NavBar services={true} />
      <div className={style.content}>
        <div className={style.contentPosts}>
          {!res.length ? (
            <h1>Lista de pusblicaciones vacia</h1>
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
        <div className={style.image}>
          <img src={fondo} alt="" />
        </div>
      </div>
    </div>
  );
}
