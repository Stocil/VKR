import { useLocation } from 'react-router';

import { useLogout } from 'hooks/use-logout';

import { routesPaths } from 'routes/routes';

import { Login } from './login';
import { LogoutInfo } from './logout';
import { AuthorizationModals } from './modals';

export const Authorization = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === routesPaths.signIn;

  const { isLogin, logout } = useLogout();

  if (isLogin) {
    return <LogoutInfo onLogout={logout} />;
  }

  return (
    <>
      <Login isLoginPage={isLoginPage} />
      <AuthorizationModals />
    </>
  );
};
