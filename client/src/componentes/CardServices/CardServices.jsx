import React from "react";
import style from "./CardServices.module.css";
import { FaMoneyBillWave } from "react-icons/fa";

export default function CardServices({
  title,
  servicesFor,
  location,
  contact,
  price,
}) {
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

        <a
          href={`https://wa.me/${contact}`}
          target="_blank"
          className={style.contanct}
        >
          Contactar
        </a>
      </div>
    </div>
  );
}
