import { Box, CircularProgress, Grid } from "@mui/material";

const Loading = () => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 20vh)",
          // minWidth: "100vw",
        }}
      >
        <CircularProgress />
      </Box>
    </Grid>
  );
};

export default Loading;
