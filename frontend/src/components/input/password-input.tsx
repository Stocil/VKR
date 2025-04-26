import { FC, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material';

import { Input } from './input';

type Props = TextFieldProps;

export const PasswordInput: FC<Props> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const onClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton edge='end' onClick={onClick} size='small'>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};
