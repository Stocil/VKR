import { FC } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { homepageDefaultValues } from '../constants';
import { HomepageForm } from '../types';
import { HomepageMonitoringInfoField } from './monitoring-info-field';
import {
  HomepageMonitoringContainersWrapper,
  HomepageMonitoringLeftContainer,
  HomepageMonitoringRightContainer,
} from './monitoring-styles';

export const HomepageMonitoringInfo: FC = () => {
  const methods = useForm<HomepageForm>({
    defaultValues: homepageDefaultValues,
  });

  return (
    <HomepageMonitoringContainersWrapper>
      <FormProvider {...methods}>
        <HomepageMonitoringLeftContainer>
          <HomepageMonitoringInfoField
            inputTitle='Ток'
            inputName='current'
            seriesData={[0, 1, 2, 5.5, 2, 8.5, 1.5, 1, 7, 10, 2]}
            graphColor='#495afb'
          />

          <HomepageMonitoringInfoField
            inputTitle='Напряжение'
            inputName='voltage'
            seriesData={[0, 2, 1, 2.5, 7, 2.5, 5.2, 4, 2, 6, 6]}
            graphColor='#bb4d05'
          />
        </HomepageMonitoringLeftContainer>

        <HomepageMonitoringRightContainer>
          <HomepageMonitoringInfoField
            inputTitle='Сопротивление'
            inputName='resistance'
            seriesData={[0, 11, 4, 2.5, 7, 2.1, 5.5, 6, 3, 3, 8]}
            graphColor='#00ff26'
          />

          <HomepageMonitoringInfoField
            inputTitle='Температура'
            inputName='temperature'
            seriesData={[1, 4, 8, 11, 1, 3.5, 1.2, 1.3, 3, 10, 6]}
            graphColor='#9800ff'
          />
        </HomepageMonitoringRightContainer>
      </FormProvider>
    </HomepageMonitoringContainersWrapper>
  );
};
