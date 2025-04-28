import { Divider as MuiDivider, css, styled } from '@mui/material';
import { indigo } from '@mui/material/colors';

type Props = {
  width?: number;
};

export const Divider = styled(MuiDivider)<Props>`
  width: ${({ width }) => (width ? width : '100%')};
  height: 1px;
  background-color: ${indigo[300]};

  ${({ orientation }) =>
    orientation === 'vertical' &&
    css`
      width: auto;
      height: 100%;
    `}
`;
