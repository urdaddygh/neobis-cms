import React from 'react'
import s from './styles.module.css'
import { Modal } from '../modal/Modal'
import { archive_icon, cross_icon, pen_icon, trash_icon } from '../../Images'
import { ToastContainer } from 'react-toastify';
const ModalForAdditionalInfo = ({
  active,
  setActive,
  closeModal,
  openChangeModal,
  addToStudent,
  deleteApplication,
  signUpTrialLesson,
  attendedTrialLesson,
  unsuccessfulDealsClick
}) => {
  return (
    <Modal active={active} setActive={setActive} height="65%" width="330px">
      <div className={s.cross_icon}>
        <img src={cross_icon} alt="" onClick={closeModal} />
      </div>
      <div className={s.box_cont}>
        <div className={s.box_btn} onClick={openChangeModal}>
          <img src={pen_icon} alt="Изменить" />
          <p>Изменить</p>
        </div>
        <div className={s.box_btn} onClick={deleteApplication}>
          <img src={trash_icon} alt="Удалить" />
          <p>Удалить</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{margin:"0 auto"}}>
          <h3>Переместить в:</h3>
          <p className={s.text_btn} onClick={signUpTrialLesson}>
            Записан на пробный урок
          </p>
          <p className={s.text_btn} onClick={attendedTrialLesson}>
            Посетил пробный урок 
          </p>
          <p className={s.text_btn} onClick={addToStudent}>
            Студенты
          </p>
          <p className={s.text_btn} onClick={unsuccessfulDealsClick}>
            Неуспешные сделки
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalForAdditionalInfo