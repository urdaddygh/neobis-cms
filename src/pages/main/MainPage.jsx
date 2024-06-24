import React, { useEffect, useState } from "react";
import s from "./MainPage.module.css";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "../../components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomeRoute from "./home/HomeRoute";
import GroupPage from "./group/GroupPage";
import EmployeePage from "./employee/EmployeePage";
import ArchiveRoute from "./archive/ArchiveRoute";
import DirectionPage from "./direction/DirectionPage";
import AnalyticsPage from "./analytics/AnalyticsPage";
import { getInfoOfUser } from "../../redux/slices/profileSlice";

function MainPage() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getInfoOfUser())
  },[])
  const profile = useSelector(state=>state.profile.user)
  console.log(profile)
  return (
    <main>
      <ToastContainer />
      <Header
        name={profile.email}
        // username='urdaddy'
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
            <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
        </section>
      </div>
    </main>
  );
}

export default MainPage;
