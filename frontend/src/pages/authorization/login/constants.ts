import { AuthFormInputs } from '../types';

export enum loginVariants {
  signIn,
  signUp,
}

export const authorizationFormTexts = {
  title: {
    [loginVariants.signIn]: 'Вход',
    [loginVariants.signUp]: 'Регистрация',
  },
  footer: {
    [loginVariants.signIn]: 'Нет аккаунта, зарегистрироваться?',
    [loginVariants.signUp]: 'Есть аккаунт, войти?',
  },
  footerRoute: {
    [loginVariants.signIn]: '/sign-up',
    [loginVariants.signUp]: '/sign-in',
  },
  successSnack: {
    [loginVariants.signIn]: 'Вход в аккаунт успешно совершен',
    [loginVariants.signUp]: 'Регистрация прошла успешно',
  },
  validationErrors: {
    passwordDontMatch: 'Пароли должны совпадать',
  },
};

export const authorizationFormDefaultValues: AuthFormInputs = {
  login: '',
  email: '',
  password: '',
  repeatPassword: '',
};
