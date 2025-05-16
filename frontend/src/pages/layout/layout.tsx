import { FC } from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import { Outlet } from 'react-router';

import { useLazyCheckServerConnectionQuery } from 'store/api/connection';

import { useSnackbar } from 'hooks/use-snackbar';

import { AppBar } from 'components/app-bar';

import { Container, PageStyled } from './layout-styles';

export const Layout: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [checkServerConnection] = useLazyCheckServerConnectionQuery();

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
      </AppBar>

      <Container>
        <Outlet />
      </Container>
    </PageStyled>
  );
};
