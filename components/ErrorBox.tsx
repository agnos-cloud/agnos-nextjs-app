import { Box } from "@mui/material";

export interface ErrorProps {
  error: Error | undefined;
}

const ErrorBox = ({ error }: ErrorProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
      }}
    >
      {error?.message}
    </Box>
  );
};

export default ErrorBox;
