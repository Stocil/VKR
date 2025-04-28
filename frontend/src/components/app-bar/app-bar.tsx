import { FC, PropsWithChildren } from 'react';

import BatteryUnknownIcon from '@mui/icons-material/BatteryUnknown';
import { SxProps, Toolbar, Typography } from '@mui/material';

import { Link } from 'components/link';

import { routesPaths } from 'routes/routes.tsx';

import { StyledAppBar } from './app-bar-styles';

const linkSx: SxProps = {
  display: 'inline-flex',
  alignItems: 'center',
};

export const AppBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledAppBar elevation={0}>
      <Toolbar>
        <Typography variant='h4' fontWeight={700} sx={{ flexGrow: 1 }}>
          <Link linkTo={routesPaths.main} linkSx={linkSx}>
            <BatteryUnknownIcon
              color='primary'
              sx={{ width: '35px', height: '35px' }}
            />
            LCS Research
          </Link>
        </Typography>

        {children}
      </Toolbar>
    </StyledAppBar>
  );
};
