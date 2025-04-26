import { FC } from 'react';

import { TextFieldProps } from '@mui/material';

import { StyledInput } from './input-styles';

export type Size = 'small' | 'large';

type Props = TextFieldProps;

export const Input: FC<Props> = (props) => {
  return <StyledInput {...props} fullWidth autoComplete='new-password' />;
};
