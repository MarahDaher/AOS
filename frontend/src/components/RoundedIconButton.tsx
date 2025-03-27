import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

interface RoundedIconButtonProps extends ButtonProps {
  icon: ReactNode;
  label: string;
}

const RoundedIconButton = ({
  icon,
  label,
  ...props
}: RoundedIconButtonProps) => {
  return (
    <Button
      startIcon={icon}
      variant="contained"
      {...props}
      sx={{
        backgroundColor: "#e5f2ff",
        color: "#2196f3",
        borderRadius: "999px",
        textTransform: "none",
        fontWeight: 500,
        boxShadow: 3,
        "&:hover": {
          backgroundColor: "#d2eaff",
        },
        ...props.sx,
      }}
    >
      {label}
    </Button>
  );
};

export default RoundedIconButton;
