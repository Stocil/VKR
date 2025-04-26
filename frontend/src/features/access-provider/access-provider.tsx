import { PropsWithChildren, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useCheckUserAccessQuery } from 'store/api/auth';
import { setUserLogin } from 'store/user/slice';

import { Loader } from 'components/loader';
import { PageLoader } from 'components/loader/loader-styles';

import { getTokenFromCookie, getUserDataFromToken } from 'utils/token';

export const AccessProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookie();

  // Скипаем запрос, если нет Access токена
  const { isSuccess, isFetching } = useCheckUserAccessQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (isSuccess && token) {
      const userData = getUserDataFromToken(token);
      dispatch(setUserLogin({ token, ...userData }));
    }
  }, [isSuccess]);

  if (isFetching) {
    return (
      <PageLoader>
        <Loader isLoading={isFetching} />
      </PageLoader>
    );
  }

  return <>{children}</>;
};
