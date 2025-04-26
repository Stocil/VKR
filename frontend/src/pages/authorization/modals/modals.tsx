import { FC } from 'react';

import { useSelector } from 'react-redux';

import { getAuthorizationPasswordModalState } from 'store/authorization/modals/selectors';

import { AuthorizationPasswordModal } from './password-modal';

export const AuthorizationModals: FC = () => {
  const { isOpen: isPasswordModalOpen } = useSelector(
    getAuthorizationPasswordModalState,
  );

  return <>{isPasswordModalOpen && <AuthorizationPasswordModal />}</>;
};
