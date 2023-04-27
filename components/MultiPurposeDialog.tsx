import { Breakpoint, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DialogAction } from "@types";

export interface MultiPurposeDialogProps {
  actions: DialogAction[];
  children?: any;
  open: boolean;
  title?: string;
  loading?: boolean;
  maxWidth?: false | Breakpoint | undefined;
  onClose: () => void;
}

const MultiPurposeDialog = (props: MultiPurposeDialogProps) => {
  const { actions, children, loading, open, title, maxWidth, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={maxWidth}>
      <DialogTitle>{title || "Dialog"}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions.map((action, index) => (
          <Button key={index} onClick={action.onClick} disabled={loading}>
            {action.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default MultiPurposeDialog;
