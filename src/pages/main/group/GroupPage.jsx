import React, { useState } from "react";
import s from "./styles.module.css";
import { search_icon,three_dot_icon } from "../../../Images";
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
const GroupPage = () => {
    const [modalActive, setModalActive] = useState(false);
    const [modalActionActive, setModalActionActive] = useState(false);
    const [modalChangeGroupActive, setModalChangeGroupActive] = useState(false);
    const [modalAddStudentActive, setModalAddStudentActive] = useState(false);
    const [modalCreateGroupActive, setModalCreateGroupActive] = useState(false);
    const [modalArchivatedActive, setModalArchivatedActive] = useState(false);
    const formik = useFormik({
        validateOnChange: true,
        validateOnMount: false,
        validateOnBlur: false,
        enableReinitialize: true,
        initialValues: {
          group: "",
        },
        onSubmit: (values) => {
          console.log(values);
        },
      });
  return (
    <>
      <div className={s.choiceInput}>
        <InputDropdown
          margin="0 20px"
          valueLabel="Выберите группу"
          options={["Python", "Проектный менеджмент", "UX-UI"]}
          value={formik.values.group}
          onChange={formik.handleChange}
          readOnly
          valueColor="var(--main-color)"
          style={{
            maxWidth: "100%",
            minWidth: "100%",
            color: "var(--main-color)",
            fontWeight: "700",
            border: "2px solid var(--main-color)",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          labelPadding="0 10px"
        />

        <Button text="+Добавить группу" width="200px" onClick={() => setModalCreateGroupActive(true)}/>
        <Button text="+Добавить студента" width="200px" onClick={() => setModalAddStudentActive(true)}/>
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
            />
            <img className={s.search_icon} src={search_icon} alt="wrong" />
          </div>
        </div>

        <div className={s.title} style={{ fontWeight: "500" }}>
          <p className={s.first_p}>№</p>
          <p>Имя</p>
          <p>Фамилия</p>
          <p>Номер</p>
          <p>Департамент</p>
          <p>ID</p>
          <img src={three_dot_icon} alt="" className={s.three_dot} onClick={()=>setModalActionActive(true)}/>
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
          <img src={three_dot_icon} alt="" className={s.three_dot}/>
        </div>
        <div className={s.title + " " + s.subtitle}>
          <p className={s.first_p}>1</p>
          <p>el.name</p>
          <p>el.surname</p>
          <p>number</p>
          <p>department</p>
          <p>id</p>
          <img src={three_dot_icon} alt="" className={s.three_dot}/>
        </div>
        <ActionModal
          active={modalActionActive}
          openChangeModal={() => setModalChangeGroupActive(true)}
          openArchivatedModal={() => setModalArchivatedActive(true)}
          closeModal={() => setModalActionActive(false)}
          setActive={setModalActionActive}
        />
        <ModalForAdditionalInfo
          active={modalActive}
          setActive={setModalActive}
          closeModal={() => setModalActive(false)}
          openChangeModal={() => setModalChangeGroupActive(true)}
          openAddStudentModal={() => setModalAddStudentActive(true)}
          openArchivatedModal={() => setModalArchivatedActive(true)}
        />
        <ModalForChangeGroup
          active={modalChangeGroupActive}
          setActive={setModalChangeGroupActive}
          closeModal={() => setModalChangeGroupActive(false)}
        />
        <ModalForCreateStudentInGroup
          active={modalAddStudentActive}
          closeModal={() => setModalAddStudentActive(false)}
          setActive={setModalAddStudentActive}
        />
        <ModalForCreateGroup active={modalCreateGroupActive}
          closeModal={() => setModalCreateGroupActive(false)}
          setActive={setModalCreateGroupActive}/>
        <ModalForArchivated
          active={modalArchivatedActive}
          setActive={setModalArchivatedActive}
          closeModal={() => setModalArchivatedActive(false)}
        />
      </div>
    </>
  );
}

export default GroupPage