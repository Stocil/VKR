import { FC } from 'react';

import { Nullable } from 'types';

import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Typography } from '@mui/material';

import {
  AppBarUserActionsWrapper,
  AppBarUserInfo,
} from 'components/app-bar/app-bar-styles';
import { Avatar } from 'components/avatar';
import { Link } from 'components/link';

import { routesPaths } from 'routes/routes';

type Props = {
  login: string;
  avatar: Nullable<string>;
  onLogout: () => void;
};

export const AppBarUserActions: FC<Props> = ({ login, avatar, onLogout }) => (
  <AppBarUserActionsWrapper>
    <AppBarUserInfo>
      <Typography variant='h6' color='primary'>
        {login}
      </Typography>

      <Link linkTo={routesPaths.profile}>
        <Avatar src={avatar ?? ''} noUrlText={login?.[0]} size={40} />
      </Link>
    </AppBarUserInfo>

    <IconButton onClick={onLogout} edge='start'>
      <LogoutIcon />
    </IconButton>
  </AppBarUserActionsWrapper>
);
