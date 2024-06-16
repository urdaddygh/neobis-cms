import React, { useState } from "react";
import s from "./styles.module.css";
import { filter_icon, search_icon } from "../../../Images";
import Input from "../../../components/input/Input";
import ModalForAdditionalInfo from "../../../components/modalForAdditionalInfo/ModalForAdditionalInfo";
import ModalForChangeProduct from "../../../components/modalForChangeProduct/ModalForChangeProduct";
import FilterModal from "../../../components/filterModal/FilterModal";
import ModalForAddStudent from "../../../components/modalForAddStudent/ModalForAddStudent";
import ModalForArchivated from "../../../components/modalForArchivated/ModalForArchivated";
const WaitingCall = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalFilterActive, setModalFilterActive] = useState(false);
  const [modalChangeActive, setModalChangeActive] = useState(false);
  const [modalAddStudentActive, setModalAddStudentActive] = useState(false);
  const [modalArchivatedActive, setModalArchivatedActive] = useState(false);

  return (
    <>
      <div className={s.search_cont}>
        <div className={s.search}>
          <Input
            valueLabel="Поиск"
            minWidth="100%"
            maxWidth="100%"
            valueColor="white"
            inputColor="white"
          />
          <img className={s.search_icon} src={search_icon} alt="wrong" />
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
      <div
        className={s.title + " " + s.subtitle}
        onClick={() => setModalActive(true)}
      >
        <p className={s.first_p}>1</p>
        <p>el.name</p>
        <p>el.surname</p>
        <p>number</p>
        <p>department</p>
        <p>id</p>
      </div>
      <div className={s.title + " " + s.subtitle}>
        <p className={s.first_p}>1</p>
        <p>el.name</p>
        <p>el.surname</p>
        <p>number</p>
        <p>department</p>
        <p>id</p>
      </div>
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
        closeModal={()=>setModalAddStudentActive(false)}
        setActive={setModalAddStudentActive}
      />
      <ModalForArchivated active={modalArchivatedActive} setActive={setModalArchivatedActive} closeModal={()=>setModalArchivatedActive(false)}/>
    </>
  );
};

export default WaitingCall;
