import { Paper, styled } from '@mui/material';

import { Divider } from 'components/divider';
import { HorizontalStack, VerticalStack } from 'components/stack';

export const HomepageWrapper = styled(Paper)`
  width: 80%;

  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 20px 20px 30px 20px;
`;

export const HomepageTabContentWrapper = styled(VerticalStack)`
  align-items: start;

  gap: 30px;
`;

export const HomepageContainersWrapper = styled(HorizontalStack)`
  width: 100%;

  justify-content: space-between;
  gap: 60px;
`;

export const HomepageLeftContainer = styled(VerticalStack)`
  width: 550px;
  height: 100%;
  padding: 20px 0;

  justify-content: space-between;
  gap: 20px;

  position: relative;
`;

export const HomepageRightContainer = styled(HomepageLeftContainer)``;

export const HomepageLeftInputDivider = styled(Divider)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 120%;
`;

export const HomepageRightInputDivider = styled(HomepageLeftInputDivider)`
  left: unset;
  right: 0;
`;
