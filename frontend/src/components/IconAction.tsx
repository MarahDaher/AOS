import {
  IconButton,
  Tooltip,
  IconButtonProps,
  TooltipProps,
} from "@mui/material";
import { ReactNode, FunctionComponent } from "react";

interface IconActionProps extends IconButtonProps {
  tooltip: string;
  children: ReactNode;
  tooltipProps?: Partial<TooltipProps>;
}

const IconAction: FunctionComponent<IconActionProps> = ({
  tooltip,
  children,
  tooltipProps,
  ...iconButtonProps
}) => {
  return (
    <Tooltip title={tooltip} {...tooltipProps}>
      <IconButton {...iconButtonProps}>{children}</IconButton>
    </Tooltip>
  );
};

export default IconAction;
