import React from "react";
import style from "./CreatePublic.module.css";
import fondo from "../../assets/undraw_resume_re_hkth.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions";
import { BiLeftArrowAlt } from "react-icons/bi";
import Swal from "sweetalert2";

export default function CreatePublic() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState({});
  const [dataForm, setDataForm] = useState({
    title: "",
    rangePriceOne: "",
    rangePriceTwo: "",
    location: "",
    idUser: user[0].id,
    nameUser: `${user[0].name} ${user[0].lastName}`,
    phoneNumber: "",
  });

  function handelData(e) {
    e.preventDefault();
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    setError(validate({ ...dataForm, [e.target.name]: e.target.value }));
  }

  function validate() {
    let error = {};
    if (!dataForm.phoneNumber)
      error.phoneNumber = "Debes ingresar tu numero de telefono";
    else if (isNaN(dataForm.phoneNumber))
      error.phoneNumber = "Solo se permiten numeros";
    else if (dataForm.phoneNumber.length < 9)
      error.phoneNumber = "Debe ingresar un numero correcto";

    if (!dataForm.location) error.location = "Ingresar la cuidad";
    else if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(dataForm.location))
      error.location = "Ingrese una cuidad valido";

    if (!dataForm.rangePriceOne || !dataForm.rangePriceOne)
      error.rangePrice = "Debes ingresar el rago de precios";
    else if (isNaN(dataForm.rangePriceOne) || isNaN(dataForm.rangePriceTwo))
      error.rangePrice = "Solo se permiten numeros";

    if (dataForm.title === "")
      error.title = "Debes ingresar el titulo de tu publicacion";
    else if (dataForm.title.length > 25) error.title = "Maximo 26 caracteres";
    else if (!/^[A-Z]+$/i.test(dataForm.title))
      error.title = "Ingrese un titulo valido";

    return error;
  }

  function handelsubmit(e) {
    e.preventDefault();
    dispatch(createPost(dataForm));
    setDataForm({
      title: "",
      rangePriceOne: "",
      rangePriceTwo: "",
      location: "",
      idUser: user[0].id,
      nameUser: `${user[0].name} ${user[0].lastName}`,
      phoneNumber: "",
    });
    Swal.fire({
      icon: "success",
      title: "Publicacion creada correctamente",
      width: "600",
    });
  }

  return (
    <div className={style.contentBack}>
      <NavLink to="/">
        <BiLeftArrowAlt size="40" className={style.back} />
      </NavLink>
      <div className={style.content}>
        <form action="" onSubmit={(e) => handelsubmit(e)}>
          <div className={style.contentInputs}>
            <label htmlFor="">Titulo del servico que ofreces</label>
            <input
              type="text"
              name="title"
              className={style.inputs}
              value={dataForm.title}
              onChange={(e) => handelData(e)}
            />
            {error.title && <p className={style.errors}>{error.title}</p>}
          </div>
          <div className={style.contentInputs}>
            <label htmlFor="">Ciudad donde se ofresca el servico</label>
            <input
              type="text"
              name="location"
              className={style.inputs}
              value={dataForm.location}
              onChange={(e) => handelData(e)}
            />
            {error.location && <p className={style.errors}>{error.location}</p>}
          </div>
          <div className={style.contentInputs}>
            <label htmlFor="">Rango de precio</label>
            <div className={style.rangePrice}>
              <input
                type="text"
                name="rangePriceOne"
                className={style.price}
                value={dataForm.rangePriceOne}
                onChange={(e) => handelData(e)}
              />
              <p>a</p>
              <input
                type="text"
                name="rangePriceTwo"
                className={style.price}
                value={dataForm.rangePriceTwo}
                onChange={(e) => handelData(e)}
              />
            </div>
            {error.rangePrice && (
              <p className={style.errors}>{error.rangePrice}</p>
            )}
          </div>
          <div className={style.contentInputs}>
            <label htmlFor="">Telefono de contacto</label>
            <input
              type="text"
              name="phoneNumber"
              className={style.inputs}
              value={dataForm.phoneNumber}
              onChange={(e) => handelData(e)}
            />
            {error.phoneNumber && (
              <p className={style.errors}>{error.phoneNumber}</p>
            )}
          </div>
          <button
            type="submit"
            className={
              !error.title &&
              !error.location &&
              !error.rangePrice &&
              !error.phoneNumber &&
              dataForm.title
                ? style.public
                : style.pusblicNone
            }
          >
            Publicar
          </button>
        </form>

        <div className={style.fondo}>
          <img src={fondo} alt="" />
        </div>
      </div>
    </div>
  );
}
