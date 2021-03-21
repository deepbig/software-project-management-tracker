import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
// import DashboardPage from './pages/DashboardPage';
import ActivityPage from './pages/ActivityPage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      // { path: '/dashboard', element: <DashboardPage /> },
      { path: '/activity', element: <ActivityPage /> },
      // { path: '/result', element: <ResultPage /> },
      // { path: '/tasks/:task_id/:task_name', element: <MetricsPage /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // { path: 'login', element: <LoginPage /> },
      // { path: 'register', element: <RegisterPage /> },
      { path: '404', element: <NotFoundPage /> },
      { path: '/', element: <Navigate to="/app/activity" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
