import React, { ReactElement } from 'react';

import AccordionTile from '../../molecules/AccordionTile';
import Text from '../../atoms/Text';
import './styles.css';
import { useSketchContext } from '../../../context/Sketches';

const UserAccordion = (): ReactElement => {
  const { colloborators } = useSketchContext();

  return (
    <AccordionTile title="USERS">
      <div className="userList">
        {colloborators.map(({ firstName, lastName, color }, i) => (
          <div className="userItems" key={i}>
            <div
              className="userItemColor"
              style={{
                backgroundColor: color,
              }}
            ></div>
            <Text type="p" text={`${firstName} ${lastName}`} />
          </div>
        ))}
      </div>
    </AccordionTile>
  );
};

export default UserAccordion;
