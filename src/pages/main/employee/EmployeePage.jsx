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
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, getEmployeeBySearch } from "../../../redux/slices/employeeSlice";
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

    const [modalActionActive, setModalActionActive] = useState(false);
    const [modalArchivatedActive, setModalArchivatedActive] = useState(false);
    const [modalChangeEmployeeActive, setModalChangeEmployeeActive] = useState(false);
    const [modalAddEmployeeActive, setModalAddEmployeeActive] = useState(false);
    const [modalAddMenegerActive, setModalAddMenegerActive] = useState(false);

    const openAddEmployeeModal=()=>{
        setState(false);
        setModalAddEmployeeActive(true)
    }
    const openAddMenegerModal=()=>{
        setState(false);
        setModalAddMenegerActive(true)
    }

    const formik = useFormik({
      validateOnChange: true,
      validateOnMount: false,
      validateOnBlur: false,
      enableReinitialize: true,
      initialValues: {
        search: "",
      },
      onSubmit: (values) => {
        console.log(values);
        dispatch(getEmployeeBySearch(values.search))
      },
    });
    const employee = useSelector(state=>state.employee)
    console.log(employee)
    const onCardClick=(id)=>{
      setModalActionActive(true)
      // dispatch(getApplicationById(id))
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
                value={formik.values.search}
                name="search"
                onChange={formik.handleChange}
              />
              <img className={s.search_icon} src={search_icon} alt="wrong" />
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
            <p>Номер патента</p>
            <p>Почта</p>
            <img
              src={three_dot_icon}
              alt=""
              className={s.three_dot}
              style={{ visibility: "hidden" }}
            />
          </div>
          {/* {!employee.error ? (
            !employee.loading ? (
              employee.employeeInfo.length !== 0 ? (
                employee.employeeInfo?.results.map((el, index) => (
                  <div
                    className={s.title + " " + s.subtitle}
                    onClick={onCardClick}
                    key={index}
                  >
                    <p className={s.first_p}>{index + 1}</p>
                    <p>{el?.first_name}</p>
                    <p>{el?.last_name}</p>
                    <p>{el?.phone}</p>
                    <p>{el?.patent_number}</p>
                    <p>{el?.email}</p>
                    <img
                      src={three_dot_icon}
                      alt=""
                      className={s.three_dot}
                      onClick={onCardClick}
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
          )} */}

          {!employee.error ? (
            !employee.loading ? (
              employee.employeeInfo.length !== 0 ? (
                employee.employeeInfo?.map((el, index) => (
                  <div
                    className={s.title + " " + s.subtitle}
                    onClick={onCardClick}
                    key={index}
                  >
                    <p className={s.first_p}>{index + 1}</p>
                    <p>{el?.first_name}</p>
                    <p>{el?.last_name}</p>
                    <p>{el?.phone}</p>
                    <p>{el?.patent_number}</p>
                    <p>{el?.email}</p>
                    <img
                      src={three_dot_icon}
                      alt=""
                      className={s.three_dot}
                      onClick={onCardClick}
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
            openChangeModal={() => setModalChangeEmployeeActive(true)}
            openArchivatedModal={() => setModalArchivatedActive(true)}
            closeModal={() => setModalActionActive(false)}
            setActive={setModalActionActive}
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