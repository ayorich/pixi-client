import React, { ReactElement, useState } from 'react';

import { AccordionTileProps } from './types';
import caret from '../../../assets/caret.svg';
import Text from '../../atoms/Text';

import './styles.css';

const AccordionTile = ({
  title,
  style,
  className,
  children,
}: AccordionTileProps): ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion ${className || ''}`} style={style}>
      <div className="accordiontile" onClick={() => setOpen((prev) => !prev)}>
        <Text text={title} type="span" />
        <img
          src={caret}
          alt="caret.svg"
          style={{
            width: '20px',
            height: '20px',
          }}
        />
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default AccordionTile;
