import { useEffect, useState } from 'react';

import { useLazyFetchSensorsQuery } from 'store/api/sensors';

import { SensorsData } from '../types';

export const useFetchHomepageMonitoringData = () => {
  const [xAxisData, setXAxisData] = useState<number[]>([1]);
  const [sensorsData, setSensorsData] = useState<SensorsData>({
    current: [],
    voltage: [],
    power: [],
    temperature: [],
  });

  const isEmptySearch = !Object.values(sensorsData).filter(
    (sensorData) => sensorData.length !== 0,
  ).length;

  const [
    fetchSensorsData,
    { isLoading: isDataLoading, isError, isUninitialized },
  ] = useLazyFetchSensorsQuery();

  const isLoading = isDataLoading || isUninitialized;

  useEffect(() => {
    const id = setInterval(() => {
      fetchSensorsData()
        .unwrap()
        .then((res) => {
          const newXAxisData = [
            ...xAxisData,
            xAxisData[xAxisData.length - 1] + 1,
          ];

          const current = [...sensorsData.current, res.current];
          const voltage = [...sensorsData.voltage, res.voltage];
          const power = [...sensorsData.power, res.power];
          const temperature = [...sensorsData.temperature, res.temperature];

          if (newXAxisData.length > 30) {
            const slicedNewXAxisData = newXAxisData.slice(1);

            const slicedCurrent = current.slice(1);
            const slicedVoltage = voltage.slice(1);
            const slicedPower = power.slice(1);
            const slicedTemperature = temperature.slice(1);

            setSensorsData({
              current: slicedCurrent,
              voltage: slicedVoltage,
              power: slicedPower,
              temperature: slicedTemperature,
            });
            setXAxisData(slicedNewXAxisData);

            return;
          }

          setSensorsData({ current, voltage, power, temperature });
          setXAxisData(newXAxisData);
        });
    }, 2000);

    return () => clearInterval(id);
  }, [sensorsData]);

  return { sensorsData, xAxisData, isLoading, isError, isEmptySearch };
};
