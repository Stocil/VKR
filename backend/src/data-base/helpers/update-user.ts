import { User } from 'types/users';

import { usersBd } from 'data-base/data-base';

import { prepareDataForToken } from 'utils/prepare-data-for-token';

type Props = User.Methods.EditUser.Request;

type UpdateUser = (props: Props) => User.TokenData;

export const updateUser: UpdateUser = (currentUserNewData) => {
  // Точно получаем пользователя, т.к до этого проверяем существование id в БД
  const currentUserData = usersBd.get(currentUserNewData.id) as User.Entity;

  const userNewData = {
    ...currentUserData,
    ...currentUserNewData,
  };

  usersBd.set(currentUserNewData.id, userNewData);
  console.log('Update user data');

  return prepareDataForToken(userNewData);
};
