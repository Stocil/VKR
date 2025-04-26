import { styled } from '@mui/material';

import { HorizontalStack, VerticalStack } from 'components/stack';

export const ProfileContainer = styled(HorizontalStack)`
  gap: 70px;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileUserForm = styled('form')`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
`;

export const ProfileUserFields = styled(VerticalStack)`
  align-items: start;
  gap: 30px;
`;

export const ProfileUserFieldWrapper = styled(VerticalStack)`
  width: 400px;

  border-bottom: ${(props) => `2px solid ${props.theme.palette.primary.main}`};
  border-radius: 8px;
  padding: 10px 0px;
`;
