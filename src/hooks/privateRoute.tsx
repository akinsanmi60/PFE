import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { IUserCTXType } from 'types/contextProvider.type';
import { logOut } from './auth';
import { getToken } from './localStorageHook';
import jwtDecode from 'jwt-decode';

function PrivateRoute({
  accounts,
  decodedUser,
}: {
  accounts: Array<string>;
  decodedUser: IUserCTXType | null;
}) {
  const location = useLocation();

  const isAuthenticated = () => {
    const userToken = getToken() as string;
    if (userToken) {
      try {
        const decodedToken: IUserCTXType = jwtDecode(userToken);
        if (decodedToken.exp) {
          const { exp } = decodedToken;
          const currentTime = Date.now() / 1000;
          return exp > currentTime;
        }
      } catch (e) {
        return false;
      }
    }
  };

  if (!isAuthenticated()) {
    logOut();
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const role = decodedUser?.role ?? '';

  const userHasRequiredAccount = role && accounts.includes(role);

  if (userHasRequiredAccount) {
    return <Outlet />;
  } else if (!userHasRequiredAccount) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default PrivateRoute;
