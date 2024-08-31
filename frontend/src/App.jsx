import React,{ useState, Suspense } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from './components/Loading';

const LazyHome = React.lazy(() => import('./components/Home'));
const LazyLogin = React.lazy(() => import('./components/auth/Login'));
const LazySignup = React.lazy(() => import('./components/auth/Signup'));
const LazyJobs = React.lazy(() => import('./components/Jobs'));
const LazyBrowse = React.lazy(() => import('./components/Browse'));
const LazyProfile = React.lazy(() => import('./components/Profile'));
const LazyJobDescription = React.lazy(() => import('./components/JobDescription'));
const LazyCompanies = React.lazy(() => import('./components/admin/Companies'));
const LazyCompanyCreate = React.lazy(() => import('./components/admin/CompanyCreate'));
const LazyCompanySetup = React.lazy(() => import('./components/admin/CompanySetup'));
const LazyAdminJobs = React.lazy(() => import('./components/admin/AdminJobs'));
const LazyPostJob = React.lazy(() => import('./components/admin/PostJob'));
const LazyApplicants = React.lazy(() => import('./components/admin/Applicants'));
const LazyErrorPage = React.lazy(() => import('./components/ErrorPage'));
const LazyAboutUs = React.lazy(() => import('./components/AboutUs'));
const LazyGeminiApi = React.lazy(() => import('./components/GeminiApi'));
const ProtectedRoute = React.lazy(() => import('./components/admin/ProtectedRoute'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <LazyHome />,
  },
  {
    path: '/login',
    element: <LazyLogin />,
  },
  {
    path: '/signup',
    element: <LazySignup />,
  },
  {
    path: '/jobs',
    element: <LazyJobs />,
  },
  {
    path: '/description/:id',
    element: <LazyJobDescription />,
  },
  {
    path: '/browse',
    element: <LazyBrowse />,
  },
  {
    path: '/profile',
    element: <LazyProfile />,
  },
  {
    path: '/ai',
    element: <LazyGeminiApi />,
  },
  // Admin routes
  {
    path: '/admin/companies',
    element: (
      <ProtectedRoute>
        <LazyCompanies />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/companies/create',
    element: (
      <ProtectedRoute>
        <LazyCompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/companies/:id',
    element: (
      <ProtectedRoute>
        <LazyCompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs',
    element: (
      <ProtectedRoute>
        <LazyAdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs/create',
    element: (
      <ProtectedRoute>
        <LazyPostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: (
      <ProtectedRoute>
        <LazyApplicants />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <LazyErrorPage />,
  },
  {
    path: '/aboutus',
    element: <LazyAboutUs />,
  },
  {
    path: '/generative-ai',
    element: <LazyGeminiApi />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={appRouter} />
    </Suspense>
  );
}

export default App;