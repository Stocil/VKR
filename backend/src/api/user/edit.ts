import { User } from 'types/users';

import { getUserById } from 'data-base/helpers/get-user-by-id';
import { getUserByLogin } from 'data-base/helpers/get-user-by-login';
import { updateUser } from 'data-base/helpers/update-user';
import { Request, Response } from 'express';

import { generateTokens } from 'utils/generate-tokens';

import {
  HTTP_CONFLICT,
  HTTP_NOT_FOUND,
  HTTP_NO_BODY_PROVIDED,
} from 'constants/http-codes';

export const editUserData = (req: Request, res: Response) => {
  if (!req.body) {
    res
      .status(HTTP_NO_BODY_PROVIDED)
      .json({ error: 'Необходимо отправить корректные данные' });

    return;
  }

  const userId = Number(req.params.id);
  const currentUser = getUserById(userId);

  if (!currentUser) {
    res
      .status(HTTP_NOT_FOUND)
      .json({ error: 'Пользователя c таким id не существует' });

    return;
  }

  const currentUserNewData: User.Methods.EditUser.Request = req.body;
  const isLoginExist = !!getUserByLogin(currentUserNewData.login);

  if (currentUser.login !== currentUserNewData.login && isLoginExist) {
    res
      .status(HTTP_CONFLICT)
      .json({ error: 'Пользователь с данным логином уже существует' });

    return;
  }

  const userNewData = updateUser(currentUserNewData);
  const { accessToken } = generateTokens(userNewData);

  res.json(accessToken);
};
