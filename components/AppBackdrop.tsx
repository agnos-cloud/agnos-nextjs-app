import { Backdrop } from "@mui/material";
import { useState } from "react";

const AppBackdrop = ({children}: any) => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          {children}
        </Backdrop>
      </div>
    );
};

export default AppBackdrop;
