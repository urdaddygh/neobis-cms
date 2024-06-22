import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import { cross_icon, filter_icon, menedjer_icon, search_icon, teacher_icon, three_dot_icon } from "../../../Images";
import Input from "../../../components/input/Input";
import ModalForAdditionalInfo from "../../../components/modalForAdditionalInfo/ModalForAdditionalInfo";
import ModalForChangeProduct from "../../../components/modalForChangeProduct/ModalForChangeProduct";
import FilterModal from "../../../components/filterModal/FilterModal";
import ModalForAddStudent from "../../../components/modalForAddStudent/ModalForAddStudent";
import ModalForArchivated from "../../../components/modalForArchivated/ModalForArchivated";
import InputDropdown from "../../../components/InputDropdown/InputDropdown";
import Button from "../../../components/button/Button";
import ActionModal from "../../../components/actionModal/ActionModal";
import FilterRadio from "./components/FilterRadio";
import ModalForChangeEmployee from "../../../components/modalForChangeEmployee/ModalForChangeEmployee";
import ModalForAddTeacher from "../../../components/modalForAddTeacher/ModalForAddTeacher";
import ModalForAddManager from "../../../components/modalForAddManager/ModalForAddManager";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { deleteMenegerById, deleteTeacherById, getEmployee, getEmployeeBySearch, getMenegerById, getTeacherById } from "../../../redux/slices/employeeSlice";
import { archiveApplicationById } from "../../../redux/slices/applicationSlice";
const EmployeePage = () => {
    const [state, setState] = useState(false);
    const dispatch = useDispatch()
    const toggle = ()=>{
        setState(!state)
    }
    const [filterState, setFilterState] = useState(false);
    const toggleFilter = ()=>{
        setFilterState(!filterState)
    }
    
    useEffect(()=>{
      dispatch(getEmployee())
    },[])
    const showSuccessMessage = (data) => {
      toast.success(data, {
        position: toast.POSITION.TOP_CENTER,
        className:"modal_popup",
      });
    };
    const showErrorMessage = (data) => {
      console.log("err")
      toast.error(data, {
        position: toast.POSITION.TOP_CENTER,
        className:"modal_popup",
      });
    };
    const [modalActionActive, setModalActionActive] = useState(false);
    const [modalArchivatedActive, setModalArchivatedActive] = useState(false);
    const [modalChangeEmployeeActive, setModalChangeEmployeeActive] = useState(false);
    const [modalAddEmployeeActive, setModalAddEmployeeActive] = useState(false);
    const [modalAddMenegerActive, setModalAddMenegerActive] = useState(false);
    const closeCard=()=>{
      setModalActionActive(false)
    }

    const updateHomePage=()=>{
      dispatch(getEmployee())
    }

    const openAddEmployeeModal=()=>{
        setState(false);
        setModalAddEmployeeActive(true)
    }

    const openAddMenegerModal=()=>{
        setState(false);
        setModalAddMenegerActive(true)
    }

    const handleInputChange = (e) => {
      formik.handleChange(e);
      if (e.target.value === "") {
        dispatch(getEmployee());
      }
    };

    const archiveApplication = (id)=>{
      let data={id, updateHomePage, showErrorMessage, showSuccessMessage, closeCard}
      dispatch(archiveApplicationById(data))
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
        let data = {q:values.q}
        dispatch(getEmployeeBySearch(data))
      },
    });

    const employee = useSelector(state=>state.employee)
    // console.log(employee)

    const onCardClick=(id, role)=>{
      console.log(id, role)
      if(role==='office_manager'){
        dispatch(getMenegerById(id))
      }else if(role==='teacher'){
        dispatch(getTeacherById(id))
      }
      setModalActionActive(true)
    }

    const deleteEmployee=(id)=>{
      let data={id, updateHomePage, closeCard}
      if(employee.employeeInfoById.role==='office_manager'){
        dispatch(deleteMenegerById(data))
      }else if(employee.employeeInfoById.role==='teacher'){
        dispatch(deleteTeacherById(data))
      }
    }
    return (
      <>
        <ToastContainer />
        <div className={s.choiceInput}>
          <Button text="+Добавить сотрудника" width="250px" onClick={toggle} />
          {state && (
            <div className={s.subwindow}>
              <img
                src={cross_icon}
                alt=""
                className={s.cross_icon}
                onClick={toggle}
              />
              <p>Добавить:</p>
              <div className={s.subwindow_cont} onClick={openAddEmployeeModal}>
                <img src={teacher_icon} alt="" />
                <p>Преподавателя</p>
              </div>
              <div className={s.subwindow_cont} onClick={openAddMenegerModal}>
                <img src={menedjer_icon} alt="" />
                <p>Офис-менеджера</p>
              </div>
            </div>
          )}
        </div>
        <div className="default_cont">
          <div className={s.search_cont}>
            <div className={s.search}>
              <Input
                valueLabel="Поиск"
                minWidth="100%"
                maxWidth="100%"
                valueColor="white"
                inputColor="white"
                value={formik.values.q}
                name="q"
                onChange={handleInputChange}
              />
              <img
                className={s.search_icon}
                src={search_icon}
                alt="wrong"
                onClick={formik.handleSubmit}
              />
            </div>
            <img
              className={s.filter_icon}
              src={filter_icon}
              alt="wrong"
              onClick={toggleFilter}
            />
            {filterState && <FilterRadio toggleFilter={toggleFilter} />}
          </div>

          <div className={s.title} style={{ fontWeight: "500" }}>
            <p className={s.first_p}>№</p>
            <p>Имя</p>
            <p>Фамилия</p>
            <p>Номер</p>
            <img
              src={three_dot_icon}
              alt=""
              className={s.three_dot}
              style={{ visibility: "hidden" }}
            />
          </div>
          {!employee.error ? (
            !employee.loading ? (
              employee.employeeInfo.length !== 0 ? (
                employee.employeeInfo?.results.map((el, index) => (
                  <div
                    className={s.title + " " + s.subtitle}
                    onClick={() => onCardClick(el?.id, el?.role)}
                    key={index}
                  >
                    <p className={s.first_p}>{index + 1}</p>
                    <p>{el?.first_name}</p>
                    <p>{el?.last_name}</p>
                    <p>{el?.phone}</p>
                    <img
                      src={three_dot_icon}
                      alt=""
                      className={s.three_dot}
                      onClick={() => onCardClick(el?.id, el?.role)}
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
          <ActionModal
            active={modalActionActive}
            onChangeClick={() => setModalChangeEmployeeActive(true)}
            onArchiveClick={() =>
              archiveApplication(employee.employeeInfoById.id)
            }
            closeModal={() => setModalActionActive(false)}
            setActive={setModalActionActive}
            onDeleteClick={()=>deleteEmployee(employee.employeeInfoById.id)}
          />
          <ModalForArchivated
            active={modalArchivatedActive}
            setActive={setModalArchivatedActive}
            closeModal={() => setModalArchivatedActive(false)}
          />
          <ModalForChangeEmployee
            active={modalChangeEmployeeActive}
            closeModal={() => setModalChangeEmployeeActive(false)}
            setActive={setModalChangeEmployeeActive}
          />
          <ModalForAddTeacher
            active={modalAddEmployeeActive}
            closeModal={() => setModalAddEmployeeActive(false)}
            setActive={setModalAddEmployeeActive}
          />
          <ModalForAddManager
            active={modalAddMenegerActive}
            closeModal={() => setModalAddMenegerActive(false)}
            setActive={setModalAddMenegerActive}
          />
        </div>
      </>
    );
}

export default EmployeePage