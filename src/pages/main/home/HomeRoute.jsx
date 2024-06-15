import React, { useState } from "react";
import s from "./styles.module.css";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import AttendedLesson from "./AttendedLesson";
import TrialLesson from "./TrialLesson";
import WaitingCall from "./WaitingCall";
import Button from "../../../components/button/Button";
import ModalForAddCard from "../../../components/modalForAddCard/ModalForAddCard";

const HomeRoute = () => {
  const location = useLocation();
  const linkActiveClassName = (navLink) => {
    const currentParentPath = location.pathname.split("/")[3];
    const isParentLinkActive = currentParentPath === navLink;

    if (isParentLinkActive) return "active_sublink";
    return "unactive_sublink";
  };

  const [modalActive, setModalActive] = useState(false);
  return (
    <div>
      <div className="sublink_cont">
        <NavLink
          to="/main/home/waiting"
          className={linkActiveClassName("waiting")}
        >
          Ждет звонка
        </NavLink>
        <NavLink to="/main/home/trial" className={linkActiveClassName("trial")}>
          Записан на пробный урок
        </NavLink>
        <NavLink
          to="/main/home/attended"
          className={linkActiveClassName("attended")}
        >
          Посетил пробный урок
        </NavLink>
        <Button
          to="/main/home/attended"
          className={s.add_card}
          width="200px"
          text="+ Добавить карточку"
          onClick={()=>setModalActive(true)}
        ></Button>
      </div>

      <div className="default_cont">
        <Routes>
          <Route path="/waiting" element={<WaitingCall />} />
          <Route path="/trial" element={<TrialLesson />} />
          <Route path="/attended" element={<AttendedLesson />} />
        </Routes>
      </div>
      <ModalForAddCard active={modalActive} setActive={setModalActive} closeModal={()=>setModalActive(false)}/>
    </div>
  );
};

export default HomeRoute;
