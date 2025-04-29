import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { sensorsApi } from 'store/api/sensors';

import { HandleChangeTab } from 'components/tabs/types';

import { HomepageTabNames } from '../constants';

export const useHomepageManageTabs = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<HomepageTabNames>(
    HomepageTabNames.Monitoring,
  );

  useEffect(() => {
    dispatch(sensorsApi.util.invalidateTags(['fetchSensors']));
  }, [currentTab]);

  const handleSetTab: HandleChangeTab<HomepageTabNames> = (_, tab) => {
    setCurrentTab(tab);
  };

  return { currentTab, handleSetTab };
};
