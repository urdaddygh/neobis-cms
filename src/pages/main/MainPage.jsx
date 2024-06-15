import React, { useEffect, useState } from "react";
import s from "./MainPage.module.css";
import Header from "../../components/header/Header";
import { heart_icon, red_heart_icon } from "../../Images";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsBegin,
  getProductsById,
  getProductsForPagination,
  likeProduct,
  unLikeProduct,
} from "../../redux/slices/productsApiSlice";
import Skeleton from "../../components/skeleton/Skeleton";
import { Pagination } from "../../components/pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";
import { Navbar } from "../../components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomeRoute from "./home/HomeRoute";

function MainPage() {
  const [modalActive, setModalActive] = useState(false);
  const [secondModalActive, setSecondModalActive] = useState(false);
  const dispatch = useDispatch(); 

  const showErrorMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  
  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  return (
    <main>
      <ToastContainer />
      <Header
        name='Aziret'
        username='urdaddy'
        onClick={() => setSecondModalActive(true)}
        to="/profile/profilePage"
      />
      <div className={s.container}>
        <div className={s.navbar}>
          <Navbar />
        </div>
        <section className={s.first_section}>
        <Routes>
            <Route path="/home/*" element={<HomeRoute />} />
        </Routes>
        </section>
      </div>
    </main>
  );
}

export default MainPage;
