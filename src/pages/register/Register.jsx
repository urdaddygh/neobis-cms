import React from "react";
import s from "./styles.module.css";
import { Route, Routes } from "react-router-dom";
import RegisterEmail from "./RegisterEmail";
import RegisterPass from "./RegisterPass";
import { neobis_logo } from "../../Images";

function Register() {
  return (
    <div className={s.cont}>
      <div className={s.backround}>
        <img src={neobis_logo} alt="backround"/>
      </div>
      <section className={s.second_section}>
        <h3>Регистрация</h3>
        <Routes>
          <Route path="/email" element={<RegisterEmail />} />
          <Route path="/password" element={<RegisterPass />} />
        </Routes>
      </section>
    </div>
  );
}

export default Register;
