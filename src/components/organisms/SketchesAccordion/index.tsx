import React, { ReactElement } from 'react';

import AccordionTile from '../../molecules/AccordionTile';
import Text from '../../atoms/Text';
import plus from '../../../assets/plus.svg';
import './styles.css';

const SketchesAccordion = (): ReactElement => {
  return (
    <AccordionTile title="SKETCHES">
      <div className="sketchesList">
        <Text type="p" text={'Sketch 1'} />
        <Text type="p" text={'Sketch 1'} />
        <Text type="p" text={'Sketch 1'} />

        <div className="addSketch">
          <img src={plus} alt="plus" />
          <Text type="span" text="Add new sketch" />
        </div>
      </div>
    </AccordionTile>
  );
};

export default SketchesAccordion;
