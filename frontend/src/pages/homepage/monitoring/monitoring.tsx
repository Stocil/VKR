import { FC } from 'react';

import { Typography } from '@mui/material';

import { HomepageTabContentWrapper } from '../homepage-styles';
import { HomepageMonitoringInfo } from './monitoring-info';

export const HomepageMonitoring: FC = () => {
  return (
    <HomepageTabContentWrapper>
      <Typography variant='h5' color='primary'>
        Мониторинг
      </Typography>

      <HomepageMonitoringInfo />
    </HomepageTabContentWrapper>
  );
};
