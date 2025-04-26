import { Avatar, styled } from '@mui/material';

export const ColoredAvatar = styled(Avatar)`
  background-color: ${(props) => props.theme.palette.primary.main};
`;
