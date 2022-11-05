import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/Auth';
import { DASHBOARD, LOGIN } from '../../../utils/routes';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { authenticated } = useAuthContext();

  useEffect(() => {
    navigate(authenticated ? DASHBOARD : LOGIN);
  }, []);

  return <></>;
}
