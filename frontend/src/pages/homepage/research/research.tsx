import { FC, useEffect } from 'react';

import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { useFetchSensorsQuery } from 'store/api/sensors';

import { PageWrapper } from 'components/page-wrapper';

import { HomepageTabsEmptySearch } from '../empty-search';
import { HomepageFormInput } from '../form-input';
import {
  HomepageContainersWrapper,
  HomepageLeftContainer,
  HomepageLeftInputDivider,
  HomepageRightContainer,
  HomepageRightInputDivider,
} from '../homepage-styles';
import { HomepageForm } from '../types';
import { HomepageResearchTabContentWrapper } from './research-styles';

export const HomepageResearch: FC = () => {
  const { data, isLoading, isError, isUninitialized } = useFetchSensorsQuery();

  const methods = useForm<HomepageForm>({
    defaultValues: data,
  });
  const { setValue } = methods;

  useEffect(() => {
    if (!data) return;
    const { current, resistance, temperature, power } = data;

    setValue('current', current);
    setValue('resistance', resistance);
    setValue('temperature', temperature);
    setValue('power', power);
  }, [data]);

  return (
    <HomepageResearchTabContentWrapper>
      <Typography variant='h5' color='primary'>
        Исследование
      </Typography>

      <PageWrapper
        isLoading={isLoading || isUninitialized}
        isError={isError}
        errorFallback={<HomepageTabsEmptySearch />}
      >
        <HomepageContainersWrapper>
          <FormProvider {...methods}>
            <HomepageLeftContainer>
              <HomepageFormInput label='Ток' name='current' />
              <HomepageLeftInputDivider />
              <HomepageFormInput label='Температура' name='temperature' />
            </HomepageLeftContainer>

            {
              // Может в зависимости от заряда менять иконку и ее цвет, 70%, 50%, 30% и т.д
            }
            <BatteryChargingFullIcon sx={{ width: '200px', height: '200px' }} />

            <HomepageRightContainer>
              <HomepageFormInput label='Сопротивление' name='resistance' />

              <HomepageRightInputDivider />
              <HomepageFormInput label='Напряжение' name='voltage' />
            </HomepageRightContainer>
          </FormProvider>
        </HomepageContainersWrapper>
      </PageWrapper>
    </HomepageResearchTabContentWrapper>
  );
};
