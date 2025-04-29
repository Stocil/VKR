import { Request, Response } from 'express';

export const checkServerConnection = (_: Request, res: Response) => {
  res.json('pong').sendStatus(200);
};
