import { useAuthContext } from '@contexts/authContext';
import PrivateRoute from '@hooks/privateRoute';
import CantView from '@pages/error/cantView';
import LayoutWrapper from '@shared/webLayout';
import { useLayoutEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';

type IProtectedRouteProp = {
  AppLayout: () => JSX.Element;
  IndexRoute: React.LazyExoticComponent<() => JSX.Element>;
  AllowedRoles: string[];
  BasePath: string;
  ListedRoutes: {
    [x: string]: {
      element: React.LazyExoticComponent<() => JSX.Element>;
      path: string;
    };
  };
};

type IRenderRouteProp = {
  AllRoutes: {
    [x: string]: {
      element: React.LazyExoticComponent<() => JSX.Element>;
      path: string;
    };
  };
  WebLayout: boolean;
};

function Wrapper() {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

export const RenderProtectedRoute = (routeObject: IProtectedRouteProp) => {
  const { authUser } = useAuthContext();

  const { AllowedRoles, AppLayout, BasePath, IndexRoute, ListedRoutes } =
    routeObject;

  return (
    <Route
      element={<PrivateRoute accounts={AllowedRoles} decodedUser={authUser} />}
    >
      <Route path={BasePath} element={<AppLayout />}>
        <Route index element={<IndexRoute />} />
        {Object.values(ListedRoutes).map(value => {
          const AppRouteComponent = value.element;
          return (
            <Route
              key={value.path}
              path={value.path}
              element={
                <>
                  <Wrapper />
                  <AppRouteComponent />
                </>
              }
            />
          );
        })}
      </Route>
    </Route>
  );
};

export const RenderRoute = (incomingRoutes: IRenderRouteProp) => {
  const { authUser } = useAuthContext();
  const { WebLayout, AllRoutes } = incomingRoutes;
  return Object.entries(AllRoutes).map(itemRoute => {
    const [key, value] = itemRoute;
    const RouteComponent = value.element;
    return (
      <Route
        key={key}
        path={value.path}
        element={
          WebLayout ? (
            <LayoutWrapper>
              <Wrapper />
              <RouteComponent />
            </LayoutWrapper>
          ) : (
            <>{authUser ? <CantView /> : <RouteComponent />}</>
          )
        }
      />
    );
  });
};

export const BasePath = {
  USER: 'pentrar/user',
  ADMIN: 'pentrar/admin',
  WEB: '/',
};
