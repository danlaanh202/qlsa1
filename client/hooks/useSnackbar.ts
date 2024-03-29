import { useState } from "react";

export default function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | any>(
    "success"
  );
  const handleOpenSnackbar = (
    message: string,
    _severity: "success" | "error" | any
  ) => {
    setSnackbarMessage(message);
    setSeverity(_severity);
    setOpen(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return [open, snackbarMessage, severity, handleOpenSnackbar, handleClose];
}
