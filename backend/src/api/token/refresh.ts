import { User } from 'types/users';

import { getUserById } from 'data-base/helpers/get-user-by-id';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { generateTokens } from 'utils/generate-tokens';
import { prepareDataForToken } from 'utils/prepare-data-for-token';

import { HTTP_NOT_FOUND, HTTP_UNAUTHORIZE } from 'constants/http-codes';
import { SECRET } from 'constants/index';

type Token = string | undefined;

export const refresh = (req: Request, res: Response) => {
  const token: Token = req.cookies?.cookieToken;

  if (!token) {
    res
      .clearCookie('cookieToken')
      .status(HTTP_UNAUTHORIZE)
      .json({ error: 'Не удалось обновить токен, войдите в аккаунт заново' });

    return;
  }

  console.log(`Рефреш токен из кук получен: ${token}\n`);

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      res
        .clearCookie('cookieToken')
        .status(HTTP_UNAUTHORIZE)
        .json({
          err: {
            ...err,
            message: 'Токен обновления истек, войдите в аккаунт заново',
          },
        });
      return;
    }

    const user = decoded as User.TokenData;
    const currentUser = getUserById(user.id);

    if (!currentUser) {
      res
        .clearCookie('cookieToken')
        .status(HTTP_NOT_FOUND)
        .json({ error: 'Не удалось обновить токен, войдите в аккаунт заново' });

      return;
    }

    const currentUserJWTData = prepareDataForToken(currentUser);
    const { accessToken } = generateTokens(currentUserJWTData);

    res.json(accessToken);
  });
};
