import { useFormik } from 'formik/dist';
import React from 'react'
import { toast } from 'react-toastify';
import { Modal } from '../modal/Modal';
import s from './styles.module.css'
import { cross_icon } from '../../Images';
import Input from '../input/Input';
import InputDropdown from '../InputDropdown/InputDropdown';
const ModalForCreateGroup = ({ active, setActive, closeModal }) => {
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
          teachar: "",
          name: "",
          classroom: "",
          startOfCurse: "",
          endOfCurse:"0",
        },
        onSubmit: (values) => {
          console.log(values);
        },
      });
    
  return (
    <Modal active={active} setActive={setActive} height="90%" width="360px">
      <div>
        <p className={s.up_p}>Создание группы</p>
        <img src={cross_icon} alt="" className={s.cross_icon}  onClick={closeModal}/>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className={s.cont}>
          <InputDropdown
            options={[
              "Асанов Асан Асанович",
              "Расулов Айбек Султанович",
              "Нятин Виталий Муханбетович",
            ]}
            margin="20px 0"
            valueLabel="Преподаватель"
            name="teachar"
            value={formik.values.teachar}
            onChange={formik.handleChange}
          />
          <Input
            type="text"
            margin="20px 0"
            valueLabel="Название группы"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <InputDropdown
            options={["Большая", "Средняя", "Маленькая"]}
            margin="20px 0"
            valueLabel="Аудитория"
            name="classroom"
            onChange={formik.handleChange}
            value={formik.values.classroom}
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
            onChange={formik.handleChange}
            value={formik.values.endOfCurse}
            margin="20px 0"
            name="endOfCurse"
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
}

export default ModalForCreateGroup