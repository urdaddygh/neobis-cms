import { useFormik } from "formik/dist";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Modal } from "../modal/Modal";
import Input from "../input/Input";
import s from "./styles.module.css";
import { cross_icon } from "../../Images";
import InputDropdown from "../InputDropdown/InputDropdown";
import {
  getDiractions,
  getGroups,
  getSource,
} from "../../redux/slices/actionSlice";
import { getIdByName } from "../../utils/getIdByName/getIdByName";
import { createApplicationCard, getApplicationByStatus } from "../../redux/slices/applicationSlice";
import { useLocation } from "react-router-dom";
const ModalForAddCard = ({ active, setActive, closeModal }) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };
  const showErrorMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className: "popup",
    });
  };

  useEffect(() => {
    dispatch(getDiractions());
    dispatch(getGroups());
    dispatch(getSource());
  }, []);

  const action = useSelector((state) => state.action);
  // console.log(action)
  const [directions, setDirections] = useState([]);
  const [source, setSource] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (action?.directions) {
      setDirections(action.directions.map((el) => el.name));
    }
  }, [action?.directions]);

  useEffect(() => {
    if (action?.source) {
      setSource(action.source.map((el) => el.name));
    }
  }, [action?.source]);

  useEffect(() => {
    if (action?.groups) {
      setGroups(action.groups.map((el) => el.name));
    }
  }, [action?.groups]);
 const updateHomePage=()=>{
  const currentParentPath = location.pathname.split("/")[3];
  if(currentParentPath==='waiting'){
    return dispatch(getApplicationByStatus("1"))
  }
  if(currentParentPath==='trial'){
    return dispatch(getApplicationByStatus("2"))
  }
  if(currentParentPath==='attended'){
    return dispatch(getApplicationByStatus("3"))
  }
}
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
      direction: "",
      groups: "",
      source: "",
      status: "",
      laptop: "",
    },
    onSubmit: (values, actions) => {
      
      let direactionId = getIdByName(action.directions, values.direction);
      let groupsId = getIdByName(action.groups, values.groups);
      let sourceId = getIdByName(action.source, values.source);

      const formData = {
        student: {
          last_name: values.last_name,
          first_name: values.first_name,
          phone: values.phone,
          email: values.email,
        },
        direction: direactionId,
        source: sourceId,
        groups: groupsId,
        status:
          values.status === "Ждет звонка"
            ? 1
            : values.status === "Записан на пробный урок"
            ? 2
            : values.status === "Посетил пробный урок" && 3,
        laptop: values.laptop === "Да" ? true : false,
      };
      console.log(formData)
      let data = {formData, showSuccessMessage, actions, showErrorMessage, updateHomePage }
      dispatch(createApplicationCard(data))
    },
  });

  // console.log(imageForDelete)
  return (
    <Modal active={active} setActive={setActive} height="90%" width="420px">
      <p className={s.up_p}>Добавить карточку</p>
      <img
        src={cross_icon}
        alt=""
        className={s.cross_icon}
        onClick={closeModal}
      />

      <form action="" onSubmit={formik.handleSubmit}>
        <div className={s.cont}>
          <Input
            type="text"
            margin="10px auto"
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
            type="phone"
            margin="10px 0"
            valueLabel="Номер телефона"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <Input
            type="text"
            margin="10px 0"
            valueLabel="Почта"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <InputDropdown
            margin="10px 0"
            valueLabel="Группа"
            name="groups"
            onChange={(value) => formik.setFieldValue("groups", value)}
            options={groups}
            readOnly
            value={formik.values.groups}
          />
          <InputDropdown
            valueLabel="Направление"
            margin="10px 0"
            name="direction"
            onChange={(value) => formik.setFieldValue("direction", value)}
            options={directions}
            readOnly
            value={formik.values.direction}
          />
          <InputDropdown
            margin="10px 0"
            valueLabel="Источник"
            name="source"
            onChange={(value) => formik.setFieldValue("source", value)}
            value={formik.values.source}
            readOnly
            options={source}
          />
          <InputDropdown
            options={[
              "Ждет звонка",
              "Записан на пробный урок",
              "Посетил пробный урок",
            ]}
            valueLabel="Статус карточки"
            onChange={(value) => formik.setFieldValue("status", value)}
            value={formik.values.status}
            margin="10px 0"
            name="status"
            readOnly
          />
          <InputDropdown
            options={["Да", "Нет"]}
            valueLabel="Наличие ноутбука"
            name="laptop"
            margin="10px 0"
            onChange={(value) => formik.setFieldValue("laptop", value)}
            readOnly
            value={formik.values.laptop}
          />
        </div>
        <button
          width="260px"
          className={s.btn}
          type="submit"
        >
          Сохранить
        </button>
      </form>
    </Modal>
  );
};

export default ModalForAddCard;
