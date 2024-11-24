import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import DonationComponent from './pages/Donation.tsx';
import HomePage from './pages/HomePage';
import VolunteerOpp from './pages/VolunteerOpp.tsx';
import Health from './pages/healthnutrition.tsx';
import EducationalResource from './pages/EduResourcePage.tsx';
import Login from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import MainLayout from './pages/MainLayout.tsx';
import Dashboard from './pages/Dashboard.tsx';

import About from './pages/About.tsx';

import ContactUsPage from './pages/ContactUsPage.tsx';
import Partner from './pages/Partner.tsx';
import SafetyReportPage from './pages/safetyReport.tsx';
import Admin from './pages/adminDashboard-Main.tsx'
const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: MainLayout,
        children: [
          {
            path: '/',
            Component: HomePage,
          },
          {
            path: '/donate',
            Component: DonationComponent
          },
          {
            path: '/volunteer',
            Component: VolunteerOpp
          },
          {
            path: '/health',
            Component: Health
          },
          {
            path: '/education',
            Component: EducationalResource
          },
          {
            path: '/dashboard',
            Component: Dashboard
          },
          {
            path: '/safetyreport',
            Component: SafetyReportPage
          }
        ]
      },

      {
        path: '/admin',
        Component: Admin
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/signup',
        Component: SignUp
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/contact',
        Component: ContactUsPage
      },
      {
        path: '/partner',
        Component: Partner
      }
    ]
  }
];
const router = createBrowserRouter(routes);
export default router;
