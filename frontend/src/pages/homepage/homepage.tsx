import { FC, useState } from 'react';

import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import ScienceIcon from '@mui/icons-material/Science';

import { Tabs } from 'components/tabs';
import { TabProps } from 'components/tabs/tabs';
import { HandleChangeTab } from 'components/tabs/types';

import { HomepageTabNames } from './constants';
import { HomepageTabContentWrapper, HomepageWrapper } from './homepage-styles';
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
  const [currentTab, setCurrentTab] = useState<HomepageTabNames>(
    HomepageTabNames.Monitoring,
  );

  const handleSetTab: HandleChangeTab<HomepageTabNames> = (_, tab) => {
    setCurrentTab(tab);
  };

  return (
    <HomepageWrapper>
      <Tabs options={options} value={currentTab} onChange={handleSetTab} />

      {tabContent[currentTab]}
    </HomepageWrapper>
  );
};
