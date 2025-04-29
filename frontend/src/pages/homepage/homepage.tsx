import { FC } from 'react';

import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import ScienceIcon from '@mui/icons-material/Science';

import { Tabs } from 'components/tabs';
import { TabProps } from 'components/tabs/tabs';

import { HomepageTabNames } from './constants';
import { HomepageWrapper } from './homepage-styles';
import { useHomepageManageTabs } from './hooks';
import { HomepageMonitoring } from './monitoring';
import { HomepageResearch } from './research';

const options: TabProps['options'] = [
  {
    label: 'Мониторинг',
    value: HomepageTabNames.Monitoring,
    icon: <LegendToggleIcon />,
    iconPosition: 'start',
  },
  {
    label: 'Исследование',
    value: HomepageTabNames.Research,
    icon: <ScienceIcon />,
    iconPosition: 'start',
  },
];

const tabContent = {
  [HomepageTabNames.Monitoring]: <HomepageMonitoring />,
  [HomepageTabNames.Research]: <HomepageResearch />,
};

export const HomePage: FC = () => {
  const { currentTab, handleSetTab } = useHomepageManageTabs();

  return (
    <HomepageWrapper>
      <Tabs options={options} value={currentTab} onChange={handleSetTab} />

      {tabContent[currentTab]}
    </HomepageWrapper>
  );
};
