import React, { useEffect, useRef, useState } from "react";
import { Modal } from "../modal/Modal";
import { cross_icon, heart_icon, red_heart_icon, three_dot } from "../../Images";
import s from "./ModalForChangeProduct.module.css";
import { useFormik } from "formik";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { changeProduct, deleteProduct, getMyProducts } from "../../redux/slices/productsApiSlice";
import Input from "../input/Input";
import { useLocation } from "react-router-dom";
import { getIdByName } from "../../utils/getIdByName/getIdByName";
import { getApplicationByStatus, putApplicationById } from "../../redux/slices/applicationSlice";
import InputDropdown from "../InputDropdown/InputDropdown";

const ModalForChangeProduct = ({
  active,
  setActive,
  closeModal,
  isChanging,
  deleteProductById,
}) => {
  const dispatch = useDispatch()
  const application = useSelector(state=>state.applications)
  console.log(application.applicationByIdInfo.id)
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
const initialValues = {
  last_name: application.applicationByIdInfo?.student?.last_name || '',
  first_name: application.applicationByIdInfo?.student?.first_name || '',
  phone: application.applicationByIdInfo?.student?.phone || '',
  direction: application.applicationByIdInfo?.direction?.name || '',
  groups: application.applicationByIdInfo?.groups?.name || '',
  source: application.applicationByIdInfo?.source?.name || '',
  status: application.applicationByIdInfo?.status === 1
    ? "Ждет звонка"
    : application.applicationByIdInfo?.status === 2
    ? "Записан на пробный урок"
    : application.applicationByIdInfo?.status === 3 && "Посетил пробный урок",
  laptop: application.applicationByIdInfo?.laptop ? "Да" : "Нет"
};
  const formik = useFormik({
    validateOnChange: true,
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {
      let directionId = getIdByName(action.directions, values.direction);
      let groupsId = getIdByName(action.groups, values.groups);
      let sourceId = getIdByName(action.source, values.source);
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
      if (values.direction !== initialValues.direction) {
        formData.direction = directionId;
      }
      if (values.groups !== initialValues.groups) {
        formData.groups = groupsId;
      }
      if (values.source !== initialValues.source) {
        formData.source = sourceId;
      }
      if (values.status !== initialValues.status) {
        formData.status =
          values.status === "Ждет звонка"
            ? 1
            : values.status === "Записан на пробный урок"
            ? 2
            : 3;
      }
      if (values.laptop !== initialValues.laptop) {
        formData.laptop = values.laptop === "Да";
      }

      // const formData = {
      //   student: {
      //     last_name: values.last_name,
      //     first_name: values.first_name,
      //     phone: values.phone,
      //   },
      //   direction: direactionId,
      //   source: sourceId,
      //   groups: groupsId,
      //   status:
      //     values.status === "Ждет звонка"
      //       ? 1
      //       : values.status === "Записан на пробный урок"
      //       ? 2
      //       : values.status === "Посетил пробный урок" && 3,
      //   laptop: values.laptop === "Да" ? true : false,
      // };
      let data = {formData, showSuccessMessage, showErrorMessage, updateHomePage, id:application.applicationByIdInfo.id }
      dispatch(putApplicationById(data))
      console.log(formData)
    },
  });
  
  return (
    <Modal active={active} setActive={setActive} height="90%" width="420px">
      <div>
        <p className="modal_up_p">Подробная страница</p>
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
        <div className="modal_cont_btn">
          <button width="260px" className="modal_btn" type="submit">Редактировать</button>
          <div style={{width:"30px"}}></div>
          <button onClick={deleteProductById} className="modal_btn modal_btn_delete">Удалить</button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalForChangeProduct;
