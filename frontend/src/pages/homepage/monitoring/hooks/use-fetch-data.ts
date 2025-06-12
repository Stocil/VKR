import { useEffect, useState } from 'react';

import { Sensors } from 'types/entities/sensors';

import * as XLSX from 'xlsx';

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

  const isLoading = false; //isDataLoading || isUninitialized;

  useEffect(() => {
    const id = setInterval(() => {
      fetchSensorsData()
        .unwrap()
        // new Promise<Sensors.Entity>((resolve) =>
        //   resolve({
        //     current: Math.random() * 321,
        //     voltage: Math.random() * 321,
        //     power: Math.random() * 321,
        //     temperature: Math.random() * 321,
        //   }),
        // )
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

  const onExportData = () => {
    const { current, voltage, power, temperature } = sensorsData;

    const filteredData = xAxisData.map((number, index) => ({
      Номер: number,
      Ток: current[index],
      Напряжение: voltage[index],
      Мощность: power[index],
      Температура: temperature[index],
    }));

    filteredData.pop();

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredData);

    var wscols = [
      { wch: 10 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, 'Test');
    XLSX.writeFile(wb, 'Параметры литиевого аккумулятора.xlsx');
  };

  return {
    sensorsData,
    xAxisData,
    onExportData,
    isLoading,
    isError,
    isEmptySearch,
  };
};
