import React, { useEffect, useState } from 'react';
import { Modal } from '../modal/Modal';
import s from './styles.module.css';
import { cross_icon } from '../../Images';
import Button from '../button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getDiractions } from '../../redux/slices/actionSlice';

const FilterModal = ({modalActive, setModalActive, closeModal}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getDiractions())
  },[])
  const directions = useSelector(state=>state.action.directions)
  const handleFilterChange = (e) => {
    console.log(selectedFilters);

    const { name, checked } = e.target;
    const direction = directions.find((dir) => dir.name === name);
    setSelectedFilters((prevFilters) => {
      if (checked) {
        return [...prevFilters, direction.id];
      } else {
        return prevFilters.filter((filterId) => filterId !== direction.id);
      }
    });
  };
  
  const [selectedFilters, setSelectedFilters] = useState([]);
 
  const handleSubmit = () => {
    console.log(selectedFilters);
    setModalActive(false);
  };

  return (
    <Modal
      active={modalActive}
      setActive={setModalActive}
      height="50%"
    >
      <div onClick={closeModal}>
        <img src={cross_icon} alt="" className={s.cross_icon} />
      </div>
      <h2 style={{marginBottom:'22px', color:'#C0C0C0'}}>Фильтрация</h2>
      <div>
        {directions.map((filter) => (
          <div className={s.checkbox_container} key={filter.name}>
            <label className={s.checkbox_label}>
              <input
                type="checkbox"
                name={filter.name}
                checked={selectedFilters[filter.name]}
                onChange={handleFilterChange}
                className={s.checkbox_input}
              />
              <span className={s.checkbox_custom}></span>
              {filter.name}
            </label>
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit} text='Продолжить' margin="70px 0 0 0 "/>
    </Modal>
  );
};

export default FilterModal;