import { useFormik } from "formik/dist";
import React from "react";
import { toast } from "react-toastify";
import { Modal } from "../modal/Modal";
import { cross_icon } from "../../Images";
import Input from "../input/Input";
import InputDropdown from "../InputDropdown/InputDropdown";
import { useDispatch } from "react-redux";
import { addTeacher } from "../../redux/slices/employeeSlice";
const ModalForAddTeacher = ({ active, setActive, closeModal }) => {
  const dispatch = useDispatch()
  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className:"modal_opup",
    });
  };
  const showErrorMessage = (data) => {
    console.log("err")
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className:"modal_opup",
    });
  };
  const formik = useFormik({
    validateOnChange: true,
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues: {
      last_name: "",
      first_name: "",
      phone: "",
      email: "",
      patent_number: "",
      patent_term: "",
    },
    onSubmit: (values) => {
      let data = {values, showErrorMessage, showSuccessMessage}
      dispatch(addTeacher(data))
    },
  });

  // console.log(imageForDelete)
  return (
    <Modal active={active} setActive={setActive} height="90%" width="420px">
      <div>
        <p className="modal_up_p">Создание преподавателя</p>
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
            type="text"
            margin="10px 0"
            valueLabel="Номер телефона"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
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
            valueLabel="Номер патента"
            name="patent_number"
            onChange={formik.handleChange}
            value={formik.values.patent_number}
          />
          <Input
            type="date"
            valueLabel="Срок патента"
            onChange={formik.handleChange}
            value={formik.values.patent_term}
            margin="10px 0"
            name="patent_term"
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

export default ModalForAddTeacher;
