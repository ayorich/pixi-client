import React, { ReactElement } from 'react';

import { ButtonProps } from './types';
import './styles.css';

const Button = ({ text, style, className }: ButtonProps): ReactElement => {
  return (
    <button className={`button ${className || ''}`} style={style}>
      {text}
    </button>
  );
};

export default Button;
