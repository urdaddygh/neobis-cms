import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import { filter_icon, search_icon } from "../../../Images";
import Input from "../../../components/input/Input";
import ModalForAdditionalInfo from "../../../components/modalForAdditionalInfo/ModalForAdditionalInfo";
import ModalForChangeProduct from "../../../components/modalForChangeProduct/ModalForChangeProduct";
import FilterModal from "../../../components/filterModal/FilterModal";
import ModalForAddStudent from "../../../components/modalForAddStudent/ModalForAddStudent";
import ModalForArchivated from "../../../components/modalForArchivated/ModalForArchivated";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationById, getApplicationBySearch, getApplicationByStatus } from "../../../redux/slices/applicationSlice";
import { useFormik } from "formik";
const WaitingCall = () => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [modalFilterActive, setModalFilterActive] = useState(false);
  const [modalChangeActive, setModalChangeActive] = useState(false);
  const [modalAddStudentActive, setModalAddStudentActive] = useState(false);
  const [modalArchivatedActive, setModalArchivatedActive] = useState(false);

  const onCardClick=(id)=>{
    setModalActive(true)
    dispatch(getApplicationById(id))
  }

  useEffect(()=>{
    dispatch(getApplicationByStatus("1"))
  },[])
  const applications=useSelector(state=>state.applications);

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
      dispatch(getApplicationBySearch(values))
    },
  });

  // console.log(applications)
  return (
    <>
      <div className={s.search_cont}>
        <div className={s.search}>
          <Input
            valueLabel="Поиск"
            value={formik.values.q}
            onChange={formik.handleChange}
            minWidth="100%"
            name="q"
            maxWidth="100%"
            valueColor="white"
            inputColor="white"
          />
          <img className={s.search_icon} src={search_icon} alt="wrong" onClick={formik.handleSubmit}/>
        </div>
        <img
          className={s.filter_icon}
          src={filter_icon}
          alt="wrong"
          onClick={() => setModalFilterActive(true)}
        />
      </div>

      <div className={s.title} style={{ fontWeight: "500" }}>
        <p className={s.first_p}>№</p>
        <p>Имя</p>
        <p>Фамилия</p>
        <p>Номер</p>
        <p>Департамент</p>
        <p>ID</p>
      </div>
      {!applications.error ? (
        !applications.loading ? (
          applications.applicationsInfo.length !== 0 ? (
            applications.applicationsInfo?.results.map((el, index) => (
              <div
                className={s.title + " " + s.subtitle}
                onClick={() => onCardClick(el.id)}
                key={index}
              >
                <p className={s.first_p}>{index+1}</p>
                <p>{el?.student?.first_name}</p>
                <p>{el?.student?.last_name}</p>
                <p>{el?.student?.phone}</p>
                <p>{el?.direction?.name}</p>
                <p>{el?.direction?.id}</p>
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
  
      <ModalForAdditionalInfo
        active={modalActive}
        setActive={setModalActive}
        closeModal={() => setModalActive(false)}
        openChangeModal={() => setModalChangeActive(true)}
        openAddStudentModal={() => setModalAddStudentActive(true)}
        openArchivatedModal={() => setModalArchivatedActive(true)}
      />
      <ModalForChangeProduct
        active={modalChangeActive}
        setActive={setModalChangeActive}
        closeModal={() => setModalChangeActive(false)}
      />
      <FilterModal
        modalActive={modalFilterActive}
        setModalActive={setModalFilterActive}
        closeModal={() => setModalFilterActive(false)}
              />
      <ModalForAddStudent
        active={modalAddStudentActive}
        closeModal={() => setModalAddStudentActive(false)}
        setActive={setModalAddStudentActive}
      />
      <ModalForArchivated
        active={modalArchivatedActive}
        setActive={setModalArchivatedActive}
        closeModal={() => setModalArchivatedActive(false)}
      />
    </>
  );
};

export default WaitingCall;
