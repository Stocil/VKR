import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { AuthFormInputs } from '../types';
import {
  authorizationFormDefaultValues,
  authorizationFormTexts,
  loginVariants,
} from './constants';
import { AuthorizationForm } from './form';
import { LoginFooter } from './login-footer';
import { LoginHeader } from './login-header';
import { StyledPaper } from './login-styled';

type Props = {
  isLoginPage: boolean;
};

export const Login: FC<Props> = ({ isLoginPage }) => {
  const methods = useForm<AuthFormInputs>({
    defaultValues: authorizationFormDefaultValues,
  });

  const { footer, title, footerRoute } = authorizationFormTexts;
  const currentPage = isLoginPage ? loginVariants.signIn : loginVariants.signUp;

  const headerTitle = title[currentPage];
  const tipText = footer[currentPage];
  const link = footerRoute[currentPage];

  return (
    <StyledPaper>
      <LoginHeader title={headerTitle} />

      <FormProvider {...methods}>
        <AuthorizationForm />
      </FormProvider>

      <LoginFooter link={link} tipText={tipText} />
    </StyledPaper>
  );
};
