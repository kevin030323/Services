import React from "react";
import style from "./CardServices.module.css";
import { FaMoneyBillWave } from "react-icons/fa";
import { delatePost } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function CardServices({
  title,
  servicesFor,
  location,
  contact,
  price,
  id,
  delate,
}) {
  const dispatch = useDispatch();

  function handelDelatePost() {
    dispatch(delatePost({ idPost: id }));
    setTimeout(function () {
      window.location.reload(true);
    }, 1200);
  }
  return (
    <div className={style.content}>
      <div className={style.contentInfo}>
        <h5 className={style.title}>{title}</h5>
        <p>servico brindado por: {servicesFor}</p>
        <p>{location}</p>
      </div>
      <div className={style.contentContacts}>
        <p>
          {<FaMoneyBillWave size="20" className={style.money} />}
          {price}
        </p>
        {!delate ? (
          <a
            href={`https://wa.me/${contact}`}
            target="_blank"
            className={style.contanct}
          >
            Contactar
          </a>
        ) : (
          <button className={style.delate} onClick={() => handelDelatePost()}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
