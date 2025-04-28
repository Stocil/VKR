import { HomepageForm } from './types';

export const homepageDefaultValues: HomepageForm = {
  current: '12.120',
  voltage: '66.331',
  resistance: '11',
  temperature: '300',
};

export enum HomepageTabNames {
  Research = 'research',
  Monitoring = 'monitoring',
}
