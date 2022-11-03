import React, { ReactElement } from 'react';

import { InputProps } from './types';
import './styles.css';

const Input = ({
  name,
  value,
  onChange,
  style,
  className,
  placeHolder,
  type,
}: InputProps): ReactElement => {
  return (
    <input
      name={name}
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
      className={`input ${className || ''}`}
      style={style}
      type={type}
    />
  );
};

export default Input;
