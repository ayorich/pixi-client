import React, { ReactElement } from 'react';

import AccordionTile from '../../molecules/AccordionTile';
import Text from '../../atoms/Text';
import './styles.css';

const UserAccordion = (): ReactElement => {
  return (
    <AccordionTile title="USERS">
      <div className="userList">
        <div className="userItems">
          <div
            className="userItemColor"
            style={{
              backgroundColor: 'red',
            }}
          ></div>
          <Text type="p" text={'Collaborator 1'} />
        </div>
        <div className="userItems">
          <div
            className="userItemColor"
            style={{
              backgroundColor: 'red',
            }}
          ></div>
          <Text type="p" text={'Collaborator 1'} />
        </div>
        <div className="userItems">
          <div
            className="userItemColor"
            style={{
              backgroundColor: 'red',
            }}
          ></div>
          <Text type="p" text={'Collaborator 1'} />
        </div>
      </div>
    </AccordionTile>
  );
};

export default UserAccordion;
