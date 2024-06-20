import React from "react";
import s from "./Header.module.css";
import { neobis_small_logo, profile_icon, } from "../../Images";
import Button from "../button/Button";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfilePage } from "../../redux/slices/profileSlice";

function Header({name, username, to}) {
  const dispatch = useDispatch()
  return (
    <header>
      <div className={s.icon}>
        <img src={neobis_small_logo} alt="" />
      </div>
      <div className={s.box}>
        <span>
          <h6>{name}</h6>
          <p>{username}</p>
        </span>
        <NavLink to={to} className={s.cont_profile} onClick={()=>dispatch(updateProfilePage("good"))}>
          <img src={profile_icon} alt="" />
        </NavLink>       
      </div>
    </header>
  );
}

export default Header;
