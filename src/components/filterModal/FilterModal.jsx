import React, { useState } from 'react';
import { Modal } from '../modal/Modal';
import s from './styles.module.css';
import { cross_icon } from '../../Images';
import Button from '../button/Button';

const FilterModal = ({modalActive, setModalActive, closeModal}) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Python: false,
    'UX|UI': false,
    IOS: false,
    JavaScript: false,
    QA: false,
    'Проектный менеджмент': false
  });

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFilters({
      ...selectedFilters,
      [name]: checked
    });
  };

  const handleSubmit = () => {
    console.log(selectedFilters);
    setModalActive(false);
  };

  return (
    <Modal
      active={modalActive}
      setActive={setModalActive}
      height="400px"
    >
      <div onClick={closeModal}>
        <img src={cross_icon} alt="" className={s.cross_icon} />
      </div>
      <h2 style={{marginBottom:'22px', color:'#C0C0C0'}}>Фильтрация</h2>
      <div>
        {Object.keys(selectedFilters).map((filter) => (
          <div className={s.checkbox_container} key={filter}>
            <label className={s.checkbox_label}>
              <input
                type="checkbox"
                name={filter}
                checked={selectedFilters[filter]}
                onChange={handleFilterChange}
                className={s.checkbox_input}
              />
              <span className={s.checkbox_custom}></span>
              {filter}
            </label>
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit} text='Продолжить'/>
    </Modal>
  );
};

export default FilterModal;