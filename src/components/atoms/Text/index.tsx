import React, { ReactElement } from 'react';

import { TextProps } from './types';
import './styles.css';

const Text = ({
  text,
  style,
  className,
  type = 'p',
  color,
}: TextProps): ReactElement => {
  return (
    <>
      {type === 'p' ? (
        <p
          className={`textWrapper paragraph ${className || ''}`}
          style={{ ...style, color: color }}
        >
          {text}
        </p>
      ) : type === 'title' ? (
        <h1
          className={`textWrapper title ${className || ''}`}
          style={{ ...style, color: color }}
        >
          {text}
        </h1>
      ) : (
        <span
          className={`textWrapper ${className || ''}`}
          style={{ ...style, color: color }}
        >
          {text}
        </span>
      )}
    </>
  );
};

export default Text;
