import { Request, Response } from 'express';

import { HTTP_NO_CONTENT } from 'constants/http-codes';

export const access = (_: Request, res: Response) => {
  res.sendStatus(HTTP_NO_CONTENT);
};
