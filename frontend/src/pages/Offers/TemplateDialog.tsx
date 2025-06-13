import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface TemplateDialogProps {
  open: boolean;
  templates: string[];
  onClose: () => void;
  onSelect: (filename: string) => void;
}

export default function TemplateDialog({
  open,
  templates,
  onClose,
  onSelect,
}: TemplateDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Vorlagen</DialogTitle>
      <List>
        {templates.map((file) => (
          <ListItem
            key={file}
            secondaryAction={
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={() => onSelect(file)}
              >
                AUSWÄHLEN
              </Typography>
            }
          >
            <ListItemText primary={file} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
