import { Typography } from '@mui/material';

import { Button } from 'components/button';
import { VerticalStack } from 'components/stack';

export const PageEmptyPage = () => {
  const onPageReload = () => location.reload();

  return (
    <VerticalStack spacing={2}>
      <Typography variant='h4'>Данные о пользователе не найдены</Typography>
      <Button size='large' onClick={onPageReload}>
        Перезагрузить страницу
      </Button>
    </VerticalStack>
  );
};
