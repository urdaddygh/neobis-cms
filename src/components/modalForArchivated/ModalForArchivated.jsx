import React, { useState } from 'react'
import { Modal } from '../modal/Modal';
import s from './styles.module.css'
import { cross_icon, vector_icon } from '../../Images';
import Input from '../input/Input';
import Button from '../button/Button';
import BackToPrevBtn from '../backToPrevBtn/BackToPrevBtn';
const ModalForArchivated = ({ active, setActive, closeModal }) => {
  const [state, setState] = useState(false);
  const toggle=()=>{
    setState(!state);
  }
  return (
    <Modal active={active} setActive={setActive} height="90%" width="360px">
      <div onClick={closeModal}>
       { state && <BackToPrevBtn onClick={toggle} left="20px" top="16px"/>}
        <p className={s.up_p}>Причина архивации</p>
        <img src={cross_icon} alt="" className={s.cross_icon} />
      </div>
      {!state ? (
        <>
          <div className={s.flex_cont}>
            <p className={s.text_btn}>Время и дата не подходит</p>
            <img src={vector_icon} alt="" />
          </div>
          <div className={s.flex_cont}>
            <p className={s.text_btn}>Нехватка денежных средств</p>
            <img src={vector_icon} alt="" />
          </div>
          <div className={s.flex_cont}>
            <p className={s.text_btn}>Дринтересыугие</p>
            <img src={vector_icon} alt="" />
          </div>
          <div className={s.flex_cont}>
            <p className={s.text_btn}>Отсутствие ноутбука</p>
            <img src={vector_icon} alt="" />
          </div>
          <div className={s.flex_cont} onClick={toggle}>
            <p className={s.text_btn}>Другое</p>
            <img src={vector_icon} alt="" />
          </div>
        </>
      ) : (
        <>
          <Input valueLabel="Впишите свой вариант" margin="200px 0 20px 0"/>
          <Button text="Отправить" />
        </>
      )}
    </Modal>
  );
}

export default ModalForArchivated