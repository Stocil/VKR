import { AppBar, Stack, styled } from '@mui/material';

export const StyledAppBar = styled(AppBar)`
  border-bottom: 2px solid ${(props) => props.theme.palette.primary.main};
  border-radius: 15px;
  position: fixed;
`;

export const AppBarUserActionsWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

export const AppBarUserInfo = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
