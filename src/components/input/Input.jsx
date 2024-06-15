import React from "react";
import s from "./styles.module.css";

const Input = ({
  placeholder,
  value,
  valueLabel,
  onChange,
  name,
  type,
  forLabel,
  padding,
  id,
  margin,
  inputColor,
  accept,
  readOnly,
  minWidth,
  maxWidth,
  valueColor,
  borderColor,
  onClick
}) => {
  return (
    <div className={s.form_row} style={{margin:margin}}  >
      <input
        style={{ padding: padding, borderColor:borderColor, color:inputColor, minWidth: minWidth, maxWidth:maxWidth}}
        className={s.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        id={id}
        required autoComplete="off"
        accept={accept}
        readOnly={readOnly}
       
      />
      <label className={s.label} htmlFor={forLabel} style={{color:valueColor}} onClick={onClick}>
        {valueLabel}
      </label>
    </div>
  );
};

export default Input;
