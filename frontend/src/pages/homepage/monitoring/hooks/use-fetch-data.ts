import { useEffect, useState } from 'react';

import { useLazyFetchSensorsQuery } from 'store/api/sensors';

import { SensorsData } from '../types';

export const useFetchHomepageMonitoringData = () => {
  const [xAxisData, setXAxisData] = useState<number[]>([1]);
  const [sensorsData, setSensorsData] = useState<SensorsData>({
    current: [],
    resistance: [],
    temperature: [],
    voltage: [],
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
          const resistance = [...sensorsData.resistance, res.resistance];
          const temperature = [...sensorsData.temperature, res.temperature];
          const voltage = [...sensorsData.voltage, res.voltage];

          if (newXAxisData.length > 30) {
            const slicedNewXAxisData = newXAxisData.slice(1);

            const slicedCurrent = current.slice(1);
            const slicedResistance = resistance.slice(1);
            const slicedTemperature = temperature.slice(1);
            const slicedVoltage = voltage.slice(1);

            setSensorsData({
              current: slicedCurrent,
              resistance: slicedResistance,
              temperature: slicedTemperature,
              voltage: slicedVoltage,
            });
            setXAxisData(slicedNewXAxisData);

            return;
          }

          setSensorsData({ current, resistance, temperature, voltage });
          setXAxisData(newXAxisData);
        });
    }, 2000);

    return () => clearInterval(id);
  }, [sensorsData]);

  return { sensorsData, xAxisData, isLoading, isError, isEmptySearch };
};
