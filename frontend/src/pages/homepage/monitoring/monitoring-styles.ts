import { Paper, styled } from '@mui/material';

import { HorizontalStack, VerticalStack } from 'components/stack';

export const HomepageMonitoringContainersWrapper = styled(VerticalStack)`
  width: 100%;
  gap: 30px;
`;

export const HomepageMonitoringContainer = styled(HorizontalStack)`
  width: 100%;
  gap: 30px;
`;

export const HomepageMonitoringInfoFieldWrapper = styled(Paper)`
  width: 100%;
  padding: 15px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
