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
import { useLocation } from "react-router-dom";
import { addToStudentById, archiveApplicationById, deleteApplicationById, getApplicationById, getApplicationBySearch, getApplicationByStatus, getApplicationForPagination, putApplicationById } from "../../../redux/slices/applicationSlice";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Pagination } from "../../../components/pagination/Pagination";

const TrialLesson = () => {
  const dispatch = useDispatch();
  const location = useLocation()
    const [modalActive, setModalActive] = useState(false);
    const [modalFilterActive, setModalFilterActive] = useState(false);
    const [modalChangeActive, setModalChangeActive] = useState(false);
    const [modalAddStudentActive, setModalAddStudentActive] = useState(false);
    const [modalArchivatedActive, setModalArchivatedActive] = useState(false);
    const onCardClick=(id)=>{
      setModalActive(true)
      dispatch(getApplicationById(id))
    }
    const closeCard=()=>{
      setModalActive(false)
    }
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
    useEffect(()=>{
      dispatch(getApplicationByStatus("2"))
    },[])
    const applications=useSelector(state=>state.applications);
    const updateHomePage=()=>{
      const currentParentPath = location.pathname.split("/")[3];
      if(currentParentPath==='waiting'){
        return dispatch(getApplicationByStatus("1"))
      }
      if(currentParentPath==='trial'){
        return dispatch(getApplicationByStatus("2"))
      }
      if(currentParentPath==='attended'){
        return dispatch(getApplicationByStatus("3"))
      }
    }
    const deleteApplication = (id)=>{
      let data={id, updateHomePage, closeCard}
      dispatch(deleteApplicationById(data))
    }
    const signUpTrialLesson = (id)=>{
      let data={id, updateHomePage, formData:{status:2}, showErrorMessage, showSuccessMessage, closeCard}
      dispatch(putApplicationById(data))
    }
    const attendedTrialLesson = (id)=>{
      let data={id, updateHomePage, formData:{status:3}, showErrorMessage, showSuccessMessage, closeCard}
      dispatch(putApplicationById(data))
    }
    const archiveApplication = (id)=>{
      let data={id, updateHomePage, showErrorMessage, showSuccessMessage, closeCard}
      dispatch(archiveApplicationById(data))
    }
    const addToStudentClick = (id)=>{
      let data={id, updateHomePage, showErrorMessage, showSuccessMessage, closeCard}
      dispatch(addToStudentById(data))
    }
    const handleInputChange = (e) => {
      formik.handleChange(e);
      if (e.target.value === "") {
        dispatch(getApplicationByStatus("2"));
      }
    };
    const addToUnsuccessfulDeal=(id)=>{
      let data = {id, formData:{status:4}, showErrorMessage, showSuccessMessage}
      dispatch(putApplicationById(data))
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
        dispatch(getApplicationBySearch(data))
      },
    });
  return (
    <>
      <div className={s.search_cont}>
        <div className={s.search}>
          <Input
            valueLabel="Поиск"
            value={formik.values.q}
            onChange={handleInputChange}
            minWidth="100%"
            name="q"
            maxWidth="100%"
            valueColor="white"
            inputColor="white"
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
                <p className={s.first_p}>{index + 1}</p>
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
       <div className="cont_pagination">
        <Pagination
          count={applications.applicationsInfo?.count}
          next={applications.applicationsInfo?.next}
          previous={applications.applicationsInfo?.previous}
          page={applications.applicationsInfo?.page}
          take={getApplicationForPagination}
        />
      </div>
       <ModalForAdditionalInfo
        active={modalActive}
        setActive={setModalActive}
        closeModal={closeCard}
        openChangeModal={() => setModalChangeActive(true)}
        addToStudent={()=>addToStudentClick(applications.applicationByIdInfo.id)}
        deleteApplication={() =>
          deleteApplication(applications.applicationByIdInfo.id)
        }
        signUpTrialLesson={()=>signUpTrialLesson(applications.applicationByIdInfo.id)}
        attendedTrialLesson={()=>attendedTrialLesson(applications.applicationByIdInfo.id)}
        unsuccessfulDealsClick={()=>addToUnsuccessfulDeal(applications.applicationByIdInfo.id)}
      />
      <ModalForChangeProduct
        active={modalChangeActive}
        setActive={setModalChangeActive}
        closeModal={() => setModalChangeActive(false)}
        deleteProductById={()=>deleteApplication(applications.applicationByIdInfo.id)}
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
}

export default TrialLesson