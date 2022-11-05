import { ReactElement, ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuthContext } from '../context/Auth';
import { DASHBOARD, LOGIN } from '../utils/routes';

export type GuardProps = {
  component: ReactElement;
};

export function PublicRoute({ component }: GuardProps) {
  const { authenticated } = useAuthContext();
  const Component = component;
  return (
    <>{authenticated === true ? <Navigate to={DASHBOARD} /> : Component}</>
  );
}

export default function PrivateRoute({ component }: GuardProps) {
  const { authenticated } = useAuthContext();
  const Component = component;

  return <>{authenticated === true ? Component : <Navigate to={LOGIN} />}</>;
}
