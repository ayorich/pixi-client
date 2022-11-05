import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardPage from './components/pages/DashboardPage';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';

import './App.css';
import { DASHBOARD, LOGIN, SIGNUP } from './utils/routes';
import NotFoundPage from './components/pages/NotFoundPage';
import AuthProvider from './context/Auth';
import PrivateRoute, { PublicRoute } from './hooks/AuthGuard';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route index element={<PublicRoute component={<SignInPage />} />} />
            <Route
              path={LOGIN}
              element={<PublicRoute component={<SignInPage />} />}
            />
            <Route
              path={SIGNUP}
              element={<PublicRoute component={<SignUpPage />} />}
            />
            <Route
              path={DASHBOARD}
              element={<PrivateRoute component={<DashboardPage />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
