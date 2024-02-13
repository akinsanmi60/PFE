import ErrorBoundary from '@hooks/errorBoundary';
// import { AdminAppRoute } from '@modules/admin/routes';
import Loader from '@shared/loaderLayout';
import { Suspense } from 'react';

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { RenderProtectedRoute, RenderRoute } from 'routes/Routes';
import { AppRouteWithLayout, AppRouteWithoutLayout } from 'routes/routeObject';
import { UserAppRoute } from '@modules/users/routes';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {RenderRoute(AppRouteWithLayout)}
        {RenderRoute(AppRouteWithoutLayout)}
        {RenderProtectedRoute(UserAppRoute)}
      </>,
    ),
  );

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
