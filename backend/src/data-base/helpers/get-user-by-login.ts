import { User } from 'types/users';

import { usersBd } from 'data-base/data-base';

import { getUserById } from './get-user-by-id';

type Helper = (login: User.Entity['login']) => User.Entity | null;

export const getUserByLogin: Helper = (login) => {
  let userId: number | null = null;

  for (let user of usersBd.values()) {
    if (user.login === login) {
      userId = user.id;
      break;
    }
  }

  if (userId === null) return null;

  return getUserById(userId) ?? null;
};
