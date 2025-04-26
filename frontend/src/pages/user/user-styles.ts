import { Typography, styled } from '@mui/material';

import { HorizontalStack, VerticalStack } from 'components/stack';

export const UserContainer = styled(HorizontalStack)`
  padding: 60px 0 60px 60px;
  position: relative;

  border: ${(props) => `2px outset ${props.theme.palette.primary.main}`};
  border-radius: 30px;

  gap: 70px;
  justify-content: space-between;
  align-items: center;
`;

export const UserFieldWrapper = styled(HorizontalStack)`
  width: 100%;
  padding: 10px 40px 10px 20px;

  justify-content: start;
  text-align: start;
  border-bottom: ${(props) => `2px solid ${props.theme.palette.primary.main}`};
  border-left: ${(props) => `2px solid ${props.theme.palette.primary.main}`};
  border-bottom-left-radius: 20px;
  border-top-left-radius: 10px;
`;

export const UserCornerId = styled(Typography)`
  position: absolute;
  right: 0;
  top: 0;

  padding: 15px;
  border-left: ${(props) => `2px inset ${props.theme.palette.primary.main}`};
  border-bottom: ${(props) => `2px inset ${props.theme.palette.primary.main}`};
  border-bottom-left-radius: 40px;
`;

export const UserEmptySearchWrapper = styled(VerticalStack)`
  border: ${(props) => `2px solid ${props.theme.palette.primary.main}`};
  padding: 30px;
  border-radius: 30px;
`;
