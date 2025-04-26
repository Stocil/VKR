import { FC } from 'react';

import { Typography } from '@mui/material';

import { Button } from 'components/button';
import { Link } from 'components/link';

import { routesPaths } from 'routes/routes';

import { UserEmptySearchWrapper } from './user-styles';

export const UserEmptySearch: FC = () => {
  return (
    <UserEmptySearchWrapper spacing={2}>
      <Typography color='textSecondary' variant='h3'>
        Пользователь не найден
      </Typography>

      <Link linkTo={routesPaths.main}>
        <Button size='large'>На главную</Button>
      </Link>
    </UserEmptySearchWrapper>
  );
};
