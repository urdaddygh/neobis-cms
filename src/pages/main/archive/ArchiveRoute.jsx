import React, { useState } from 'react'
import s from './styles.module.css'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Button from '../../../components/button/Button';
import GroupsArchive from './GroupsArchive';
import StudentsArchive from './StudentsArchive';
import ClientsArchive from './ClientsArchive';
import EmployeesArchive from './EmployeesArchive';
import ModalForAddCard from '../../../components/modalForAddCard/ModalForAddCard';
const ArchiveRoute = () => {
    const location = useLocation();
    const linkActiveClassName = (navLink) => {
      const currentParentPath = location.pathname.split("/")[3];
      const isParentLinkActive = currentParentPath === navLink;
  
      if (isParentLinkActive) return "active_sublink";
      return "unactive_sublink";
    };
  
    const [modalActive, setModalActive] = useState(false);
    return (
      <>
        <div className="sublink_cont">
          <NavLink
            to="/main/archive/groups"
            className={linkActiveClassName("groups")}
          >
            Группы
          </NavLink>
          <NavLink to="/main/archive/students" className={linkActiveClassName("students")}>
          Студенты
          </NavLink>
          <NavLink
            to="/main/archive/clients"
            className={linkActiveClassName("clients")}
          >
            Клиенты
          </NavLink>
          <NavLink
            to="/main/archive/employees"
            className={linkActiveClassName("employees")}
          >
            Сотрудники
          </NavLink>
        </div>
  
        <div className="default_cont">
          <Routes>
            <Route path="/groups" element={<GroupsArchive />} />
            <Route path="/students" element={<StudentsArchive />} />
            <Route path="/clients" element={<ClientsArchive />} />
            <Route path="/employees" element={<EmployeesArchive />} />
          </Routes>
        </div>
        <ModalForAddCard active={modalActive} setActive={setModalActive} closeModal={()=>setModalActive(false)}/>
      </>
    );
}

export default ArchiveRoute