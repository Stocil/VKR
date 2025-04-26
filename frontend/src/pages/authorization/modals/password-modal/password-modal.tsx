import { Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setAuthorizationModalsState } from 'store/authorization/modals/slice';

import { Modal } from 'components/modal';

import { PasswordModalForm } from './form';
import { PasswordModalWrapper } from './password-modal.styles';
import { PasswordModalFormInputs } from './types';

export const AuthorizationPasswordModal = () => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setAuthorizationModalsState());
  };

  const methods = useForm<PasswordModalFormInputs>({
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  return (
    <Modal open title='Придумайте новый пароль' onClose={onClose}>
      <PasswordModalWrapper>
        <Typography variant='subtitle2' color={'textSecondary'}>
          Придумайте новый пароль, для последующего входа в аккаунт
        </Typography>

        <FormProvider {...methods}>
          <PasswordModalForm />
        </FormProvider>
      </PasswordModalWrapper>
    </Modal>
  );
};
