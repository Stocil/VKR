import { FC } from 'react';

import { Typography } from '@mui/material';

import { Button } from 'components/button';
import { Link } from 'components/link';

import { routesPaths } from 'routes/routes';

import { HomepageWrapper } from './homepage-styles';

export const HomePage: FC = () => {
  return (
    <HomepageWrapper>
      <Typography variant='h5'>Home Page</Typography>

      <Link linkTo={routesPaths.profile}>
        <Button text='Профиль' />
      </Link>
    </HomepageWrapper>
  );
};
