import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import {three_dot_icon } from "../../../Images";
import Button from "../../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import ModalForDirectionAdd from "../../../components/modalForDirectionAdd/ModalForDirectionAdd";
import { deleteDirectionById, getDiractions, getDirectionById } from "../../../redux/slices/actionSlice";
import ModalForChangeDirection from "../../../components/modalForChangeDirection/ModalForChangeDirection";
import { archiveApplicationById } from "../../../redux/slices/applicationSlice";
import { toast } from "react-toastify";
import ActionModalForDirection from "../../../components/actionModalForDirection/ActionModalForDirection";
const DirectionPage = () => {
  const [modalActionActive, setModalActionActive] = useState(false);
  const [modalAddDirectionActive, setModalAddDirectionActive] = useState(false);
  const [modalChangeDirectionActive, setModalChangeDirectionActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiractions());
  }, []);

  const updateHomePage = () => {
    dispatch(getDiractions())
  };
  const onCardClick = (id)=>{
    dispatch(getDirectionById(id))
    setModalActionActive(true)
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
  const closeCard = () => {
    setModalActionActive(false);
  };
  const deleteDirection = (id) => {
    let data = { id, updateHomePage, closeCard };
    console.log(data)
    dispatch(deleteDirectionById(data));
  };
  const action = useSelector((state) => state.action);
  // console.log(action);
  const archiveApplication = (id)=>{
    let data={id, updateHomePage, showErrorMessage, showSuccessMessage, closeCard}
    dispatch(archiveApplicationById(data))
  }
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
        {/* <div className={s.search_cont}>
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
        </div> */}

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
            style={{visibility:"hidden"}}
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
        <ActionModalForDirection
          active={modalActionActive}
          closeModal={() => setModalActionActive(false)}
          setActive={setModalActionActive}
          onChangeClick={() => setModalChangeDirectionActive(true)}
          onDeleteClick={()=>deleteDirection(action.directionById.id)}
        />
        <ModalForDirectionAdd
          active={modalAddDirectionActive}
          closeModal={() => setModalAddDirectionActive(false)}
          setActive={setModalAddDirectionActive}
        />
        <ModalForChangeDirection
          active={modalChangeDirectionActive}
          closeModal={() => setModalChangeDirectionActive(false)}
          setActive={setModalChangeDirectionActive}
        />
      </div>
    </>
  );
}

export default DirectionPage
