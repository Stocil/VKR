import { FC, MouseEvent, PropsWithChildren } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { ModalProps } from '@mui/material';

import {
  ModalCloseButton,
  ModalTitle,
  ModalWrapper,
  StyledModal,
} from './modal-styles';

type Props = PropsWithChildren<ModalProps & { title?: string }>;

export const Modal: FC<Props> = ({ children, title, ...modalProps }) => {
  const onClose = (e: MouseEvent<HTMLButtonElement>) => {
    if (modalProps.onClose) {
      modalProps.onClose(e, 'escapeKeyDown');
    }
  };

  return (
    <StyledModal {...modalProps}>
      <ModalWrapper>
        {!!title && <ModalTitle variant='h5'>{title}</ModalTitle>}

        {children}

        <ModalCloseButton onClick={onClose}>
          <CloseIcon />
        </ModalCloseButton>
      </ModalWrapper>
    </StyledModal>
  );
};
