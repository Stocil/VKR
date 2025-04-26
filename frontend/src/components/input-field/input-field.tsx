import { FC } from 'react';

import { SxProps, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { Controller, ControllerProps } from 'react-hook-form';

import { InputFieldWrapper } from './input-field-styles';

export type InputFieldProps = ControllerProps & {
  title?: string;
  titleSize?: Variant;
  titleSx?: SxProps;
};

export const InputField: FC<InputFieldProps> = ({
  title,
  titleSize = 'body1',
  titleSx,
  ...controllerProps
}) => {
  return (
    <InputFieldWrapper>
      {title && (
        <Typography
          variant={titleSize}
          color='primary'
          marginLeft={'14px'}
          sx={titleSx}
        >
          {title}
        </Typography>
      )}

      <Controller {...controllerProps} />
    </InputFieldWrapper>
  );
};
