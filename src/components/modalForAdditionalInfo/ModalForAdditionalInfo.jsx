import React from 'react'
import s from './styles.module.css'
import { Modal } from '../modal/Modal'
import { archive_icon, cross_icon, pen_icon, trash_icon } from '../../Images'
const ModalForAdditionalInfo = ({ active, setActive, closeModal, openChangeModal, openAddStudentModal, openArchivatedModal }) => {
  return (
    <Modal active={active} setActive={setActive} height="65%">
    <div className={s.cross_icon} onClick={closeModal}>
      <img src={cross_icon} alt="" />
    </div>
   <div className={s.box_cont}>
    <div className={s.box_btn} onClick={openChangeModal}>
        <img src={pen_icon} alt="Изменит" />
        <p>Изменить</p>
    </div>
    <div className={s.box_btn}>
        <img src={trash_icon} alt="Удалить" />
        <p>Удалить</p>
    </div>
    <div className={s.box_btn} onClick={openArchivatedModal}>
        <img src={archive_icon} alt="В архив" />
        <p>В архив</p>
    </div>
   </div>

   <h3>Переместить в:</h3>
   <p className={s.text_btn}>Записан на пробный урок</p>
   <p className={s.text_btn}>Посетил пробный урок </p>
   <p className={s.text_btn} onClick={openAddStudentModal}>Студенты</p>
   <p className={s.text_btn}>Неуспешные сделки</p>
  </Modal>
  )
}

export default ModalForAdditionalInfo