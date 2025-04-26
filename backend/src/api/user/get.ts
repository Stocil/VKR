import { getUserById } from 'data-base/helpers/get-user-by-id';
import { Request, Response } from 'express';

import { prepareDataForToken } from 'utils/prepare-data-for-token';

export const getUser = (req: Request, res: Response) => {
  const papamsId = Number(req.params.id);

  const user = getUserById(papamsId);

  if (!user) {
    res.status(404).json({ error: 'Пользователь с таким id не существует' });

    return;
  }

  const userData = prepareDataForToken(user);

  res.json(userData);
};
