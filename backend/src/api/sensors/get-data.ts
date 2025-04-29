import { Request, Response } from 'express';

export const getSensorsData = (_: Request, res: Response) => {
  const getRandomNumber = (max: number) => {
    return Number((Math.random() * max).toFixed(4));
  };

  const data = {
    current: getRandomNumber(200),
    voltage: getRandomNumber(200),
    resistance: getRandomNumber(200),
    temperature: getRandomNumber(200),
  };

  res.status(200).json(data);
};
