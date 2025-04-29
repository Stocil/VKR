import { Typography } from '@mui/material';

import { Button } from 'components/button';
import { VerticalStack } from 'components/stack';

export const HomepageTabsEmptySearch = () => {
  const onPageReload = () => location.reload();

  return (
    <VerticalStack spacing={2}>
      <Typography variant='h5'>Данные c датчиков не получены</Typography>
      <Button size='large' onClick={onPageReload}>
        Запросить данные повторно
      </Button>
    </VerticalStack>
  );
};
