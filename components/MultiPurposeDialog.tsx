import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface MultiPurposeDialogProps {
  actions: ({
    text: string;
    onClick: () => void;
  })[];
  children?: any;
  open: boolean;
  title?: string;
  onClose: () => void;
}

const MultiPurposeDialog = (props: MultiPurposeDialogProps) => {
  const { actions, children, open, title, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{title || "Dialog"}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions.map((action) => (
          <Button onClick={action.onClick}>{action.text}</Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default MultiPurposeDialog;
