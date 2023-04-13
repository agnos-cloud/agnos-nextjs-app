import { Backdrop } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { LOGIN_PATH } from "@constants/paths";

const LoginBackdrop = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
        <Link href={LOGIN_PATH}>You may need to log in</Link>
      </Backdrop>
    </div>
  );
};

export default LoginBackdrop;
