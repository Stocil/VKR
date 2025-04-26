import { TextField, styled } from '@mui/material';

export const StyledInput = styled(TextField)`
  & .MuiOutlinedInput-root {
    height: 50px;
  }

  & .MuiOutlinedInput-input {
    padding: 8px 12px;
  }
`;
