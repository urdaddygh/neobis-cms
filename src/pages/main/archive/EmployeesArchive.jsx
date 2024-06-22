import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/input/Input";
import s from './styles.module.css'
import { useFormik } from "formik";
import { search_icon, three_dot_icon } from "../../../Images";
import ActionModal from "../../../components/actionModal/ActionModal";
import ActionModalForArchivePage from "../../../components/actionModalForArchivePage/ActionModalForArchivePage";
import { unarchiveApplicationById } from "../../../redux/slices/applicationSlice";
import { toast } from "react-toastify";
import { getArchiveEmployee } from "../../../redux/slices/archiveSlice";
import { deleteMenegerById, deleteTeacherById, getMenegerById, getTeacherById } from "../../../redux/slices/employeeSlice";
const EmployeesArchive = () => {
  const [modalActionActive, setModalActionActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArchiveEmployee())
  }, []);
  // const groupsInfo = useSelector((state) => state.groups);

  const archive = useSelector((state) => state.archive);
  const employee = useSelector((state) => state.employee);
  console.log(employee)
   const showSuccessMessage = (data) => {
    toast.success(data, {
      position: toast.POSITION.TOP_CENTER,
      className:"modal_opup",
    });
  };

  const showErrorMessage = (data) => {
    toast.error(data, {
      position: toast.POSITION.TOP_CENTER,
      className:"modal_opup",
    });
  };

  const onCardClick=(id, role)=>{
    console.log(id, role)
    if(role==='office_manager'){
      dispatch(getMenegerById(id))
    }else if(role==='teacher'){
      dispatch(getTeacherById(id))
    }
    setModalActionActive(true)
  }

  const closeCard = () => {
    setModalActionActive(false);
  };

  const updateHomePage = () => {
    dispatch(getArchiveEmployee())
  };

  const deleteEmployee=(id)=>{
    let data={id, updateHomePage, closeCard}
    if(employee.employeeInfoById.role==='office_manager'){
      dispatch(deleteMenegerById(data))
    }else if(employee.employeeInfoById.role==='teacher'){
      dispatch(deleteTeacherById(data))
    }
  }

  const unarchivatedApplication=(id)=>{
    let data={id, updateHomePage, showErrorMessage, showSuccessMessage, closeCard}
    console.log(data)
    dispatch(unarchiveApplicationById(data))
  }
  const formik = useFormik({
    validateOnChange: true,
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues: {
      q: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <div className={s.search_cont}>
        <div className={s.search}>
          <Input
            name={formik.values.q}
            valueLabel="Поиск"
            minWidth="100%"
            maxWidth="100%"
            valueColor="white"
            inputColor="white"
            value={formik.values.q}
            onChange={formik.handleChange}
          />
          <img className={s.search_icon} src={search_icon} alt="wrong" />
        </div>
      </div>

      <div className={s.title} style={{ fontWeight: "500" }}>
        <p className={s.first_p}>№</p>
        <p>Имя</p>
            <p>Фамилия</p>
            <p>Номер</p>
            <p>Почта</p>
            <img
                    src={three_dot_icon}
                    alt=""
                    className={s.three_dot}
                    style={{visibility:"hidden"}}
                  />
      </div>
      {!archive.error ? (
          !archive.loading ? (
            archive.employeeInfo?.results?.length !== 0 ? (
              archive.employeeInfo?.results?.map((el, index) => (
                <div
                  className={s.title + " " + s.subtitle}
                  onClick={() => onCardClick(el.id, el.role)}
                  key={index}
                >
                  <p className={s.first_p}>{index + 1}</p>
                  <p>{el?.first_name}</p>
                  <p>{el?.last_name}</p>
                  <p>{el?.phone}</p>
                  <p>{el?.email}</p>
                  <img
                    src={three_dot_icon}
                    alt=""
                    className={s.three_dot}
                    onClick={() => onCardClick(el.id, el.role)}
                  />
                </div>
              ))
            ) : (
              <p className="noData">Нет данных :( </p>
            )
          ) : (
            <p className="loading">Загрузка...</p>
          )
        ) : (
          <p className="error">Непредвиденная ошибка</p>
        )}

      <ActionModalForArchivePage
        active={modalActionActive}
        // onChangeClick={() => setModalChangeGroupActive(true)}
        closeModal={() => setModalActionActive(false)}
        onUnarchivatedClick={()=>unarchivatedApplication(employee.employeeInfoById.id)}
        setActive={setModalActionActive}
        onDeleteClick={() => deleteEmployee(employee.employeeInfoById.id)}
      />
    </>
  );
}

export default EmployeesArchive