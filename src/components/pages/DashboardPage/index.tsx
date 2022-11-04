import React, { ReactElement } from 'react';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import logo from '../../../assets/logo.svg';
import avatar from '../../../assets/avatar.png';
import './styles.css';

export default function DashboardPage(): ReactElement {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <img src={logo} alt="logo" className="dashboard-logo" />
        <div className="dashboard-profile">
          <Text type="span" text="John Doe" />
          <img src={avatar} alt="avatar" className="dashboard-profile-img" />
        </div>
      </div>
    </div>
  );
}
