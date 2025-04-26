import { DefaultServerError } from 'types';

import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Location, useLocation, useNavigate } from 'react-router';

import { useRegisterUserByGoogleMutation } from 'store/api/auth';
import { getAuthorizationPasswordModalState } from 'store/authorization/modals/selectors';
import { setAuthorizationModalsState } from 'store/authorization/modals/slice';
import { setUserLogin } from 'store/user/slice';

import { useSnackbar } from 'hooks/use-snackbar';

import { authorizationFormTexts } from 'pages/authorization/login/constants';
import { LocationStateType } from 'pages/authorization/types';

import { routesPaths } from 'routes/routes';

import { HttpCodes } from 'utils/http-codes';
import { getUserDataFromToken, setCookieToken } from 'utils/token';

import { PasswordModalFormInputs } from '../../types';

export const useSubmitGooglePasswordModalForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { info } = useSelector(getAuthorizationPasswordModalState);

  const { state }: Location<LocationStateType> = useLocation();
  const prevPath = state?.prevPath ?? routesPaths.main;

  const { getValues, setError } = useFormContext<PasswordModalFormInputs>();
  const [registerUserByGoogle, { isLoading }] =
    useRegisterUserByGoogleMutation();

  const onCloseModal = () => {
    dispatch(setAuthorizationModalsState());
  };

  const onSubmit = () => {
    if (!info) return;

    const { password, repeatPassword } = getValues();

    if (password !== repeatPassword) {
      setError('password', {
        type: 'custom',
        message: authorizationFormTexts.validationErrors.passwordDontMatch,
      });
      setError('repeatPassword', {
        type: 'custom',
        message: authorizationFormTexts.validationErrors.passwordDontMatch,
      });

      return;
    }

    const newUserData = {
      ...info,
      password,
    };

    registerUserByGoogle(newUserData)
      .unwrap()
      .then((token) => {
        const userData = getUserDataFromToken(token);

        setCookieToken(token);
        dispatch(setUserLogin({ ...userData, token }));
        enqueueSnackbar('Вы успешно авторизовались через Google');
        navigate({ pathname: prevPath });
      })
      .catch((error: DefaultServerError) => {
        if (error.status === HttpCodes.CONFLICT) {
          // TODO: Обработать ошибку

          enqueueSnackbar('Данный логин уже занят, придумайте новый', {
            variant: 'error',
            autoHideDuration: 5000,
          });
        }
      })
      .finally(onCloseModal);
  };

  return { onSubmit, isLoading };
};
