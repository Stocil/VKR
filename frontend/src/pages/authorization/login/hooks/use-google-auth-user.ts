import { DefaultServerError } from 'types';

import { CredentialResponse } from '@react-oauth/google';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Location, useLocation, useNavigate } from 'react-router';

import { useCheckUserGoogleLinkMutation } from 'store/api/auth';
import { setAuthorizationModalsState } from 'store/authorization/modals/slice';
import { setUserLogin } from 'store/user/slice';

import { useSnackbar } from 'hooks/use-snackbar';

import { routesPaths } from 'routes/routes';

import { HttpCodes } from 'utils/http-codes';
import { getUserDataFromToken, setCookieToken } from 'utils/token';

import { LocationStateType } from '../../types';

type UserGoogleData = JwtPayload & {
  name: string;
  email: string;
  picture: string;
};

type Hook = () => {
  onSuccess: (props: CredentialResponse) => void;
  onError: VoidFunction;
};

const userLinkNotFoundError =
  'Для продолжения регистрации нужно придумать пароль';

export const useGoogleAuthUser: Hook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { state }: Location<LocationStateType> = useLocation();
  const prevPath = state?.prevPath ?? routesPaths.main;

  const [checkUserLink] = useCheckUserGoogleLinkMutation();

  const onSuccess = ({ credential }: CredentialResponse) => {
    if (!credential) {
      onError();
      return;
    }

    const userJWTData = jwtDecode<UserGoogleData>(credential);

    checkUserLink({ gmail: userJWTData.email })
      .unwrap()
      .then((token) => {
        const userData = getUserDataFromToken(token);

        setCookieToken(token);
        dispatch(setUserLogin({ ...userData, token }));
        enqueueSnackbar('Вы успешно авторизовались через Google');
        navigate({ pathname: prevPath });
      })
      .catch((error: DefaultServerError) => {
        const info = {
          login: userJWTData.name,
          gmail: userJWTData.email,
          avatar: userJWTData.picture,
        };

        if (error.status === HttpCodes.NOT_FOUND) {
          dispatch(setAuthorizationModalsState({ isOpen: true, info }));
          enqueueSnackbar(userLinkNotFoundError, {
            variant: 'error',
            autoHideDuration: 5000,
          });
        }
      });
  };

  const onError = () => {
    enqueueSnackbar(
      'Не удалось войти в аккаунт через Google, повторите попытку',
      { variant: 'error' },
    );
  };

  return { onSuccess, onError };
};
