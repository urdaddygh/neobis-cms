import { useFormik } from 'formik/dist';
import React from 'react'
import { toast } from 'react-toastify';
import { Modal } from '../modal/Modal';
import { cross_icon } from '../../Images';
import Input from '../input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, putMenegerById, putTeacherById } from '../../redux/slices/employeeSlice';
const ModalForChangeEmployee = ({ active, setActive, closeModal }) => {
  const dispatch = useDispatch()
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
    dispatch(getEmployee());
  };
      const employee = useSelector(state=>state.employee.employeeInfoById)
      // console.log(employee)

      const initialValues= {
        last_name: employee.last_name||'',
        first_name: employee.first_name||'',
        phone: employee.phone||'',
        email: employee.email||'',
        patent_number: employee.patent_number||'',
        patent_term: employee.patent_term||'',
      }

      const formik = useFormik({
        validateOnChange: true,
        validateOnMount: false,
        validateOnBlur: false,
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
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
          if (values.email !== initialValues.email) {
            formData.email = values.email;
          }
          if (values.patent_number !== initialValues.patent_number) {
            formData.patent_number = values.patent_number;
          }
          if (values.patent_term !== initialValues.patent_term) {
            formData.patent_term = values.patent_term;
          }
          let data = {
            id: employee.id,
            formData,
            updateHomePage,
            showSuccessMessage,
            showErrorMessage,
          };
          if (employee.role === "teacher") {
            dispatch(putTeacherById(data));
          }
          else if (employee.role === "office_manager") {
            dispatch(putMenegerById(data));
          }
        },
      });
    
      // console.log(imageForDelete)
      return (
        <Modal active={active} setActive={setActive} height="90%" width="420px">
          <div>
            <p className="modal_up_p">Подробная информация</p>
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
              type="text"
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
}

export default ModalForChangeEmployee