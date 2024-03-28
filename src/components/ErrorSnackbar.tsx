import React, { useEffect } from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

export default function ErrorSnackbar() {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  const handleClose = (_event?: any, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  return (
    <div className=" h-[87.1vh] bg-violet-200">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "#7C57EC" }}
        >
          Error in fetching data!
        </Alert>
      </Snackbar>
    </div>
  )
}
