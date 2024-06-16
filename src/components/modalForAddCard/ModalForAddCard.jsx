import { useFormik } from 'formik/dist';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from '../modal/Modal';
import Input from '../input/Input';
import s from './styles.module.css'
import { cross_icon } from '../../Images';
import InputDropdown from '../InputDropdown/InputDropdown';
const ModalForAddCard = ({ active,
    setActive,
    closeModal}) => {
    const dispatch = useDispatch()
  
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
       console.log(values)
      },
    });
    
    // console.log(imageForDelete)
    return (
      <Modal active={active} setActive={setActive} height="90%" width="360px">
        <div >
          <p className={s.up_p}>Добавить карточку</p>
          <img src={cross_icon} alt="" className={s.cross_icon} onClick={closeModal}/>
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
              value={formik.values.group}
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
              onChange={(value) => formik.setFieldValue('status', value)}
              value={formik.values.status}
              margin="20px 0"
              name='status'
              readOnly
            />
            <InputDropdown
              options={["Да", "Нет",]}
              valueLabel="Наличие ноутбука"
              name="isHasNoutbuk"
              margin="20px 0"
              onChange={formik.handleChange}
              readOnly
              value={formik.values.isHasNoutbuk}
            />
          </div>
          <button width="260px" onClick={(e) => {}} className={s.btn} type='submit'>
            Сохранить
          </button>
        </form>
      </Modal>
    );
}

export default ModalForAddCard