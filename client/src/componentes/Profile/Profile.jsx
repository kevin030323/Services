import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import style from "./Profile.module.css";
import userFondo from "../../assets/user.png";
import { logOut, getServices, editUser, updatedata } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import CardServices from "../CardServices/CardServices";
import { useEffect } from "react";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";

export default function Profile() {
  const user = useSelector((state) => state.user);
  let posts = useSelector((state) => state.posts);
  const usersPosts = !posts.length
    ? 0
    : posts.filter((element) => element.idUser === user[0].id);

  const dispatch = useDispatch();
  const navegate = useNavigate();
  const [viewEditForm, setViewEditForm] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({
    newName: "",
    newLastname: "",
    idUser: user[0].id,
  });

  function handelLogOut() {
    dispatch(logOut());
    navegate("/");
  }

  function handelStateData(e) {
    e.preventDefault();
    setDataEditUser({ ...dataEditUser, [e.target.name]: e.target.value });
  }

  function handelEditProfile(e) {
    e.preventDefault();
    dispatch(editUser(dataEditUser));
  }

  useEffect(() => {
    dispatch(
      updatedata({
        phoneNumber: user[0].phoneNumber,
        password: user[0].password,
      })
    );
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
            <div className={style.contentUserName}>
              <h5
                className={style.nameUser}
              >{`${user[0].name} ${user[0].lastName}`}</h5>

              <BiPencil
                size="20"
                className={style.butonEdit}
                onClick={() => setViewEditForm(true)}
              />
            </div>
            <form
              className={
                viewEditForm === true
                  ? style.formUserName
                  : style.formUserNameNone
              }
              onSubmit={(e) => handelEditProfile(e)}
            >
              <input
                type="text"
                name="newName"
                placeholder="Nuevo nombre"
                onChange={(e) => handelStateData(e)}
              />
              <input
                type="text"
                name="newLastname"
                placeholder="Nuevo apellido"
                onChange={(e) => handelStateData(e)}
              />
              <button type="submit">Guardar</button>
            </form>
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
