import { Tooltip as TooltipMui, TooltipProps } from '@mui/material';

type Props = TooltipProps & {
  margin?: number;
};

export const Tooltip = ({ children, margin = -15, ...props }: Props) => {
  return (
    <TooltipMui
      placement='top'
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, margin],
              },
            },
          ],
        },
      }}
      {...props}
    >
      {children}
    </TooltipMui>
  );
};
