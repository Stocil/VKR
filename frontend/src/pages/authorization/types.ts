export type AuthFormInputs = {
  login: string;
  email?: string;
  password: string;
  repeatPassword?: string;
};

export type LocationStateType = {
  prevPath: string | undefined;
};
