import { useFormik } from 'formik/dist';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Modal } from '../modal/Modal';
import s from './styles.module.css'
import { cross_icon } from '../../Images';
import Input from '../input/Input';
import InputDropdown from '../InputDropdown/InputDropdown';
import { getGroups, getSource } from '../../redux/slices/actionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getApplicationByStatus } from '../../redux/slices/applicationSlice';
const ModalForAddStudent = ({ active, setActive, closeModal }) => {
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
      payed:"0",
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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // console.log(imageForDelete)
  return (
    <Modal active={active} setActive={setActive} height="90%" width="360px">
      <div onClick={closeModal}>
        <p className={s.up_p}>Добавить студента</p>
        <img src={cross_icon} alt="" className={s.cross_icon} />
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
          <InputDropdown
            margin="20px 0"
            valueLabel="Группа"
            name="group"
            onChange={formik.handleChange}
            options={["Python дневная", "Python вечерняя"]}
            readOnly
            value={formik.values.groups}
          />
          <InputDropdown
            valueLabel="Направление"
            margin="20px 0"
            name="department"
            onChange={formik.handleChange}
            options={["JAVA", "Python", "JS", "UX|UI design"]}
            readOnly
            value={formik.values.department}
          />
          <InputDropdown
            margin="20px 0"
            valueLabel="Источник"
            name="source"
            onChange={formik.handleChange}
            value={formik.values.source}
            readOnly
            options={["instagram", "facebook", "Знакомые порекомендовали"]}
          />
          <InputDropdown
            options={["Ждет звонка", "Пробный урок", "Посетил пробный урок"]}
            valueLabel="Статус карточки"
            onChange={(value) => formik.setFieldValue("status", value)}
            value={formik.values.status}
            margin="20px 0"
            name="status"
            readOnly
          />
           <Input
            type='number'
            valueLabel="Оплачено"
            onChange={formik.handleChange}
            value={formik.values.payed}
            margin="20px 0"
            name="payed"
          />
          <InputDropdown
            options={["Да", "Нет"]}
            valueLabel="Наличие ноутбука"
            name="isHasNoutbuk"
            margin="20px 0"
            onChange={formik.handleChange}
            readOnly
            value={formik.values.isHasNoutbuk}
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
};

export default ModalForAddStudent