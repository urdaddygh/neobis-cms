import React, { useEffect, useState } from "react";
import s from "../styles.module.css";
import { cross_icon } from "../../../../Images";
import { useDispatch } from "react-redux";
import { getMeneger, getTeachers } from "../../../../redux/slices/employeeSlice";
const FilterRadio = ({ toggleFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const filters = ["Преподаватели", "Офис-менеджера"];
  const dispatch = useDispatch()
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };
  useEffect(() => {
    if(selectedFilter==="Преподаватели"){
       dispatch(getTeachers())
    }
    else if(selectedFilter==="Офис-менеджера"){
      dispatch(getMeneger())
    }
  }, [selectedFilter]);
  return (
    <div className={s.subwindow}>
      <div className={s.header_cont}>
        <h2>Фильтрация</h2>
        <img src={cross_icon} alt="" onClick={toggleFilter} />
      </div>
      <div>
        {filters.map((filter) => (
          <div className={s.radio_container} key={filter}>
            <label className={s.radio_label}>
              <input
                type="radio"
                name="filter"
                value={filter}
                checked={selectedFilter === filter}
                onChange={handleFilterChange}
                className={s.radio_input}
              />
              <span className={s.radio_custom}></span>
              {filter}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterRadio;
