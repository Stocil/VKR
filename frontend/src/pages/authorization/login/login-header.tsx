import { FC } from 'react';

import { Typography } from '@mui/material';

type Props = {
  title: string;
};

export const LoginHeader: FC<Props> = ({ title }) => {
  return (
    <Typography variant='h4' color={'primary'}>
      {title}
    </Typography>
  );
};
