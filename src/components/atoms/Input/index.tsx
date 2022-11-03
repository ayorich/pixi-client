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
}: InputProps): ReactElement => {
  return (
    <input
      name={name}
      value={value}
      placeholder={placeHolder}
      onChange={onChange}
      className={`input ${className || ''}`}
      style={style}
    />
  );
};

export default Input;
