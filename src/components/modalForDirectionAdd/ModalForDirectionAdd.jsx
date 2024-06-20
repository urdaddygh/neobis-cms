import { useFormik } from "formik/dist";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "../modal/Modal";
import { cross_icon } from "../../Images";
import Input from "../input/Input";
import { useDispatch } from "react-redux";
import {getStudents, putStudentById } from "../../redux/slices/groupsSlice";
import { Sketch } from "@uiw/react-color";
import s from './styles.module.css'
import { createDirection } from "../../redux/slices/actionSlice";
const ModalForDirectionAdd = ({ active, setActive, closeModal }) => {
    const dispatch = useDispatch();
    const [hex, setHex] = useState("");
    const [isFocused, setIsFocused] = useState(false); 
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
    const handleOnFocus = () => { 
        setIsFocused(true); 
    };
    const handleBlur = () => { 
        setIsFocused(false); 
    }; 

    const formik = useFormik({
      validateOnChange: true,
      validateOnMount: false,
      validateOnBlur: false,
      enableReinitialize: true,
      initialValues: {
        name: "",
        color: hex,
      },
      onSubmit: (values, actions) => {
        let data = {
          values,
          updateHomePage,
          showSuccessMessage,
          showErrorMessage,
          actions
        };
        dispatch(createDirection(data));
        console.log(data)
      },
    });
  
    return (
    <Modal active={active} setActive={setActive} height="50%" width="420px">
   
        <div >
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
              valueLabel="Название"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <div className={s.cont}>
              <Input
                type="text"
                margin="10px 0"
                valueLabel="Цвет"
                name="color"
                onChange={(e) => {
                    setHex(e.target.value);
                    formik.handleChange(e);
                  }}
                value={formik.values.color}
                onFocus={handleOnFocus}
                onBlur={handleBlur}
                padding="0 30px"
                caretColor="transparent"
              />
              <div className={s.colorPick} style={{backgroundColor:hex}}></div>
              {isFocused && (
                <>
                  <img
                    src={cross_icon}
                    alt=""
                    className={s.cross_icon}
                    onClick={() => setIsFocused(false)}
                  />
                  <Sketch
                    style={{ top: 0, right: 0, position: "absolute" }}
                    color={hex}
                    onChange={(color) => {
                      setHex(color.hex);
                      formik.setFieldValue("color", color.hex);
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <button width="260px" className="modal_btn" type="submit">
            Сохранить
          </button>
        </form>
    </Modal>
  );
}

export default ModalForDirectionAdd
