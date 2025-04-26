import { IconButton, Modal, Paper, Typography, styled } from '@mui/material';

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWrapper = styled(Paper)`
  position: relative;
  padding: 20px 25px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  outline: 0;
`;

export const ModalTitle = styled(Typography)`
  font-weight: 700;
  padding-right: 25px;

  color: ${(props) => props.theme.palette.primary.main};

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ModalCloseButton = styled(IconButton)`
  position: absolute;
  right: 12px;
  top: 17px;
`;
