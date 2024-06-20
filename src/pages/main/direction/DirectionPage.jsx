import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import { search_icon, three_dot_icon } from "../../../Images";
import Input from "../../../components/input/Input";
import ModalForAdditionalInfo from "../../../components/modalForAdditionalInfo/ModalForAdditionalInfo";
import ModalForChangeProduct from "../../../components/modalForChangeProduct/ModalForChangeProduct";
import FilterModal from "../../../components/filterModal/FilterModal";
import ModalForAddStudent from "../../../components/modalForAddStudent/ModalForAddStudent";
import ModalForArchivated from "../../../components/modalForArchivated/ModalForArchivated";
import InputDropdown from "../../../components/InputDropdown/InputDropdown";
import { useFormik } from "formik";
import Button from "../../../components/button/Button";
import ActionModal from "../../../components/actionModal/ActionModal";
import ModalForChangeGroup from "../../../components/modalForChangeGroup/ModalForChangeGroup";
import ModalForCreateStudentInGroup from "../../../components/modalForCreateStudentInGroup/ModalForCreateStudentInGroup";
import ModalForCreateGroup from "../../../components/modalForCreateGroup/ModalForCreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentById, getGroups, getStudentById, getStudents } from "../../../redux/slices/groupsSlice";
import ModalForChangeStudent from "../../../components/modalForChangeStudent/ModalForChangeStudent";
import ModalForDirectionAdd from "../../../components/modalForDirectionAdd/ModalForDirectionAdd";
import { getDiractions } from "../../../redux/slices/actionSlice";
const DirectionPage = () => {
  const [modalActionActive, setModalActionActive] = useState(false);
  const [modalAddDirectionActive, setModalAddDirectionActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiractions());
  }, []);
  const action = useSelector((state) => state.action);
  console.log(action);

  const updateHomePage = () => {
    dispatch(getStudents())
  };
  const onCardClick = (id)=>{
    dispatch(getStudentById(id))
    setModalActionActive(true)
  }
  const closeCard = () => {
    setModalActionActive(false);
  };
  const deleteStudent = (id) => {
    let data = { id, updateHomePage, closeCard };
    dispatch(deleteStudentById(data));
  };
  
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
    },
  });
  return (
    <>
      <div className={s.choiceInput}>
        <Button
          text="+ Добавить департамент"
          width="230px"
          onClick={() => setModalAddDirectionActive(true)}
        />
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
        </div>

        <div className={s.title} style={{ fontWeight: "500" }}>
          <p className={s.first_p}>№</p>
          <p>Название</p>
          <p>Цвет</p>
          <p>ID</p>
          <img
            src={three_dot_icon}
            alt=""
            className={s.three_dot}
            onClick={() => setModalActionActive(true)}
          />
        </div>

        {!action.error ? (
      !action.loading ? (
        action.directions?.length !== 0 ? (
          action.directions.map((el, index) => (
            <div
              className={s.title + " " + s.subtitle}
              onClick={() => onCardClick(el.id)}
              key={index}
            >
              <p className={s.first_p}>{index + 1}</p>
              <p>{el?.name}</p>
              <p>
              <div style={{backgroundColor:el?.color, borderRadius:"100%", width:"24px", height:"24px"}}></div>
              </p>
              <p>{el?.id}</p>
              <img
                src={three_dot_icon}
                alt=""
                className={s.three_dot}
                onClick={() => onCardClick(el.id)}
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
          // openChangeModal={() => setModalChangeEmployeeActive(true)}
          // openArchivatedModal={() => setModalArchivatedActive(true)}
          closeModal={() => setModalActionActive(false)}
          setActive={setModalActionActive}
        />
        <ModalForDirectionAdd
          active={modalAddDirectionActive}
          closeModal={() => setModalAddDirectionActive(false)}
          setActive={setModalAddDirectionActive}
        />
      </div>
    </>
  );
}

export default DirectionPage
