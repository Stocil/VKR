import { FC, PropsWithChildren, ReactNode } from 'react';

import { Loader } from 'components/loader';

type Props = PropsWithChildren<{
  isLoading?: boolean;
  isError?: boolean;
  isEmptySearch?: boolean;
  errorFallback?: ReactNode;
  noDataFallback?: ReactNode;
}>;

export const PageWrapper: FC<Props> = ({
  children,
  isLoading = false,
  isError,
  isEmptySearch,
  noDataFallback,
  errorFallback,
}) => {
  if (isError) {
    //TODO Добавить дефолтную страницу ошибки
    return <Loader isLoading={isLoading}>{errorFallback}</Loader>;
  }

  if (isEmptySearch) {
    return <Loader isLoading={isLoading}>{noDataFallback}</Loader>;
  }

  return <Loader isLoading={isLoading}>{children}</Loader>;
};
