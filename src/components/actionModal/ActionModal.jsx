import React from 'react'
import s from './styles.module.css'
import { Modal } from '../modal/Modal'
import { archive_icon, cross_icon, pen_icon, trash_icon } from '../../Images'
const ActionModal = ({ active, setActive, closeModal, openChangeModal, openArchivatedModal }) => {
    return (
      <Modal active={active} setActive={setActive} height="275px">
        <div className={s.cross_icon} onClick={closeModal}>
          <img src={cross_icon} alt="" />
        </div>
        <p className={s.up_p}>Действие</p>
        <div className={s.box_cont}>
          <div className={s.box_btn} onClick={openChangeModal}>
            <img src={pen_icon} alt="Изменить" />
            <p>Изменить</p>
          </div>
          <div className={s.box_btn} onClick={openArchivatedModal}>
            <img src={archive_icon} alt="В архив" />
            <p>В архив</p>
          </div>
          <div className={s.box_btn}>
            <img src={trash_icon} alt="Удалить" />
            <p>Удалить</p>
          </div>
        </div>
      </Modal>
    );
}

export default ActionModal