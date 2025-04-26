import { Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)`
  padding: 20px 30px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.palette.primary.main};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;

  text-align: center;
`;

export const LoginForm = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 350px;
`;

export const LoginFormFooter = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const LoginFooterButtons = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;
