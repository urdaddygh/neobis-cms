import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/input/Input";
import s from './styles.module.css'
import { useFormik } from "formik";
import { search_icon, three_dot_icon } from "../../../Images";
import ActionModal from "../../../components/actionModal/ActionModal";
import ActionModalForArchivePage from "../../../components/actionModalForArchivePage/ActionModalForArchivePage";
const ClientsArchive = () => {
  const [modalActionActive, setModalActionActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  // const groupsInfo = useSelector((state) => state.groups);

  const onCardClick = (id) => {
    // dispatch(getStudentById(id))
    setModalActionActive(true);
  };
  const closeCard = () => {
    setModalActionActive(false);
  };
  const updateHomePage = () => {
    // dispatch(getStudents())
  };
  const deleteStudent = (id) => {
    let data = { id, updateHomePage, closeCard };
    // dispatch(deleteStudentById(data));
  };

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
        <p>Департамент</p>
        <p>ID</p>
      </div>
      <div
        className={s.title + " " + s.subtitle}
        onClick={() => onCardClick()}
        // key={index}
      >
        <p className={s.first_p}>{'index + 1'}</p>
        <p>{'el?.student?.first_name'}</p>
        <p>{'el?.student?.last_name'}</p>
        <p>{'el?.student?.phone'}</p>
        <p>{'el?.student?.email'}</p>
        <p>{'el?.student?.email'}</p>
      </div>
      {/* {!groupsInfo.error ? (
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
        )} */}

      <ActionModalForArchivePage
        active={modalActionActive}
        // onChangeClick={() => setModalChangeGroupActive(true)}
        closeModal={() => setModalActionActive(false)}
        // onUnarchivatedClick={}
        setActive={setModalActionActive}
        // onDeleteClick={() => deleteStudent(groupsInfo.studentsInfoById.id)}
      />
    </>
  );
}

export default ClientsArchive