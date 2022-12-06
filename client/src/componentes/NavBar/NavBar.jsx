import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { searchName } from "../../redux/actions";
import { useState } from "react";

export default function Navbar({ home, services }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navegation = useNavigate();
  const [nameSearch, setNameSearch] = useState("");

  function dataSearch(e) {
    e.preventDefault();
    dispatch(searchName(nameSearch));
    setNameSearch("");
  }

  return (
    <div className={style.content}>
      <div className={style.navegation}>
        <NavLink to="/" className={home === true ? style.border : style.inicio}>
          inicio
        </NavLink>
        <NavLink
          to="/home"
          className={services === true ? style.border : style.service}
        >
          Buscar servicios
        </NavLink>
      </div>

      <form className={style.searchBar} onSubmit={(e) => dataSearch(e)}>
        <input
          type="text"
          placeholder="Buscar servicios..."
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
        />
        <button type="submit">{<CiSearch size="30" />}</button>
      </form>

      <div className={style.sesionAndPosts}>
        {user[0]?.msj || !user.length ? (
          <NavLink to="/login" className={style.sesion}>
            Iniciar sesion
          </NavLink>
        ) : (
          <NavLink to="/profile">
            <IoPersonOutline size="30" className={style.logoProfile} />
          </NavLink>
        )}
        {!user.length ? (
          <NavLink
            className={style.newPost}
            onClick={() =>
              Swal.fire({
                icon: "info",
                title: "debes iniciar sesion para publicar servicios",
                confirmButtonText: "Iniciar sesion",
                confirmButtonColor: "#7b2cbf",
                showCancelButton: true,
                cancelButtonText: "Hacerlo mas tarde",
              }).then((result) => {
                if (result.isConfirmed) {
                  navegation("/login");
                }
              })
            }
          >
            Publicar servicio
          </NavLink>
        ) : (
          <NavLink to={"/createPublic"} className={style.newPost}>
            Publicar servicio
          </NavLink>
        )}
      </div>
    </div>
  );
}
