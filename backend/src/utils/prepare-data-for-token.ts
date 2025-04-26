import { User } from 'types/users';

type Func = (data: User.Entity) => User.TokenData;

export const prepareDataForToken: Func = (data) => {
  const { password, ...tokenData } = data;

  return tokenData;
};
