import { FC } from 'react';

import { SxProps } from '@mui/material';

import { Input } from 'components/input';
import { InputField } from 'components/input-field';
import { InputFieldProps } from 'components/input-field/input-field';

type Props = Omit<InputFieldProps, 'render'> & {
  label?: string;
};

const titleSx: SxProps = {
  ml: 0,
};

export const HomepageFormInput: FC<Props> = ({ title, label, ...props }) => (
  <InputField
    {...props}
    title={title}
    titleSx={titleSx}
    render={({ field, fieldState }) => (
      <Input
        value={field.value}
        onChange={field.onChange}
        disabled={props.disabled}
        label={label}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    )}
  />
);
