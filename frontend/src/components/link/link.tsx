import { FC, PropsWithChildren } from 'react';

import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router';

type Props = {
  linkTo: string;
};

export const Link: FC<PropsWithChildren<Props>> = ({ children, linkTo }) => {
  return (
    <MuiLink component={RouterLink} to={linkTo} underline={'none'}>
      {children}
    </MuiLink>
  );
};
