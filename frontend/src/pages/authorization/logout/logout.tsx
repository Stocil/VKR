import { FC } from 'react';

import { Typography } from '@mui/material';

import { Button } from 'components/button';

import { LogoutInfoWrapper } from './logout-styles';

type Props = {
  onLogout: () => void;
};

export const LogoutInfo: FC<Props> = ({ onLogout }) => {
  return (
    <LogoutInfoWrapper>
      <Typography variant='h5'>Вы уже вошли в аккаунт, выйти?</Typography>
      <Button onClick={onLogout} text='Выйти?' />
    </LogoutInfoWrapper>
  );
};
