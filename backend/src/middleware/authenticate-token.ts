import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { HTTP_UNAUTHORIZE } from 'constants/http-codes';
import { SECRET } from 'constants/index';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { headers } = req;

  const token = headers.authorization?.split(' ')[1];

  console.log('Access request\n');

  if (!token) {
    res.status(HTTP_UNAUTHORIZE).json({ error: 'Токен доступа не найден' });
    return;
  }

  jwt.verify(token, SECRET, (err) => {
    if (err) {
      res.status(HTTP_UNAUTHORIZE).json({ err });
      return;
    }

    next();
  });
};
