import { User } from 'types/users';

import { id, increaseId, usersBd } from 'data-base/data-base';

import { prepareDataForToken } from 'utils/prepare-data-for-token';

type Helper = (
  user: User.Methods.RegisterUserByGoogle.Request,
) => User.TokenData;

export const addGoogleUserToDB: Helper = (user) => {
  const newUser: User.Entity = {
    ...user,
    email: String(user.gmail),
    id,
  };

  usersBd.set(id, newUser);
  increaseId();

  return prepareDataForToken(newUser);
};
