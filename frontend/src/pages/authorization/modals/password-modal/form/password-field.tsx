import { FC } from 'react';

import { SxProps } from '@mui/material';

import { InputField } from 'components/input-field';
import { InputFieldProps } from 'components/input-field/input-field';
import { PasswordInput } from 'components/input/password-input';

type Props = Omit<InputFieldProps, 'render'>;

const titleSx: SxProps = {
  ml: 0,
};

export const PasswordModalField: FC<Props> = (props) => {
  return (
    <InputField
      {...props}
      titleSx={titleSx}
      render={({ field, fieldState }) => (
        <PasswordInput
          placeholder={props.title}
          value={field.value}
          onChange={field.onChange}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
