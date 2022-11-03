import React, { ReactElement } from 'react';

import { ButtonProps } from './types';
import './styles.css';

const Button = ({
  text,
  style,
  className,
  type = 'button',
}: ButtonProps): ReactElement => {
  return (
    <button className={`button ${className || ''}`} style={style} type={type}>
      {text}
    </button>
  );
};

export default Button;
