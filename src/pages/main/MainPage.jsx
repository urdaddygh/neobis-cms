import React, { useState } from "react";
import s from "./MainPage.module.css";
import Header from "../../components/header/Header";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "../../components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomeRoute from "./home/HomeRoute";
import GroupPage from "./group/GroupPage";
import EmployeePage from "./employee/EmployeePage";
import ArchiveRoute from "./archive/ArchiveRoute";
import DirectionPage from "./direction/DirectionPage";

function MainPage() {
  return (
    <main>
      <ToastContainer />
      <Header
        name='Aziret'
        username='urdaddy'
        to="/profile/profilePage"
      />
      <div className={s.container}>
        <div className={s.navbar}>
          <Navbar />
        </div>
        <section className={s.first_section}>
        <Routes>
            <Route path="/home/*" element={<HomeRoute />} />
            <Route path="/group" element={<GroupPage />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/direction" element={<DirectionPage />} />
            <Route path="/archive/*" element={<ArchiveRoute />} />
        </Routes>
        </section>
      </div>
    </main>
  );
}

export default MainPage;
