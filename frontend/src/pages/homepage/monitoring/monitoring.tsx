import { FC } from 'react';

import DownloadIcon from '@mui/icons-material/Download';
import { Typography } from '@mui/material';

import { Button } from 'components/button';
import { PageWrapper } from 'components/page-wrapper';

import { HomepageTabsEmptySearch } from '../empty-search';
import { HomepageTabContentWrapper } from '../homepage-styles';
import { useFetchHomepageMonitoringData } from './hooks';
import { HomepageMonitoringInfo } from './monitoring-info';
import { HomepageMonitoringTitleWrapper } from './monitoring-styles';

type Props = {
  isLoadMode: boolean;
};

export const HomepageMonitoring: FC<Props> = ({ isLoadMode }) => {
  const {
    sensorsData,
    xAxisData,
    onExportData,
    isLoading,
    isError,
    isEmptySearch,
  } = useFetchHomepageMonitoringData(isLoadMode);

  return (
    <HomepageTabContentWrapper>
      <HomepageMonitoringTitleWrapper>
        <Typography variant='h5' color='primary'>
          Мониторинг
        </Typography>

        <Button onClick={onExportData} endIcon={<DownloadIcon />}>
          Выгрузить XLSX
        </Button>
      </HomepageMonitoringTitleWrapper>

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
