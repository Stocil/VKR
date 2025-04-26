import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { useGetUserQuery } from 'store/api/users';
import { getUserInfo } from 'store/user/selectors';

import { routesPaths } from 'routes/routes';

import { getTokenFromCookie } from 'utils/token';

import { emptyUser } from '../constants';

export const useFetchUserData = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = getTokenFromCookie();
  const { id: currentUserId } = useSelector(getUserInfo);

  const isCurrentUser = Number(id) === currentUserId;

  useEffect(() => {
    if (isCurrentUser) {
      navigate(routesPaths.profile);
    }
  }, [isCurrentUser]);

  const {
    data,
    isError,
    isLoading: isUserDataLoading,
  } = useGetUserQuery({ id: String(id) }, { skip: !id });

  const isLoading = (token && !currentUserId) || isUserDataLoading;
  const userData = data ?? emptyUser;

  return { userData, isLoading, isError };
};
