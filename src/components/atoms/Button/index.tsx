import React, { ReactElement } from 'react';

import { ButtonProps } from './types';
import './styles.css';

const Button = ({
  text,
  style,
  className,
  type = 'button',
  loading,
}: ButtonProps): ReactElement => {
  return (
    <button
      className={`button ${className || ''}`}
      style={style}
      type={type}
      disabled={loading}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
};

export default Button;
