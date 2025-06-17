import { FC } from 'react';

import LegendToggleIcon from '@mui/icons-material/LegendToggle';

import { Tabs } from 'components/tabs';
import { TabProps } from 'components/tabs/tabs';

import { HomepageTabNames } from './constants';
import { HomepageWrapper } from './homepage-styles';
import { useHomepageManageTabs } from './hooks';
import { HomepageMonitoring } from './monitoring';

const options: TabProps['options'] = [
  {
    label: 'Нагрузка 1',
    value: HomepageTabNames.Monitoring,
    icon: <LegendToggleIcon />,
    iconPosition: 'start',
  },
  {
    label: 'Нагрузка 2',
    value: HomepageTabNames.LoadMonitoring,
    icon: <LegendToggleIcon />,
    iconPosition: 'start',
  },
];

const tabContent = {
  [HomepageTabNames.Monitoring]: <HomepageMonitoring isLoadMode={false} />,
  [HomepageTabNames.LoadMonitoring]: <HomepageMonitoring isLoadMode={true} />,
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
