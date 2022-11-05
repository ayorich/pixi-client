import React, { ReactElement } from 'react';

import { ButtonProps } from './types';
import './styles.css';

const Button = ({
  text,
  style,
  className,
  type = 'button',
  loading,
  onClick,
}: ButtonProps): ReactElement => {
  return (
    <button
      className={`button ${className || ''}`}
      style={style}
      type={type}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? 'Loading...' : text}
    </button>
  );
};

export default Button;
