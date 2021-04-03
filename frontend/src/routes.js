import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: 'app',
    element: <MainLayout />,
    children: [
      { path: '/project', element: <ProjectPage /> },
      { path: '/project/:project_id/dashboard', element: <DashboardPage /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundPage /> },
      { path: '/', element: <Navigate to="/app/project" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
