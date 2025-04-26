import { FC, PropsWithChildren } from 'react';

import { CircularProgress } from '@mui/material';

type Props = PropsWithChildren<{
  isLoading: boolean;
  size?: number;
}>;

export const Loader: FC<Props> = ({ isLoading, size = 80, children }) => {
  if (isLoading) {
    return <CircularProgress size={size} color='primary' />;
  }

  return children;
};
