import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
} from "@mui/material";
import { ReactNode } from "react";

interface BaseDialogProps extends DialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  onSubmit: () => void;
  submitText?: string;
  cancelText?: string;
  hideActions?: boolean;
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
  ...props
}: BaseDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" {...props}>
      <DialogTitle>{title}</DialogTitle>
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
