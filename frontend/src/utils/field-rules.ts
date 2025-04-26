export const passwordRules = {
  required: true,
  minLength: {
    value: 6,
    message: 'Минимальная длина пароля должна быть 6 символов',
  },
};

export const loginRules = {
  required: true,
  minLength: {
    value: 4,
    message: 'Минимальная длина логина должна быть не менее 4 символов',
  },
};
