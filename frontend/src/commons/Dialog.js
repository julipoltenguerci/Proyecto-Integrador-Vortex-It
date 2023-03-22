import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";

export const Dialog = ({
  isOpen,
  title,
  acceptLabel,
  closeLabel,
  onAccept,
  onClose,
}) => {
  const hasAccept = acceptLabel && !!onAccept;

  return (
    <MuiDialog open={isOpen} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button
          color={hasAccept ? "info" : "secondary"}
          variant="contained"
          onClick={onClose}
        >
          {closeLabel}
        </Button>
        {hasAccept && (
          <Button color="secondary" variant="contained" onClick={onAccept}>
            {acceptLabel}
          </Button>
        )}
      </DialogActions>
    </MuiDialog>
  );
};
