import { styled } from '@mui/material';

import { Button } from 'components/button';

export const PasswordModalFormWrapper = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 100%;
`;

export const PasswordModalFormButton = styled(Button)`
  margin-top: 30px;
`;
