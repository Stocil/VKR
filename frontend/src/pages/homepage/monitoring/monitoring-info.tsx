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

  const { current, voltage, power, temperature } = sensorsData;
  const lastCurrentData = current[current.length - 1];
  const lastVoltageData = voltage[voltage.length - 1];
  const lastPowerData = power[power.length - 1];
  const lastTemperatureData = temperature[temperature.length - 1];

  useEffect(() => {
    setValue('current', lastCurrentData);
    setValue('voltage', lastVoltageData);
    setValue('power', lastPowerData);
    setValue('temperature', lastTemperatureData);
  }, [lastCurrentData, lastVoltageData, lastPowerData, lastTemperatureData]);

  return (
    <HomepageMonitoringContainersWrapper>
      <FormProvider {...methods}>
        <HomepageMonitoringContainer>
          <HomepageMonitoringInfoField
            inputTitle='Ток, мА'
            inputName='current'
            seriesData={current}
            xAxisData={xAxisData}
            graphColor='#495afb'
            isAreaFill={false}
          />

          <HomepageMonitoringInfoField
            inputTitle='Напряжение, В'
            inputName='voltage'
            seriesData={voltage}
            xAxisData={xAxisData}
            graphColor='#bb4d05'
            isAreaFill={false}
          />
        </HomepageMonitoringContainer>

        <HomepageMonitoringContainer>
          <HomepageMonitoringInfoField
            inputTitle='Мощность, мВт'
            inputName='power'
            seriesData={power}
            xAxisData={xAxisData}
            graphColor='#00ff26'
            isAreaFill={false}
          />

          <HomepageMonitoringInfoField
            inputTitle='Температура'
            inputName='temperature'
            xAxisData={xAxisData}
            seriesData={temperature}
            graphColor='#9800ff'
            isAreaFill={false}
          />
        </HomepageMonitoringContainer>
      </FormProvider>
    </HomepageMonitoringContainersWrapper>
  );
};
