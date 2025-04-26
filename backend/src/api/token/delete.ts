import { Request, Response } from 'express';

import { HTTP_NO_CONTENT } from 'constants/http-codes';

export const deleteToken = (_: Request, res: Response) => {
  res.clearCookie('cookieToken').sendStatus(HTTP_NO_CONTENT);
};
