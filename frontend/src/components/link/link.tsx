import { FC, PropsWithChildren } from 'react';

import { Link as MuiLink, SxProps } from '@mui/material';
import { Link as RouterLink } from 'react-router';

type Props = {
  linkTo: string;
  linkSx: SxProps;
};

export const Link: FC<PropsWithChildren<Props>> = ({
  children,
  linkTo,
  linkSx,
}) => {
  return (
    <MuiLink component={RouterLink} to={linkTo} underline={'none'} sx={linkSx}>
      {children}
    </MuiLink>
  );
};
