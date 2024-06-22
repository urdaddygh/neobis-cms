import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import { search_icon, three_dot_icon } from "../../../Images";
import Input from "../../../components/input/Input";
import ModalForAdditionalInfo from "../../../components/modalForAdditionalInfo/ModalForAdditionalInfo";
import ModalForArchivated from "../../../components/modalForArchivated/ModalForArchivated";
import InputDropdown from "../../../components/InputDropdown/InputDropdown";
import { useFormik } from "formik";
import Button from "../../../components/button/Button";
import ActionModal from "../../../components/actionModal/ActionModal";
import ModalForCreateStudentInGroup from "../../../components/modalForCreateStudentInGroup/ModalForCreateStudentInGroup";
import ModalForCreateGroup from "../../../components/modalForCreateGroup/ModalForCreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentById, getGroups, getStudentById, getStudents, getStudentsBySearch } from "../../../redux/slices/groupsSlice";
import ModalForChangeStudent from "../../../components/modalForChangeStudent/ModalForChangeStudent";
import { archiveApplicationById } from "../../../redux/slices/applicationSlice";
import { toast } from "react-toastify";
const GroupPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalActionActive, setModalActionActive] = useState(false);
  const [modalChangeGroupActive, setModalChangeGroupActive] = useState(false);
  const [modalAddStudentActive, setModalAddStudentActive] = useState(false);
  const [modalCreateGroupActive, setModalCreateGroupActive] = useState(false);
  const [modalArchivatedActive, setModalArchivatedActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups());
    dispatch(getStudents());
  }, []);
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
  const groupsInfo = useSelector((state) => state.groups);
  // console.log(groupsInfo);
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    if (groupsInfo?.groupsInfo) {
      setGroups(groupsInfo.groupsInfo.map((el) => el.name));
    }
  }, [groupsInfo?.groupsInfo]);
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
  const archiveApplication = (id)=>{
    let data={id, updateHomePage, showErrorMessage, showSuccessMessage, closeCard}
    dispatch(archiveApplicationById(data))
  }
  const handleInputChange = (e) => {
    formik.handleChange(e);
    if (e.target.value === "") {
      dispatch(getStudents());
    }
  };
  const formik = useFormik({
    validateOnChange: true,
    validateOnMount: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues: {
      q: "",
      groups:""
    },
    onSubmit: (values) => {
      console.log(values);
      let data = {q:values.q}
      dispatch(getStudentsBySearch(data))
    },
  });
  return (
    <>
      <div className={s.choiceInput}>
        <InputDropdown
          margin="0 20px"
          valueLabel="Выберите группу"
          onChange={(value) => {formik.setFieldValue("groups", value)}}
          options={groups}
          readOnly
          value={formik.values.groups}
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

        <Button
          text="+ Добавить группу"
          width="200px"
          onClick={() => setModalCreateGroupActive(true)}
        />
        <Button
          text="+ Добавить студента"
          width="200px"
          onClick={() => setModalAddStudentActive(true)}
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
                value={formik.values.q}
                name="q"
                onChange={handleInputChange}
              />
            <img className={s.search_icon} src={search_icon} alt="wrong" onClick={formik.handleSubmit} />
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
            onClick={() => setModalActionActive(true)}
          />
        </div>

        {!groupsInfo.error ? (
          !groupsInfo.loading ? (
            groupsInfo.studentsInfo?.results?.length !== 0 ? (
              groupsInfo.studentsInfo?.results?.map((el, index) => (
                <div
                  className={s.title + " " + s.subtitle}
                  onClick={() => onCardClick(el.id)}
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
          onChangeClick={() => setModalChangeGroupActive(true)}
          openArchivatedModal={() => setModalArchivatedActive(true)}
          closeModal={() => setModalActionActive(false)}
          setActive={setModalActionActive}
          onDeleteClick={() => deleteStudent(groupsInfo.studentsInfoById.id)}
          onArchiveClick={()=>archiveApplication(groupsInfo.studentsInfoById.id)}
        />
        <ModalForAdditionalInfo
          active={modalActive}
          setActive={setModalActive}
          closeModal={() => setModalActive(false)}
          openChangeModal={() => setModalChangeGroupActive(true)}
          openAddStudentModal={() => setModalAddStudentActive(true)}
          openArchivatedModal={() => setModalArchivatedActive(true)}
        />
        {/* <ModalForChangeGroup
          active={modalChangeGroupActive}
          setActive={setModalChangeGroupActive}
          closeModal={() => setModalChangeGroupActive(false)}
        /> */}
        <ModalForChangeStudent
          active={modalChangeGroupActive}
          setActive={setModalChangeGroupActive}
          closeModal={() => setModalChangeGroupActive(false)}
        />
        <ModalForCreateStudentInGroup
          active={modalAddStudentActive}
          closeModal={() => setModalAddStudentActive(false)}
          setActive={setModalAddStudentActive}
        />
        <ModalForCreateGroup
          active={modalCreateGroupActive}
          closeModal={() => setModalCreateGroupActive(false)}
          setActive={setModalCreateGroupActive}
        />
        <ModalForArchivated
          active={modalArchivatedActive}
          setActive={setModalArchivatedActive}
          closeModal={() => setModalArchivatedActive(false)}
        />
      </div>
    </>
  );
};

export default GroupPage;
