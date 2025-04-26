import { User } from 'types/users';

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { HTTP_NOT_ALLOWED } from 'constants/http-codes';
import { SECRET } from 'constants/index';

export const allowedCheck = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const papamsId = Number(req.params.id);

  // Указываем как строку, т.к до этого идет мидлвара на проверку токена
  const token = req.headers.authorization?.split(' ')[1] as string;

  jwt.verify(token, SECRET, (_, decoded) => {
    const user = decoded as User.TokenData;

    if (user.id !== papamsId) {
      res
        .status(HTTP_NOT_ALLOWED)
        .json({ error: 'У вас недостаточно прав для этой операции' });

      return;
    }

    next();
  });
};
