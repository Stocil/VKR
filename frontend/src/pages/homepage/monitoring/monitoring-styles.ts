import { Paper, styled } from '@mui/material';

import {
  HomepageContainersWrapper,
  HomepageLeftContainer,
} from '../homepage-styles';

export const HomepageMonitoringContainersWrapper = styled(
  HomepageContainersWrapper,
)`
  gap: 16px;
  justify-content: start;
`;

export const HomepageMonitoringLeftContainer = styled(HomepageLeftContainer)`
  width: 50%;
  padding: 0;
  gap: 50px;
`;

export const HomepageMonitoringRightContainer = styled(
  HomepageMonitoringLeftContainer,
)``;

export const HomepageMonitoringInfoFieldWrapper = styled(Paper)`
  width: 100%;
  padding: 15px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
