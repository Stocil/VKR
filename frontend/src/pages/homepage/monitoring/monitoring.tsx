import { FC } from 'react';

import { Typography } from '@mui/material';

import { PageWrapper } from 'components/page-wrapper';

import { HomepageTabsEmptySearch } from '../empty-search';
import { HomepageTabContentWrapper } from '../homepage-styles';
import { useFetchHomepageMonitoringData } from './hooks';
import { HomepageMonitoringInfo } from './monitoring-info';

export const HomepageMonitoring: FC = () => {
  const { sensorsData, xAxisData, isLoading, isError, isEmptySearch } =
    useFetchHomepageMonitoringData();

  return (
    <HomepageTabContentWrapper>
      <Typography variant='h5' color='primary'>
        Мониторинг
      </Typography>

      <PageWrapper
        isLoading={isLoading}
        isError={isError}
        isEmptySearch={isEmptySearch}
        noDataFallback={<HomepageTabsEmptySearch />}
        errorFallback={<HomepageTabsEmptySearch />}
      >
        <HomepageMonitoringInfo
          sensorsData={sensorsData}
          xAxisData={xAxisData}
        />
      </PageWrapper>
    </HomepageTabContentWrapper>
  );
};
