import { DefaultServerError } from 'types';

import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useEditUserMutation } from 'store/api/user';
import { getUserInfo } from 'store/user/selectors';
import { setUserInfo, setUserToken } from 'store/user/slice';

import { useSnackbar } from 'hooks/use-snackbar';

import { HttpCodes } from 'utils/http-codes';
import { setCookieToken } from 'utils/token';

import { ProfileFormFields } from '../type';

export const useEditUser = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { getValues, setError } = useFormContext<ProfileFormFields>();

  const [editUser, { isLoading }] = useEditUserMutation();

  const { id } = useSelector(getUserInfo);

  const onEditUser = () => {
    const userNewData = getValues();

    if (!id) return;

    const userNewDataWithId = {
      id,
      ...userNewData,
    };

    editUser(userNewDataWithId)
      .unwrap()
      .then((token) => {
        dispatch(setUserInfo(userNewDataWithId));
        dispatch(setUserToken(token));
        enqueueSnackbar('Данные успешно обновлены');
        setCookieToken(token);
      })
      .catch((e: DefaultServerError) => {
        enqueueSnackbar(e.data?.error, { variant: 'error' });

        if (e.status === HttpCodes.CONFLICT) {
          setError('login', {
            type: 'custom',
            message: 'Этот логин уже занят',
          });
        }
        // TODO Выделить поля при ошибке
      });
  };

  return { onEditUser, isLoading };
};
