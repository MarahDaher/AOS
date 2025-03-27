import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface CardBoxProps extends BoxProps {
  children: ReactNode;
  label?: string;
  margin?: string | number;
}

const CardBox: FunctionComponent<CardBoxProps> = ({
  children,
  margin = "15px 5px",
  ...props
}) => {
  const theme = useTheme();
  return (
    <>
      <Box
        {...props}
        margin={margin}
        sx={{
          background: theme.palette.custom.card,
          boxShadow: 3,
          borderRadius: "4px",
          ...props.sx,
        }}
      >
        <Box p={2}>
          <Typography variant="h6" component="p" mb={1}>
            {props.label}
          </Typography>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default CardBox;
