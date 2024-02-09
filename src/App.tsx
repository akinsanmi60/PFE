import ErrorBoundary from '@hooks/errorBoundary';
// import { AdminAppRoute } from '@modules/admin/routes';
import Loader from '@shared/loaderLayout';
import { Suspense } from 'react';

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { RenderRoute } from 'routes/Routes';
import { AppRouteWithLayout, AppRouteWithoutLayout } from 'routes/routeObject';
import jwt_decode from 'jwt-decode';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {RenderRoute(AppRouteWithLayout)}
        {RenderRoute(AppRouteWithoutLayout)}
        {/* {RenderProtectedRoute(AdminAppRoute)} */}
      </>,
    ),
  );
  const logoutUser = () => {
    localStorage.removeItem('token');
    if (process.env.NODE_ENV === 'development') {
      window.location.href = 'http://localhost:5173';
    } else {
      window.location.href = 'https://google.com';
    }
  };

  const token = localStorage.getItem('token');

  if (token) {
    // Check if a token is present in localStorage
    const decoded = jwt_decode(token) as { exp: number };
    // Token is present, check expiration time
    const expirationTime = new Date(decoded.exp * 1000).toISOString();
    const currentTime = new Date().toISOString();

    if (expirationTime < currentTime) {
      logoutUser();
    }
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
