import { User } from 'types/users';

import { getUserByLogin } from 'data-base/helpers/get-user-by-login';
import { Request, Response } from 'express';

import { generateTokens } from 'utils/generate-tokens';
import { prepareDataForToken } from 'utils/prepare-data-for-token';

import { HTTP_INVALID_DATA, HTTP_NO_BODY_PROVIDED } from 'constants/http-codes';

export const signIn = (req: Request, res: Response) => {
  if (!req.body) {
    res
      .status(HTTP_NO_BODY_PROVIDED)
      .json({ error: 'Необходимо отправить данные' });

    return;
  }

  const user: User.Methods.LoginUser.Request = req.body;
  const currentUser = getUserByLogin(user.login);

  if (!currentUser || currentUser.password !== user.password) {
    res.status(HTTP_INVALID_DATA).json({ error: 'Неверный логин или пароль' });
    return;
  }

  const currentUserJWTData = prepareDataForToken(currentUser);
  const { accessToken, refreshToken } = generateTokens(currentUserJWTData);

  console.log(`Login user\n`);
  res.cookie('cookieToken', refreshToken, { httpOnly: true }).json(accessToken);
};
