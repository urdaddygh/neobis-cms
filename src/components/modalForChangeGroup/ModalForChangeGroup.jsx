import { useFormik } from 'formik/dist';
import React from 'react'
import { toast } from 'react-toastify';
import { Modal } from '../modal/Modal';
import s from './styles.module.css'
import { cross_icon } from '../../Images';
import Input from '../input/Input';
import InputDropdown from '../InputDropdown/InputDropdown';
const ModalForChangeGroup = ({ active, setActive, closeModal }) => {
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
          studentCount: "",
          teacher: "",
          classroom: "",
          startOfCurse: "",
          endOfCurse: "",
          payed:"0",
          status: "",
          isHasNoutbuk: "",
        },
        onSubmit: (values) => {
          console.log(values);
        },
      });
    
  return (
    <Modal active={active} setActive={setActive} height="80%" width="360px">
      <div>
        <p className={s.up_p}>Python</p>
        <img src={cross_icon} alt="" className={s.cross_icon}  onClick={closeModal}/>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className={s.cont}>
          <Input
            type="number"
            margin="20px 0"
            valueLabel="Кол-во студентов"
            name="studentCount"
            value={formik.values.studentCount}
            onChange={formik.handleChange}
          />
          <InputDropdown
            margin="20px 0"
            valueLabel="Преподаватель"
            name="teacher"
            onChange={formik.handleChange}
            readOnly
            options={["Асанов Асан Асанович", "Расулов Айбек Султанович", "Нятин Виталий Муханбетович"]}
            value={formik.values.teacher}
          />
          <InputDropdown
            margin="20px 0"
            valueLabel="Аудитория"
            name="classroom"
            onChange={formik.handleChange}
            options={["Большая", "Средняя", "Маленькая"]}
            value={formik.values.classroom}
            readOnly
          />
          <Input
            type="date"
            margin="20px 0"
            valueLabel="Старт курса"
            name="startOfCurse"
            onChange={formik.handleChange}
            value={formik.values.startOfCurse}
          />
          <Input
            type="date"
            valueLabel="Конец курса"
            margin="20px 0"
            name="endOfCurse"
            onChange={formik.handleChange}
            value={formik.values.endOfCurse}
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
  )
}

export default ModalForChangeGroup