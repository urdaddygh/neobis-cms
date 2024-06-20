import React, { useEffect, useRef, useState } from "react";
import s from "./Profile.module.css";
import BackToPrevBtn from "../../../components/backToPrevBtn/BackToPrevBtn";
import { Icon_for_add_img, profile_icon } from "../../../Images";
import { useFormik } from "formik";
import Button from "../../../components/button/Button";
import ModalForPhone from "./ModalForPhone";
import ModalForMessage from "./ModalForMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoOfUser,
  updateUserInfo,
} from "../../../redux/slices/profileSlice";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

function ProfilePage({ApiUserInfo}) {
  const [modalActive, setModalActive] = useState(false);
  const [secondModalActive, setSecondModalActive] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoOfUser());
  }, []);

  const userInfo = useSelector((state) => state.profile.user);
  console.log(userInfo)

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email().required("Почта не должно быть пустым"),
    full_name: Yup.string().required("Имя не должно быть пустым"),
  });

  const changeActive = () => {
    // time = 60
    setSecondModalActive(true);
    setModalActive(false);
  };

  const showToErrMessage = (data) => {
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

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: SignupSchema,
    enableReinitialize: true,
    initialValues: {
      full_name: userInfo.full_name,
      email: userInfo.email,
      phone: userInfo.phone,
    },
    onSubmit: (values) => {
      if(typeof values.photo==="string" || values.photo===null){
        delete values.photo
      }
      console.log(values);
      let formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      for (let property of formData.entries()) {
        console.log(property[0], property[1]);
      }
      let data = {
        formData,
        showToErrMessage,
        showSuccessMessage,
      };
      dispatch(updateUserInfo(data));
      ApiUserInfo()
    },
  });

  useEffect(() => {
    dispatch(getInfoOfUser());
  }, [userInfo.email]);

  useEffect(() => {
     if (formik.errors.email) showToErrMessage(formik.errors.email);
    else if (formik.errors.first_name)
      showToErrMessage(formik.errors.first_name);
    else if (formik.errors.last_name) showToErrMessage(formik.errors.last_name);
  }, [formik.errors]);

  return (
    <>
      <ToastContainer />
      <BackToPrevBtn to="/main/home/waiting" left="132px" />
    
      <h2 className={s.h2}>Профиль</h2>
      <div
        className={s.profile_icon}
      >
        <img src={profile_icon} alt="" />
      </div>
      <p className={s.p}></p>
      <div className={s.cont_input}>
        <input
          type="text"
          name="full_name"
          value={formik.values.full_name}
          onChange={formik.handleChange}
          className={s.input}
          placeholder="Имя"
          readOnly
        />
        <input
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className={s.input}
          readOnly
          placeholder="Номер телефона"
        />
        {/* <input
          type="text"
          name="birth_date"
          value={formik.values.birth_date}
          onChange={formik.handleChange}
          className={s.input}
          placeholder="Дата рождения"
          // readOnly={
          //   !state
          // }
        /> */}
      </div>
      {/* <div className={s.add_number} onClick={() => setModalActive(true)}>
        <p>Добавить номер</p>
        <input
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className={s.input_number}
          placeholder="0(000) 000 000"
          readOnly
        />
      </div> */}
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        className={s.input}
        placeholder="Почта"
        readOnly
      />
      {!(
        userInfo.email === formik.values.email &&
        userInfo.phone === formik.values.phone &&
        userInfo.full_name === formik.values.full_name
      ) ? (
        <Button
          text="Сохранить"
          margin="44px auto 0 auto"
          type="button"
          onClick={() => formik.handleSubmit()}
        />
      ) : (
        <></>
      )}

      <ModalForPhone
        modalActive={modalActive}
        setModalActive={setModalActive}
        onClick={changeActive}
      />
      <ModalForMessage
        secondmodalActive={secondModalActive}
        setSecondModalActive={setSecondModalActive}
      />
    </>
  );
}

export default ProfilePage;
