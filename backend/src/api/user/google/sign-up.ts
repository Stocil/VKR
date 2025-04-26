import { User } from 'types/users';

import { addGoogleUserToDB } from 'data-base/helpers/add-google-user';
import { getUserByLogin } from 'data-base/helpers/get-user-by-login';
import { Request, Response } from 'express';

import { generateTokens } from 'utils/generate-tokens';

import { HTTP_CONFLICT, HTTP_NO_BODY_PROVIDED } from 'constants/http-codes';

export const signUpByGoogle = (req: Request, res: Response) => {
  if (!req.body) {
    res
      .status(HTTP_NO_BODY_PROVIDED)
      .json({ error: 'Необходимо отправить данные' });

    return;
  }

  const user: User.Methods.RegisterUserByGoogle.Request = req.body;
  const isUserExist = !!getUserByLogin(user.login);

  if (isUserExist) {
    res.status(HTTP_CONFLICT).json({
      error: 'Пользователь с таким логином уже существует, придумайте новый',
    });

    return;
  }

  const newUser = addGoogleUserToDB(user);
  const { accessToken, refreshToken } = generateTokens(newUser);

  console.log(`Register user\n`);
  res.cookie('cookieToken', refreshToken, { httpOnly: true }).json(accessToken);
};
