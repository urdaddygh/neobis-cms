import React, { useRef, useState } from "react";
import { Modal } from "../modal/Modal";
import { cross_icon, heart_icon, red_heart_icon, three_dot } from "../../Images";
import s from "./ModalForChangeProduct.module.css";
import { useFormik } from "formik";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeProduct, deleteProduct, getMyProducts } from "../../redux/slices/productsApiSlice";
import CarouselSlider from "../carousel/CarouselSlider";
import { CarouselProvider, DotGroup } from "pure-react-carousel";
import Input from "../input/Input";

const ModalForChangeProduct = ({
  active,
  setActive,
  closeModal,
  isChanging,
  myProductsPage,
  deleteProductById,
}) => {
  const dispatch = useDispatch()

  const updateProduct=()=>{
    dispatch(getMyProducts(myProductsPage))
  }

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
    enableReinitialize:true,
    initialValues: {
      surname: 'sad',
      name: '',
      number: '',
      department: '',
      group: '',
      source: '',
      status: '',
      isHasNoutbuk:''
    },
    onSubmit: (values) => {
     
    },
  });
  
  // console.log(imageForDelete)
  return (
    <Modal active={active} setActive={setActive} height="90%" width='360px'>
      <div  onClick={closeModal}>
        <p className={s.up_p}>Подробная страница</p>
        <img src={cross_icon} alt="" className={s.cross_icon}/>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className={s.cont}>
          <Input
            type="text"
            margin='20px 0'
            valueLabel="Фамилия"
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
          />
          <Input
            type="text"
            margin='20px 0'
            valueLabel="Имя"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Input
            type="text"
            margin='20px 0'
            valueLabel="Номер телефона"
            name="number"
            onChange={formik.handleChange}
            value={formik.values.number}
          />
          <Input
            margin='20px 0'
            type="text"
            valueLabel="Группа"
            name="group"
            onChange={formik.handleChange}
            value={formik.values.group}
          />
          <Input
            type="text"
            valueLabel="Направление"
            margin='20px 0'
            name="department"
            onChange={formik.handleChange}
            value={formik.values.department}
          />
          <Input
            type="text"
            valueLabel="Источник"
            name="source"
            margin='20px 0'
            onChange={formik.handleChange}
            value={formik.values.source}
          />
          <Input
            type="text"
            valueLabel="Статус карточки"
            name="status"
            margin='20px 0'
            onChange={formik.handleChange}
            value={formik.values.status}
          />
          <Input
            type="text"
            valueLabel="Наличие ноутбука"
            name="isHasNoutbuk"
            margin='20px 0'
            onChange={formik.handleChange}
            value={formik.values.isHasNoutbuk}
          />
        </div>
        <div className={s.cont_btn}>
          {isChanging ? (
            <Button text="Сохранить" width="260px" type="submit" />
          ) : (
            <>
              <button width="260px" onClick={(e) => {}}>
                Редактировать
              </button>
              <span onClick={deleteProductById}>Удалить</span>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ModalForChangeProduct;
