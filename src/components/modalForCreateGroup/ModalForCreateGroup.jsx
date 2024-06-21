import { useFormik } from "formik/dist";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "../modal/Modal";
import { cross_icon } from "../../Images";
import Input from "../input/Input";
import InputDropdown from "../InputDropdown/InputDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../../redux/slices/employeeSlice";
import { createGroup, getStudents } from "../../redux/slices/groupsSlice";
import { getIdByName } from "../../utils/getIdByName/getIdByName";
const ModalForCreateGroup = ({ active, setActive, closeModal }) => {
  const dispatch = useDispatch();
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
    dispatch(getTeachers());
  }, []);

  const teachersInfo = useSelector((state) => state.employee.employeeInfo);
  console.log(teachersInfo);

  const [teachers, setTeachers] = useState([]);
  const updateHomePage = () => {
    dispatch(getStudents());
  };
  useEffect(() => {
    if (teachersInfo?.results) {
      setTeachers(teachersInfo?.results.map((el) => el.first_name));
    }
  }, [teachersInfo?.results]);

  const getIdByName = (arr, name) => {
    const obj = arr.find(dir => dir.first_name === name);
    return obj ? obj.id : null;
  };
  const formik = useFormik({
    validateOnChange: true,
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues: {
      teacher: "",
      name: "",
      audience: "",
      start_date: "",
      end_date: "",
    },
    onSubmit: (values, actions) => {
      let teacherId = getIdByName(teachersInfo.results, values.teacher);
      console.log(teachersInfo.results)
      const data = {
        formData: {
          name: values.name,
          teacher: teacherId,
          audience:
            values.audience === "Большая"
              ? 1
              : values.audience === "Средняя"
              ? 2
              : values.audience === "Маленькая" && 3,
          start_date: values.start_date,
          end_date: values.end_date,
        },
        actions,
        updateHomePage,
        showErrorMessage,
        showSuccessMessage
      };
      dispatch(createGroup(data))
    },
  });

  return (
    <Modal active={active} setActive={setActive} height="80%" width="420px">
      <div>
        <p className="modal_up_p">Создание группы</p>
        <img
          src={cross_icon}
          alt=""
          className="modal_cross_icon"
          onClick={closeModal}
        />
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="modal_cont">
          <InputDropdown
            options={teachers}
            margin="10px 0"
            valueLabel="Преподаватель"
            name="teacher"
            value={formik.values.teacher}
            onChange={(value) => formik.setFieldValue("teacher", value)}
          />
          <Input
            type="text"
            margin="10px 0"
            valueLabel="Название группы"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <InputDropdown
            options={["Большая", "Средняя", "Маленькая"]}
            margin="10px 0"
            valueLabel="Аудитория"
            name="audience"
            onChange={(value) => formik.setFieldValue("audience", value)}
            value={formik.values.audience}
          />
          <Input
            type="date"
            margin="10px 0"
            valueLabel="Старт курса"
            name="start_date"
            onChange={formik.handleChange}
            value={formik.values.start_date}
          />
          <Input
            type="date"
            valueLabel="Конец курса"
            onChange={formik.handleChange}
            value={formik.values.end_date}
            margin="10px 0"
            name="end_date"
          />
        </div>
        <button width="260px" className="modal_btn" type="submit">
          Сохранить
        </button>
      </form>
    </Modal>
  );
};

export default ModalForCreateGroup;
