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
            <label htmlFor="">Titulo de servico que ofreces</label>
            <input
              type="text"
              name="title"
              className={style.inputs}
              value={dataForm.title}
              onChange={(e) => handelData(e)}
            />
          </div>
          <div className={style.contentInputs}>
            <label htmlFor="">Ciudad</label>
            <input
              type="text"
              name="location"
              className={style.inputs}
              value={dataForm.location}
              onChange={(e) => handelData(e)}
            />
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
          </div>
          <button type="submit" className={style.public}>
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
