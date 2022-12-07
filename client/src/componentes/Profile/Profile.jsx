import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import style from "./Profile.module.css";
import userFondo from "../../assets/user.png";
import { logOut, getServices } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import CardServices from "../CardServices/CardServices";
import { useEffect } from "react";

export default function Profile() {
  const user = useSelector((state) => state.user);
  let posts = useSelector((state) => state.posts);
  const usersPosts = !posts.length
    ? 0
    : posts.filter((element) => element.idUser === user[0].id);

  const dispatch = useDispatch();
  const navegate = useNavigate();

  function handelLogOut() {
    dispatch(logOut());
    navegate("/");
  }

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);
  return (
    <div>
      <NavBar />
      <div>
        <div className={style.contentImage}>
          <img src={userFondo} alt="" />
        </div>
        <div className={style.contentInfo}>
          <div className={style.contentProfileInfo}>
            <h5
              className={style.nameUser}
            >{`${user[0].name} ${user[0].lastName}`}</h5>
            <p className={style.dataUser}>
              Numero de telefono:{" "}
              <span className={style.data}>{user[0].phoneNumber}</span>
            </p>
            <p className={style.dataUser}>
              Ubicacion: <span className={style.data}>{user[0].location}</span>
            </p>
            <button onClick={() => handelLogOut()} className={style.logOut}>
              Cerrar sesion
            </button>
          </div>

          <div
            className={
              !usersPosts.length
                ? style.contentPublicsNone
                : style.contentPublics
            }
          >
            <h6>Tus pulicaciones</h6>
            {!usersPosts.length ? (
              <h4>Aún no tienes publicaciones subidas.</h4>
            ) : (
              usersPosts.map((element, index) => {
                return (
                  <CardServices
                    title={element.title}
                    servicesFor={element.nameUser}
                    location={element.location}
                    price={element.rangePrice}
                    contact={element.phoneNumber}
                    id={element.id}
                    key={index}
                    delate={true}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
