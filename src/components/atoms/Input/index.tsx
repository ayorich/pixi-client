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
  isError,
}: InputProps): ReactElement => {
  return (
    <input
      name={name}
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
      className={`input ${className || ''}`}
      style={{ ...style, border: `1px solid ${isError ? 'red' : '#9f9f9f'}` }}
      type={type}
    />
  );
};

export default Input;
