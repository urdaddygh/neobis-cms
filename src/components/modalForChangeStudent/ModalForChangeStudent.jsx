import { useFormik } from "formik/dist";
import React from "react";
import { toast } from "react-toastify";
import { Modal } from "../modal/Modal";
import { cross_icon } from "../../Images";
import Input from "../input/Input";
import { useDispatch, useSelector } from "react-redux";
import {getStudents, putStudentById } from "../../redux/slices/groupsSlice";
const ModalForChangeStudent = ({ active, setActive, closeModal }) => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.groups);
  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "modal_opup",
    });
  };
  const showErrorMessage = (data) => {
    console.log("err");
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "modal_opup",
    });
  };
  const updateHomePage = () => {
    dispatch(getStudents());
  };
  const initialValues = {
    last_name: student.studentsInfoById?.last_name || '',
    first_name: student.studentsInfoById?.first_name || '',
    phone: student.studentsInfoById?.phone || '',
    email:student.studentsInfoById?.email||''
  };
  const formik = useFormik({
    validateOnChange: true,
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
        const formData = {};

      if (values.last_name !== initialValues.last_name) {
        formData.last_name = values.last_name;
      }
      if (values.first_name !== initialValues.first_name) {
        formData.first_name = values.first_name;
      }
      if (values.phone !== initialValues.phone) {
        formData.phone = values.phone;
      }
      if (values.email !== initialValues.email) {
        formData.email = values.email;
      }
      let data = {
        id:student.studentsInfoById.id,
        formData,
        updateHomePage,
        showSuccessMessage,
        showErrorMessage,
      };
      dispatch(putStudentById(data));
    },
  });

  return (
    <Modal active={active} setActive={setActive} height="60%" width="420px">
      <div>
        <p className="modal_up_p">Создание студента</p>
        <img
          src={cross_icon}
          alt=""
          className="modal_cross_icon"
          onClick={closeModal}
        />
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="modal_cont">
          <Input
            type="text"
            margin="10px 0"
            valueLabel="Фамилия"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
          />
          <Input
            type="text"
            margin="10px 0"
            valueLabel="Имя"
            name="first_name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
          />
          <Input
            type="email"
            margin="10px 0"
            valueLabel="Почта"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Input
            type="text"
            margin="10px 0"
            valueLabel="Номер телефона"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>
        <button
          width="260px"
          className="modal_btn"
          type="submit"
        >
          Сохранить
        </button>
      </form>
    </Modal>
  );
};

export default ModalForChangeStudent;
