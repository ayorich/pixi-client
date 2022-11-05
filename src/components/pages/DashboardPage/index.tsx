import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import logo from '../../../assets/logo.svg';
import avatar from '../../../assets/avatar.png';
import Canvas from '../../organisms/Canvas';
import './styles.css';
import SketchesAccordion from '../../organisms/SketchesAccordion';
import UserAccordion from '../../organisms/UserAccordion';
import { useAuthContext } from '../../../context/Auth';
import SketchProvider from '../../../context/Sketches';

export default function DashboardPage(): ReactElement {
  const { user } = useAuthContext();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <img src={logo} alt="logo" className="dashboard-logo" />
        <div className="dashboard-profile">
          <Text type="span" text={`${user.firstName} ${user.lastName}`} />
          <img src={avatar} alt="avatar" className="dashboard-profile-img" />
        </div>
      </div>

      <SketchProvider>
        <div className="dashboard-content">
          <Canvas />
          <div className="dashboard-accordion">
            <SketchesAccordion />
            <UserAccordion />
          </div>
        </div>
      </SketchProvider>
    </div>
  );
}
