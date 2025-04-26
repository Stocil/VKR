import { useDispatch, useSelector } from 'react-redux';

import { useLogoutUserMutation } from 'store/api/auth';
import { getUserIsLoggin } from 'store/user/selectors';
import { setUserLogout } from 'store/user/slice';

import { deleteCookieToken } from 'utils/token';

import { useSnackbar } from './use-snackbar';

export const useLogout = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const isLogin = useSelector(getUserIsLoggin);
  const [logoutUser] = useLogoutUserMutation();

  const logout = () => {
    logoutUser().then(() => {
      dispatch(setUserLogout());
      deleteCookieToken();
      enqueueSnackbar('Успешный выход из аккаунта');
    });
  };

  return { isLogin, logout };
};
