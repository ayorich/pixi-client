import React, { ReactElement } from 'react';

import AccordionTile from '../../molecules/AccordionTile';
import Text from '../../atoms/Text';
import './styles.css';
import { useSketchContext } from '../../../context/Sketches';
import { useAuthContext } from '../../../context/Auth';

const UserAccordion = (): ReactElement => {
  const { user } = useAuthContext();

  const { colloborators } = useSketchContext();

  return (
    <AccordionTile title="USERS">
      <div className="userList">
        {colloborators.map(({ firstName, lastName, color, _id }, i) => (
          <div className="userItems" key={i}>
            <div
              className="userItemColor"
              style={{
                backgroundColor: color,
              }}
            ></div>
            <Text
              type="p"
              text={`${firstName} ${lastName}`}
              className={`${user._id === _id ? 'userItemName' : ''}`}
            />
          </div>
        ))}
      </div>
    </AccordionTile>
  );
};

export default UserAccordion;
