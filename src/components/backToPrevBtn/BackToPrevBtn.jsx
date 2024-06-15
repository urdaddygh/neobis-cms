import React from "react";
import s from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { arrow_back } from "../../Images";

function BackToPrevBtn({ width, margin, to, left,onClick, top }) {
  return (
    <div className={s.cont} style={{left:left, top:top}}>
        <NavLink
          className={s.button}
          style={{ width: width, margin: margin }}
          to={to}
          onClick={onClick}
        >
          <img src={arrow_back} alt="Back" />
        </NavLink>
        {/* <span>Назад</span> */}
    </div>
  );
}

export default BackToPrevBtn;
