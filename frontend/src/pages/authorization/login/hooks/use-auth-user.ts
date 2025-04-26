import { DefaultServerError } from 'types';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Location, useLocation, useNavigate } from 'react-router';

import { useLoginUserMutation, useRegisterUserMutation } from 'store/api/auth';
import { setUserLogin } from 'store/user/slice';

import { useSnackbar } from 'hooks/use-snackbar';

import { AuthFormInputs, LocationStateType } from 'pages/authorization/types';

import { routesPaths } from 'routes/routes';

import { getUserDataFromToken, setCookieToken } from 'utils/token';

import { authorizationFormTexts, loginVariants } from '../constants';

type Hook = () => {
  isLoginPage: boolean;
  onSubmit: SubmitHandler<AuthFormInputs>;
  isLoading: boolean;
};

export const useAuthUser: Hook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { getValues, setError } = useFormContext<AuthFormInputs>();

  const { state, pathname }: Location<LocationStateType> = useLocation();
  const prevPath = state?.prevPath ?? routesPaths.main;
  const isLoginPage = pathname === routesPaths.signIn;

  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [registerUser, { isLoading: isRegisterLoading }] =
    useRegisterUserMutation();

  const onSuccess = (token: string) => {
    const { successSnack } = authorizationFormTexts;
    const successMessage = isLoginPage
      ? successSnack[loginVariants.signIn]
      : successSnack[loginVariants.signUp];

    const userData = getUserDataFromToken(token);

    setCookieToken(token);
    dispatch(setUserLogin({ ...userData, token }));
    enqueueSnackbar(successMessage);
    navigate({ pathname: prevPath });
  };

  const onLoginUser = () => {
    const { login, password } = getValues();

    const loginData = {
      login: login,
      password: password,
    };

    loginUser(loginData)
      .unwrap()
      .then((data) => {
        onSuccess(data);
      })
      .catch((e: DefaultServerError) => {
        const message = e.data?.error;
        enqueueSnackbar(message, { variant: 'error' });
      });
  };

  const onRegisterUser = () => {
    const { login, password, email, repeatPassword } = getValues();

    if (password !== repeatPassword) {
      const message = authorizationFormTexts.validationErrors.passwordDontMatch;

      setError('password', {
        type: 'custom',
        message: message,
      });
      setError('repeatPassword', {
        type: 'custom',
        message: message,
      });

      return;
    }

    const registerData = {
      login: login,
      email: String(email),
      password: password,
    };

    registerUser(registerData)
      .unwrap()
      .then((data) => {
        onSuccess(data);
      })
      .catch((e: DefaultServerError) => {
        const message = e.data?.error;
        enqueueSnackbar(message, { variant: 'error' });

        setError('login', {
          type: 'custom',
          message: message,
        });
      });
  };

  const onSubmit = isLoginPage ? onLoginUser : onRegisterUser;
  const isLoading = isLoginLoading || isRegisterLoading;

  return { isLoginPage, onSubmit, isLoading };
};
