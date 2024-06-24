import { useFormik } from 'formik/dist';
import React from 'react'
import { toast } from 'react-toastify';
import { Modal } from '../modal/Modal';
import s from './styles.module.css'
import { cross_icon } from '../../Images';
import Input from '../input/Input';
import { useDispatch } from 'react-redux';
import { getEmployee } from '../../redux/slices/employeeSlice';
import { createStudent, getStudents } from '../../redux/slices/groupsSlice';
const ModalForCreateStudentInGroup = ({ active, setActive, closeModal }) => {

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
  const updateHomePage=()=>{
    dispatch(getStudents())
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
          payed:"",
        },
        onSubmit: (values, actions) => {
          let data = {values, actions, updateHomePage, showSuccessMessage, showErrorMessage }

          dispatch(createStudent(data))
        },
      });
    
  return (
    <Modal active={active} setActive={setActive} height="70%" width="420px">
    <div >
      <p className="modal_up_p">Создание студента</p>
      <img src={cross_icon} alt="" className="modal_cross_icon" onClick={closeModal}/>
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
         {/* <Input
          type='number'
          valueLabel="Оплачено"
          onChange={formik.handleChange}
          value={formik.values.payed}
          margin="10px 0"
          name="payed"
        /> */}
       
      </div>
      <button
        width="260px"
        onClick={(e) => {}}
        className="modal_btn"
        type="submit"
      >
        Сохранить
      </button>
    </form>
  </Modal>
  )
}

export default ModalForCreateStudentInGroup