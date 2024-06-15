import React, { useEffect, useState } from "react";
import {
  archive_icon,
  archive_mini_icon,
  exit_icon,
  group_icon,
  home_icon,
  liked_icon,
  logout_icon,
  products_icon,
  profile_icon,
  staff_icon,
  vector_icon,
} from "../../Images";
import s from "./Navbar.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookieFunction/cookieFunction";
import { Modal } from "../modal/Modal";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearStateProfile, getInfoOfUser } from "../../redux/slices/profileSlice";
import { clearStateProduct } from "../../redux/slices/productsApiSlice";
import { clearStateAuth } from "../../redux/slices/authSlice";

export const Navbar=({ name, username, className, first_name })=> {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkActiveClassName = (navLink) => {
    const currentParentPath = location.pathname.split("/")[2];
    const isParentLinkActive = currentParentPath === navLink;

    if (isParentLinkActive) return s.active_link;
    return s.unactive_link;
  };
  const openExitModal = () => {
    setActive(!active);
  };
  const removeRole = () => {
    removeCookie("access");
    removeCookie("refresh");
    navigate("/");
    dispatch(clearStateAuth())
    dispatch(clearStateProduct())
    dispatch(clearStateProfile())
  };
  return (
    <>
        <div className={s.cont}>
          <NavLink
            to="/main/home/waiting"
            className={linkActiveClassName("home")}
          >
            <span className={s.top_curve}></span>
            <img src={home_icon} alt="" style={{marginRight:"10px"}}/>
            Главное
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink
            to="/main/employees/"
            className={linkActiveClassName("employees")}
          >
            <span className={s.top_curve}></span>
            <img src={staff_icon} alt="" style={{marginRight:"10px"}} />
            Сотрудники
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink
            to="/main/group/"
            className={linkActiveClassName("group")}
          >
            <span className={s.top_curve}></span>
            <img src={group_icon} alt="" style={{marginRight:"10px"}} />
            Группы
            <span className={s.bottom_curve}></span>
          </NavLink>
          <NavLink
            to="/main/archive/all_protocols"
            className={linkActiveClassName("archive")}
          >
            <span className={s.top_curve}></span>
            <img src={archive_mini_icon} alt="" style={{marginRight:"10px"}} />
            Архив
            <span className={s.bottom_curve}></span>
          </NavLink>

          <NavLink to="/" className={s.exit} onClick={removeRole}>
            Выйти
          </NavLink>
        </div>
    </>
  );
}
