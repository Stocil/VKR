import { FC, useEffect } from 'react';

import { SxProps } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { AuthFormInputs } from 'pages/authorization/types';

import { Button } from 'components/button';

import { authorizationFormDefaultValues } from '../constants';
import { useAuthUser } from '../hooks';
import { LoginForm } from '../login-styled';
import { AuthorizationEmailField } from './email-field';
import { AuthorizationLoginField } from './login-field';
import { AuthorizationPasswordField } from './password-field';
import { AuthorizationRepeatPasswordField } from './repeat-password-field';

const buttonSx: SxProps = { marginTop: 2, padding: '8px 16px' };

export const AuthorizationForm: FC = () => {
  const { handleSubmit, reset } = useFormContext<AuthFormInputs>();
  const { onSubmit, isLoading, isLoginPage } = useAuthUser();

  const buttonText = isLoginPage ? 'Войти' : 'Зарегистрироваться';

  useEffect(() => {
    reset({ ...authorizationFormDefaultValues });
  }, [isLoginPage]);

  return (
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      <AuthorizationLoginField />

      {!isLoginPage && <AuthorizationEmailField />}

      <AuthorizationPasswordField />

      {!isLoginPage && <AuthorizationRepeatPasswordField />}

      <Button
        fullWidth
        type='submit'
        sx={buttonSx}
        text={buttonText}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </LoginForm>
  );
};
