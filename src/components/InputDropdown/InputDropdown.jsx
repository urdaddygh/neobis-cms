import React, { useEffect, useState } from 'react';
import s from './styles.module.css';

const InputDropdown = ({
  options = [],
  valueLabel,
  forLabel,
  valueColor,
  onChange,
  value,
  name,
  readOnly,
  margin
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsOpen(true);
    onChange(value);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className={s.dropdown_container} style={{margin:margin}}>
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        className={s.dropdown_input} 
        readOnly={readOnly}
      />
      <label
        className={inputValue===''?s.label:s.label_active}
        htmlFor={forLabel}
        style={{ color: valueColor }}
      >
        {valueLabel}
      </label>
      {isOpen && (
        <div className={s.dropdown_menu}>
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className={s.dropdown_item}
              onMouseDown={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputDropdown;