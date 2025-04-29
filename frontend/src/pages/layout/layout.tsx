import { FC } from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { useLazyCheckServerConnectionQuery } from 'store/api/connection';
import { getUserInfo } from 'store/user/selectors';

import { useLogout } from 'hooks/use-logout';
import { useSnackbar } from 'hooks/use-snackbar';

import { AppBar } from 'components/app-bar';
import { AppBarUserActions } from 'components/app-bar/app-bar-user-info';
import { Button } from 'components/button';

import { routesPaths } from 'routes/routes';

import { Container, PageStyled } from './layout-styles';

export const Layout: FC = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { isLogin, logout } = useLogout();

  const { login, avatar } = useSelector(getUserInfo);
  const [checkServerConnection] = useLazyCheckServerConnectionQuery();

  const navigateToAuthorizationPage = () => {
    navigate(routesPaths.signIn);
  };

  const onCheckServerConnection = () => {
    checkServerConnection()
      .unwrap()
      .then(() => {
        enqueueSnackbar('Соединение с сервером стабильное');
      })
      .catch(() => {
        enqueueSnackbar('Соединение не сервером установлено', {
          variant: 'error',
        });
      });
  };

  return (
    <PageStyled>
      <AppBar>
        <IconButton onClick={onCheckServerConnection} sx={{ mr: 1 }}>
          <RefreshIcon />
        </IconButton>

        {!isLogin && (
          <Button onClick={navigateToAuthorizationPage} text='Войти' />
        )}
        {isLogin && (
          <AppBarUserActions onLogout={logout} login={login} avatar={avatar} />
        )}
      </AppBar>

      <Container>
        <Outlet />
      </Container>
    </PageStyled>
  );
};
