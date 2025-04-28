import { FC } from 'react';

import { TabProps as MuiTabProps, TabsProps } from '@mui/material';

import { StyledTab, StyledTabs } from './tabs-styles';

export type TabProps = TabsProps & {
  options: MuiTabProps[];
};

export const Tabs: FC<TabProps> = ({ options, ...props }) => {
  return (
    <StyledTabs {...props}>
      {options.map((option) => (
        <StyledTab key={option.value} {...option} />
      ))}
    </StyledTabs>
  );
};
