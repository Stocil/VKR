import { FC } from 'react';

import { Typography } from '@mui/material';

import { UserFieldWrapper } from './user-styles';

type Props = {
  label: string;
  value: string;
};

export const UserInfoField: FC<Props> = ({ label, value }) => {
  return (
    <UserFieldWrapper>
      <Typography variant='h5' color='primary'>{`${label}:`}</Typography>
      <Typography variant='h5'>{value}</Typography>
    </UserFieldWrapper>
  );
};
