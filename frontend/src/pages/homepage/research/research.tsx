import { FC } from 'react';

import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { homepageDefaultValues } from '../constants';
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
  const methods = useForm<HomepageForm>({
    defaultValues: homepageDefaultValues,
  });

  return (
    <HomepageResearchTabContentWrapper>
      <Typography variant='h5' color='primary'>
        Исследование
      </Typography>

      <HomepageContainersWrapper>
        <FormProvider {...methods}>
          <HomepageLeftContainer>
            <HomepageFormInput label='Ток' name='current' />
            <HomepageLeftInputDivider />
            <HomepageFormInput label='Напряжение' name='voltage' />
          </HomepageLeftContainer>

          {
            // Может в зависимости от заряда менять иконку и ее цвет, 70%, 50%, 30% и т.д
          }
          <BatteryChargingFullIcon sx={{ width: '200px', height: '200px' }} />

          <HomepageRightContainer>
            <HomepageFormInput label='Сопротивление' name='resistance' />
            <HomepageRightInputDivider />
            <HomepageFormInput label='Температура' name='temperature' />
          </HomepageRightContainer>
        </FormProvider>
      </HomepageContainersWrapper>
    </HomepageResearchTabContentWrapper>
  );
};
