import { useFormik } from "formik/dist";
import React from "react";
import { toast } from "react-toastify";
import { Modal } from "../modal/Modal";
import s from "./styles.module.css";
import { cross_icon } from "../../Images";
import Input from "../input/Input";
import InputDropdown from "../InputDropdown/InputDropdown";
const ModalForAddManager = ({ active, setActive, closeModal }) => {
    const showSuccessMessage = (data) => {
        toast.success(data, {
          position: toast.POSITION.TOP_CENTER,
          className: "popup",
        });
      };
    
      const formik = useFormik({
        validateOnChange: true,
        validateOnMount: false,
        validateOnBlur: false,
        enableReinitialize: true,
        initialValues: {
          surname: "",
          name: "",
          number: "",
          email: "",
        },
        onSubmit: (values) => {
          console.log(values);
        },
      });
    
      // console.log(imageForDelete)
      return (
        <Modal active={active} setActive={setActive} height="70%" width="360px">
          <div>
            <p className={s.up_p}>Создание преподавателя</p>
            <img
              src={cross_icon}
              alt=""
              className={s.cross_icon}
              onClick={closeModal}
            />
          </div>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className={s.cont}>
              <Input
                type="text"
                margin="20px 0"
                valueLabel="Фамилия"
                name="surname"
                value={formik.values.surname}
                onChange={formik.handleChange}
              />
              <Input
                type="text"
                margin="20px 0"
                valueLabel="Имя"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <Input
                type="text"
                margin="20px 0"
                valueLabel="Номер телефона"
                name="number"
                onChange={formik.handleChange}
                value={formik.values.number}
              />
              <Input
                type="email"
                margin="20px 0"
                valueLabel="Почта"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <button
              width="260px"
              onClick={(e) => {}}
              className={s.btn}
              type="submit"
            >
              Сохранить
            </button>
          </form>
        </Modal>
      );
}

export default ModalForAddManager