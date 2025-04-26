import { User } from 'types/users';

import { getUserByGmail } from 'data-base/helpers/get-user-by-gmail';
import { Request, Response } from 'express';

import { generateTokens } from 'utils/generate-tokens';
import { prepareDataForToken } from 'utils/prepare-data-for-token';

import { HTTP_NOT_FOUND, HTTP_NO_BODY_PROVIDED } from 'constants/http-codes';

export const checkGoogleLink = (req: Request, res: Response) => {
  const userGmail: User.Methods.CheckUserGoogleLink.Request = req.body;

  if (!userGmail) {
    res
      .status(HTTP_NO_BODY_PROVIDED)
      .json({ error: 'Необходимо отправить данные' });

    return;
  }

  const { gmail } = userGmail;
  const currentUser = getUserByGmail(gmail);

  if (!currentUser) {
    res
      .status(HTTP_NOT_FOUND)
      .json({ error: 'Пользователя с таким gmail не существует' });

    return;
  }

  const currentUserJWTData = prepareDataForToken(currentUser);
  const { accessToken, refreshToken } = generateTokens(currentUserJWTData);

  console.log(`Login user using google\n`);
  res.cookie('cookieToken', refreshToken, { httpOnly: true }).json(accessToken);
};
