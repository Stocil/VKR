import { FC } from 'react';

import { LineChart } from '@mui/x-charts';

import { HomepageFormInput } from '../form-input';
import { HomepageMonitoringInfoFieldWrapper } from './monitoring-styles';

const defaultXAxisData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
  inputTitle: string;
  inputName: string;
  graphColor: string;
  seriesData: number[];
  xAxisData?: number[];
};

export const HomepageMonitoringInfoField: FC<Props> = ({
  inputTitle,
  inputName,
  seriesData,
  xAxisData = defaultXAxisData,
  graphColor,
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
            area: true,
            color: graphColor,
          },
        ]}
        height={300}
        sx={{ width: '100%' }}
      />
    </HomepageMonitoringInfoFieldWrapper>
  );
};
