import { User } from 'types/users';

import { id, increaseId, usersBd } from 'data-base/data-base';

import { prepareDataForToken } from 'utils/prepare-data-for-token';

type Helper = (user: User.Methods.RegisterUser.Request) => User.TokenData;

export const addUserToDB: Helper = (user) => {
  const newUser: User.Entity = {
    ...user,
    gmail: null,
    avatar: null,
    id,
  };

  usersBd.set(id, newUser);
  increaseId();

  return prepareDataForToken(newUser);
};
