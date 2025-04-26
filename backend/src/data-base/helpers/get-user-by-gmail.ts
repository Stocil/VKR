import { User } from 'types/users';

import { usersBd } from 'data-base/data-base';

import { getUserById } from './get-user-by-id';

type Helper = (gmail: User.Entity['gmail']) => User.Entity | null;

export const getUserByGmail: Helper = (gmail) => {
  let userId: number | null = null;

  for (let user of usersBd.values()) {
    if (user.gmail === gmail) {
      userId = user.id;
      break;
    }
  }

  if (userId === null) return null;

  return getUserById(userId) ?? null;
};
