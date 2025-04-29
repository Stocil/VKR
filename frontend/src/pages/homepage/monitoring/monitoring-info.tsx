import { FC, useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { HomepageForm } from '../types';
import { HomepageMonitoringInfoField } from './monitoring-info-field';
import {
  HomepageMonitoringContainer,
  HomepageMonitoringContainersWrapper,
} from './monitoring-styles';
import { SensorsData } from './types';

type Props = {
  sensorsData: SensorsData;
  xAxisData: number[];
};

export const HomepageMonitoringInfo: FC<Props> = ({
  sensorsData,
  xAxisData,
}) => {
  const methods = useForm<HomepageForm>();
  const { setValue } = methods;

  const { current, temperature, resistance, voltage } = sensorsData;
  const lastCurrentData = current[current.length - 1];
  const lastResistanceData = resistance[resistance.length - 1];
  const lastTemperatureData = temperature[temperature.length - 1];
  const lastVoltageData = voltage[voltage.length - 1];

  useEffect(() => {
    setValue('current', lastCurrentData);
    setValue('resistance', lastResistanceData);
    setValue('temperature', lastTemperatureData);
    setValue('voltage', lastVoltageData);
  }, [
    lastCurrentData,
    lastResistanceData,
    lastTemperatureData,
    lastVoltageData,
  ]);

  return (
    <HomepageMonitoringContainersWrapper>
      <FormProvider {...methods}>
        <HomepageMonitoringContainer>
          <HomepageMonitoringInfoField
            inputTitle='Ток'
            inputName='current'
            xAxisData={xAxisData}
            seriesData={current}
            graphColor='#495afb'
          />

          <HomepageMonitoringInfoField
            inputTitle='Сопротивление'
            inputName='resistance'
            xAxisData={xAxisData}
            seriesData={resistance}
            graphColor='#00ff26'
          />
        </HomepageMonitoringContainer>

        <HomepageMonitoringContainer>
          <HomepageMonitoringInfoField
            inputTitle='Температура'
            inputName='temperature'
            xAxisData={xAxisData}
            seriesData={temperature}
            graphColor='#9800ff'
          />

          <HomepageMonitoringInfoField
            inputTitle='Напряжение'
            inputName='voltage'
            seriesData={voltage}
            xAxisData={xAxisData}
            graphColor='#bb4d05'
          />
        </HomepageMonitoringContainer>
      </FormProvider>
    </HomepageMonitoringContainersWrapper>
  );
};
