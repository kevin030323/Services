import React from "react";
import style from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import fondo from "../../assets/undraw_profile_re_4a55.svg";
import { login } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import Swal from "sweetalert2";

export default function Login() {
  const user = useSelector((state) => state.user);
  const distpach = useDispatch();
  const navegation = useNavigate();
  const [loginData, setLoginData] = useState({ password: "", phoneNumber: "" });
  const [error, setError] = useState({});

  function handelLoginData(e) {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError(validate({ ...loginData, [e.target.name]: e.target.value }));
  }

  function validate(loginData) {
    let error = {};
    if (!loginData.phoneNumber)
      error.phoneNumber = "Debe ingresar el numero de telefono";
    if (!loginData.password) error.password = "Debe ingresar la contraseña";
    return error;
  }

  function handelLoginSend(e) {
    e.preventDefault();
    distpach(login(loginData));
    setLoginData({ password: "", phoneNumber: "" });
  }

  return (
    <div className={style.contentBack}>
      <NavLink to="/">
        <BiLeftArrowAlt size="40" className={style.back} />
      </NavLink>
      <div className={style.content}>
        <form className={style.inputs} onSubmit={(e) => handelLoginSend(e)}>
          <div className={style.contentInputs}>
            <label>Numero de telefono</label>
            <input
              type="text"
              name="phoneNumber"
              value={loginData.phoneNumber}
              onChange={(e) => handelLoginData(e)}
            />
            {error.phoneNumber && (
              <p className={style.errors}>{error.phoneNumber}</p>
            )}
          </div>
          <div className={style.contentInputs}>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={(e) => handelLoginData(e)}
            />
            {error.password && <p className={style.errors}>{error.password}</p>}
            {error.data && <p className={style.errors}>{error.data}</p>}
          </div>
          <button
            type="submit"
            className={
              !error.phoneNumber && !error.password
                ? style.iniciar
                : style.iniciarNone
            }
          >
            iniciar sesion
          </button>
          <p>
            ¿No tenes cuenta? {<NavLink to="/register">Crear cuenta</NavLink>}
          </p>
        </form>
        <div className={style.fondo}>
          <img src={fondo} alt="" />
        </div>
      </div>
    </div>
  );
}
