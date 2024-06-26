import React, { useState } from "react";
import s from "./styles.module.css";
import { phone_img } from "../../Images";
import { Modal } from "../../components/modal/Modal";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { forgotPassword } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Input from "../../components/input/Input";

function PhoneInput({value,onChange,name,className, placeholder, type}) {
  return (
    <InputMask
      mask="0\(999\) 999 999"
      maskChar="_"
      value={value}
      onChange={onChange}
      name={name}
      alwaysShowMask={true}
      className={className}
      placeholder={placeholder}
      type={type}
      
    ></InputMask>
  );
}

function ModalForPhone({ modalActive, setModalActive, onClick }) {
  const dispatch = useDispatch();
  const [state, setState] = useState(false)
  const showErrMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      let data = { values, onClick, showErrMessage, setState };
      dispatch(forgotPassword(data));
    },
  });

  return (
    <>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        width="565px"
        height="70%"
      >
        <div className={s.modal_phone}>
          <h4 className={s.number}>Сброс пароля</h4>
          <img src={phone_img} alt="" />
          <h6 className={s.text}>Введите почту</h6>
          <p className={s.sms}>
            Мы отправим вам СМС с кодом
            <br /> подтверждения
          </p>
          <form onSubmit={formik.handleSubmit}>
            {/* <PhoneInput
              value={formik.values.phone}
              onChange={formik.handleChange}
              alwaysShowMask={false}
              name="phone"
              className={s.mask}
            ></PhoneInput> */}
            <div className={s.input_cont}>
              <Input
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                valueLabel="Почта"
                name="email"
              />
            </div>
            {state && (
              <p style={{ color: "red", marginTop: "5px", fontWeight: "700" }}>
                Данная почта не зарегестрирована
              </p>
            )}

            <div>
              <button
                className={s.modal_btn}
                type="submit"
                disabled={!formik.values.email}
              >
                Далее
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ModalForPhone;
