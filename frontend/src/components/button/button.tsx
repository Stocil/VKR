import { FC, PropsWithChildren } from 'react';

import { ButtonProps, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

import { Loader } from 'components/loader';

import { StyledButton } from './button-styles';

type Sizes = 'small' | 'medium' | 'large';

type Props = PropsWithChildren<
  ButtonProps & {
    text?: string;
    isLoading?: boolean;
  }
>;

type SizeOption = {
  buttonPadding: string;
  textVariant: Variant;
  loaderSize: number;
};

const buttonSizes: Record<Sizes, SizeOption> = {
  large: {
    buttonPadding: '8px 16px',
    textVariant: 'body1',
    loaderSize: 24,
  },
  medium: {
    buttonPadding: '6px 12px',
    textVariant: 'body1',
    loaderSize: 24,
  },
  small: {
    buttonPadding: '4px 8px',
    textVariant: 'body2',
    loaderSize: 20,
  },
};

export const Button: FC<Props> = ({
  sx,
  children,
  size = 'medium',
  text,
  isLoading = false,
  ...props
}) => {
  const { buttonPadding, textVariant, loaderSize } = buttonSizes[size];

  return (
    <StyledButton
      sx={{ padding: buttonPadding, ...sx }}
      {...props}
      disableRipple
    >
      <Loader size={loaderSize} isLoading={isLoading}>
        <Typography variant={textVariant}>{text ?? children}</Typography>
      </Loader>
    </StyledButton>
  );
};
