import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
  Box,
} from "@mui/material";
import { ReactNode } from "react";

interface BaseDialogProps extends DialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  hideActions?: boolean;
  actionButton?: ReactNode;
}

const BaseDialog = ({
  title,
  open,
  onClose,
  children,
  onSubmit,
  submitText = "Speichern",
  cancelText = "Abbrechen",
  hideActions = false,
  maxWidth = "sm",
  actionButton,
  ...props
}: BaseDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      {...props}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        {actionButton && <Box>{actionButton}</Box>}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {!hideActions && (
        <DialogActions>
          <Button onClick={onClose}>{cancelText}</Button>
          <Button onClick={onSubmit} variant="contained" type="submit">
            {submitText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default BaseDialog;
