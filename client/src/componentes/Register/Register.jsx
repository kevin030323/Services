import React from "react";
import style from "./Register.module.css";
import fondo from "../../assets/undraw_text_field_htlv.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createAccount } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { BiLeftArrowAlt } from "react-icons/bi";

export default function Register() {
  const dispatch = useDispatch();
  const navegate = useNavigate();
  const [dataRegister, setDataRegister] = useState({
    name: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    location: "",
  });
  const [error, setError] = useState({});

  function handelLoginData(e) {
    e.preventDefault();
    setDataRegister({ ...dataRegister, [e.target.name]: e.target.value });
    setError(validate({ ...dataRegister, [e.target.name]: e.target.value }));
  }

  function validate() {
    let error = {};
    if (dataRegister.name === "") error.name = "Debes ingresar tu nombre";
    if (!dataRegister.lastName) error.lastName = "Debes ingresar tu apellido";
    if (!dataRegister.password)
      error.password = "Debes ingresar una constaraseña";
    if (!dataRegister.phoneNumber)
      error.phoneNumber = "Debes ingresar tu numero de telefono";
    if (!dataRegister.location) error.location = "Debes ingresar tu ciudad";
    return error;
  }

  function handaelCrateAccount(e) {
    e.preventDefault();
    dispatch(createAccount(dataRegister));
    setDataRegister({
      name: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      location: "",
    });
  }

  return (
    <div className={style.contentBack}>
      <NavLink to="/">
        <BiLeftArrowAlt size="40" className={style.back} />
      </NavLink>
      <div className={style.content}>
        <form className={style.inputs} onSubmit={(e) => handaelCrateAccount(e)}>
          <div className={style.contentInputs}>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={dataRegister.name}
              onChange={(e) => handelLoginData(e)}
            />
            {error.name && <p className={style.errors}>{error.name}</p>}
          </div>
          <div className={style.contentInputs}>
            <label>Apellido</label>
            <input
              type="text"
              name="lastName"
              value={dataRegister.lastName}
              onChange={(e) => handelLoginData(e)}
            />
            {error.lastName && <p className={style.errors}>{error.lastName}</p>}
          </div>
          <div className={style.contentInputs}>
            <label>Numero de telefono</label>
            <input
              type="text"
              name="phoneNumber"
              value={dataRegister.phoneNumber}
              onChange={(e) => handelLoginData(e)}
            />
            {error.phoneNumber && (
              <p className={style.errors}>{error.phoneNumber}</p>
            )}
          </div>
          <div className={style.contentInputs}>
            <label>Ciudad</label>
            <input
              type="text"
              name="location"
              value={dataRegister.location}
              onChange={(e) => handelLoginData(e)}
            />
            {error.location && <p className={style.errors}>{error.location}</p>}
          </div>
          <div className={style.contentInputs}>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={dataRegister.password}
              onChange={(e) => handelLoginData(e)}
            />
            {error.password && <p className={style.errors}>{error.password}</p>}
          </div>
          <button
            type="submit"
            className={
              !error.name &&
              !error.lastName &&
              !error.password &&
              !error.phoneNumber &&
              dataRegister.name
                ? style.create
                : style.createNone
            }
          >
            Crear cuenta
          </button>
        </form>
        <div className={style.fondo}>
          <img src={fondo} alt="" />
        </div>
      </div>
    </div>
  );
}
