import { FC, PropsWithChildren } from 'react';

import HttpsIcon from '@mui/icons-material/Https';
import { Toolbar, Typography } from '@mui/material';

import { Link } from 'components/link';

import { routesPaths } from 'routes/routes.tsx';

import { StyledAppBar } from './app-bar-styles';

export const AppBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledAppBar elevation={0}>
      <Toolbar>
        <Typography variant='h4' fontWeight={700} sx={{ flexGrow: 1 }}>
          <Link linkTo={routesPaths.main}>
            <HttpsIcon color='primary' sx={{ mr: 1 }} />
            Auth
          </Link>
        </Typography>

        {children}
      </Toolbar>
    </StyledAppBar>
  );
};
