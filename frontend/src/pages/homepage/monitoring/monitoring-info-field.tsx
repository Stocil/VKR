import { FC } from 'react';

import { LineChart } from '@mui/x-charts';

import { HomepageFormInput } from '../form-input';
import { HomepageMonitoringInfoFieldWrapper } from './monitoring-styles';

type Props = {
  inputTitle: string;
  inputName: string;
  graphColor: string;
  seriesData: number[];
  xAxisData: number[];
  isAreaFill?: boolean;
};

export const HomepageMonitoringInfoField: FC<Props> = ({
  inputTitle,
  inputName,
  seriesData,
  xAxisData,
  graphColor,
  isAreaFill = true,
}) => {
  return (
    <HomepageMonitoringInfoFieldWrapper elevation={3}>
      <HomepageFormInput title={inputTitle} name={inputName} disabled />

      <LineChart
        xAxis={[
          {
            data: xAxisData,
            label: 'Время, с',
          },
        ]}
        series={[
          {
            data: seriesData,
            label: inputTitle,
            area: isAreaFill,
            color: graphColor,
          },
        ]}
        height={300}
        sx={{ width: '100%' }}
      />
    </HomepageMonitoringInfoFieldWrapper>
  );
};
