import { FC, PropsWithChildren, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { authApi } from 'store/api/auth';
import { getUserIsLoggin } from 'store/user/selectors';

import { Loader } from 'components/loader';

import { routesPaths } from 'routes/routes';

import { getTokenFromCookie } from 'utils/token';

type Props = PropsWithChildren;

export const PrivateRoute: FC<Props> = ({ children }) => {
  const { isSuccess, isError } =
    authApi.endpoints.checkUserAccess.useQueryState();

  const isLoading = !isSuccess && !isError;

  const token = getTokenFromCookie();
  const isLogin = useSelector(getUserIsLoggin);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Подвязываем на isLogin, чтобы происходил редирект
  // при выходе из аккаунта в приватном роуте
  let isPageAvailable = isLogin;

  if (token && !isPageAvailable) {
    // Держим пользователя на этой странице до тех пор, пока запрос не завершится
    isPageAvailable = isLoading ? true : isSuccess;
  }

  useEffect(() => {
    if (!isPageAvailable) {
      navigate(
        { pathname: routesPaths.signIn },
        { state: { prevPath: pathname } },
      );
    }
  }, [isPageAvailable]);

  return <Loader isLoading={!isPageAvailable}>{children}</Loader>;
};
